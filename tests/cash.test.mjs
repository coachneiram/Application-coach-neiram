import { test } from "node:test";
import assert from "node:assert/strict";
import { opportunitesCash, formaterCash } from "../tools/lib/cash.mjs";

const LE_8_SEPT = new Date(Date.UTC(2026, 8, 8));

test("renouvellement : détecté par « Date fin », potentiel calculé sur le tarif réel", () => {
  const r = opportunitesCash({
    clients: [{ ID: "C-001", "Prénom": "Sabine", Nom: "P", "Tarif mensuel": "250", "Durée (mois)": "6", "Date fin": "20/09/2026", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT });
  const o = r.opportunites[0];
  assert.equal(o.type, "renouvellement");
  assert.equal(o.id, "C-001");
  assert.equal(o.potentiel, 1500);
  assert.equal(o.priorite, "haute");
  assert.match(o.raison, /12 jours/);
});

test("renouvellement : calculé par « Date début » + « Durée » quand la date de fin manque", () => {
  const r = opportunitesCash({
    clients: [{ ID: "C-002", "Prénom": "Dimitri", "Tarif mensuel": "180", "Date début": "15/03/2026", "Durée (mois)": "6", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT });
  assert.equal(r.opportunites[0].type, "renouvellement");
  assert.equal(r.opportunites[0].potentiel, 1080);
});

test("client actif ancien sans échéance proche : piste de parrainage", () => {
  const r = opportunitesCash({
    clients: [{ ID: "C-003", "Prénom": "Eva", "Tarif mensuel": "250", "Date début": "01/01/2026", "Durée (mois)": "12", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT });
  assert.equal(r.opportunites[0].type, "parrainage");
});

test("client sans aucune date : aucune opportunité, mais une alerte", () => {
  const r = opportunitesCash({
    clients: [{ ID: "C-004", "Prénom": "Sabine", "Tarif mensuel": "400", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT });
  assert.equal(r.opportunites.length, 0);
  assert.equal(r.alertes[0].type, "dates-engagement-manquantes");
  assert.match(r.alertes[0].message, /1 client/);
});

test("leads : relance due prioritaire, statut clos ignoré, dormant décoté", () => {
  const r = opportunitesCash({
    leads: [
      { id: "L-1", prenom: "Carole", statut: "Proposition", relance: "07/09/2026", derniere: "06/09/2026", prochaine: "Relancer avec l'échelon mensuel" },
      { id: "L-2", prenom: "Ancien", statut: "Perdu", relance: "01/09/2026" },
      { id: "L-3", prenom: "Dormant", statut: "Contacté", relance: "", derniere: "01/08/2026" }
    ]
  }, { aujourdhui: LE_8_SEPT });

  assert.equal(r.opportunites.length, 2, "le lead Perdu est exclu");
  assert.equal(r.opportunites[0].id, "L-1");
  assert.equal(r.opportunites[0].type, "relance-due");
  assert.equal(r.opportunites[0].prochaineEtape, "Relancer avec l'échelon mensuel");
  const dormant = r.opportunites.find((o) => o.id === "L-3");
  assert.equal(dormant.type, "dormant");
  assert.ok(dormant.score < r.opportunites[0].score, "un dormant passe après une relance due");
});

test("top3 : trié par score et plafonné à trois", () => {
  const clients = ["A", "B", "C", "D"].map((p, i) => ({
    ID: `C-${i}`, "Prénom": p, "Tarif mensuel": String(100 * (i + 1)), "Durée (mois)": "6", "Date fin": "20/09/2026", Statut: "Actif"
  }));
  const r = opportunitesCash({ clients }, { aujourdhui: LE_8_SEPT });
  assert.equal(r.top3.length, 3);
  assert.deepEqual(r.top3.map((o) => o.cible), ["D", "C", "B"]);
  assert.ok(r.potentielTotal > 0);
});

test("horizon configurable : au-delà, pas de renouvellement détecté", () => {
  const client = { ID: "C-9", "Prénom": "Loin", "Tarif mensuel": "250", "Durée (mois)": "6", "Date fin": "30/11/2026", Statut: "Actif" };
  assert.equal(opportunitesCash({ clients: [client] }, { aujourdhui: LE_8_SEPT }).opportunites.length, 0);
  const large = opportunitesCash({ clients: [client] }, { aujourdhui: LE_8_SEPT, horizonJours: 120 });
  assert.equal(large.opportunites[0].type, "renouvellement");
});

test("formaterCash : lisible, et explicite quand il n'y a rien", () => {
  const vide = formaterCash(opportunitesCash({}, { aujourdhui: LE_8_SEPT }));
  assert.match(vide, /Aucune opportunité détectée/);
  const plein = formaterCash(opportunitesCash({
    clients: [{ ID: "C-001", "Prénom": "Sabine", "Tarif mensuel": "250", "Durée (mois)": "6", "Date fin": "20/09/2026", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT }));
  assert.match(plein, /TOP 3 ACTIONS CASH — 08\/09\/2026/);
  assert.match(plein, /\[HAUTE\] renouvellement — Sabine \(C-001\)/);
  assert.match(plein, /ordres de grandeur/);
});

test("alerte données dégradées : tarif ou offre manquants faussent le potentiel", () => {
  const r = opportunitesCash({
    clients: [
      { ID: "C-1", "Prénom": "Sans tarif", "Date fin": "20/09/2026", Offre: "Suivi hebdo", Statut: "Actif" },
      { ID: "C-2", "Prénom": "Complet", "Tarif mensuel": "250", "Durée (mois)": "6", Offre: "Suivi hebdo", "Date fin": "20/09/2026", Statut: "Actif" }
    ]
  }, { aujourdhui: LE_8_SEPT });
  const alerte = r.alertes.find((a) => a.type === "donnees-degradees");
  assert.ok(alerte, "l'alerte existe");
  assert.match(alerte.message, /1 sans tarif mensuel/);
  assert.deepEqual(alerte.cibles, ["Sans tarif"]);
  assert.ok(!r.alertes.some((a) => a.type === "donnees-degradees" && a.cibles.includes("Complet")));
});

test("aucune alerte de données dégradées quand tout est renseigné", () => {
  const r = opportunitesCash({
    clients: [{ ID: "C-1", "Prénom": "Complet", "Tarif mensuel": "250", "Durée (mois)": "6", Offre: "Suivi hebdo", "Date fin": "20/09/2026", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT });
  assert.equal(r.alertes.filter((a) => a.type === "donnees-degradees").length, 0);
});

test("reconduction tacite : « Date fin » en texte, aucune échéance à relancer", () => {
  const r = opportunitesCash({
    clients: [{ ID: "C-1", "Prénom": "Tacite", "Tarif mensuel": "110", "Date début": "01/05/2026", "Durée (mois)": "1", "Date fin": "Reconduction mensuelle", Offre: "Suivi mensuel", Canal: "Présentiel", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT });
  assert.equal(r.opportunites.filter((o) => o.type === "renouvellement").length, 0, "pas de faux renouvellement échu");
  assert.equal(r.opportunites[0].type, "parrainage", "un client ancien reste une piste de parrainage");
});

test("cours collectif : ni échéance ni alerte de données manquantes", () => {
  const r = opportunitesCash({
    clients: [{ ID: "C-17", "Prénom": "Cours Co", Canal: "Collectif", "Tarif mensuel": "320", Statut: "Actif" }]
  }, { aujourdhui: LE_8_SEPT });
  assert.equal(r.opportunites.length, 0);
  assert.equal(r.alertes.length, 0, "un cours collectif n'a pas d'engagement individuel");
});
