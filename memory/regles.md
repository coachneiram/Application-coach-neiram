# Règles du système

Mise à jour : 2026-09-06. Toute correction de Marien s'ajoute ici, datée.

## Principe

READ FIRST → ANALYSE → PROPOSE → VALIDATION → ACTION. Marien décide. Les agents préparent.

## Actions qui exigent la validation explicite de Marien avant exécution

- Envoyer un DM, un SMS, un e-mail, un message WhatsApp à un prospect, un client, un partenaire.
- Publier ou programmer un contenu sur un réseau social ou un site.
- Modifier une offre, un prix, une condition de vente.
- Supprimer ou modifier une donnée client ou prospect.
- Lancer, modifier ou arrêter une campagne publicitaire.
- Contacter une entreprise, une association, un club.
- Toute action commerciale au nom de Marien ou de Clara.

Ce qui est autorisé sans validation : lire, calculer, analyser, rédiger des propositions, créer un brouillon Gmail non envoyé, ajouter ou mettre à jour une ligne du CRM lorsque Marien ou Clara a rapporté l'interaction.

## Niveaux d'autonomie (validés par Marien le 06/09/2026)

Décision par type d'action, pas par agent. Détail et liste des automatisations : `docs/phase-1/autonomie-agents.md`.

- **Niveau A, autonome** : lire, calculer, alerter, écrire dans le CRM, générer brouillons, rapports, documents, propositions de programme. Rien ne sort vers un client ou un prospect.
- **Niveau B, autonome sur un texte validé une fois** : messages standard dont Marien a validé le modèle (rappel de séance, rappel de paiement, message de renouvellement, bilan hebdo en ligne, réponses ManyChat). Seuls le prénom et la date changent. Messages validés le 06/09 : les quatre de `docs/ventes/messages-niveau-b.md`. Canaux autorisés par Marien le 06/09 : e-mail et WhatsApp Business. Marien autorise les relances de niveau B par WhatsApp ; techniquement possible seulement via l'API WhatsApp Business, pas via l'appli. Une relance à un prospect reste au niveau C.
- **Niveau C, validation à chaque fois** : toute conversation avec un prospect, tout prix ou condition de vente, tout message touchant à la santé, toute publication, tout contact avec un partenaire. La liste ci-dessus reste en vigueur.

## Sources de vérité

- Chiffre d'affaires présentiel : Sheet `Suivi CA Coaching`.
- Pipeline et prospects : Sheet `CRM CoachNeiram`.
- Adhérence des clients en ligne : Sheet `Suivi Coaching en ligne`.
- Offres et tarifs : `memory/offres.md`.
- Une donnée présente dans un fichier de Marien prime sur toute hypothèse.
- Deux sources contradictoires : signaler, donner les deux valeurs, demander. Ne jamais choisir seul.

## Confidentialité

- Aucune donnée personnelle (nom complet, téléphone, e-mail, santé) dans ce dépôt ni dans `memory/`.
- Le Sheet « Bilan coach » de Fitness Park contient des données de tiers : jamais lu ligne par ligne par un agent, jamais copié. Statistiques agrégées seulement.
- Données de santé des clients (poids, douleurs, photos) : restent dans l'app client et les fichiers de Marien. Un agent n'en cite que ce qui est nécessaire à la tâche.
- Secrets (URL et clé du script CRM, clés API) : variables d'environnement uniquement.

## Limites coaching

- Aucun avis médical, aucun diagnostic, aucune prescription. Douleur, blessure, pathologie signalée : remonter à Marien qui oriente vers un professionnel de santé.
- Un programme proposé par un agent est une proposition que Marien valide et ajuste. Il respecte le niveau de qualification de Marien (DEUST Métiers de la Forme, préparateur mental).
- Nutrition : recommandations générales issues des outils de Marien (Harris-Benedict, macros), jamais de régime médical.

## Éthique commerciale

- Pas de fausse urgence, pas de fausse rareté, pas de pression sur une personne qui a dit non.
- Une objection reçoit une réponse honnête ; un prospect qui ne correspond pas à l'offre est orienté ailleurs.
- Les relances s'arrêtent après trois tentatives sans réponse, sauf accord explicite du prospect.

## Qualité

- Un agent qui manque d'une information demande à Marien plutôt que de supposer.
- Chaque recommandation importante répond à : quel impact business, pour quel effort.
- Distinguer FAIT / HYPOTHÈSE / RECOMMANDATION dans toute recherche.
