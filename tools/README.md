# Outils

Scripts Node sans dépendance. Ils lisent des exports locaux dans `data/cache/` (jamais commités) et n'écrivent que sur la sortie standard, sauf `crm.mjs` qui envoie au script Apps Script du CRM.

| Outil | Entrée | Sortie |
|---|---|---|
| `kpi.mjs` | Export du Sheet `Suivi CA Coaching` (réponse brute du connecteur Drive) | CA par mois, encaissé vs attendu, écart à l'objectif, entrées et sorties |
| `renouvellements.mjs` | CSV de l'onglet Clients du CRM | Clients dont l'engagement se termine dans N jours |
| `crm.mjs` | Ligne de commande | Ajoute un lead, une interaction, change un statut, liste les relances dues |
| `lib/sheet-md.mjs` | | Lecture des tables markdown renvoyées par le connecteur Drive |
| `lib/csv.mjs`, `lib/dates.mjs` | | Utilitaires |

Tests : `node --test tests/*.test.mjs`.

Variables d'environnement pour `crm.mjs` : `CRM_URL`, `CRM_SECRET` (voir `docs/mvp1/installation.md`). Sans elles, l'outil affiche la charge utile et la ligne à coller.
