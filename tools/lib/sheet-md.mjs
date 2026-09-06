/**
 * Lecture des exports de Google Sheets renvoyés par le connecteur Google Drive.
 *
 * Le connecteur renvoie soit un JSON `{ "fileContent": "..." }`, soit le texte
 * directement. Le texte contient une table markdown par onglet, séparées par
 * une ligne vide. Les cellules fusionnées sont préfixées de `\[merged\]` et
 * les caractères spéciaux sont échappés par un antislash.
 */

/** Extrait le texte, que l'entrée soit le JSON du connecteur ou le texte brut. */
export function extraireTexte(brut) {
  const s = String(brut ?? "").trim();
  if (s.startsWith("{")) {
    try {
      const obj = JSON.parse(s);
      if (typeof obj.fileContent === "string") return obj.fileContent;
    } catch {
      /* pas du JSON : on garde le texte tel quel */
    }
  }
  return s;
}

/** Nettoie une cellule : retire le marqueur de fusion et les échappements. */
export function nettoyerCellule(cellule) {
  return String(cellule ?? "")
    .replace(/\\\[merged\\\]\s*/g, "")
    .replace(/\[merged\]\s*/g, "")
    .replace(/\\([\[\]_*#().\-])/g, "$1")
    .trim();
}

/** Vrai pour une ligne d'alignement markdown (`| :-: | --- |`). */
function estLigneAlignement(ligne) {
  return /^\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)*\|?$/.test(ligne.trim());
}

/** Découpe une ligne `| a | b |` en cellules nettoyées. */
export function parserLigne(ligne) {
  let l = ligne.trim();
  if (l.startsWith("|")) l = l.slice(1);
  if (l.endsWith("|")) l = l.slice(0, -1);
  return l.split("|").map(nettoyerCellule);
}

/**
 * Renvoie la liste des tables (une par onglet), chaque table étant une liste
 * de lignes, chaque ligne une liste de cellules.
 */
export function parserTables(brut) {
  const texte = extraireTexte(brut);
  const tables = [];
  let courante = null;
  for (const ligneBrute of texte.split(/\r?\n/)) {
    const ligne = ligneBrute.trim();
    if (!ligne.startsWith("|")) {
      if (courante && courante.length) tables.push(courante);
      courante = null;
      continue;
    }
    if (estLigneAlignement(ligne)) continue;
    if (!courante) courante = [];
    courante.push(parserLigne(ligne));
  }
  if (courante && courante.length) tables.push(courante);
  return tables;
}

/** Normalise un libellé pour comparer des en-têtes (accents, casse, espaces). */
export function normaliser(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Cherche dans une table la ligne d'en-tête contenant tous les libellés donnés
 * et renvoie `{ index, colonnes }` où colonnes associe chaque libellé normalisé
 * à son numéro de colonne.
 */
export function trouverEntete(table, libelles) {
  const voulus = libelles.map(normaliser);
  for (let i = 0; i < table.length; i++) {
    const cellules = table[i].map(normaliser);
    if (voulus.every((v) => cellules.some((c) => c.startsWith(v)))) {
      const colonnes = {};
      cellules.forEach((c, j) => {
        if (c && !(c in colonnes)) colonnes[c] = j;
      });
      return { index: i, colonnes };
    }
  }
  return null;
}

/** Retrouve l'index d'une colonne dont l'en-tête commence par le libellé. */
export function colonne(entete, libelle) {
  const v = normaliser(libelle);
  for (const [nom, j] of Object.entries(entete.colonnes)) {
    if (nom.startsWith(v)) return j;
  }
  return -1;
}

/** Convertit « 2 550 € », « 1,100 € », « 400€ » en nombre. Vide → null. */
export function montant(cellule) {
  const s = String(cellule ?? "").replace(/[€"'\s  ]/g, "").replace(",", ".");
  if (!s || s === "-") return null;
  const n = Number(s.replace(/\.(?=\d{3}(\D|$))/g, ""));
  return Number.isFinite(n) ? n : null;
}
