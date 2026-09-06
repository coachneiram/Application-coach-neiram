# Phase 1 — Architecture proposée de l'AI Business OS

Date : 2026-09-06. Statut : proposition, en attente de validation. Aucun agent développé.

## 1. Ce que l'audit impose

1. **Le business tourne** : ≈ 2 900 €/mois brut, 16 clients présentiels, présentiel proche de la saturation horaire. Le système sert à piloter et à vendre, pas à « trouver un business ».
2. **Le levier numéro 1 est l'offre en ligne papas** (1 500 € / 6 mois) dont les ads arrivent. Les leads vont tomber dans les semaines qui viennent. Sans CRM ni relance structurée, ils seront perdus. C'est l'urgence.
3. **Le levier numéro 2 est la fidélisation présentiel** : sorties régulières compensées par des entrées ; les renouvellements ne sont pas anticipés.
4. **Beaucoup existe déjà** : app client avec alertes d'adhérence, Sheet CA, scripts de contenu, Calendly, UpTrainer pour l'offre et la pub. Le système se branche dessus.
5. **Tu travailles déjà avec Claude Code** (app migrée avec tests et planning GSD, BOS conçu en CLAUDE.md + skills). L'architecture la plus simple et la plus robuste est donc **Claude Code natif** : le dépôt est le cerveau, les agents sont des fichiers, les connecteurs sont les MCP déjà branchés.

## 2. Principe d'architecture

```
Marien
  │  parle à Claude Code dans ce dépôt (ou reçoit un rapport programmé)
  ▼
ORCHESTRATEUR  = CLAUDE.md du dépôt
  - charge la mémoire centrale
  - route vers l'agent ou le workflow concerné
  - applique la règle READ → ANALYSE → PROPOSE → VALIDATION → ACTION
  - met à jour la mémoire et le journal
  │
  ├── AGENT 1  Pilotage        (CEO + Business Analyst)
  ├── AGENT 2  Ventes          (Sales + CRM follow-up)
  ├── AGENT 3  Acquisition     (Marketing + Content + Social Analyst + Lead Gen local)
  └── AGENT 4  Réussite client (Client Success + support Coaching)
  │
  ├── SKILLS (compétences invocables, pas d'autonomie)
  │     recherche (FAIT / HYPOTHÈSE / RECOMMANDATION), programme-4-semaines,
  │     reel-script, calendrier-editorial, audit-automatisation (trimestriel)
  │
  ├── OUTILS (scripts déterministes, testés, sans IA)
  │     kpi (lit Sheet CA + CRM → indicateurs), crm (lead, interaction, relances dues),
  │     renouvellements (dates de fin), adherence (lit Suivi Coaching en ligne),
  │     calendly-sync (RDV → CRM)
  │
  └── DONNÉES
        Mémoire centrale (markdown versionné, sans donnée personnelle)  → ce dépôt
        Sheet CA (source de vérité CA)                                  → Google Sheets, existant
        Suivi Coaching en ligne (adhérence)                             → Google Sheets, existant
        CRM : leads, interactions, relances, clients                    → Airtable (recommandé) ou Sheet
        Bilan coach Fitness Park                                        → reste chez FP, lecture agrégée seulement
```

Un **agent** existe seulement là où il faut du jugement récurrent sur des données changeantes. Tout ce qui est règle fixe devient un **outil**. Tout ce qui est expertise ponctuelle devient un **skill**.

## 3. Les quatre agents

### Agent 1 — Pilotage (fusion CEO + Business Analyst)

- **Mission** : être ton copilote hebdomadaire. Dire « fais X plutôt que Y cette semaine parce que… ».
- **Pourquoi il existe** : le CA stagne depuis janvier sans que personne ne le mette en face de l'objectif chaque semaine. L'analyse chiffrée et la décision vont ensemble ; les séparer en deux agents crée un intermédiaire inutile.
- **Entrées** : sortie de l'outil `kpi`, CRM, journal de la semaine, mémoire.
- **Sorties** : rapport hebdomadaire (situation en 3 phrases, goulot d'étranglement, 3 priorités, répartition « je fais / tu fais »), mise à jour de la mémoire.
- **Données interdites** : détail des données de santé des clients.
- **Actions autorisées** : lire, calculer, rédiger. **Nécessitant validation** : toute modification d'offre ou de prix.
- **KPI** : objectif mensuel atteint ou non, écart, CA/heure, taux de renouvellement, pipeline.
- **Déclenchement** : chaque lundi par Routine programmée, et à la demande.

### Agent 2 — Ventes (fusion Sales + CRM follow-up)

- **Mission** : ne jamais laisser un prospect disparaître par oubli, et t'aider à convertir sans manipulation.
- **Pourquoi il existe** : les ads papas vont générer des appels découverte via Calendly. Qualification, préparation d'appel, réponse aux objections et relance sont une seule chaîne ; la relance n'a pas de sens sans le contexte de vente.
- **Entrées** : CRM, RDV Calendly, tes comptes rendus d'appels, objections notées, mémoire (offres, prix, scripts, avatar papas, avatar débutant).
- **Sorties** : fiche de préparation d'appel, liste quotidienne des relances dues avec message proposé, analyse d'une conversation, mise à jour du pipeline.
- **Pipeline** : nouveau → contacté → qualifié → conversation → appel → proposition → relance → client → fidélisation → renouvellement → recommandation.
- **Données interdites** : Bilan coach FP (données de tiers).
- **Actions autorisées** : proposer des messages, mettre à jour le CRM. **Nécessitant validation** : envoyer un DM, un SMS, un e-mail, une proposition commerciale.
- **KPI** : délai de première réponse, taux appel → proposition → client, relances en retard = 0.

### Agent 3 — Acquisition (fusion Marketing + Content + Social Analyst + Lead Generation)

- **Mission** : amener des prospects qualifiés dans le CRM, en ligne (papas) et en présentiel (débutants Clermont-Ferrand).
- **Pourquoi la fusion** : un Reel, une pub, un partenariat avec une association et une story existent pour la même raison : produire un lead dans le CRM. Séparer marketing, contenu et analyse crée des messages contradictoires. L'analyse sociale n'a de valeur que si elle nourrit le contenu suivant.
- **Entrées** : mémoire (positionnement, avatars, angles ADS, ton), calendrier, stats Instagram / YouTube / TikTok fournies, résultats Payhip, statistiques agrégées du pipeline Bilan coach FP, recherches locales (associations, entreprises, clubs).
- **Sorties** : calendrier éditorial, scripts (hook, corps, CTA, objectif ATTIRER / ÉDUQUER / CONFIANCE / OBJECTION / CONVERTIR / FIDÉLISER), analyse « quel contenu a produit des leads », liste de partenaires locaux à contacter avec message, angles publicitaires cohérents avec UpTrainer.
- **Données interdites** : identités des prospects du Sheet FP.
- **Actions autorisées** : préparer. **Nécessitant validation** : publier, programmer, contacter un partenaire, lancer ou modifier une campagne.
- **KPI** : leads par source et par semaine, coût par lead sur les ads, contenus ayant produit au moins un lead.

### Agent 4 — Réussite client (fusion Client Success + support Coaching)

- **Mission** : garder les clients, anticiper les renouvellements, et te faire gagner du temps sur la reprogrammation par blocs de 4 semaines.
- **Pourquoi il existe** : les alertes d'adhérence de l'app arrivent dans un Sheet que personne ne relit ; les fins d'engagement ne sont pas anticipées ; la reprogrammation est ton principal poste de temps hors séance.
- **Entrées** : `Suivi Coaching en ligne` (pointages, alertes, résumés hebdo), Sheet CA (dates de fin), bilans hebdo envoyés par les clients, modèle `Programme_CoachNeiram` et base vidéo.
- **Sorties** : liste hebdomadaire des clients à risque avec raison et message proposé, renouvellements à préparer 30 jours avant l'échéance, proposition de bloc suivant à partir du bloc précédent et des commentaires client, que tu valides et ajustes.
- **Garde-fous coaching** : n'émet aucun avis médical, ne modifie pas une séance sans validation, respecte ton niveau de qualification (DEUST Métiers de la Forme, préparateur mental). Une douleur ou une blessure signalée est remontée à toi, jamais traitée par l'agent.
- **Données interdites** : données de santé au-delà de ce que le client a envoyé au coach.
- **Actions autorisées** : analyser, proposer. **Nécessitant validation** : tout message client, toute modification de programme.
- **KPI** : churn mensuel, taux de renouvellement, délai entre alerte et contact, temps de reprogrammation.

## 4. Ce qui n'est pas un agent, et pourquoi

| Demandé dans le brief | Devient | Raison |
|---|---|---|
| Business Analyst | Outil `kpi` + Agent Pilotage | Les indicateurs sont des formules, pas du jugement |
| Content | Skills `reel-script`, `calendrier-editorial` dans Acquisition | Production à la demande, même mémoire que le marketing |
| Social Media Analyst | Outil d'import de stats + skill d'analyse dans Acquisition | Sans connecteur Instagram, l'analyse part d'exports manuels |
| Lead Generation | Skill de recherche locale dans Acquisition | Ponctuel, pas quotidien |
| CRM / Follow-up | Outil `crm` + Agent Ventes | Les relances dues sont un calcul de dates |
| Coaching | Skill `programme-4-semaines` dans Réussite client, avec garde-fous | Remplacer le coach n'est ni souhaité ni sûr |
| Automation | Skill `audit-automatisation` trimestriel | Une revue périodique suffit |
| Research | Skill `recherche` disponible pour tous les agents | Compétence transverse |
| Orchestrateur | `CLAUDE.md` + règles de routage | Pas besoin d'un modèle supplémentaire |

Résultat : 4 agents, 6 skills, 5 outils. Chaque élément a un consommateur identifié.

## 5. Mémoire centrale

Dossier `memory/` dans ce dépôt, markdown versionné, relu par tous les agents, **sans aucune donnée personnelle de client ou de prospect** :

- `business.md` : statut, lieux, offres et tarifs datés, canaux, outils, chiffres de référence.
- `positionnement.md` : cibles (papas en ligne, débutants présentiel), promesse, ton, mots interdits.
- `avatars.md` : avatar papas (à consolider depuis UpTrainer), avatar débutant présentiel.
- `offres.md` : contenu exact de chaque offre, garanties, processus de vente, objections et réponses.
- `regles.md` : règles commerciales, actions nécessitant validation, limites coaching, confidentialité.
- `objectifs.md` : objectif mensuel, horizon, répartition présentiel / en ligne visée.
- `journal.md` : décisions et résultats, append-only.

Le CRM et les données de santé restent hors du dépôt.

## 6. Stockage du CRM : recommandation

**Airtable**, base « CRM CoachNeiram », tables Leads, Interactions, Clients, Renouvellements.

Raisons : le connecteur Airtable de cette session sait créer et modifier des enregistrements sans code, donc les agents écrivent dans le CRM depuis n'importe quelle session. Vues par statut et par date de relance intégrées. Le plan gratuit suffit pour ton volume. Le Sheet CA reste la source de vérité du chiffre d'affaires.

Alternative : Google Sheets. Cohérent avec tes habitudes, mais l'écriture depuis les agents demande un Apps Script supplémentaire, comme celui de l'app. Décision à toi ; le schéma est identique dans les deux cas.

## 7. Intégrations : ce qui est réellement possible

| Système | Voie officielle | Faisabilité | Quand |
|---|---|---|---|
| Sheet CA, Suivi Coaching en ligne | Connecteur Google Drive (lecture) déjà branché ; écriture via Apps Script | Immédiat en lecture | MVP 1 |
| Calendly | Connecteur branché : liste des RDV, invités, réponses aux questions (téléphone). Webhooks officiels `invitee.created` disponibles | Immédiat en lecture ; webhook en MVP 3 | MVP 1 / 3 |
| Gmail | Connecteur branché : créer des brouillons. Envoi seulement sur validation | Immédiat | MVP 1 |
| Google Calendar | Connecteur branché : créneaux réels | Immédiat | MVP 2 |
| Airtable | Connecteur branché, lecture / écriture | Immédiat | MVP 1 |
| UpTrainerOS | Connecteur branché : contexte, documents, parcours, sauvegarde de mémoire et de documents. Pas de données clients | Immédiat, périmètre limité | MVP 1 (lecture) |
| Instagram | Graph API Meta : compte professionnel lié à une Page Facebook, app Meta, OAuth. Insights, commentaires, publication. Messages via l'API Messenger pour Instagram, soumise à revue d'app | Réalisable, 1 à 2 jours de mise en place, revue Meta pour les DM | MVP 3 |
| Facebook Page | Même app Meta : publication, statistiques, commentaires, leads | Idem | MVP 3 |
| TikTok | API Display et Content Posting, app à faire approuver. Statistiques limitées | Réalisable mais faible retour ; exports manuels d'abord | MVP 3 ou jamais |
| WhatsApp personnel | Aucune API. Seul WhatsApp Business Platform (numéro dédié) est intégrable | Non prévu ; copier-coller manuel | Rester humain |
| Payhip | Export CSV des ventes | Manuel | MVP 2 |
| Site (GitHub Pages / Netlify) | Formulaire → webhook → CRM | Réalisable | MVP 3 |
| Ads Meta / TikTok | Connecteur AdWhispr branché (recherche de pubs concurrentes, lancement de campagnes) | À évaluer face à ce qu'UpTrainer fait déjà | MVP 3 |

Confiance élevée sur Google, Calendly, Airtable, Gmail (vérifié dans cette session). Confiance moyenne sur les conditions exactes de revue Meta et TikTok à la date d'aujourd'hui : à revérifier au moment du MVP 3.

## 8. Sécurité et confidentialité

- Aucun secret dans le dépôt. Variables d'environnement et secrets de connecteurs uniquement.
- Aucune donnée personnelle (client, prospect, membre FP) dans le dépôt ni dans la mémoire centrale.
- Actions sensibles (DM, e-mail, SMS, publication, modification d'offre, suppression, modification d'une donnée client, action commerciale) : proposition d'abord, exécution après ton accord explicite, tracée dans le journal.
- Les agents ne lisent jamais le Sheet `Bilan coach` de Fitness Park ligne par ligne. Seules des statistiques agrégées, calculées par toi ou par un outil qui ne conserve rien, entrent dans le système.
- Boucle d'amélioration : chaque correction que tu m'apportes devient une règle dans `memory/regles.md`.

## 9. Priorités et MVP

Ordre de priorité des agents, par impact business sur effort :

1. **Ventes** : les leads ads arrivent, chaque lead perdu vaut 1 500 €.
2. **Pilotage** : sortir du plateau exige une revue hebdomadaire chiffrée.
3. **Réussite client** : chaque départ présentiel coûte 220 à 280 €/mois ; l'app produit déjà les signaux.
4. **Acquisition** : fort potentiel, mais dépend des données Instagram et de la sortie des ads UpTrainer.

### MVP 1 — Fondations et ventes (objectif : 2 semaines)

Livrables :
1. `CLAUDE.md` orchestrateur + `memory/` remplie à partir de l'audit et de tes réponses.
2. CRM créé (Airtable ou Sheet) avec le pipeline complet.
3. Outil `kpi` : lit le Sheet CA, produit CA du mois, écart à l'objectif, clients actifs, renouvellements à 30 et 60 jours.
4. Outil `crm` : ajouter un lead, une interaction, lister les relances dues.
5. Agent Ventes + Agent Pilotage.
6. Routine du lundi : rapport de pilotage envoyé en brouillon Gmail.
7. Tests sur scénarios réels : « prospect qui veut perdre 10 kg mais trouve le prix trop élevé », « prospect silencieux depuis 5 jours », « je veux remplir mes créneaux du mardi soir », « analyse mon offre actuelle ».

Critère de réussite : aucun lead entré dans le CRM sans prochaine action datée ; premier rapport du lundi produit avec les vrais chiffres.

### MVP 2 — Fidélisation et acquisition

Agent Réussite client branché sur `Suivi Coaching en ligne` et les dates de fin ; skill programme 4 semaines. Agent Acquisition avec calendrier éditorial et analyse des exports Instagram ; statistiques agrégées du canal Bilan coach FP.

### MVP 3 — Connecteurs

Webhook Calendly → CRM. App Meta pour Instagram et Facebook. Formulaire site → CRM. Sync UpTrainer (avatar, offre, VSL) vers la mémoire.

### MVP 4 — Automatisation progressive

Brouillons de relance générés automatiquement, jamais envoyés sans toi. Alertes de risque client poussées le matin. Revue trimestrielle d'automatisation.

## 10. Décisions attendues avant de développer

1. Valider ou amender cette architecture (4 agents, 6 skills, 5 outils).
2. Choisir le stockage du CRM : Airtable (recommandé) ou Google Sheets.
3. Confirmer que le golf est mis de côté.
4. Dire si le `Core/` rempli du BOS existe quelque part.
