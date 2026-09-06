import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { calculerMois, resumer, formaterTexte } from "../tools/kpi.mjs";

const fixture = readFileSync(new URL("./fixtures/suivi-ca.md", import.meta.url), "utf8");

test("calculerMois agrège par mois avec brut déclaré, loyer, entrées et sorties", () => {
  const liste = calculerMois(fixture);
  assert.deepEqual(liste.map((m) => m.mois), ["juillet", "aout", "septembre"]);
  const juillet = liste[0];
  assert.equal(juillet.nbLignes, 4);
  assert.equal(juillet.attendu, 1080);
  assert.equal(juillet.brut, 1080);
  assert.equal(juillet.loyer, 400);
  assert.equal(juillet.net, 680);
  assert.equal(juillet.collectifs, 1);
  const aout = liste[1];
  assert.equal(aout.encaisse, 650);
  assert.equal(aout.attendu, 850);
  assert.deepEqual(aout.entrees, ["Client D"]);
  assert.deepEqual(aout.sorties.sort(), ["Client C", "Cours de pilates"]);
});

test("resumer produit le mois en cours et l'écart à l'objectif", () => {
  const liste = calculerMois(fixture);
  const r = resumer(liste, { objectif: 1000 });
  assert.equal(r.moisCourant.mois, "septembre");
  assert.equal(r.moisCourant.encaisse, 400);
  assert.equal(r.moisCourant.attendu, 850);
  assert.equal(r.moisCourant.ecartObjectifSurAttendu, -150);
  assert.equal(r.moyenneBrutMoisClos, 840);
  const texte = formaterTexte(liste, r);
  assert.match(texte, /Mois en cours \(septembre\)/);
  assert.doesNotMatch(texte, /Client A/, "les noms ne sortent pas sans --noms");
  assert.match(formaterTexte(liste, r, { noms: true }), /Cours Co Asso/);
});
