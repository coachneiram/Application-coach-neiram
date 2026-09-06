#!/usr/bin/env node
/**
 * Renouvellements à préparer, à partir de l'onglet Clients du CRM (export CSV).
 *
 * Usage : node tools/renouvellements.mjs data/cache/clients.csv [--jours 30] [--aujourdhui 2026-09-08] [--json]
 *
 * Colonnes attendues (en-têtes du CRM) : ID, Prénom, Canal, Offre, Tarif mensuel,
 * Date début, Durée (mois), Date fin, Statut. « Date fin » prime ; sinon
 * début + durée. Seuls les clients « Actif » sont listés.
 */
import { readFileSync } from "node:fs";
import { csvVersObjets } from "./lib/csv.mjs";
import { lireDate, ajouterMois, formaterDate, joursEntre } from "./lib/dates.mjs";

function champ(obj, ...noms) {
  const cles = Object.keys(obj);
  for (const n of noms) {
    const k = cles.find((c) => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().startsWith(n));
    if (k) return obj[k];
  }
  return "";
}

export function renouvellements(csv, { jours = 30, aujourdhui = new Date() } = {}) {
  const ref = new Date(Date.UTC(aujourdhui.getUTCFullYear(), aujourdhui.getUTCMonth(), aujourdhui.getUTCDate()));
  const resultats = [];
  for (const c of csvVersObjets(csv)) {
    const statut = champ(c, "statut").toLowerCase();
    if (statut && !statut.startsWith("actif")) continue;
    let fin = lireDate(champ(c, "date fin"));
    const debut = lireDate(champ(c, "date debut"));
    const duree = Number(champ(c, "duree")) || 0;
    if (!fin && debut && duree) fin = ajouterMois(debut, duree);
    if (!fin) continue;
    const dans = joursEntre(ref, fin);
    if (dans <= jours) {
      resultats.push({
        id: champ(c, "id"),
        prenom: champ(c, "prenom"),
        canal: champ(c, "canal"),
        offre: champ(c, "offre"),
        tarif: Number(String(champ(c, "tarif")).replace(/[^\d.,]/g, "").replace(",", ".")) || null,
        fin: formaterDate(fin),
        dansJours: dans,
        enRetard: dans < 0
      });
    }
  }
  return resultats.sort((a, b) => a.dansJours - b.dansJours);
}

function main(argv) {
  const args = argv.slice(2);
  const fichier = args.find((a) => !a.startsWith("--"));
  if (!fichier) {
    console.error("Usage : node tools/renouvellements.mjs <clients.csv> [--jours 30] [--aujourdhui AAAA-MM-JJ] [--json]");
    process.exit(2);
  }
  const iJ = args.indexOf("--jours");
  const jours = iJ >= 0 ? Number(args[iJ + 1]) : 30;
  const iA = args.indexOf("--aujourdhui");
  const aujourdhui = iA >= 0 ? lireDate(args[iA + 1]) : new Date();
  const liste = renouvellements(readFileSync(fichier, "utf8"), { jours, aujourdhui });
  if (args.includes("--json")) { console.log(JSON.stringify(liste, null, 2)); return; }
  if (!liste.length) { console.log(`Aucun renouvellement dans les ${jours} jours.`); return; }
  console.log(`Renouvellements dans les ${jours} jours :`);
  for (const r of liste) {
    const quand = r.enRetard ? `dépassé de ${-r.dansJours} j` : `dans ${r.dansJours} j`;
    console.log(`- ${r.id || "?"} ${r.prenom} — ${r.offre || "offre ?"} ${r.tarif ? r.tarif + " €/mois" : ""} — fin ${r.fin} (${quand})`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv);
