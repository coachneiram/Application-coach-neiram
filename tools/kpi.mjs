#!/usr/bin/env node
/**
 * KPI de pilotage à partir de l'export du Sheet « Suivi CA Coaching ».
 *
 * Usage :
 *   node tools/kpi.mjs data/cache/suivi-ca.md [--objectif 4000] [--json] [--noms]
 *
 * L'export est la réponse brute du connecteur Google Drive (read_file_content),
 * sauvegardée telle quelle. Aucune donnée n'est écrite ailleurs que sur la
 * sortie standard. Les noms de clients ne sont affichés qu'avec --noms.
 */
import { readFileSync } from "node:fs";
import { parserTables, trouverEntete, colonne, montant, normaliser } from "./lib/sheet-md.mjs";

export const MOIS = [
  "janvier", "fevrier", "mars", "avril", "mai", "juin",
  "juillet", "aout", "septembre", "octobre", "novembre", "decembre"
];

const OBJECTIF_PAR_DEFAUT = 4000;

/** Trouve la table du suivi CA et ses colonnes. */
function tableSuiviCa(tables) {
  for (const t of tables) {
    const entete = trouverEntete(t, ["Mois", "Nom du client", "Tarifs mensuels"]);
    if (entete) return { table: t, entete };
  }
  throw new Error("Table « Suivi CA » introuvable : en-têtes Mois / Nom du client / Tarifs mensuels absents.");
}

/**
 * Agrège l'export par mois.
 * Renvoie une liste ordonnée de mois avec lignes, encaissé, brut déclaré, loyer, net.
 */
export function calculerMois(brut) {
  const tables = parserTables(brut);
  const { table, entete } = tableSuiviCa(tables);
  const cMois = colonne(entete, "Mois");
  const cNom = colonne(entete, "Nom du client");
  const cTarif = colonne(entete, "Tarifs mensuels");
  const cVirement = colonne(entete, "Virement");
  const cBrut = colonne(entete, "CA Mensuel Brut");
  const cLoyer = colonne(entete, "Loyer");
  const cBilans = colonne(entete, "Bilans");
  const cNet = colonne(entete, "CA Mensuel Net");

  const parMois = new Map();
  let moisCourant = null;
  for (const ligne of table.slice(entete.index + 1)) {
    const libelle = normaliser(ligne[cMois] ?? "");
    if (libelle && MOIS.includes(libelle)) moisCourant = libelle;
    if (!moisCourant) continue;
    if (!parMois.has(moisCourant)) {
      parMois.set(moisCourant, {
        mois: moisCourant, lignes: [], attendu: 0, encaisse: 0, nbLignes: 0, nbPayees: 0,
        brutDeclare: null, loyer: null, bilans: null, netDeclare: null
      });
    }
    const m = parMois.get(moisCourant);
    const brutCell = montant(ligne[cBrut]);
    if (brutCell !== null && m.brutDeclare === null) m.brutDeclare = brutCell;
    const loyerCell = montant(ligne[cLoyer]);
    if (loyerCell !== null && m.loyer === null) m.loyer = loyerCell;
    const bilansCell = montant(ligne[cBilans]);
    if (bilansCell !== null && m.bilans === null) m.bilans = bilansCell;
    const netCell = montant(ligne[cNet]);
    if (netCell !== null && m.netDeclare === null) m.netDeclare = netCell;

    const nom = (ligne[cNom] ?? "").trim();
    if (!nom) continue;
    const tarif = montant(ligne[cTarif]) ?? 0;
    const paye = /✅|oui|x/i.test(ligne[cVirement] ?? "");
    m.lignes.push({ nom, tarif, paye, collectif: /cours|asso|pilates/i.test(nom) });
    m.nbLignes++;
    m.attendu += tarif;
    if (paye) { m.encaisse += tarif; m.nbPayees++; }
  }

  // Les mois sans aucune ligne client (mois futurs avec seulement le loyer) sont ignorés.
  const liste = [...parMois.values()]
    .filter((m) => m.nbLignes > 0)
    .sort((a, b) => MOIS.indexOf(a.mois) - MOIS.indexOf(b.mois));
  for (let i = 0; i < liste.length; i++) {
    const m = liste[i];
    m.loyer = m.loyer ?? 0;
    m.bilans = m.bilans ?? 0;
    m.brut = m.brutDeclare ?? m.encaisse;
    m.net = m.netDeclare ?? (m.brut - m.loyer - m.bilans);
    m.individuels = m.lignes.filter((l) => !l.collectif).length;
    m.collectifs = m.lignes.filter((l) => l.collectif).length;
    const noms = new Set(m.lignes.map((l) => cle(l.nom)));
    const precedent = i > 0 ? new Set(liste[i - 1].lignes.map((l) => cle(l.nom))) : null;
    m.entrees = precedent ? m.lignes.filter((l) => !precedent.has(cle(l.nom))).map((l) => l.nom) : [];
    m.sorties = precedent ? liste[i - 1].lignes.filter((l) => !noms.has(cle(l.nom))).map((l) => l.nom) : [];
  }
  return liste;
}

/** Clé de comparaison d'un nom de client : tolère accents, casse, espaces. */
function cle(nom) {
  return normaliser(nom).replace(/[^a-z0-9]/g, "");
}

/** Résumé prêt pour l'agent Pilotage. */
export function resumer(liste, { objectif = OBJECTIF_PAR_DEFAUT } = {}) {
  if (!liste.length) throw new Error("Aucun mois trouvé.");
  const clos = liste.filter((m) => m.brutDeclare !== null || m.nbPayees === m.nbLignes);
  const courant = liste[liste.length - 1];
  const moisClos = clos.filter((m) => m !== courant);
  const moyenneBrut = moisClos.length
    ? Math.round(moisClos.reduce((s, m) => s + m.brut, 0) / moisClos.length)
    : null;
  return {
    objectif,
    moisCourant: {
      mois: courant.mois,
      encaisse: courant.encaisse,
      attendu: courant.attendu,
      restantAEncaisser: courant.attendu - courant.encaisse,
      nbLignes: courant.nbLignes,
      individuels: courant.individuels,
      collectifs: courant.collectifs,
      nbPayees: courant.nbPayees,
      loyer: courant.loyer,
      ecartObjectifSurAttendu: courant.attendu - objectif,
      entrees: courant.entrees.length,
      sorties: courant.sorties.length
    },
    moyenneBrutMoisClos: moyenneBrut,
    ecartMoyenObjectif: moyenneBrut === null ? null : moyenneBrut - objectif,
    mois: liste.map((m) => ({
      mois: m.mois, brut: m.brut, loyer: m.loyer, net: m.net, lignes: m.nbLignes,
      individuels: m.individuels, collectifs: m.collectifs, payees: m.nbPayees,
      attendu: m.attendu, entrees: m.entrees.length, sorties: m.sorties.length
    }))
  };
}

function euros(n) {
  return n === null || n === undefined ? "—" : Math.round(n).toLocaleString("fr-FR") + " €";
}

export function formaterTexte(liste, resume, { noms = false } = {}) {
  const lignes = [];
  lignes.push(`Objectif mensuel : ${euros(resume.objectif)}`);
  lignes.push("");
  lignes.push("Mois        Brut       Loyer   Net        Lignes  Payées  Entrées  Sorties");
  for (const m of resume.mois) {
    lignes.push(
      `${m.mois.padEnd(11)} ${euros(m.brut).padStart(9)} ${euros(m.loyer).padStart(7)} ${euros(m.net).padStart(9)}   ${String(m.lignes).padStart(4)}   ${String(m.payees).padStart(5)}   ${String(m.entrees).padStart(6)}  ${String(m.sorties).padStart(6)}`
    );
  }
  lignes.push("");
  const c = resume.moisCourant;
  lignes.push(`Mois en cours (${c.mois}) : ${euros(c.encaisse)} encaissés sur ${euros(c.attendu)} attendus, ${c.nbLignes} lignes (${c.individuels} individuelles, ${c.collectifs} collectives), ${c.nbPayees} virements reçus.`);
  lignes.push(`Écart entre l'attendu du mois et l'objectif : ${euros(c.ecartObjectifSurAttendu)}.`);
  if (resume.moyenneBrutMoisClos !== null) {
    lignes.push(`Moyenne brute des mois clos : ${euros(resume.moyenneBrutMoisClos)} (écart à l'objectif : ${euros(resume.ecartMoyenObjectif)}).`);
  }
  if (noms) {
    const dernier = liste[liste.length - 1];
    lignes.push(`Entrées du mois : ${dernier.entrees.join(", ") || "aucune"}.`);
    lignes.push(`Sorties du mois : ${dernier.sorties.join(", ") || "aucune"}.`);
  }
  return lignes.join("\n");
}

function main(argv) {
  const args = argv.slice(2);
  const fichier = args.find((a) => !a.startsWith("--"));
  if (!fichier) {
    console.error("Usage : node tools/kpi.mjs <export-suivi-ca.md> [--objectif N] [--json] [--noms]");
    process.exit(2);
  }
  const iObj = args.indexOf("--objectif");
  const objectif = iObj >= 0 ? Number(args[iObj + 1]) : OBJECTIF_PAR_DEFAUT;
  const brut = readFileSync(fichier, "utf8");
  const liste = calculerMois(brut);
  const resume = resumer(liste, { objectif });
  if (args.includes("--json")) {
    console.log(JSON.stringify(resume, null, 2));
  } else {
    console.log(formaterTexte(liste, resume, { noms: args.includes("--noms") }));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv);
