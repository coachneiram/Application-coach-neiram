import { test } from "node:test";
import assert from "node:assert/strict";
import { lireArgs } from "../tools/crm.mjs";
import { construireChargeProgramme } from "../tools/programme.mjs";

test("jour : charge utile complète, exercices validés", () => {
  const { commande, opts } = lireArgs([
    "jour", "--sheet", "abc123", "--bloc", "1", "--jour", "3",
    "--exercices", JSON.stringify([{ nom: "Dips machine", series: 3, repetitions: "8 à 10", s1: 10 }])
  ]);
  const charge = construireChargeProgramme(commande, opts);
  assert.equal(charge.action, "writeProgrammeJour");
  assert.equal(charge.spreadsheetId, "abc123");
  assert.equal(charge.bloc, 1);
  assert.equal(charge.jour, 3);
  assert.equal(charge.exercices.length, 1);
  assert.equal(charge.exercices[0].nom, "Dips machine");
});

test("jour-lecture et jour-effacer : pas besoin d'exercices", () => {
  const lecture = construireChargeProgramme("jour-lecture", { sheet: "abc", bloc: "2", jour: "1" });
  assert.equal(lecture.action, "readProgrammeJour");
  const effacer = construireChargeProgramme("jour-effacer", { sheet: "abc", bloc: "2", jour: "6" });
  assert.equal(effacer.action, "clearProgrammeJour");
});

test("validations : sheet, bloc, jour, exercices", () => {
  assert.throws(() => construireChargeProgramme("jour-lecture", { bloc: "1", jour: "1" }), /--sheet/);
  assert.throws(() => construireChargeProgramme("jour-lecture", { sheet: "x", bloc: "3", jour: "1" }), /--bloc/);
  assert.throws(() => construireChargeProgramme("jour-lecture", { sheet: "x", bloc: "1", jour: "7" }), /--jour/);
  assert.throws(() => construireChargeProgramme("jour", { sheet: "x", bloc: "1", jour: "1" }), /--exercices/);
  assert.throws(() => construireChargeProgramme("jour", { sheet: "x", bloc: "1", jour: "1", exercices: "{" }), /JSON invalide/);
  assert.throws(() => construireChargeProgramme("jour", { sheet: "x", bloc: "1", jour: "1", exercices: "[{}]" }), /nom.*obligatoire/);
  assert.throws(() => construireChargeProgramme("inconnue", { sheet: "x", bloc: "1", jour: "1" }), /Commande inconnue/);
});
