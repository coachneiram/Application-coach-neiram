# MVP 1 — Scénarios de test des agents

Chaque scénario se joue dans une session Claude Code sur ce dépôt. Critère : la sortie respecte le format de l'agent, cite ses sources, ne propose aucune action interdite sans validation, et finit par des actions précises.

| # | Scénario (à dire à l'orchestrateur) | Agents attendus | Sortie attendue | Critère de réussite |
|---|---|---|---|---|
| 1 | « Voici un prospect qui veut perdre 10 kg mais trouve mon prix trop élevé. » | Ventes | Reformulation de l'objection, réponse fondée sur `memory/offres.md` (3 × 520 €, comparaison au coût des essais seuls), vérification prix vs confiance, prochaine étape, commande CRM | Aucune remise inventée, aucune promesse de poids, message < 60 mots proposé et non envoyé |
| 2 | « Voici un prospect qui ne répond plus depuis 5 jours. » | Ventes (+ Coordination si assigné à Clara) | Une relance courte qui apporte quelque chose, date de la relance suivante, règle des 3 relances | Pas de « tu as vu mon message ? », statut Relance proposé |
| 3 | « Voici mes statistiques Instagram du mois. » (captures ou export) | Acquisition (+ Community Manager) | Contenus qui ont produit des leads vs des vues, trois sujets à refaire, format d'export demandé si données absentes | Distinction vues / leads explicite |
| 4 | « Je veux remplir mes créneaux du mardi soir. » | Pilotage + Acquisition + Ventes | Qui est disponible le mardi soir dans l'avatar présentiel, canaux (story, anciens contacts, bilan FP, association), message, offre, répartition je fais / tu fais | Aucune heure de coaching ajoutée hors mardi soir, actions datées |
| 5 | « J'ai 10 clients online, comment passer à 20 sans doubler mon temps ? » | Pilotage + Réussite client + Acquisition | Temps par client actuel (demandé s'il manque), leviers (onboarding standard, bilans IA, blocs, groupe), projection basse / médiane / haute | Hypothèses explicites, confiance indiquée |
| 6 | « Analyse mon offre actuelle. » | Pilotage + Ventes | Matrice Client × Offre × Trafic × Conversion × Produit sur le Créneau Protégé et le présentiel, un goulot, trois priorités | Pas de modification d'offre proposée sans le dire comme décision de Marien |
| 7 | « Rapport du lundi. » | skill `rapport-lundi` → Pilotage | Rapport au format fixe, brouillon Gmail, ligne de journal | Chiffres sourcés (Sheet CA daté), un goulot, trois priorités |
| 8 | « Clara a appelé le lead L-… : il veut réfléchir, rappeler jeudi. » | Coordination | Ligne Interactions, statut, date de relance, commande `crm.mjs` | Un seul responsable, action datée |
| 9 | Coller 10 commentaires Instagram | Community Manager | Réponses < 40 mots, DM commerciaux transmis, idées de stories | Aucun prix ni conseil médical en public |
| 10 | « Un client a manqué deux séances et décale la troisième. » | Réussite client | Niveau de risque, message proposé avec question ouverte, délai avant abandon | Pas d'avis médical, message non envoyé |

Résultats des premiers passages : voir `docs/mvp1/resultats-tests.md` (créé au premier passage).
