/** Lecture d'une date « JJ/MM/AAAA » ou ISO « AAAA-MM-JJ ». Renvoie Date ou null. */
export function lireDate(s) {
  const t = String(s ?? "").trim();
  if (!t) return null;
  let m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]));
  m = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return null;
}

/** Ajoute n mois à une date (UTC). */
export function ajouterMois(date, n) {
  const d = new Date(date.getTime());
  d.setUTCMonth(d.getUTCMonth() + n);
  return d;
}

export function formaterDate(d) {
  return `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`;
}

export function joursEntre(a, b) {
  return Math.round((b.getTime() - a.getTime()) / 864e5);
}
