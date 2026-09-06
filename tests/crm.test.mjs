import { test } from "node:test";
import assert from "node:assert/strict";
import { lireArgs, construireCharge, ligneManuelle, envoyer, STATUTS } from "../tools/crm.mjs";

test("lead : charge utile complète avec valeurs par défaut", () => {
  const { commande, opts } = lireArgs(["lead", "--prenom", "Test", "--source", "Instagram", "--interet", "4"]);
  const charge = construireCharge(commande, opts);
  assert.equal(charge.action, "addLead");
  assert.equal(charge.lead.statut, "Nouveau");
  assert.equal(charge.lead.assigne, "Marien");
  assert.equal(charge.lead.interet, 4);
  assert.match(ligneManuelle(charge), /Test\t\tInstagram/);
});

test("valide statut, assigné et intérêt", () => {
  assert.throws(() => construireCharge("lead-statut", { lead: "L-1", statut: "Chaud" }), /Statut inconnu/);
  assert.throws(() => construireCharge("lead", { prenom: "A", source: "B", assigne: "Bob" }), /Assigné inconnu/);
  assert.throws(() => construireCharge("lead", { prenom: "A", source: "B", interet: "9" }), /entre 1 et 5/);
  assert.throws(() => construireCharge("lead", { prenom: "A" }), /--source/);
  assert.equal(STATUTS.length, 12);
});

test("envoyer sans configuration n'appelle pas le réseau", async () => {
  let appels = 0;
  const r = await envoyer({ action: "listRelances" }, { url: "", secret: "", fetchFn: async () => { appels++; } });
  assert.equal(r.envoye, false);
  assert.equal(appels, 0);
});

test("envoyer transmet le secret et lit la réponse du script", async () => {
  let corps;
  const fetchFn = async (_url, init) => { corps = JSON.parse(init.body); return { ok: true, status: 200, text: async () => JSON.stringify({ ok: true, id: "L-1" }) }; };
  const r = await envoyer({ action: "listRelances" }, { url: "https://x", secret: "s", fetchFn });
  assert.equal(corps.secret, "s");
  assert.equal(r.envoye, true);
  assert.equal(r.donnees.id, "L-1");
  const refus = await envoyer({ action: "listRelances" }, { url: "https://x", secret: "s", fetchFn: async () => ({ ok: true, status: 200, text: async () => JSON.stringify({ ok: false, erreur: "secret invalide" }) }) });
  assert.equal(refus.envoye, false);
  assert.match(refus.raison, /secret/);
});
