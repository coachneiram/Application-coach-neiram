# Business — état actuel

Mise à jour : 2026-09-06. Sources : audit Phase 0, réponses de Marien du 06/09, Sheet `Suivi CA Coaching`.

## Identité

- Marque : **Coach Neiram**. Coach : Marien Pelissier. Clermont-Ferrand (63).
- Qualifications : DEUST Métiers de la Forme, préparateur mental. Formation en nutrition sportive suivie (à confirmer : diplôme obtenu ou en cours).
- Statut juridique : micro-entreprise probable (cotisations ≈ 25 % du brut dans le Sheet CA). À confirmer.
- Ancienneté : environ 5 ans de coaching présentiel (post de lancement d'août 2026).

## Deux pôles

| Pôle | Cible | Lieu / canal | État |
|---|---|---|---|
| Présentiel | Débutants qui veulent s'entraîner sans se blesser, avec méthode et confiance | Fitness Park Clermont-Ferrand Le Brezet (loyer 400 €/mois depuis avril 2026), associations locales, cours collectifs | Cœur du CA, proche de la saturation horaire |
| En ligne | Jeunes papas en reprise de sport (« Le Créneau Protégé ») | App client + visio + WhatsApp, appel découverte Calendly | Lancement en cours, publicités Meta avec UpTrainer prévues fin septembre / début octobre 2026 (Marien, 06/09), aucun revenu identifié à ce jour, aucun prospect en discussion au 06/09 |

Mis de côté (décision du 06/09) : offre golfeurs « Tenir la Carte ». Documents conservés dans le Drive UpTrainer.

## Chiffres de référence (Sheet `Suivi CA Coaching`, présentiel uniquement)

| Mois 2026 | CA brut encaissé | Loyer FP | Lignes facturées |
|---|---|---|---|
| Janvier | 2 550 € | 0 € | 13 |
| Février | 2 780 € | 0 € | 16 |
| Mars | 2 990 € | 0 € | 16 |
| Avril | 2 725 € | 400 € | 15 |
| Mai | 2 820 € | 400 € | 15 |
| Juin | 3 550 € | 400 € | 20 |
| Juillet | 2 970 € | 400 € | 18 |
| Août | 2 780 € | 380 € | 17 |
| Septembre | en cours | 400 € | 18 lignes dont 2 cours collectifs |

- Moyenne janvier-août : ≈ 2 900 €/mois brut. Plateau.
- Clients actifs début septembre : 16 individuels + cours collectifs (Pilates, associations Temps Danse et Prompsat, cours co Fitness Park).
- Panier moyen par ligne : ≈ 165-185 €/mois.
- Heures de coaching présentiel : 20 à 35 h/semaine (déclaré). CA brut par heure de coaching : ≈ 20 à 32 €/h avant loyer et URSSAF (estimation).
- Reprogrammation : par blocs de 4 semaines, temps proportionnel au nombre de programmes.
- Admin : report du CA une fois par mois, déclaration URSSAF.
- Question ouverte : la cellule « CA annuel brut » du Sheet (20 745 €) ne correspond pas à la somme des mois (23 165 €).

## Canaux et présence

- Instagram `@coachneiram` (statistiques non fournies).
- Facebook « Coach Neiram » (≈ 222 mentions J'aime).
- YouTube `@CoachNeiram` : vidéothèque d'exercices (Shorts) + chaîne à relancer avec 14 scripts « 1 mythe par jour » prêts.
- TikTok : cross-post prévu, état inconnu.
- Sites : hub `coach-neiram.netlify.app` cité dans les docs (compte Netlify à vérifier), pages produits Netlify (`coaching-programme`, `programme-maison`, `programme-debutant-coachneiram`, `coachneiram-prepamentale`), ancien site Wix.
- Produits numériques sur Payhip : Programme Débutant 29 €, Programme Maison 29,99 €, Pack Mental 49 €.
- Prise de RDV : Calendly `calendly.com/coachneiram`, « Appel découverte - le créneau protégé » (30 min, Google Meet, téléphone obligatoire). Un doublon « (clone) » à supprimer.
- Leads présentiel : bilans offerts aux nouveaux abonnés Fitness Park, attribués par coach (Sheet « Bilan coach » appartenant à la salle, données de tiers, lecture agrégée seulement), bouche-à-oreille, parrainage, associations.

## Outils en place

| Outil | Rôle | Intégration |
|---|---|---|
| Sheet `Suivi CA Coaching` | Source de vérité CA présentiel | Lecture via connecteur Drive |
| Sheet `Suivi Coaching en ligne` | Pointages, alertes d'adhérence, résumés hebdo envoyés par l'app | Lecture via connecteur Drive ; écrit par `coach-sync.gs` |
| Sheet `CRM CoachNeiram` (dossier Drive « AI Business OS », créé le 06/09/2026, onglet Clients prérempli) | Leads, interactions, clients | Lecture Drive ; écriture via `apps-script/crm.gs` une fois déployé par Marien |
| App client `coach-neiram-app` (GitHub Pages) | Journal, nutrition, séances, bilans IA, alertes coach | Proxy Cloudflare `coach-neiram-proxy` (Gemini + `/coach-sync`) |
| Sheets `Programme_<client>` + base vidéo YouTube | Delivery des programmes | Manuel |
| Trackers nutrition Excel | Delivery nutrition | Manuel |
| Calendly | Appels découverte | Connecteur (lecture) |
| Gmail, Google Calendar | Communication, agenda | Connecteurs |
| UpTrainerOS | Incubateur : avatar, offre, VSL, pubs, recrutement setter/closer | Connecteur (contexte, documents, parcours) |
| WhatsApp personnel | Communication clients | Aucune intégration possible |
| CapCut, Canva | Production de contenu | Canva : connecteur disponible |
