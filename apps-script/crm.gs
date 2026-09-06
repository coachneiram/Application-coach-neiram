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
    default: throw new Error("action inconnue : " + corps.action);
  }
}

function texte_(v) {
  return String(v == null ? "" : v).slice(0, LONGUEUR_MAX);
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
