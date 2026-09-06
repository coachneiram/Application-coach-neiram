/** Lecture CSV minimale (séparateur virgule ou point-virgule, guillemets doubles). */
export function parserCsv(texte) {
  const lignes = [];
  let ligne = [];
  let cellule = "";
  let entreGuillemets = false;
  const s = String(texte ?? "").replace(/^﻿/, "");
  const sep = detecterSeparateur(s);
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (entreGuillemets) {
      if (ch === '"' && s[i + 1] === '"') { cellule += '"'; i++; }
      else if (ch === '"') entreGuillemets = false;
      else cellule += ch;
    } else if (ch === '"') entreGuillemets = true;
    else if (ch === sep) { ligne.push(cellule); cellule = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && s[i + 1] === "\n") i++;
      ligne.push(cellule); lignes.push(ligne); ligne = []; cellule = "";
    } else cellule += ch;
  }
  if (cellule.length || ligne.length) { ligne.push(cellule); lignes.push(ligne); }
  return lignes.filter((l) => l.some((c) => c.trim() !== ""));
}

function detecterSeparateur(s) {
  const premiere = s.split(/\r?\n/)[0] ?? "";
  return (premiere.match(/;/g) || []).length > (premiere.match(/,/g) || []).length ? ";" : ",";
}

/** Transforme lignes CSV en objets à partir de la première ligne (en-têtes). */
export function csvVersObjets(texte) {
  const [entete, ...lignes] = parserCsv(texte);
  if (!entete) return [];
  return lignes.map((l) => Object.fromEntries(entete.map((h, i) => [h.trim(), (l[i] ?? "").trim()])));
}

/** Échappe une valeur pour une sortie CSV. */
export function cellCsv(v) {
  const s = String(v ?? "");
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
