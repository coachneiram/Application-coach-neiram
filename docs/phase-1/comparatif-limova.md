# Limova.ai face au Business OS de Coach Neiram

Rédigé le 2026-09-06 à la demande de Marien (« reproduire les mêmes agents IA que Limova »). Sources : recherche web du 06/09 (tests tiers : lecarillondigital, ai-first, comparateur-ia, lagent-ia, blogdumoderateur, sparkana). Les pages limova.ai et limova.fr sont bloquées depuis l'environnement, les descriptions d'agents n'ont donc pas été lues à la source.

## FAITS

- Limova vend une équipe de 8 à 9 agents pour TPE/PME : Tom (support client, téléphone et chatbot), John (marketing, réseaux sociaux), Lou (SEO, articles de blog, WordPress/Wix), Elio (prospection : recherche de leads LinkedIn, messages personnalisés, campagnes d'appels sortants, suivi CRM), Charly (assistant général, agenda, e-mails, superviseur des autres agents), Charly+ (Charly piloté depuis WhatsApp), Rony (recrutement), Julia (juridique), Manue (comptabilité).
- Tarifs : essai 7 jours, puis 69,90 € HT/mois (8 agents) ou 119,90 € HT/mois (avec chatbot WhatsApp et gestion des appels).
- Les agents s'exécutent de façon autonome, 24 h/24, sur des règles configurées (ton, horaires, outils). Les tests tiers notent 3 à 5 h/semaine de supervision pour les régler, et une inadaptation aux ventes complexes « nécessitant un conseil humain ».
- Le Business OS actuel a 6 agents (Pilotage, Ventes, Acquisition, Réussite client, Community Manager, Coordination) qui préparent et proposent ; Marien exécute. Règle absolue de `memory/regles.md` : aucun message à un prospect sans validation.

## Correspondance agent par agent

| Agent Limova | Équivalent chez Marien | Écart réel | Utile pour Marien ? |
|---|---|---|---|
| Tom (support, chatbot, appels) | Tunnel ManyChat (en cours), agent Community Manager | Limova répond seul 24 h/24 sur WhatsApp et au téléphone. Ici : réponses automatiques limitées aux scénarios validés (ManyChat), le reste préparé puis envoyé par Marien | Oui, partiellement : l'entrant Instagram est couvert par ManyChat. Le téléphone et WhatsApp automatisés demandent un numéro WhatsApp Business API dédié (le WhatsApp perso de Marien ne peut pas être automatisé) |
| John (marketing, réseaux) | Acquisition + Community Manager + skills `calendrier-editorial`, `reel-script` | Limova publie ; ici Marien publie après validation | Déjà couvert. La publication automatique est une décision de Marien (règle) |
| Elio (prospection LinkedIn, appels sortants) | Ventes (entrant, relances) | Limova fait du sortant à froid. Les papas de Marien ne se prospectent pas sur LinkedIn ; le sortant à froid sur Instagram est interdit par Meta | Non. Le modèle de Marien est entrant (contenu, pubs, bilans FP, parrainage) |
| Charly (assistant, agenda, e-mails, superviseur) | L'orchestrateur `CLAUDE.md` + connecteurs Gmail, Calendar, Calendly, Drive | Équivalent | Déjà couvert |
| Charly+ (pilotage depuis WhatsApp) | Rien | Marien doit ouvrir Claude Code pour parler à son OS | Oui : parler à l'OS depuis le téléphone entre deux séances. Piste : appli Claude mobile sur ce même dépôt (à vérifier), pas WhatsApp |
| Lou (SEO, blog) | Rien | Marien n'a pas de blog ; son acquisition est vidéo et locale | Non maintenant. La fiche Google Business Profile (SEO local « coach sportif Clermont ») vaut plus qu'un blog : à traiter par Acquisition |
| Rony (recrutement) | Rien | Le recrutement de Clara passe par UpTrainer | Non |
| Julia (juridique) | Rien | Micro-entreprise, CGV de l'offre en ligne à écrire une fois | Ponctuel : rédiger CGV et contrat du Créneau Protégé, une tâche, pas un agent |
| Manue (comptabilité) | Outil `kpi.mjs`, Sheet CA, déclaration URSSAF mensuelle | Limova prépare la compta ; ici le Sheet CA fait office | Faible : la déclaration URSSAF prend 10 min/mois |

## HYPOTHÈSES

- Le gain perçu de Limova vient de l'autonomie (les agents agissent sans validation) et de l'interface WhatsApp, pas du nombre d'agents. Pour un coach seul avec un pipeline vide, le goulot est l'entrée de prospects, que ni Limova ni le BOS ne créent sans contenu ou publicité.
- Coût comparé sur 12 mois : Limova 840 à 1 440 € HT, contre ManyChat Pro (≈ 180 €) + l'abonnement Claude déjà payé. Les deux ne sont pas exclusifs : l'essai gratuit de 7 jours de Limova permet de tester Tom sur WhatsApp sans rien construire.

## RECOMMANDATION

Ne pas reproduire les 8 agents. Trois d'entre eux (Elio, Rony, Lou) ne servent pas le modèle de Marien, trois sont déjà couverts (John, Charly, Manue). Ajouter ce qui manque vraiment, dans l'ordre :

1. **Finir Tom côté Instagram** : tunnel ManyChat complet (questions, CRM), c'est en cours.
2. **Charly+** : accès à l'OS depuis le téléphone. Vérifier si l'appli Claude mobile ouvre cette session ou ce dépôt ; sinon, la Routine du lundi par e-mail reste le canal.
3. **Tom côté WhatsApp**, après le lancement des pubs, seulement si le volume de DM dépasse ce que Marien peut traiter : numéro WhatsApp Business dédié, connecté à ManyChat (même outil, canal WhatsApp), mêmes messages que le tunnel PAPA. Décision à prendre en octobre avec les chiffres.
4. **Julia, une fois** : CGV et contrat du Créneau Protégé avant le premier client en ligne.

Ce que ça demande de Marien : décider s'il veut que des agents envoient des messages sans validation. Aujourd'hui la règle l'interdit. Limova ne fonctionne qu'en le permettant.
