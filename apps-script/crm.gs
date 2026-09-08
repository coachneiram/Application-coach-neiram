/**
 * CRM CoachNeiram — script du classeur Google Sheets.
 *
 * Deux usages :
 *  1. installer() : crée les onglets Leads, Interactions, Clients, Parametres
 *     avec leurs en-têtes et listes déroulantes. Idempotent : ne détruit rien.
 *  2. Web app (doPost / doGet) : reçoit les commandes de tools/crm.mjs,
 *     protégée par un secret partagé stocké dans les propriétés du script.
 *
 * Mise en place : voir docs/mvp1/installation.md dans le dépôt.
 * Même principe que coach-sync.gs de l'application client : secret exigé,
 * champs validés, textes plafonnés.
 */

var ONGLETS = {
  Leads: [
    "ID", "Date", "Prénom", "Nom", "Source", "Canal", "Téléphone", "Email",
    "Problème", "Objectif", "Offre potentielle", "Intérêt (1-5)", "Statut",
    "Dernière interaction", "Prochaine action", "Date relance", "Résultat", "Assigné", "Notes"
  ],
  Interactions: ["Date", "Lead ID", "Canal", "Résumé", "Prochaine étape", "Date relance", "Par"],
  Clients: [
    "ID", "Prénom", "Nom", "Canal", "Offre", "Tarif mensuel", "Date début", "Durée (mois)",
    "Date fin", "Source", "Statut", "Raison arrêt", "Lead ID", "Notes"
  ],
  Parametres: ["Clé", "Valeur"]
};

var STATUTS = ["Nouveau", "Contacté", "Qualifié", "Conversation", "Appel", "Proposition",
  "Relance", "Client", "Fidélisation", "Renouvellement", "Recommandation", "Perdu"];
var CANAUX = ["DM Instagram", "WhatsApp", "Appel", "Email", "SMS", "Salle", "Calendly", "Formulaire", "Autre"];
var SOURCES = ["Instagram", "Facebook", "TikTok", "YouTube", "Pub Meta", "Site", "Bilan Fitness Park",
  "Bouche-à-oreille", "Parrainage", "Association", "Entreprise", "Calendly", "Autre"];
var ASSIGNES = ["Marien", "Clara"];
var CANAUX_CLIENT = ["Présentiel", "En ligne", "À distance", "Collectif"];
var STATUTS_CLIENT = ["Actif", "Terminé", "Pause"];
var LONGUEUR_MAX = 500;

/** À lancer une fois depuis l'éditeur Apps Script. */
function installer() {
  var classeur = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(ONGLETS).forEach(function (nom) {
    var feuille = classeur.getSheetByName(nom);
    if (!feuille) {
      var premiere = classeur.getSheets()[0];
      var entetePremiere = premiere.getRange(1, 1, 1, Math.max(1, premiere.getLastColumn())).getValues()[0];
      // Une première feuille vide ou portant déjà les en-têtes attendus est renommée plutôt que dupliquée.
      if (premiere.getLastRow() === 0 || entetePremiere.join("|") === ONGLETS[nom].join("|")) {
        feuille = premiere;
        feuille.setName(nom);
      } else {
        feuille = classeur.insertSheet(nom);
      }
    }
    if (feuille.getLastRow() === 0) {
      feuille.getRange(1, 1, 1, ONGLETS[nom].length).setValues([ONGLETS[nom]]).setFontWeight("bold");
    }
    feuille.setFrozenRows(1);
  });
  listeDeroulante("Leads", "Statut", STATUTS);
  listeDeroulante("Leads", "Canal", CANAUX);
  listeDeroulante("Leads", "Source", SOURCES);
  listeDeroulante("Leads", "Assigné", ASSIGNES);
  listeDeroulante("Interactions", "Canal", CANAUX);
  listeDeroulante("Interactions", "Par", ASSIGNES);
  listeDeroulante("Clients", "Canal", CANAUX_CLIENT);
  listeDeroulante("Clients", "Statut", STATUTS_CLIENT);
  listeDeroulante("Clients", "Source", SOURCES);
  var params = feuille_("Parametres");
  if (params.getLastRow() < 2) {
    params.getRange(2, 1, 2, 2).setValues([["objectif_mensuel", 4000], ["relances_max", 3]]);
  }
  if (!PropertiesService.getScriptProperties().getProperty("SECRET")) {
    Logger.log("Pense à définir la propriété SECRET (Paramètres du projet → Propriétés du script).");
  }
}

function listeDeroulante(onglet, colonne, valeurs) {
  var feuille = feuille_(onglet);
  var idx = ONGLETS[onglet].indexOf(colonne) + 1;
  if (idx < 1) return;
  var regle = SpreadsheetApp.newDataValidation().requireValueInList(valeurs, true).setAllowInvalid(true).build();
  feuille.getRange(2, idx, Math.max(feuille.getMaxRows() - 1, 1), 1).setDataValidation(regle);
}

function feuille_(nom) {
  var f = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nom);
  if (!f) throw new Error("Onglet manquant : " + nom + ". Lance installer().");
  return f;
}

// ───────────────────────── Web app ─────────────────────────

function doPost(e) {
  try {
    var corps = JSON.parse(e.postData.contents || "{}");
    verifierSecret_(corps.secret);
    return json_(traiter_(corps));
  } catch (err) {
    return json_({ ok: false, erreur: String(err.message || err) });
  }
}

function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    verifierSecret_(p.secret);
    return json_(traiter_({ action: p.action || "listRelances", date: p.date, statut: p.statut, assigne: p.assigne }));
  } catch (err) {
    return json_({ ok: false, erreur: String(err.message || err) });
  }
}

function verifierSecret_(secret) {
  var attendu = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!attendu) throw new Error("SECRET non configuré dans les propriétés du script");
  if (!secret || secret !== attendu) throw new Error("secret invalide");
}

function traiter_(corps) {
  switch (corps.action) {
    case "addLead": return ajouterLead_(corps.lead || {});
    case "addInteraction": return ajouterInteraction_(corps.interaction || {});
    case "updateLead": return mettreAJourLead_(corps.leadId, corps.champs || {});
    case "listRelances": return listerRelances_(corps.date);
    case "listLeads": return listerLeads_(corps.statut, corps.assigne);
    case "listClients": return listerClients_();
    case "readProgrammeJour": return lireJourProgramme_(corps);
    case "writeProgrammeJour": return ecrireJourProgramme_(corps);
    case "clearProgrammeJour": return effacerJourProgramme_(corps);
    default: throw new Error("action inconnue : " + corps.action);
  }
}

function texte_(v) {
  return String(v == null ? "" : v).slice(0, LONGUEUR_MAX);
}

// ───────────── Écriture des blocs de programme (Programme_<client>) ─────────────
//
// Ne s'applique qu'aux classeurs bâtis sur le nouveau modèle (onglets « BLOC 1 »,
// « BLOC 2 », en-têtes Exercices/Séries/Répétitions/Intensité/Récupération/
// Consignes/S1..S4). Les colonnes RPE, Commentaires Client et Vidéo (formule)
// ne sont jamais écrites ni effacées. Repérage par le texte des cellules, pas
// par un numéro de ligne fixe : robuste à de petites différences entre classeurs.

var ENTETES_JOUR_PROGRAMME = ["Exercices", "Séries", "Répétitions", "Récupération", "Consignes", "S1", "S2", "S3", "S4"];
var MAX_EXERCICES_JOUR = 12;

function classeurProgramme_(spreadsheetId) {
  if (!spreadsheetId) throw new Error("spreadsheetId obligatoire");
  try {
    return SpreadsheetApp.openById(spreadsheetId);
  } catch (err) {
    throw new Error("classeur introuvable ou accès refusé : " + spreadsheetId);
  }
}

function feuilleBloc_(classeur, bloc) {
  var b = Number(bloc);
  if (b !== 1 && b !== 2) throw new Error("bloc doit être 1 ou 2");
  var feuille = classeur.getSheetByName("BLOC " + b);
  if (!feuille) throw new Error("onglet « BLOC " + b + " » introuvable dans ce classeur");
  return feuille;
}

/** Repère la ligne « JOUR n », la ligne d'en-têtes qui suit, les colonnes utiles,
 *  et la dernière ligne inscriptible avant le prochain repère « JOUR ». */
function reperesJourProgramme_(feuille, jour) {
  var j = Number(jour);
  if (!(j >= 1 && j <= 6)) throw new Error("jour doit être compris entre 1 et 6");
  var cible = "JOUR " + j;
  var valeurs = feuille.getDataRange().getValues();
  var ligneJour = -1;
  for (var i = 0; i < valeurs.length && ligneJour < 0; i++) {
    for (var c = 0; c < valeurs[i].length; c++) {
      if (String(valeurs[i][c]).trim() === cible) { ligneJour = i; break; }
    }
  }
  if (ligneJour < 0) throw new Error("repère « " + cible + " » introuvable dans cet onglet");

  var ligneEntetes = -1;
  var colonnes = {};
  for (var e = ligneJour + 1; e < Math.min(ligneJour + 4, valeurs.length) && ligneEntetes < 0; e++) {
    for (var c2 = 0; c2 < valeurs[e].length; c2++) {
      var v = String(valeurs[e][c2]).trim();
      if (v === "Exercices") { ligneEntetes = e; colonnes.Exercices = c2 + 1; }
    }
  }
  if (ligneEntetes < 0) throw new Error("ligne d'en-têtes introuvable sous « " + cible + " »");
  var ligneEnteteValeurs = valeurs[ligneEntetes];
  for (var c3 = 0; c3 < ligneEnteteValeurs.length; c3++) {
    var libelle = String(ligneEnteteValeurs[c3]).trim();
    if (libelle === "Séries") colonnes.Séries = c3 + 1;
    else if (libelle === "Répétitions") colonnes.Répétitions = c3 + 1;
    else if (libelle.indexOf("Intensit") === 0) colonnes.Intensité = c3 + 1;
    else if (libelle === "Récupération") colonnes.Récupération = c3 + 1;
    else if (libelle === "Consignes") colonnes.Consignes = c3 + 1;
    else if (libelle === "S1") colonnes.S1 = c3 + 1;
    else if (libelle === "S2") colonnes.S2 = c3 + 1;
    else if (libelle === "S3") colonnes.S3 = c3 + 1;
    else if (libelle === "S4") colonnes.S4 = c3 + 1;
  }
  ENTETES_JOUR_PROGRAMME.forEach(function (nom) {
    if (!colonnes[nom]) throw new Error("colonne « " + nom + " » introuvable dans l'en-tête du jour");
  });

  var premiereLigneData = ligneEntetes + 2; // +1 index→ligne, +1 pour passer l'en-tête
  var ligneLimite = valeurs.length + 1;
  for (var s = ligneEntetes + 1; s < valeurs.length; s++) {
    var estRepere = false;
    for (var c4 = 0; c4 < valeurs[s].length; c4++) {
      if (/^JOUR \d+$/.test(String(valeurs[s][c4]).trim())) { estRepere = true; break; }
    }
    if (estRepere) { ligneLimite = s + 1; break; }
  }
  return { colonnes: colonnes, premiereLigne: premiereLigneData, derniereLigneAutorisee: ligneLimite - 1 };
}

function validerExercices_(exercices, reperes) {
  if (!Array.isArray(exercices) || !exercices.length) throw new Error("exercices : liste non vide obligatoire");
  if (exercices.length > MAX_EXERCICES_JOUR) throw new Error("trop d'exercices (max " + MAX_EXERCICES_JOUR + ")");
  var placeDisponible = reperes.derniereLigneAutorisee - reperes.premiereLigne + 1;
  if (exercices.length > placeDisponible) {
    throw new Error("pas assez de place avant le prochain repère « JOUR » (" + placeDisponible + " lignes disponibles)");
  }
  exercices.forEach(function (ex, i) {
    if (!ex || !ex.nom) throw new Error("exercice " + (i + 1) + " : nom obligatoire");
  });
}

function ecrireJourProgramme_(corps) {
  var classeur = classeurProgramme_(corps.spreadsheetId);
  var feuille = feuilleBloc_(classeur, corps.bloc);
  var reperes = reperesJourProgramme_(feuille, corps.jour);
  validerExercices_(corps.exercices, reperes);
  corps.exercices.forEach(function (ex, i) {
    var ligne = reperes.premiereLigne + i;
    feuille.getRange(ligne, reperes.colonnes.Exercices).setValue(texte_(ex.nom));
    feuille.getRange(ligne, reperes.colonnes.Séries).setValue(texte_(ex.series));
    feuille.getRange(ligne, reperes.colonnes.Répétitions).setValue(texte_(ex.repetitions));
    feuille.getRange(ligne, reperes.colonnes.Intensité).setValue(texte_(ex.intensite));
    feuille.getRange(ligne, reperes.colonnes.Récupération).setValue(texte_(ex.recuperation));
    feuille.getRange(ligne, reperes.colonnes.Consignes).setValue(texte_(ex.consignes));
    ["S1", "S2", "S3", "S4"].forEach(function (s) {
      if (ex[s.toLowerCase()] !== undefined) feuille.getRange(ligne, reperes.colonnes[s]).setValue(texte_(ex[s.toLowerCase()]));
    });
  });
  return { ok: true, spreadsheetId: corps.spreadsheetId, bloc: Number(corps.bloc), jour: Number(corps.jour), lignesEcrites: corps.exercices.length };
}

function lireJourProgramme_(corps) {
  var classeur = classeurProgramme_(corps.spreadsheetId);
  var feuille = feuilleBloc_(classeur, corps.bloc);
  var reperes = reperesJourProgramme_(feuille, corps.jour);
  var nbLignes = reperes.derniereLigneAutorisee - reperes.premiereLigne + 1;
  var plage = feuille.getRange(reperes.premiereLigne, 1, nbLignes, feuille.getLastColumn()).getDisplayValues();
  var lignes = plage.map(function (r) {
    return {
      nom: r[reperes.colonnes.Exercices - 1], series: r[reperes.colonnes.Séries - 1],
      repetitions: r[reperes.colonnes.Répétitions - 1], intensite: r[reperes.colonnes.Intensité - 1],
      recuperation: r[reperes.colonnes.Récupération - 1], consignes: r[reperes.colonnes.Consignes - 1],
      s1: r[reperes.colonnes.S1 - 1], s2: r[reperes.colonnes.S2 - 1], s3: r[reperes.colonnes.S3 - 1], s4: r[reperes.colonnes.S4 - 1]
    };
  }).filter(function (l) { return l.nom; });
  return { ok: true, spreadsheetId: corps.spreadsheetId, bloc: Number(corps.bloc), jour: Number(corps.jour), exercices: lignes };
}

function effacerJourProgramme_(corps) {
  var classeur = classeurProgramme_(corps.spreadsheetId);
  var feuille = feuilleBloc_(classeur, corps.bloc);
  var reperes = reperesJourProgramme_(feuille, corps.jour);
  var nbLignes = reperes.derniereLigneAutorisee - reperes.premiereLigne + 1;
  ["Exercices", "Séries", "Répétitions", "Intensité", "Récupération", "Consignes", "S1", "S2", "S3", "S4"].forEach(function (nom) {
    feuille.getRange(reperes.premiereLigne, reperes.colonnes[nom], nbLignes, 1).clearContent();
  });
  return { ok: true, spreadsheetId: corps.spreadsheetId, bloc: Number(corps.bloc), jour: Number(corps.jour), lignesEffacees: nbLignes };
}

function verifierDans_(valeur, liste, libelle) {
  if (valeur && liste.indexOf(valeur) < 0) throw new Error(libelle + " inconnu : " + valeur);
}

function aujourdhui_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "Europe/Paris", "dd/MM/yyyy");
}

function nouvelId_(prefixe, feuille) {
  var jour = Utilities.formatDate(new Date(), "Europe/Paris", "yyyyMMdd");
  var existants = feuille.getLastRow() > 1 ? feuille.getRange(2, 1, feuille.getLastRow() - 1, 1).getValues().map(function (r) { return String(r[0]); }) : [];
  var n = 1;
  while (existants.indexOf(prefixe + "-" + jour + "-" + pad_(n)) >= 0) n++;
  return prefixe + "-" + jour + "-" + pad_(n);
}

function pad_(n) { return ("00" + n).slice(-3); }

/** Date du jour + n jours, au format JJ/MM/AAAA (pour les outils qui ne savent pas calculer une date, ex. ManyChat). */
function dansNJours_(n) {
  var d = new Date();
  d.setDate(d.getDate() + Number(n));
  return Utilities.formatDate(d, "Europe/Paris", "dd/MM/yyyy");
}

function ajouterLead_(l) {
  if (!l.prenom || !l.source) throw new Error("prenom et source obligatoires");
  verifierDans_(l.statut, STATUTS, "statut");
  verifierDans_(l.assigne, ASSIGNES, "assigne");
  var feuille = feuille_("Leads");
  var id = nouvelId_("L", feuille);
  var relance = l.relance;
  if (!relance && l.relanceJours !== undefined && l.relanceJours !== "" && !isNaN(Number(l.relanceJours))) relance = dansNJours_(l.relanceJours);
  var derniere = l.derniere === true || l.derniere === "aujourdhui" ? aujourdhui_() : "";
  feuille.appendRow([
    id, aujourdhui_(), texte_(l.prenom), texte_(l.nom), texte_(l.source), texte_(l.canal), texte_(l.telephone), texte_(l.email),
    texte_(l.probleme), texte_(l.objectif), texte_(l.offre), l.interet === "" || l.interet == null ? "" : Number(l.interet),
    l.statut || "Nouveau", derniere, texte_(l.prochaine), texte_(relance), "", l.assigne || "Marien", texte_(l.notes)
  ]);
  return { ok: true, id: id, relance: relance || "" };
}

function ligneLead_(feuille, leadId) {
  var ids = feuille.getRange(2, 1, Math.max(feuille.getLastRow() - 1, 1), 1).getValues();
  for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(leadId)) return i + 2;
  throw new Error("lead introuvable : " + leadId);
}

function ajouterInteraction_(it) {
  if (!it.leadId || !it.canal || !it.resume) throw new Error("leadId, canal et resume obligatoires");
  verifierDans_(it.statut, STATUTS, "statut");
  var leads = feuille_("Leads");
  var ligne = ligneLead_(leads, it.leadId);
  var date = it.date || aujourdhui_();
  feuille_("Interactions").appendRow([date, it.leadId, texte_(it.canal), texte_(it.resume), texte_(it.prochaine), texte_(it.relance), it.par || "Marien"]);
  var col = function (nom) { return ONGLETS.Leads.indexOf(nom) + 1; };
  leads.getRange(ligne, col("Dernière interaction")).setValue(date);
  if (it.prochaine) leads.getRange(ligne, col("Prochaine action")).setValue(texte_(it.prochaine));
  if (it.relance) leads.getRange(ligne, col("Date relance")).setValue(texte_(it.relance));
  if (it.statut) leads.getRange(ligne, col("Statut")).setValue(it.statut);
  return { ok: true, leadId: it.leadId, ligne: ligne };
}

function mettreAJourLead_(leadId, champs) {
  verifierDans_(champs.statut, STATUTS, "statut");
  var leads = feuille_("Leads");
  var ligne = ligneLead_(leads, leadId);
  var correspondances = { statut: "Statut", resultat: "Résultat", prochaine: "Prochaine action", relance: "Date relance", assigne: "Assigné", notes: "Notes" };
  Object.keys(correspondances).forEach(function (cle) {
    if (champs[cle] !== undefined && champs[cle] !== "") {
      leads.getRange(ligne, ONGLETS.Leads.indexOf(correspondances[cle]) + 1).setValue(texte_(champs[cle]));
    }
  });
  return { ok: true, leadId: leadId };
}

function lireObjets_(nom) {
  var feuille = feuille_(nom);
  if (feuille.getLastRow() < 2) return [];
  var valeurs = feuille.getRange(1, 1, feuille.getLastRow(), ONGLETS[nom].length).getDisplayValues();
  var entete = valeurs[0];
  return valeurs.slice(1).map(function (r) {
    var o = {};
    entete.forEach(function (h, i) { o[h] = r[i]; });
    return o;
  }).filter(function (o) { return o[entete[0]]; });
}

function dateFr_(s) {
  var m = String(s || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  return m ? new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])) : null;
}

function listerRelances_(dateRef) {
  var ref = dateFr_(dateRef) || new Date();
  ref.setHours(0, 0, 0, 0);
  var ouverts = ["Client", "Fidélisation", "Renouvellement", "Recommandation", "Perdu"];
  var liste = lireObjets_("Leads").filter(function (l) {
    if (ouverts.indexOf(l["Statut"]) >= 0) return false;
    var d = dateFr_(l["Date relance"]);
    return d && d <= ref;
  }).map(function (l) {
    return { id: l["ID"], prenom: l["Prénom"], statut: l["Statut"], assigne: l["Assigné"], relance: l["Date relance"],
      prochaine: l["Prochaine action"], derniere: l["Dernière interaction"], source: l["Source"] };
  });
  return { ok: true, date: Utilities.formatDate(ref, "Europe/Paris", "dd/MM/yyyy"), relances: liste };
}

function listerLeads_(statut, assigne) {
  var liste = lireObjets_("Leads").filter(function (l) {
    return (!statut || l["Statut"] === statut) && (!assigne || l["Assigné"] === assigne);
  }).map(function (l) {
    return { id: l["ID"], date: l["Date"], prenom: l["Prénom"], source: l["Source"], statut: l["Statut"], assigne: l["Assigné"],
      prochaine: l["Prochaine action"], relance: l["Date relance"], derniere: l["Dernière interaction"], interet: l["Intérêt (1-5)"] };
  });
  return { ok: true, leads: liste };
}

function listerClients_() {
  return { ok: true, clients: lireObjets_("Clients") };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
