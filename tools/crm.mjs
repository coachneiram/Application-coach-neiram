#!/usr/bin/env node
/**
 * Client du CRM (Google Sheet « CRM CoachNeiram » via le script Apps Script crm.gs).
 *
 * Variables d'environnement : CRM_URL (URL du script web déployé), CRM_SECRET.
 * Sans elles, la commande affiche la charge utile et la ligne à saisir à la main
 * (mode « --dry-run » implicite). Aucun secret n'est jamais écrit dans le dépôt.
 *
 * Commandes :
 *   lead        --prenom X --source Y --canal Z [--telephone --email --probleme --objectif --offre --interet 1-5 --assigne Marien|Clara --prochaine "…" --relance JJ/MM/AAAA --notes]
 *   interaction --lead ID --canal DM|WhatsApp|Appel|Email|SMS|Salle --resume "…" [--prochaine "…" --relance JJ/MM/AAAA --statut S --par Marien|Clara --date JJ/MM/AAAA]
 *   lead-statut --lead ID --statut S [--resultat "…"]
 *   relances    [--date JJ/MM/AAAA]
 *   clients
 *   leads       [--statut S] [--assigne X]
 */

export const STATUTS = [
  "Nouveau", "Contacté", "Qualifié", "Conversation", "Appel", "Proposition",
  "Relance", "Client", "Fidélisation", "Renouvellement", "Recommandation", "Perdu"
];
export const CANAUX = ["DM Instagram", "WhatsApp", "Appel", "Email", "SMS", "Salle", "Calendly", "Formulaire", "Autre"];
export const ASSIGNES = ["Marien", "Clara"];

export function lireArgs(args) {
  const opts = {};
  const positionnels = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--")) {
      const cle = a.slice(2);
      const suivant = args[i + 1];
      if (suivant === undefined || suivant.startsWith("--")) opts[cle] = true;
      else { opts[cle] = suivant; i++; }
    } else positionnels.push(a);
  }
  return { commande: positionnels[0], opts };
}

function exiger(opts, ...cles) {
  const manquants = cles.filter((c) => !opts[c]);
  if (manquants.length) throw new Error(`Paramètres manquants : ${manquants.map((m) => "--" + m).join(", ")}`);
}

function verifierStatut(s) {
  if (s && !STATUTS.includes(s)) throw new Error(`Statut inconnu « ${s} ». Attendu : ${STATUTS.join(", ")}`);
}

function verifierAssigne(a) {
  if (a && !ASSIGNES.includes(a)) throw new Error(`Assigné inconnu « ${a} ». Attendu : ${ASSIGNES.join(" ou ")}`);
}

/** Construit la charge utile envoyée au script, sans le secret. */
export function construireCharge(commande, opts) {
  switch (commande) {
    case "lead": {
      exiger(opts, "prenom", "source");
      verifierAssigne(opts.assigne);
      verifierStatut(opts.statut);
      const interet = opts.interet ? Number(opts.interet) : "";
      if (interet !== "" && !(interet >= 1 && interet <= 5)) throw new Error("--interet doit être entre 1 et 5");
      return {
        action: "addLead",
        lead: {
          prenom: opts.prenom, nom: opts.nom ?? "", source: opts.source, canal: opts.canal ?? "",
          telephone: opts.telephone ?? "", email: opts.email ?? "", probleme: opts.probleme ?? "",
          objectif: opts.objectif ?? "", offre: opts.offre ?? "", interet,
          statut: opts.statut ?? "Nouveau", assigne: opts.assigne ?? "Marien",
          prochaine: opts.prochaine ?? "", relance: opts.relance ?? "", notes: opts.notes ?? ""
        }
      };
    }
    case "interaction": {
      exiger(opts, "lead", "canal", "resume");
      verifierStatut(opts.statut);
      return {
        action: "addInteraction",
        interaction: {
          leadId: opts.lead, date: opts.date ?? "", canal: opts.canal, resume: opts.resume,
          prochaine: opts.prochaine ?? "", relance: opts.relance ?? "", statut: opts.statut ?? "",
          par: opts.par ?? "Marien"
        }
      };
    }
    case "lead-statut": {
      exiger(opts, "lead", "statut");
      verifierStatut(opts.statut);
      return { action: "updateLead", leadId: opts.lead, champs: { statut: opts.statut, resultat: opts.resultat ?? "" } };
    }
    case "relances":
      return { action: "listRelances", date: opts.date ?? "" };
    case "clients":
      return { action: "listClients" };
    case "leads":
      verifierStatut(opts.statut);
      return { action: "listLeads", statut: opts.statut ?? "", assigne: opts.assigne ?? "" };
    default:
      throw new Error(`Commande inconnue « ${commande ?? ""} ». Voir l'en-tête du fichier.`);
  }
}

/** Ligne à copier dans l'onglet Leads si le script n'est pas configuré. */
export function ligneManuelle(charge) {
  if (charge.action === "addLead") {
    const l = charge.lead;
    return ["(ID auto)", new Date().toLocaleDateString("fr-FR"), l.prenom, l.nom, l.source, l.canal, l.telephone, l.email,
      l.probleme, l.objectif, l.offre, l.interet, l.statut, "", l.prochaine, l.relance, "", l.assigne, l.notes].join("\t");
  }
  if (charge.action === "addInteraction") {
    const i = charge.interaction;
    return [i.date || new Date().toLocaleDateString("fr-FR"), i.leadId, i.canal, i.resume, i.prochaine, i.relance, i.par].join("\t");
  }
  return "";
}

export async function envoyer(charge, { url = process.env.CRM_URL, secret = process.env.CRM_SECRET, fetchFn = globalThis.fetch } = {}) {
  if (!url || !secret) return { envoye: false, raison: "CRM_URL ou CRM_SECRET absent" };
  const reponse = await fetchFn(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...charge, secret })
  });
  const texte = await reponse.text();
  let donnees;
  try { donnees = JSON.parse(texte); } catch { donnees = { ok: false, erreur: texte.slice(0, 300) }; }
  if (!reponse.ok || donnees.ok === false) return { envoye: false, raison: donnees.erreur || `HTTP ${reponse.status}`, donnees };
  return { envoye: true, donnees };
}

async function main(argv) {
  const { commande, opts } = lireArgs(argv.slice(2));
  const charge = construireCharge(commande, opts);
  if (opts["dry-run"] || !process.env.CRM_URL || !process.env.CRM_SECRET) {
    console.log("Charge utile (non envoyée) :");
    console.log(JSON.stringify(charge, null, 2));
    const ligne = ligneManuelle(charge);
    if (ligne) { console.log("\nLigne à coller dans le Sheet (colonnes séparées par des tabulations) :"); console.log(ligne); }
    if (!opts["dry-run"]) console.log("\nConfigure CRM_URL et CRM_SECRET pour envoyer automatiquement.");
    return;
  }
  const r = await envoyer(charge);
  if (!r.envoye) { console.error("Échec :", r.raison); process.exit(1); }
  console.log(JSON.stringify(r.donnees, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv).catch((e) => { console.error(e.message); process.exit(1); });
