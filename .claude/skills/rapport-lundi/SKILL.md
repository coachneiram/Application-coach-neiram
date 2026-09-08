---
name: rapport-lundi
description: Procédure complète du rapport de pilotage hebdomadaire : récupérer le Sheet CA et le CRM, calculer les KPI, produire le rapport via l'agent Pilotage, le déposer en brouillon Gmail et journaliser. Lancée par la Routine du lundi ou à la demande de Marien.
---

# Rapport du lundi

## Étapes

1. **Récupérer les données**
   - Sheet `Suivi CA Coaching` : `mcp__Google_Drive__search_files` avec `title = 'Suivi CA Coaching'`, puis `read_file_content`. Sauvegarder la réponse brute dans `data/cache/suivi-ca.md`.
   - Sheet `CRM CoachNeiram` (si créé) : lire les onglets Leads et Clients, sauvegarder dans `data/cache/crm-leads.md` et `data/cache/clients.csv` (convertir la table Clients en CSV ou utiliser `node tools/crm.mjs clients` si `CRM_URL` est configuré).
   - Sheet `Suivi Coaching en ligne` : lire l'onglet Alertes, sauvegarder dans `data/cache/adherence.md`.
   - Onglet Shorts du CRM : `node tools/crm.mjs shorts --limite 14` si `CRM_URL` est configuré, sinon lecture Drive de l'onglet. Ce sont les seules métriques Instagram du rapport (commentaires mot-code, conversations, appels proposés, appels tenus, ventes) ; les vues sont citées sans être commentées.
   - Calendly : `meetings-list_events` sur les 7 jours passés et les 7 jours à venir pour compter appels honorés et appels prévus.
2. **Calculer** : `node tools/kpi.mjs data/cache/suivi-ca.md --json` ; `node tools/renouvellements.mjs data/cache/clients.csv --jours 30` si le CSV existe ; `node tools/crm.mjs relances` si configuré.
3. **Rédiger** : lancer l'agent `pilotage` avec les résultats. Format fixe du rapport (voir l'agent).
4. **Déposer** : `mcp__Gmail__create_draft` vers l'adresse de Marien, objet « Pilotage — semaine du <date> », corps = rapport. Brouillon uniquement. Ne jamais envoyer.
5. **Journaliser** : ajouter une ligne à `memory/journal.md` avec date, CA du mois, écart, goulot, trois priorités. Committer.
6. **Ne rien faire d'autre** : pas de message aux prospects, pas de modification du CRM, pas de publication. Si une donnée manque, le rapport le dit et continue avec ce qui existe.

## Vérification

Le rapport est réussi si : chiffres datés et sourcés, un seul goulot, trois priorités avec répartition « je fais / tu fais », brouillon présent dans Gmail, journal mis à jour.
