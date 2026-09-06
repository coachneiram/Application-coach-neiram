# Journal

Append-only. Une entrée par décision ou résultat notable. Format : date, fait, source.

- 2026-09-06 — Audit Phase 0 réalisé en lecture seule (repo, Drive, UpTrainer, Calendly, Netlify, dépôts GitHub, archive BOS). Voir `docs/phase-0/`.
- 2026-09-06 — Marien confirme : Sheet `Suivi CA Coaching` = source de vérité CA présentiel ; tarifs hebdo 280/250/220, mensuel 210, à distance 150 ; offre papas 1 500 € / 6 mois ou 3 × 520 € ; cibles papas (en ligne) et débutants (présentiel) ; 20-35 h de coaching présentiel par semaine.
- 2026-09-06 — Architecture validée : orchestrateur CLAUDE.md, 6 agents (Pilotage, Ventes, Acquisition, Réussite client, Community Manager, Coordination setting/closing), skills, outils. CRM sur Google Sheets. Golf mis de côté. `Core/` du BOS non récupérable, mémoire reconstruite.
- 2026-09-06 — Démarrage du MVP 1.
- 2026-09-06 — MVP 1 livré sur la branche : CLAUDE.md orchestrateur, mémoire centrale (7 fichiers), 6 agents, 6 skills, outils `kpi`, `crm`, `renouvellements` avec 11 tests verts, script Apps Script `crm.gs`, documentation d'installation et scénarios.
- 2026-09-06 — Classeur « CRM CoachNeiram » créé dans le Drive de Marien (dossier « AI Business OS »), onglet Clients prérempli depuis les lignes de septembre du Sheet CA. Script d'écriture à déployer par Marien.
- 2026-09-06 — Routine « Rapport de pilotage du lundi » créée (lundi 7 h Paris). Première exécution prévue le 07/09.
- 2026-09-06 — KPI réels (Sheet CA du 06/09) : septembre 1 100 € encaissés sur 3 230 € attendus, 18 lignes ; moyenne des mois clos 2 896 €, écart à l'objectif -1 104 €.
- 2026-09-06 — Scénario de test Ventes (objection prix, papa 36 ans) : conforme. Question remontée : le suivi à distance 150 €/mois est-il ouvert aux prospects en ligne ?
- 2026-09-06 — CRM vérifié de bout en bout après déploiement du script par Marien : lecture (clients, leads, relances) et écriture (lead, interaction, statut) fonctionnelles, secret contrôlé, 11 tests verts. Lead de test `L-20260906-001` à supprimer à la main. Onglet Clients : dates de début et durées d'engagement encore vides.
- 2026-09-06 — Lignes de test du CRM supprimées par Marien. Leads, Interactions et relances vides, vérifié par script et par lecture Drive. Le CRM est propre et prêt pour les premiers prospects.
- 2026-09-06 — Marien confirme : aucun prospect en discussion au 06/09, pipeline vide (présentiel et en ligne). Onglet Clients (dates de début, durées) à compléter plus tard par Marien.
- 2026-09-06 — Marien : lancement des pubs papas espéré fin septembre / début octobre ; parrainage validé (message à préparer, à dire à chaque client en fin de séance) ; bilan Fitness Park mardi 08/09 à 9h30 saisi dans le CRM (L-20260906-001, statut Contacté, relance 08/09).
- 2026-09-06 — Tunnel ManyChat rédigé (`docs/acquisition/tunnel-manychat.md`), message de parrainage rédigé (`docs/ventes/parrainage-clients.md`). Script CRM : champs `relanceJours` et `derniere` ajoutés pour ManyChat, à recoller et redéployer par Marien. Marien n'a pas encore de compte ManyChat.
