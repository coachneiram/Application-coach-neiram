/**
 * Cash Engine — détection d'opportunités commerciales dans les données du CRM.
 *
 * Logique pure, sans réseau : `opportunitesCash({ leads, clients })` prend les
 * réponses de `listLeads` et `listClients` et renvoie les opportunités classées,
 * le top 3, et les alertes de données manquantes.
 *
 * Les montants des prospects sont des ORDRES DE GRANDEUR : l'onglet Leads ne
 * porte pas le montant de l'offre visée, donc on applique une valeur client
 * moyenne. Les montants des clients sont réels (tarif mensuel du CRM).
 *
 * Score = potentiel × probabilité ÷ effort. Les probabilités ci-dessous sont des
 * hypothèses de départ, à corriger quand le CRM aura assez d'historique pour
 * mesurer les vrais taux de conversion par statut.
 */

import { lireDate, ajouterMois, formaterDate, joursEntre } from "./dates.mjs";

/** Statuts qui sortent un lead du pipeline commercial (déjà client, ou perdu). */
export const STATUTS_CLOS = ["Client", "Fidélisation", "Renouvellement", "Recommandation", "Perdu"];

/** Probabilité de signature par statut de lead (hypothèses, à recalibrer sur données réelles). */
export const PROBABILITE_STATUT = {
  Proposition: 0.3,
  Appel: 0.2,
  Qualifié: 0.15,
  Relance: 0.1,
  Conversation: 0.1,
  Contacté: 0.08,
  Nouveau: 0.05
};

export const PROBABILITE_RENOUVELLEMENT = 0.6;
export const PROBABILITE_PARRAINAGE = 0.1;
/** Un lead sans relance programmée et sans contact récent vaut une fraction de sa probabilité initiale. */
export const DECOTE_DORMANT = 0.4;

/** Valeur d'un client sur un engagement, à défaut de montant renseigné : 250 €/mois × 6 mois. */
export const VALEUR_CLIENT_DEFAUT = 1500;
export const DUREE_ENGAGEMENT_DEFAUT = 6;
/** Au-delà de ce délai sans interaction ni relance programmée, un lead est dormant. */
export const JOURS_AVANT_DORMANT = 14;
/** Ancienneté à partir de laquelle un client actif devient une piste de parrainage. */
export const JOURS_AVANT_PARRAINAGE = 90;

const EFFORTS = { faible: 1, moyen: 2, eleve: 3 };

function nombre(v) {
  const n = Number(String(v ?? "").replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function priorite(score) {
  if (score >= 300) return "haute";
  if (score >= 100) return "moyenne";
  return "faible";
}

function opportunite({ type, cible, id, raison, potentiel, probabilite, effort, prochaineEtape }) {
  const score = Math.round((potentiel * probabilite) / EFFORTS[effort]);
  return { type, cible, id, raison, potentiel: Math.round(potentiel), probabilite, effort, score, priorite: priorite(score), prochaineEtape };
}

/** Fin d'engagement d'un client : « Date fin » si présente, sinon « Date début » + « Durée (mois) ». */
function finEngagement(client) {
  const fin = lireDate(client["Date fin"]);
  if (fin) return fin;
  const debut = lireDate(client["Date début"]);
  const duree = nombre(client["Durée (mois)"]);
  if (debut && duree) return ajouterMois(debut, duree);
  return null;
}

function opportunitesLeads(leads, aujourdhui) {
  const out = [];
  for (const l of leads) {
    const statut = l.statut || "Nouveau";
    if (STATUTS_CLOS.includes(statut)) continue;

    const base = PROBABILITE_STATUT[statut] ?? 0.05;
    const relance = lireDate(l.relance);
    const derniere = lireDate(l.derniere);
    const joursDepuisContact = derniere ? joursEntre(derniere, aujourdhui) : null;
    const potentiel = VALEUR_CLIENT_DEFAUT;

    if (relance && joursEntre(relance, aujourdhui) >= 0) {
      out.push(opportunite({
        type: "relance-due", cible: l.prenom || l.id, id: l.id,
        raison: `relance prévue le ${formaterDate(relance)}, statut ${statut}`,
        potentiel, probabilite: base, effort: "faible",
        prochaineEtape: l.prochaine || "relancer, puis noter l'échange (crm.mjs interaction)"
      }));
      continue;
    }

    if (["Proposition", "Appel", "Qualifié"].includes(statut)) {
      out.push(opportunite({
        type: "prospect-chaud", cible: l.prenom || l.id, id: l.id,
        raison: `statut ${statut}, décision en cours`,
        potentiel, probabilite: base, effort: "moyen",
        prochaineEtape: l.prochaine || "reprendre contact et proposer l'étape suivante"
      }));
      continue;
    }

    if (!relance && (joursDepuisContact === null || joursDepuisContact > JOURS_AVANT_DORMANT)) {
      out.push(opportunite({
        type: "dormant", cible: l.prenom || l.id, id: l.id,
        raison: derniere ? `aucun contact depuis ${joursDepuisContact} jours, aucune relance programmée`
          : "aucune interaction enregistrée, aucune relance programmée",
        potentiel, probabilite: base * DECOTE_DORMANT, effort: "faible",
        prochaineEtape: "une dernière relance, ou passer en Perdu pour nettoyer le pipeline"
      }));
    }
  }
  return out;
}

function opportunitesClients(clients, aujourdhui, horizonJours) {
  const out = [];
  const sansDates = [];

  for (const c of clients) {
    if ((c.Statut || "").trim() !== "Actif") continue;
    const prenom = [c["Prénom"], c["Nom"]].filter(Boolean).join(" ").trim() || c.ID;
    const tarif = nombre(c["Tarif mensuel"]);
    const duree = nombre(c["Durée (mois)"]) || DUREE_ENGAGEMENT_DEFAUT;
    const fin = finEngagement(c);
    const debut = lireDate(c["Date début"]);

    if (!fin && !debut) { sansDates.push({ id: c.ID, cible: prenom }); continue; }

    if (fin) {
      const restant = joursEntre(aujourdhui, fin);
      if (restant <= horizonJours) {
        out.push(opportunite({
          type: "renouvellement", cible: prenom, id: c.ID,
          raison: restant >= 0 ? `engagement terminé dans ${restant} jours (${formaterDate(fin)})`
            : `engagement échu depuis ${-restant} jours (${formaterDate(fin)})`,
          potentiel: (tarif || VALEUR_CLIENT_DEFAUT / DUREE_ENGAGEMENT_DEFAUT) * duree,
          probabilite: PROBABILITE_RENOUVELLEMENT, effort: "faible",
          prochaineEtape: "message de renouvellement validé (docs/ventes/messages-niveau-b.md)"
        }));
        continue;
      }
    }

    if (debut && joursEntre(debut, aujourdhui) >= JOURS_AVANT_PARRAINAGE) {
      out.push(opportunite({
        type: "parrainage", cible: prenom, id: c.ID,
        raison: `client depuis ${Math.floor(joursEntre(debut, aujourdhui) / 30)} mois, aucune échéance proche`,
        potentiel: VALEUR_CLIENT_DEFAUT, probabilite: PROBABILITE_PARRAINAGE, effort: "faible",
        prochaineEtape: "proposition de parrainage (docs/ventes/parrainage-clients.md)"
      }));
    }
  }
  return { opportunites: out, sansDates };
}

/**
 * @param {{leads?: object[], clients?: object[]}} donnees réponses de listLeads / listClients
 * @param {{aujourdhui?: Date, horizonJours?: number}} options
 */
export function opportunitesCash({ leads = [], clients = [] } = {}, { aujourdhui = new Date(), horizonJours = 45 } = {}) {
  const ref = new Date(Date.UTC(aujourdhui.getUTCFullYear(), aujourdhui.getUTCMonth(), aujourdhui.getUTCDate()));
  const desClients = opportunitesClients(clients, ref, horizonJours);
  const opportunites = [...opportunitesLeads(leads, ref), ...desClients.opportunites].sort((a, b) => b.score - a.score);

  const alertes = [];
  if (desClients.sansDates.length) {
    alertes.push({
      type: "dates-engagement-manquantes",
      message: `${desClients.sansDates.length} client(s) actif(s) sans date de début ni date de fin : aucun renouvellement ne peut être anticipé pour eux.`,
      cibles: desClients.sansDates.map((c) => c.cible)
    });
  }
  const sansSuite = leads.filter((l) => !STATUTS_CLOS.includes(l.statut || "Nouveau") && !lireDate(l.relance));
  if (sansSuite.length) {
    alertes.push({
      type: "leads-sans-relance",
      message: `${sansSuite.length} lead(s) ouvert(s) sans date de relance programmée.`,
      cibles: sansSuite.map((l) => l.prenom || l.id)
    });
  }

  return {
    date: formaterDate(ref),
    opportunites,
    top3: opportunites.slice(0, 3),
    alertes,
    potentielTotal: opportunites.reduce((s, o) => s + o.potentiel * o.probabilite, 0)
  };
}

/** Rendu texte du résultat, pour la sortie console et le rapport du lundi. */
export function formaterCash(resultat) {
  const lignes = [`TOP 3 ACTIONS CASH — ${resultat.date}`, ""];
  if (!resultat.top3.length) {
    lignes.push("Aucune opportunité détectée dans les données actuelles du CRM.");
  }
  resultat.top3.forEach((o, i) => {
    lignes.push(`${i + 1}. [${o.priorite.toUpperCase()}] ${o.type} — ${o.cible} (${o.id})`);
    lignes.push(`   Raison : ${o.raison}`);
    lignes.push(`   Potentiel : ~${o.potentiel} € · Probabilité : ${Math.round(o.probabilite * 100)} % · Effort : ${o.effort}`);
    lignes.push(`   Prochaine étape : ${o.prochaineEtape}`);
    lignes.push("");
  });
  const reste = resultat.opportunites.length - resultat.top3.length;
  if (reste > 0) lignes.push(`(${reste} autre(s) opportunité(s) de rang inférieur — voir --json)`, "");
  if (resultat.alertes.length) {
    lignes.push("ALERTES");
    for (const a of resultat.alertes) lignes.push(`- ${a.message}`);
    lignes.push("");
  }
  lignes.push(`Espérance totale du pipeline détecté : ~${Math.round(resultat.potentielTotal)} €`);
  lignes.push("Les montants des prospects sont des ordres de grandeur (valeur client moyenne), pas des devis.");
  return lignes.join("\n");
}
