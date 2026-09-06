# Phase 0 — Audit des fichiers et des données

Date : 2026-09-06
Périmètre : tout ce qui était lisible via les connecteurs (Drive, UpTrainerOS, Calendly, Netlify, Notion, Airtable, web public). Aucun fichier source modifié. Aucune donnée personnelle de client ou de prospect recopiée dans ce dépôt.

Fichiers volontairement non lus : « Marien Perso », « Personnes autorisées à venir chercher l'enfant », photos, « Contrat Charlène », diplômes. Hors périmètre business ou trop personnels.

## 1. Inventaire des sources trouvées

| # | Fichier / système | Type | Données | Qualité | Utilisable par | Confidentialité |
|---|---|---|---|---|---|---|
| 1 | `Suivi CA Coaching` (Google Sheet, créé 01/2026, modifié 04/09) | Suivi CA réel | Par mois et par client : tarif, virement reçu, CA brut, loyer Fitness Park, bilans, CA net, URSSAF | **Source de vérité CA.** Complète janvier → août, septembre en cours. Colonne « CA annuel » incohérente avec la somme des mois (voir §3) | Business Analyst, CEO, CRM | Noms de clients : privé |
| 2 | `Suivi CA CoachNeiram.xlsx` (07/2026) | Projection CA | Grille tarifaire, liste clients avec durée d'engagement, projections 2026-2027 | **Obsolète et incomplète** : 10 clients/lignes absents par rapport au fichier 1, tarifs anciens, CA réel jamais saisi, « date de début » = date de renouvellement et non de première signature | Analyst (modèle de projection seulement) | Privé |
| 3 | `Suivi Parrainage CoachNeiram-1.xlsx` (08/2026) | Mécanique commerciale | Tarifs août 2026, règle parrainage, consultation 80 € avec crédit 40 € sous 10 jours | Bonne. Une seule ligne d'exemple, jamais utilisé en réel | Sales, CRM | Faible |
| 4 | `Suivi Coaching en ligne` (Google Sheet, 29/08) | Pipeline automatisé en construction | Onglets : pointages séances (client, créneau, retard, RPE), erreurs JSON, résumé hebdo (tenus/manqués/décalés, % respect), alertes (`alerte_seances_manquees`, `alerte_decalages`, `semaine_difficile`, `resume_hebdo`), dashboard | Uniquement des tests (« Test manuel », « TEST PROXY », « Test chaîne ») datés du 30/08 au 06/09. Le dashboard affiche `#N/A` | Client Success | Privé |
| 5 | `Programme_CoachNeiram` (Sheet modèle) + `Programme_<Client>` (≈ 20 fichiers) + `Programme vierge` | Delivery coaching | Fiche client, blocs J1-J6, séries/reps/RPE/charges, commentaires client, base de ≈ 150 exercices avec lien YouTube Shorts, script `lien_video_auto.gs` | Bonne structure. Nommage hétérogène (« Programme_Sabine_P », « Christelle Sabatier », « Vic 🤓 », « Tétard 🐸 ») | Coaching, Client Success | Privé (blessures, précautions) |
| 6 | `Tracker Nutrition CoachNeiram.xlsx` + 6 copies clients | Outil nutrition | Harris-Benedict, TDEE, macros, tables d'aliments, menus 7 jours, liste de courses | Bonne. **Doublon** : deux « Tracker Nutrition Dimitri.xlsx » | Coaching | Privé (poids, âge) |
| 7 | `Guide_App_-_Clients.pdf` (16/08) | Onboarding app client | Décrit une PWA : journal repas/hydratation/poids/sommeil/pas, Coach IA nutrition, Tendances, « Bilan IA » hebdo envoyé au coach par WhatsApp ou mail, données stockées sur le téléphone | Bonne | Client Success, Coaching, Automation | Contient un numéro de téléphone pro |
| 8 | `2026-08-10_lancement-coaching-en-ligne.md`, `2026-08-10_lancement-pdf.md`, `Pack_lancement_chaîne.md`, `Scripts_Shorts_nutrition.md` | Copies marketing prêtes | Post, stories, DM types, offre en ligne 130 €/mois, 3 PDF Payhip (29 €, 29,99 €, 49 €), 14 scripts de Shorts + 16 mythes suivants, SOP production, tableau J+14 | Bonne. Références à un système antérieur « BOS », `Core/Actions.md`, « Diagnosis #1-3 » | Content, Marketing, Sales | Faible |
| 9 | `ADS Marien PELISSIER` (30/08) | Brief publicitaire jeunes papas | Douleurs, fausses solutions, 5 angles | Incomplet : hooks, leads, body, closing vides | Marketing, Content | Faible |
| 10 | `Avatar_Client_Golfeurs_CoachNeiram.docx` (23/08) | Avatar client | 12 sections, verbatims tagués terrain / web / à valider | Très bonne. À valider avec Sacha (UpTrainer) | Marketing, Sales, Content | Faible |
| 11 | Drive UpTrainer (9 fichiers, métadonnées seulement) | Fondations incubateur | `Offre - Coach Neiram.docx` (2 versions), `Avatar_Client_Papas`, `Offre_Tenir_la_Carte_v2`, `Protocole_Echauffement_Recuperation_Golf`, `Tenir_la_Carte_Suivi_v4.xlsx`, ADS | **Non lisibles** depuis cette session (accès métadonnées + lien) | Marketing, Sales | Faible |
| 12 | `Bilan coach` (Sheet partagé par Fitness Park Clermont, ≈ 2 000 lignes) | Pipeline de leads salle | Nouveaux abonnés FP : nom, prénom, date d'inscription, abonnement, commercial, coach attribué (Marien, Justin, Guillaume, Kevin), date du bilan, statut, téléphone, commentaires de relance | Riche. Beaucoup de « Contacté mais aucune réponse (message lu) » sur les lignes Marien | Lead Generation, Sales, CRM | **Données personnelles de tiers appartenant à Fitness Park. Jamais copiées dans le dépôt, jamais dans la mémoire des agents. Statistiques agrégées uniquement.** |
| 13 | `Facture <client>` (5 Sheets) | Facturation | Factures manuelles | Non lues en détail | Analyst | Privé |
| 14 | Calendly | Prise de RDV | 1 type d'événement actif + son clone | Doublon à supprimer | Sales, CRM | Faible |
| 15 | Netlify (4 sites) | Sites | `coaching-programme`, `programme-maison`, `programme-debutant-coachneiram`, `coachneiram-prepamentale`. Formulaires Netlify désactivés partout | Les URL citées dans les docs (`application-coachneiram.netlify.app`, `coach-neiram.netlify.app`) **n'apparaissent pas** dans ce compte Netlify | Marketing, Automation | Faible |
| 16 | Site Wix `coachneiram.wixsite.com/coachneiram`, Facebook (≈ 222 likes), YouTube @CoachNeiram | Présence publique | Positionnement « débutants, sans se blesser », Clermont-Ferrand | Wix probablement obsolète face aux sites Netlify | Marketing | Public |
| 17 | Notion (1 page to-do), Airtable (vide), Google Calendar (1 agenda perso) | Outils | Rien d'exploitable | | | |

## 2. Systèmes déjà en place (à ne pas reconstruire)

1. **Delivery coaching** : Google Sheets par client + base vidéo YouTube + tracker nutrition Excel. Fonctionne, hétérogène.
2. **App client PWA** (journal, Coach IA nutrition, bilan IA hebdo). Code source non trouvé dans ce dépôt ni dans le compte Netlify listé.
3. **Pipeline de pointage / alertes** vers `Suivi Coaching en ligne` : un émetteur envoie du JSON (tests « TEST PROXY » les 5-6 septembre). Correspond à la promesse « Le Créneau Protégé » (créneaux tenus / manqués / décalés).
4. **Produits numériques** : 3 PDF vendus via Payhip, sites Netlify dédiés.
5. **Système antérieur « BOS »** avec `Core/Actions.md` et des « Diagnosis » numérotés. Non retrouvé sur le Drive.
6. **Pipeline de leads Fitness Park** : bilans offerts aux nouveaux abonnés, attribués par coach, relancés par SMS.
7. **Cours collectifs** : Pilates (240-320 €/mois), Asso Temps Danse, Asso Prompsat, « Cours Co FP », « Cours Co Asso » à partir de septembre.
8. **Contenu** : 14 scripts de Shorts prêts, SOP faceless, CTA vers PDF et coaching en ligne.

## 3. Contradictions entre sources (à trancher par toi, pas par moi)

| Sujet | Source A | Source B | Question |
|---|---|---|---|
| CA juillet 2026 | `Suivi CA CoachNeiram.xlsx` : 2 725 € (projeté) | `Suivi CA Coaching` : 2 970 € brut encaissé | Je retiens B comme source de vérité. Confirmes-tu ? |
| CA annuel brut | Somme des mois janvier-août dans `Suivi CA Coaching` : 23 165 € | Cellule « CA annuel brut » du même fichier : 20 745 € | Quelle formule alimente cette cellule ? |
| Tarifs hebdo 3/6/12 mois | xlsx juillet : 240 / 220 / 200 €, mensuel 170 € | Parrainage août : 280 / 250 / 220 €, mensuel 210 €, en ligne 130 € | Hausse en août ? Appliquée aux anciens clients ou seulement aux nouveaux ? |
| Date de début client | xlsx : Sabine P début 31/07/2026, Christelle C début 07/09/2026 | Sheet CA : Sabine cliente depuis janvier au moins, Christelle C depuis janvier | La colonne xlsx est une date de renouvellement. Mon affirmation initiale « zéro renouvellement » était fausse : des renouvellements existent, ils sont saisis comme nouvelles lignes |
| Liste clients | xlsx : 22 clients | Sheet CA : + Evelyne I, Élodie F, Sofian H, Rahma K, Asso Temps Danse, Pilates, Cassandra L, Eva T, cours collectifs | Le xlsx est-il abandonné ? |
| Prix coaching en ligne | Lancement 10/08 : 130 €/mois | Avatar golf : ticket « 10 à 20 fois » au-dessus de 30-100 €/mois | Deux offres en ligne à deux prix, ou une seule ? Prix du Créneau Protégé ? |
| Sites web | Docs : `application-coachneiram.netlify.app`, `coach-neiram.netlify.app` | Compte Netlify : `coaching-programme`, `programme-maison`, `programme-debutant-coachneiram`, `coachneiram-prepamentale` | Où sont hébergés l'app client et le hub ? Autre compte, autre équipe ? |
| Statut avec la salle | Loyer FP 400 €/mois depuis avril | Photos publiques « at Fitness Park Le Brezet » | Indépendant payant un loyer d'occupation ? Contrat, exclusivité, conditions ? |
| Régime | Cotisations URSSAF ≈ 25 % du brut | Aucune mention de statut | Micro-entreprise BNC ? Confiance moyenne |

## 4. Chiffres corrigés (source : `Suivi CA Coaching`)

| Mois 2026 | CA brut encaissé | Loyer FP | Clients / lignes facturées |
|---|---|---|---|
| Janvier | 2 550 € | 0 € | 13 |
| Février | 2 780 € | 0 € | 16 |
| Mars | 2 990 € | 0 € | 16 |
| Avril | 2 725 € | 400 € | 15 |
| Mai | 2 820 € | 400 € | 15 |
| Juin | 3 550 € | 400 € | 20 |
| Juillet | 2 970 € | 400 € | 18 |
| Août | 2 780 € | 380 € | 17 |
| Septembre (en cours) | 1 100 € encaissés, ≈ 3 200 € attendus | 400 € | 18 lignes dont 2 cours collectifs |

Lecture :
- Moyenne brute ≈ 2 900 €/mois, plateau depuis janvier. Objectif 4 000 € jamais atteint. Meilleur mois : juin, porté par 4 nouveaux clients et le Pilates.
- Le loyer représente environ 7 séances par mois avant le premier euro net.
- Panier moyen par ligne ≈ 165-185 €/mois. Séance individuelle facturée ≈ 45-70 € selon la formule.
- La croissance vient d'arrivées (juin, septembre) compensées par des sorties : Olivier, Florent, Sarah, Alexis, Chloé, Élodie, Sofian, Rahma, Grace, Evelyne (0 € en juillet-août, 320 € prévu en septembre).
- Aucun client identifiable comme « en ligne » dans le CA. Le coaching en ligne est à zéro revenu à ce jour, sauf preuve contraire.

## 5. Structure de données cible (proposition, à valider)

Le CRM et la mémoire centrale n'existent pas. Je propose ces entités, indépendamment de l'outil de stockage :

- **Client** : id, prénom, nom, canal (présentiel / en ligne / collectif), source d'acquisition, date de première signature, statut, raison d'arrêt.
- **Abonnement** : client, offre, tarif mensuel, date début, date fin prévue, renouvelé oui/non.
- **Paiement** : client, mois, montant, reçu oui/non.
- **Offre** : nom, canal, prix, durée, contenu, date de validité (historise les changements de tarifs).
- **Lead** : id, prénom, source (FP bilan, Instagram, bouche-à-oreille, site, asso), date, problème, objectif, statut pipeline, dernière interaction, prochaine action, date de relance, résultat.
- **Interaction** : lead ou client, date, canal, résumé, prochaine étape.
- **Séance** (présentiel et en ligne) : client, date, créneau, tenue / manquée / décalée, RPE.
- **Contenu** : plateforme, date, format, hook, objectif, CTA, vues, clics, leads attribués.
- **KPI mensuel** : calculé, jamais saisi.

Les données personnelles restent dans le store privé. Le dépôt GitHub ne contient que la structure, les règles et les agents.

## 6. DONNÉES DONT J'AI BESOIN

### 🔴 INDISPENSABLES

| Donnée | Pourquoi | Format | Agent | Impact |
|---|---|---|---|---|
| Confirmation que `Suivi CA Coaching` est la source de vérité, et explication de la cellule « CA annuel » | Toute analyse business part de là | Réponse texte. L'accès existe déjà | Analyst, CEO | Chiffres justes dès le premier rapport |
| Grille tarifaire et offres en vigueur, datées | Deux grilles contradictoires | Texte ou un onglet « Offres » dans le Sheet CA | Sales, CRM, Analyst | Propositions et projections cohérentes |
| Décision de cible pour 12 mois | Trois positionnements incompatibles | Réponse texte | Tous | Sans elle, aucun agent marketing ou content ne peut être calibré |
| Pour chaque client actif : canal, source d'acquisition, date de première signature | Le Sheet CA n'a ni canal ni source | 3 colonnes ajoutées au Sheet CA, ou liste dans ta réponse | CRM, Client Success, Analyst | CA/canal, CA/source, LTV, churn réels |
| Semaine type en heures : séances, cours collectifs, déplacements, programmation, contenu, admin | Impossible de calculer CA/heure et capacité | Texte | CEO, Analyst | Priorisation des automatisations par temps gagné |
| Ancien « BOS » (`Core/Actions.md`, Diagnosis, mémoire) | Décisions passées, ton, offres déjà arbitrées | Dossier zip, lien Drive, ou commit dans ce dépôt | Mémoire centrale | Évite les contradictions et le retravail |
| Code source de l'app client PWA et des sites Netlify, et compte qui les héberge | Sinon je ne peux ni brancher le bilan IA hebdo ni les formulaires | Lien dépôt GitHub ou dossier | Automation, Client Success | Intégration réelle au lieu de copier-coller |
| Identifiant Instagram + export Insights 90 jours (Meta Business Suite → export, ou captures) | Aucun connecteur Instagram disponible | CSV ou captures dans Drive | Social, Content | Premier diagnostic contenu → business |

### 🟠 TRÈS UTILES

| Donnée | Pourquoi | Format | Agent | Impact |
|---|---|---|---|---|
| Prospects en discussion aujourd'hui (nom, source, dernier contact, prochaine action) | Amorcer le CRM avec du réel | Liste texte ou Sheet | CRM, Sales | Relances dès la semaine 1 |
| Raisons d'arrêt des clients partis en 2026 | Modéliser le churn | Une ligne par client | Client Success | Alertes de risque d'abandon fondées sur tes vrais cas |
| 5 à 10 conversations types (DM, WhatsApp) anonymisées, avec l'issue | Calibrer les réponses aux objections | Captures ou texte | Sales | Scripts fidèles à ton ton |
| Script d'appel découverte actuel et objections fréquentes | Base de l'agent Sales | Texte | Sales | Préparation d'appel utile |
| Questionnaire d'onboarding et bilan initial client | Base de l'onboarding en ligne | Doc ou Sheet | Coaching, Client Success | Onboarding standardisé |
| Règle de traitement du « Bilan coach » FP et taux bilan → client observé | Premier canal de leads présentiel | Texte, chiffres agrégés seulement | Lead Gen, Sales | Optimiser le canal qui rapporte déjà |
| Témoignages, avis Google, résultats clients | Preuve sociale | Liens ou texte | Content, Marketing | Contenu de conversion |
| Ventes Payhip (nombre, dates, produit) | Mesurer le canal PDF | Export CSV Payhip | Analyst | ROI réel des Shorts |
| État des 14 Shorts prévus : publiés ? vues ? clics ? | Le plan J+14 a-t-il été exécuté | Tableau du pack rempli | Content, Social | Décision scale / retravail |
| Documents UpTrainer en docx (Offre Coach Neiram, Avatar Papas, Offre Tenir la Carte, Accompagnement premium) | Non lisibles via le connecteur | Copie dans ton Drive perso ou export | Marketing, Sales | Alignement avec le travail Sacha |
| Statistiques YouTube, TikTok, Facebook | Compléter le diagnostic | Captures ou exports | Social | Choix du canal prioritaire |

### 🟢 OPTIONNELLES

| Donnée | Pourquoi | Format | Agent | Impact |
|---|---|---|---|---|
| Programmes clients détaillés, trackers nutrition | Agent Coaching avancé | Accès Drive déjà en place | Coaching | Génération de blocs dans ton style |
| Factures | Rapprochement paiements | Sheets existants | Analyst | Fiabilité comptable |
| Contrat type | Automatiser l'envoi | Doc | Automation | Onboarding plus rapide |
| Diplômes et qualifications exactes | Limites de l'agent Coaching | Texte | Coaching | Garde-fous corrects |
| Agenda Google réel des créneaux | Remplissage par créneau | Accès existant | Analyst, Lead Gen | Créneaux les plus rentables |

## 7. Ce que nous pouvons commencer sans

- **Sans Instagram Insights** : nous pouvons construire la mémoire centrale, le CRM, les agents CEO / Sales / CRM. Nous ne pourrons pas optimiser les hooks ni attribuer des leads aux contenus.
- **Sans l'ancien BOS** : nous repartons de ce qui est sur le Drive. Risque de contredire des décisions passées non documentées ici.
- **Sans la liste de prospects** : le CRM démarre vide et se remplit avec les prochains leads.
- **Sans le code de l'app client** : l'agent Client Success travaillera sur les bilans envoyés par WhatsApp ou mail, sans intégration automatique.
- **Sans les raisons d'arrêt** : les règles de risque d'abandon seront génériques (retards, séances manquées, silence) au lieu d'être calibrées sur tes cas.

Le système sera construit pour que chacune de ces données s'ajoute plus tard sans refonte.

## 8. Note sur l'architecture des agents (position préliminaire)

La liste de 13 agents du brief est une base de réflexion. Position actuelle, à confirmer après tes réponses :

- Plusieurs fonctions listées comme agents seront des **outils ou workflows** déterministes (calcul des KPI, relances à date, détection de séances manquées, calendrier éditorial). Un agent n'est justifié que lorsqu'il faut du jugement.
- Plusieurs agents fusionnent probablement : CEO + Business Analyst ; Marketing + Content + Social Analyst ; Sales + CRM ; Client Success + Coaching (support) ; Lead Generation + Research.
- L'orchestrateur reste. La mémoire centrale est le premier livrable.

L'architecture détaillée, avec la justification de chaque agent et le MVP, sera présentée après réception des données 🔴.
