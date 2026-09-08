#!/usr/bin/env node
/**
 * Écriture d'un bloc de programme dans un classeur « Programme_<client> »
 * (nouveau modèle : onglets BLOC 1 / BLOC 2). Utilise le même script Apps
 * Script déployé que le CRM (CRM_URL / CRM_SECRET) : aucune configuration
 * supplémentaire, tant que le script a été redéployé avec les actions
 * readProgrammeJour / writeProgrammeJour / clearProgrammeJour.
 *
 * Sans CRM_URL/CRM_SECRET, la commande affiche la charge utile (mode
 * --dry-run implicite). Aucun secret n'est jamais écrit dans le dépôt.
 *
 * Commandes :
 *   jour         --sheet <id> --bloc 1|2 --jour 1-6 --exercices <json>
 *   jour-lecture --sheet <id> --bloc 1|2 --jour 1-6
 *   jour-effacer --sheet <id> --bloc 1|2 --jour 1-6
 *
 * --exercices attend un tableau JSON d'objets :
 *   [{ "nom": "Dips machine", "series": 3, "repetitions": "8 à 10",
 *      "intensite": 8, "recuperation": "1 min 30", "consignes": "...",
 *      "s1": 10, "s2": 10, "s3": 12, "s4": 12 }]
 */

import { lireArgs, envoyer } from "./crm.mjs";

export function construireChargeProgramme(commande, opts) {
  const base = { spreadsheetId: opts.sheet, bloc: opts.bloc ? Number(opts.bloc) : undefined, jour: opts.jour ? Number(opts.jour) : undefined };
  if (!base.spreadsheetId) throw new Error("--sheet obligatoire (ID du classeur Programme_<client>)");
  if (!(base.bloc === 1 || base.bloc === 2)) throw new Error("--bloc doit être 1 ou 2");
  if (!(base.jour >= 1 && base.jour <= 6)) throw new Error("--jour doit être compris entre 1 et 6");

  switch (commande) {
    case "jour": {
      if (!opts.exercices) throw new Error("--exercices obligatoire (JSON)");
      let exercices;
      try { exercices = JSON.parse(opts.exercices); } catch { throw new Error("--exercices : JSON invalide"); }
      if (!Array.isArray(exercices) || !exercices.length) throw new Error("--exercices doit être un tableau non vide");
      exercices.forEach((ex, i) => { if (!ex || !ex.nom) throw new Error(`exercice ${i + 1} : "nom" obligatoire`); });
      return { action: "writeProgrammeJour", ...base, exercices };
    }
    case "jour-lecture":
      return { action: "readProgrammeJour", ...base };
    case "jour-effacer":
      return { action: "clearProgrammeJour", ...base };
    default:
      throw new Error(`Commande inconnue « ${commande ?? ""} ». Voir l'en-tête du fichier.`);
  }
}

async function main(argv) {
  const { commande, opts } = lireArgs(argv.slice(2));
  const charge = construireChargeProgramme(commande, opts);
  if (opts["dry-run"] || !process.env.CRM_URL || !process.env.CRM_SECRET) {
    console.log("Charge utile (non envoyée) :");
    console.log(JSON.stringify(charge, null, 2));
    if (!opts["dry-run"]) console.log("\nConfigure CRM_URL et CRM_SECRET pour envoyer automatiquement.");
    return;
  }
  const r = await envoyer(charge);
  if (!r.envoye) { console.error("Échec :", r.raison); process.exit(1); }
  console.log(JSON.stringify(r.donnees, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv).catch((e) => { console.error(e.message); process.exit(1); });
