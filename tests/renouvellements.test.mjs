import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renouvellements } from "../tools/renouvellements.mjs";

const csv = readFileSync(new URL("./fixtures/clients.csv", import.meta.url), "utf8");

test("liste les clients actifs dont la fin tombe dans la fenêtre, triés par urgence", () => {
  const liste = renouvellements(csv, { jours: 45, aujourdhui: new Date(Date.UTC(2026, 8, 8)) });
  assert.deepEqual(liste.map((r) => r.id), ["C-002", "C-003"]);
  assert.equal(liste[0].fin, "17/09/2026");
  assert.equal(liste[0].dansJours, 9);
  assert.equal(liste[1].fin, "15/10/2026");
});

test("ignore les clients terminés et ceux sans date", () => {
  const liste = renouvellements(csv, { jours: 400, aujourdhui: new Date(Date.UTC(2026, 8, 8)) });
  assert.ok(!liste.some((r) => r.id === "C-004"));
  assert.ok(!liste.some((r) => r.id === "C-005"));
  assert.ok(liste.some((r) => r.id === "C-001" && r.fin === "01/01/2027"));
});
