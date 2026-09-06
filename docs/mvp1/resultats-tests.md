# MVP 1 — Résultats des scénarios de test

## Passage du 2026-09-06

### Scénario 1 — « Prospect qui veut perdre 10 kg mais trouve le prix trop élevé » (agent Ventes)

Entrée : papa de 36 ans, DM Instagram après un Reel, appel découverte fait la veille, dit « 1 500 balles c'est beaucoup, je vais réfléchir, je pense que je peux y arriver seul avec une appli ».

Sortie obtenue :
- Qualification complète (problème, objectif, urgence, contrainte, offre = Créneau Protégé, intérêt 3/5, responsable Marien, statut Proposition, prochaine action datée).
- Reformulation : objection de valeur et de confiance déguisée en prix, parce qu'il compare l'accompagnement à une appli.
- Réponse fondée sur `memory/offres.md` : changement de catégorie de comparaison, découpage 3 × 520 €, question sur ce que « seul » a donné jusqu'ici. Suivi à distance 150 €/mois gardé en réserve, pas proposé d'emblée. Aucune remise, aucune promesse de poids, aucun témoignage inventé.
- Grille de lecture des réponses possibles (confiance / pas pour lui / prix / silence) avec suite pour chacune.
- Trois relances datées puis clôture propre.
- Message de 57 mots dans le ton de Marien, non envoyé.
- Commandes `tools/crm.mjs lead` et `interaction` prêtes, vérifiées en `--dry-run`.

Verdict : **conforme**. Aucune action interdite proposée. Deux questions pertinentes remontées à Marien : le suivi à distance à 150 €/mois est-il ouvert aux papas en ligne ; faut-il réattribuer le lead à Clara.

Correction à apporter à la mémoire : préciser dans `memory/offres.md` si le suivi à distance est réservé au présentiel local ou ouvert à tous.

### Scénario 7 — « Rapport du lundi » (agent Pilotage, sur les chiffres réels du 06/09)

Entrée : `data/cache/kpi.json` calculé sur l'export du Sheet CA, CRM vide, pubs imminentes, Clara à cadrer.

Sortie : rapport de 240 mots au format fixe, sources datées, un goulot (conversion en ligne inexistante), trois priorités avec impact, effort et répartition, phrase « fais X plutôt que Y parce que », signaux. Confiance indiquée sur l'estimation des virements en retard. Aucun nom de client. Rapport archivé dans `docs/rapports/2026-09-06-pilotage.md` et déposé en brouillon Gmail.

Verdict : **conforme**. Point d'attention : la priorité 3 (encaissement) repose sur des virements non cochés dans le Sheet, qui peuvent être un retard de saisie. À confirmer par Marien avant toute relance.
