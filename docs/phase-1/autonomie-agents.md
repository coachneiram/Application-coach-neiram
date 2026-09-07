# Autonomie des agents : quoi laisser tourner sans validation

Rédigé le 2026-09-06 en réponse à la question de Marien : « Est-ce pertinent pour mon business que des agents envoient sans validation ? Quels agents pour me libérer du temps ? ». Proposition. La règle actuelle (`memory/regles.md`) reste en vigueur tant que Marien n'a pas tranché.

## Le principe

L'autonomie se décide par type d'action, pas par agent. Trois niveaux :

| Niveau | Ce qui tourne seul | Pourquoi c'est sûr |
|---|---|---|
| **A — autonome** | Lire, calculer, alerter, écrire dans le CRM, générer un brouillon, un rapport, un document | Rien ne sort vers un client ou un prospect. Erreur réversible |
| **B — autonome sur un modèle validé une fois** | Messages standard dont Marien a validé le texte : rappel de séance J-1, rappel de paiement, message de bilan hebdo, réponses ManyChat | Le texte est fixe, seul le prénom et la date changent. Marien garde un droit de retrait |
| **C — validation à chaque fois** | Toute conversation avec un prospect, tout prix, tout message qui touche à la santé, toute publication, tout contact avec un partenaire | Une erreur coûte un client ou engage la responsabilité de Marien |

Le niveau B est là où le temps se gagne. Il a une contrainte matérielle : le WhatsApp personnel de Marien ne peut pas être piloté par un agent. Le niveau B passe donc par e-mail, SMS (service payant), WhatsApp Business ou l'application client. Tant que ce canal n'existe pas, le niveau B reste théorique.

## Réponse à la question : est-ce pertinent ?

- **Présentiel (16 clients, 20 à 35 h/semaine)** : oui pour le niveau A et pour trois messages de niveau B (rappel de séance, rappel de paiement, message de renouvellement à 30 jours). Non pour le reste : la relation présentielle est le produit, un message automatique de Marien à un client qu'il voit chaque semaine se remarque.
- **En ligne (0 client aujourd'hui)** : oui, et davantage. Le client en ligne attend de la réactivité, pas de la présence. Bilan hebdo automatique, rappel de séance visio, relance quand une séance n'est pas pointée : niveau B dès le premier client. Prospection et vente : niveau C.

## Les automatisations qui libèrent du temps, par ordre de rendement

| # | Tâche aujourd'hui manuelle | Automatisation | Niveau | Temps libéré (hypothèse) | Prérequis |
|---|---|---|---|---|---|
| 1 | Reprogrammation par blocs de 4 semaines pour chaque client | L'agent Réussite client lit le bloc précédent (Sheet Programme) et propose le bloc suivant ; Marien corrige et valide | A | 20 à 40 min par client et par bloc, soit 5 à 10 h/mois avec 16 clients | Accès aux Sheets `Programme_<client>` (déjà possible via Drive) |
| 2 | Renouvellements et fins d'engagement | Alerte à 30 jours + message proposé | A puis B | 1 h/mois, et surtout zéro départ non anticipé | Onglet Clients complété (dates, durées) |
| 3 | Suivi des clients en ligne (bilans hebdo, adhérence) | Lecture du Sheet `Suivi Coaching en ligne`, alerte client à risque, message proposé | A puis B | 15 min par client et par semaine | Premier client en ligne |
| 4 | Report du CA et déclaration URSSAF | KPI calculés seuls (`kpi.mjs`), rapport du lundi ; la déclaration URSSAF reste manuelle (10 min) | A | 1 h/mois | Déjà en place |
| 5 | Rappels de séance et absences | Invitations Google Calendar avec rappel automatique au client, sans agent | B | 30 min/semaine de messages, moins d'absences | Adresse e-mail de chaque client dans l'agenda |
| 6 | Reçus et factures | Génération automatique d'un reçu PDF à chaque encaissement du Sheet CA (utile aux clients qui déclarent à leur mutuelle ou leur CE) | A | 30 min/mois | Petit outil à écrire, une soirée |
| 7 | Nouveaux RDV Calendly → CRM | Chaque réservation crée la ligne CRM, sans saisie | A | 5 min par lead, zéro oubli | Webhook Calendly vers `crm.gs` (MVP 3 de l'architecture) |
| 8 | Contenu | Calendrier et scripts prêts (skills existants) ; programmation des publications via Meta Business Suite | A, publication C | 2 h/semaine de préparation | Marien filme et valide |
| 9 | DM entrants Instagram | Tunnel ManyChat (en pause) | B | variable | Du contenu qui génère des réponses |
| 10 | Conversations prospects, appels découverte | Brief avant l'appel, réponse aux objections, relances proposées | C | 15 min par prospect de préparation | CRM alimenté |

Total réaliste sur un mois avec 16 clients : 8 à 15 heures, dont plus de la moitié sur la reprogrammation (ligne 1). C'est la première chose à automatiser, et elle ne demande aucun changement de règle.

## Ce que Marien décide

1. Valider les trois niveaux, ou les modifier.
2. Lister les messages de niveau B qu'il accepte (proposition : rappel de séance, rappel de paiement, message de renouvellement, bilan hebdo en ligne) ; les textes seront rédigés puis validés une fois.
3. Choisir le canal du niveau B : e-mail (gratuit, déjà connecté), SMS (payant), WhatsApp Business (numéro dédié).
4. Donner le feu vert à la ligne 1 : partager un Sheet `Programme_<client>` pour un premier bloc proposé par l'agent.
