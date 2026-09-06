import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parserTables, nettoyerCellule, montant, trouverEntete, colonne } from "../tools/lib/sheet-md.mjs";

const fixture = readFileSync(new URL("./fixtures/suivi-ca.md", import.meta.url), "utf8");

test("nettoyerCellule retire le marqueur de fusion et les échappements", () => {
  assert.equal(nettoyerCellule("\\[merged\\] Juillet"), "Juillet");
  assert.equal(nettoyerCellule("\\-400 €"), "-400 €");
  assert.equal(nettoyerCellule("Programme\\_Test"), "Programme_Test");
});

test("montant lit les formats du Sheet", () => {
  assert.equal(montant("2 550 €"), 2550);
  assert.equal(montant("\"1,100 €\""), 1100);
  assert.equal(montant("400€"), 400);
  assert.equal(montant(""), null);
  assert.equal(montant("-400 €"), -400);
});

test("parserTables extrait une table depuis le JSON du connecteur", () => {
  const tables = parserTables(fixture);
  assert.equal(tables.length, 1);
  const entete = trouverEntete(tables[0], ["Mois", "Nom du client"]);
  assert.ok(entete);
  assert.equal(colonne(entete, "Tarifs mensuels"), 2);
  assert.equal(tables[0][entete.index + 1][0], "Juillet");
});
