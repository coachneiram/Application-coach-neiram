# Phase 0 — Audit initial (lecture seule)

Date : 2026-09-06
Statut : aucune ligne de code écrite. Ce document consigne ce qui a été observé dans les outils connectés et les questions ouvertes.

## 1. Ce qui a été inspecté

| Source | Accès | Résultat |
|---|---|---|
| Repository GitHub `Application-coach-neiram` | lecture | Vide : aucun commit, aucune branche distante, aucun fichier. Pas d'architecture à préserver. |
| UpTrainerOS (MCP) | lecture | Contexte client chargé (voir §2). 9 fichiers Drive listés en métadonnées seulement. Aucun document natif. Aucun parcours actif. Périmètre d'acquisition (local / national) non confirmé. |
| Google Drive (compte pelissier.marien@gmail.com) | lecture | `Suivi CA CoachNeiram.xlsx`, `Suivi Parrainage CoachNeiram-1.xlsx`, `Programme_CoachNeiram` (Sheet), `ADS Marien PELISSIER` (Doc), `Avatar_Client_Golfeurs_CoachNeiram.docx`, `Tracker Nutrition CoachNeiram.xlsx`. |
| Calendly (`calendly.com/coachneiram`) | lecture | 1 type d'événement actif en double : « Appel découverte - le créneau protégé » (30 min, Google Meet, téléphone obligatoire) + son clone. |
| Google Calendar | lecture | 1 agenda personnel, fuseau Europe/Paris. |
| Notion | lecture | 1 page « To-Do List » (mention « Refaire logo Coach Neiram »). Pas de CRM. |
| Airtable | lecture | Aucune base. |
| Web public | recherche | Facebook « Coach Neiram » (Clermont-Ferrand, ~222 likes), site Wix `coachneiram.wixsite.com/coachneiram`, chaîne YouTube @CoachNeiram, photos à Fitness Park Clermont-Ferrand Le Brezet. Diplôme DEUST Métiers de la Forme + préparateur mental. |
| Instagram / TikTok / Meta | aucun connecteur | Aucune intégration disponible dans cette session. |

## 2. UpTrainer : correction de prémisse

Le brief décrit Uptrainer comme « une partie centrale de mon coaching en ligne » (outil de suivi client).

Observation : le connecteur `UpTrainerOS` et le site `uptrainer.fr` décrivent un **incubateur pour coachs** (stratégie, avatar, offre, VSL, publicité, recrutement setter/closer), rémunéré sur résultats. Le contexte chargé :

- programme : `incubateur`
- niche enregistrée : « les jeunes papas » qui veulent conserver une activité physique régulière
- section en cours : « Publicité »
- parcours disponibles : Choisir son marché, Avatar, Offre irrésistible, Accompagnement premium, Stories à la une, Idées de contenu, Scripter ses Reels, VSL, Page VSL, Page d'optin, Recrutement Setter/CSM.

Ce que l'API UpTrainerOS permet réellement (vérifié sur les outils exposés) :

- Lecture : contexte client, mémoires, parcours, inventaire documents, périmètre d'acquisition.
- Écriture : sauvegarder une mémoire, un document, un brouillon de fondations, des blocs VSL, démarrer/relancer un parcours, soumettre avatar/marché/offre/programme premium pour validation, synchroniser un Google Doc.
- Absent : aucune donnée sur les clients coachés (séances, progression, paiements, messages). Ce n'est pas un outil de delivery.

Il existe aussi une application mobile « UP Trainer » (Google Play, éditeur Nexur) sans lien apparent avec l'incubateur. À confirmer laquelle des deux est visée.

Conséquence : le suivi des clients en ligne se fait aujourd'hui, d'après le Drive, via un **Google Sheet** (`Programme_CoachNeiram` : fiche client, blocs J1 à J6, séries/reps/RPE, base de ~150 vidéos YouTube Shorts) et un tracker nutrition Excel.

## 3. Chiffres observés (Suivi CA, juillet 2026)

| Indicateur | Valeur | Source |
|---|---|---|
| CA retenu juillet 2026 | 2 725 € | Dashboard |
| Objectif mensuel 2026 | 4 000 € | Dashboard |
| Objectif mensuel 2027 | 5 000 € | Dashboard |
| Clients actifs (septembre 2026) | 16 | Onglet Clients |
| CA projeté septembre 2026 | 3 225 € | Onglet CA mensuel |
| Clients passés en 2026 | 22 (16 actifs, 6 terminés) | Onglet Clients |
| CA moyen / client actif | ~200 €/mois | calcul |
| Projection janvier 2027 | 1 920 € (9 clients) | Onglet CA mensuel |
| Projection décembre 2027 | 400 € (3 clients) | Onglet CA mensuel |

Lecture :

- Les 6 clients terminés avaient tous des engagements courts (1 à 3 mois) et aucun renouvellement n'est enregistré. Le renouvellement n'est pas modélisé : le fichier projette un effondrement mécanique en 2027 qui reflète l'absence de donnée, pas forcément la réalité.
- Grille tarifaire incohérente entre fichiers : CA sheet (240/220/200 €/mois hebdo 3/6/12 mois, 170 € mensuel) vs Parrainage sheet daté août 2026 (280/250/220 €, mensuel 210 €, formule en ligne 130 €/mois). Hypothèse : hausse de tarifs en août. À confirmer.
- Aucun des 22 clients n'est étiqueté « en ligne ». La formule en ligne à 130 €/mois apparaît seulement comme référence de parrainage.
- Le fichier ne contient pas le CA réel encaissé (colonne vide) : tout est projeté à partir des tarifs.
- Une association (« Asso Prompsat ») est cliente : signal pour le pôle B2B / partenariats locaux.

## 4. Positionnements simultanés détectés

Trois cibles coexistent dans les documents :

1. **Débutants à Clermont-Ferrand** (site Wix, Facebook) : présentiel, cœur du CA actuel.
2. **Jeunes papas** (UpTrainer, doc ADS, Calendly « Le Créneau Protégé ») : offre en ligne en construction, section publicité en cours, hooks non rédigés.
3. **Golfeurs amateurs index 15-30** (avatar détaillé du 23 août, offre « Tenir la Carte » v2, protocole échauffement golf, xlsx de suivi v4) : 100 % en ligne, ticket élevé, « à valider avec Sacha ».

Ces trois cibles ne partagent ni le message, ni le canal, ni le niveau de prix. C'est le premier arbitrage stratégique à trancher avant toute automatisation marketing.

## 5. Mécaniques commerciales déjà définies

- Parrainage : le parrain reçoit une réduction égale à son tarif séance si le filleul signe (statut Confirmé).
- Consultation visio/téléphone à 80 €, crédit de 40 € sur le 1er mois si signature sous 10 jours.
- Appel découverte gratuit 30 min via Calendly pour l'offre jeunes papas.

## 6. Outils disponibles dans cette session (connecteurs)

Disponibles : GitHub, Gmail, Google Calendar, Google Drive, Calendly, Notion, Airtable, Canva, Gamma, Firecrawl (recherche web), AdWhispr (recherche et lancement publicités Meta/TikTok/Google), UpTrainerOS, Netlify, Shopify, Docusign, Granola, Wispr Flow, HyperFrames.

Absents : Instagram, Facebook Pages, TikTok, Meta Business. Toute analyse de performance sociale passera par la Meta Graph API (app Meta à créer, compte Instagram professionnel lié à une Page Facebook, OAuth) ou par exports manuels. TikTok : API Display / Content Posting avec approbation d'app, statistiques limitées. À vérifier au moment de MVP 3.

## 7. Questions ouvertes

Voir la liste complète dans le message de session du 2026-09-06 et les réponses à consigner ici avant la conception des agents.

### A. Business et objectifs
1. Statut juridique et régime (micro-entreprise, EURL, SASU) : impact sur le CA net et les seuils.
2. CA réel encaissé mensuel des 8 derniers mois (la colonne est vide dans le fichier).
3. Objectif de revenu mensuel net souhaité et horizon.
4. Heures travaillées par semaine aujourd'hui (séances + déplacements + admin + contenu) et cible.
5. Répartition cible présentiel / en ligne du CA à 12 mois.
6. Contraintes personnelles (famille, autre emploi, jours bloqués).

### B. Présentiel
7. Salle(s) exactes et statut (indépendant en salle, salarié, à domicile, plusieurs lieux).
8. Créneaux hebdomadaires ouverts et créneaux réellement remplis.
9. Durée d'une séance et tarif réel par séance, par formule.
10. Capacité maximale hebdomadaire acceptable en séances.
11. Cours collectifs ou petits groupes existants ou souhaités.
12. Partenariats locaux existants (associations comme Prompsat, entreprises, clubs).
13. Temps de déplacement et de préparation par séance.

### C. En ligne
14. Nombre de clients en ligne actifs aujourd'hui et prix payé.
15. Offre en ligne réellement vendue aujourd'hui : formule 130 €, Créneau Protégé, Tenir la Carte, autre.
16. Prix visé pour Créneau Protégé et Tenir la Carte.
17. Outil de delivery : Google Sheet seul, application, messagerie utilisée (WhatsApp, Instagram DM, email).
18. Temps hebdomadaire réel par client en ligne (programmation, check-in, réponses).
19. Processus d'onboarding actuel étape par étape.
20. Bilan et renouvellement : quand, comment, taux observé.

### D. UpTrainer
21. Confirmation : UpTrainer = incubateur (Steeve Maxime) et non l'app mobile UP Trainer.
22. Étape actuelle dans l'incubateur et prochaine échéance avec Sacha.
23. Décision marché : jeunes papas, golfeurs, ou les deux, et pourquoi.
24. Périmètre d'acquisition : local (Clermont-Ferrand, rayon km) ou national.
25. Budget publicitaire prévu et date de lancement des ads.

### E. Clients et prospects
26. Profil réel des 16 clients actifs : âge, sexe, objectif, source d'acquisition.
27. Raisons d'arrêt des 6 clients terminés.
28. Nombre de prospects en discussion aujourd'hui et où ils sont notés.
29. Nombre de leads mensuels par source sur les 3 derniers mois.
30. Taux de conversion appel découverte → client observé.

### F. Réseaux sociaux et site
31. Identifiant Instagram, nombre d'abonnés, fréquence de publication, compte professionnel lié à la Page Facebook ou non.
32. TikTok : compte existant, abonnés, fréquence.
33. YouTube : rôle (vidéothèque d'exercices ou acquisition).
34. Site Wix : trafic mensuel, formulaires, tracking installé, plan payant ou gratuit.
35. Temps hebdomadaire consacré au contenu et outils de montage.
36. Contenus ayant généré des clients identifiés (lesquels).

### G. Outils et données
37. Où sont les données clients aujourd'hui (Sheets, WhatsApp, tête).
38. Paiement : virement, Stripe, espèces, autre, et facturation.
39. Messagerie principale avec clients et prospects.
40. Préférence pour le stockage du CRM : Notion, Airtable, Google Sheets, base dédiée.
41. Budget mensuel acceptable pour les outils (API, hébergement, abonnements).
42. Compétences techniques : qui maintiendra le système.

## 8. Corrections après l'audit des fichiers (2026-09-06, même jour)

- La source de vérité CA est le Google Sheet `Suivi CA Coaching` (janvier → septembre 2026, virements cochés), pas `Suivi CA CoachNeiram.xlsx` qui est une projection obsolète.
- L'affirmation « zéro renouvellement enregistré » du §3 est fausse : la colonne « date de début » du xlsx est une date de renouvellement. Des renouvellements et changements de formule existent (Sabine P, Christelle C, Loïc P).
- CA brut réel : ≈ 2 900 €/mois en moyenne janvier-août, loyer Fitness Park 400 €/mois depuis avril, URSSAF ≈ 25 %.
- Systèmes existants non vus au premier passage : app client PWA, pipeline de pointage vers `Suivi Coaching en ligne`, 3 PDF Payhip, 4 sites Netlify, pipeline de leads « Bilan coach » de Fitness Park, cours collectifs (Pilates, associations), ancien système « BOS ».

Détail complet : `docs/phase-0/audit-donnees.md`.
