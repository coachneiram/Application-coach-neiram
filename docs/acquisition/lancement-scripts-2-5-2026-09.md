# Dossier de lancement — scripts 2 à 5 (22 au 27 septembre 2026)

Rédigé le 10/09/2026 (agent Acquisition). Même niveau de préparation que le dossier du script 1 (« Le sport ou ta famille ? », publication 18/09) : script figé, séquence de réponse au CTA, checklist avant tournage. Sources : `docs/acquisition/scripts-lot-2026-09.md` (texte des scripts, CTA exacts), `memory/offres.md` (tarifs), `docs/ventes/dm-commentaires.md` et `docs/acquisition/lead-magnet-papa.md` (tunnel PAPA déjà validé), `docs/acquisition/tunnel-manychat.md`, `memory/journal.md` (état du script 1, entrée du 10/09).

Aucun tarif ni fait commercial n'est inventé ici : tout vient des quatre fichiers ci-dessus. Un manque est signalé comme tel, pas comblé.

## Récapitulatif

| # | Titre | Avatar | Objectif | CTA exact (dans le script) | Publication | Canal de réponse |
|---|---|---|---|---|---|---|
| 2 | Essayer seul d'abord | Débutant | TRAITER OBJECTION | « Le Programme Débutant, c'est le plan écrit pour tes premières semaines, 29 euros, lien en bio. » | Mar 22/09, 15h15 | Lien en bio, pas de mot-clé |
| 3 | Ce qu'il y a dans le Programme Débutant | Débutant | CONVERTIR | « Programme Débutant, 29 euros, lien en bio. » | Ven 25/09, 12h00 | Lien en bio, pas de mot-clé |
| 4 | Le Créneau Protégé, pour qui | Papa | CONVERTIR | « Commente "PAPA", je t'envoie ma méthode en 1 page et on voit ensemble si c'est pour toi. » | Sam 26/09, 17h30 | Commentaire PAPA → DM |
| 5 | À 40 ans, trop tard ? | Papa | ATTIRER | « Commente "PAPA", je t'envoie ma méthode en 1 page pour reprendre proprement, à ton rythme. » | Dim 27/09, 17h30 | Commentaire PAPA → DM |

Deux mécaniques différentes, pas une nouvelle par script : les scripts 4 et 5 rejoignent le tunnel papa déjà en place (identique au script 1) ; les scripts 2 et 3 n'ont pas de mot-clé, donc pas de séquence DM à écrire, par décision déjà prise le 08/09 (`docs/acquisition/calendrier-2026-09-14.md`, section « Appels à l'action »).

---

## A. Scripts 4 et 5 (papa) — CTA « Commente PAPA »

### 1. Séquence de réponse

Rien de nouveau à écrire : ce sont les deux mêmes scripts que le script 1 (« Le sport ou ta famille ? »), le même mot-clé, la même promesse (« ma méthode en 1 page »). La séquence validée par Marien le 08/09 s'applique telle quelle :

- **Message 1** (sous 30 min, niveau B) : envoi du PDF « Le Créneau Protégé en 1 page » + question de qualification à trois réponses (temps / énergie / par où commencer). Texte exact dans `docs/ventes/dm-commentaires.md`, section « Message 1 ».
- **Message 2** (niveau B) : reformulation + piste utilisable seul + question de qualification suivante (Clermont ou distance, salle avant enfants ou zéro). Texte dans la même section, « Message 2 ».
- **Message 3**, proposition d'appel 20 min : **niveau C, validation à chaque envoi** (`memory/regles.md`).
- **Silence** : une relance à J+2, puis stop (trois tentatives maximum, `memory/regles.md`).
- **CRM** : `node tools/crm.mjs lead --prenom <prénom> --source Instagram --relance-jours 2` à la première réponse qualifiée ; `node tools/crm.mjs interaction` à chaque échange.

Le message 1 ne cite pas le contenu de la vidéo (« voici la méthode en 1 page promise sous ma vidéo »), donc il fonctionne à l'identique quel que soit le script qui a déclenché le commentaire — confirmé par `docs/acquisition/tunnel-manychat.md` (« Commentaire contenant PAPA sur n'importe quel post ou Reel »). Aucune adaptation par script n'est nécessaire.

### 2. Points spécifiques à vérifier avant tournage

**Script 4** — un point reste ouvert depuis le 08/09, non tranché par Marien (`memory/journal.md`, entrée du 08/09 sur le lot de 21 scripts) : la VO dit *« Au bout de trois mois, tu n'as plus besoin de motivation »*, alors que l'offre Créneau Protégé dure **6 mois** (`memory/offres.md`). Trois lectures possibles : erreur à corriger, ou raccourci voulu (le pilier 1 dure 4 semaines et le pilier 2 va jusqu'à la semaine 16, donc « trois mois » peut désigner une étape intermédiaire plutôt que la fin de l'accompagnement). **Je ne tranche pas** : à confirmer ou reformuler par Marien avant l'enregistrement du 26/09.

**Script 5** — rien de spécifique signalé dans les points de vigilance du lot (`docs/acquisition/scripts-lot-2026-09.md`, section finale). L'affirmation « le muscle répond à l'entraînement à tout âge » et la perte de muscle « à partir de la trentaine » restent dans la liste générale des affirmations à confirmer par Marien (déjà signalée pour le script 5 dans le lot).

### 3. Checklist avant tournage — scripts 4 et 5

- [ ] Script 4 : trancher ou reformuler la mention « trois mois » (voir ci-dessus). Reste ouvert.
- [ ] PDF « Le Créneau Protégé en 1 page » toujours à jour (dernière version envoyée à Marien le 10/09, `memory/journal.md`) — confirmer qu'aucune modification de l'offre n'est intervenue depuis.
- [ ] Carte CTA « Commente PAPA » : déjà produite pour le script 1 (gabarit `template-fond-short-1080x1920.png`, kicker « je t'envoie la méthode en DM »), texte générique donc réutilisable telle quelle pour les scripts 4 et 5 — pas de nouvelle carte CTA à produire.
- [ ] Carte HOOK : à produire pour chaque script (« Trois semaines, et ça s'écroule encore ? » pour le 4, « À 40 ans, c'est trop tard ? » pour le 5) — non faites à ce jour, seule la carte du script 1 existe.
- [ ] Notifications de commentaires activées sur le compte Instagram avant publication (condition du délai de 30 minutes, `docs/ventes/dm-commentaires.md`).
- [ ] Confirmer avec Marien (ou Clara) qui répond aux commentaires PAPA le 26 et le 27/09 — un samedi et un dimanche, hors séances habituelles.

---

## B. Scripts 2 et 3 (débutant) — CTA lien en bio → Programme Débutant 29 €

### 1. Ce qu'il y a à préparer, et ce qu'il n'y a pas

Ces deux scripts ne portent pas de mot-clé : le CTA renvoie directement au lien en bio, décision prise le 08/09 pour les neuf contenus débutant de la quinzaine (« lien bio pour les 9 contenus débutant, aucun DM à gérer », `docs/acquisition/calendrier-2026-09-14.md`). Il n'y a donc **pas de séquence DM automatisée à écrire** pour ces deux scripts — ni ManyChat (en pause depuis le 06/09, `docs/acquisition/tunnel-manychat.md`), ni séquence manuelle : la conversion se fait par clic direct vers Payhip, sans conversation.

Ce qui reste à préparer, dans l'esprit de la routine CLAUDE.md (Community Manager traite les commentaires, DM commercial → Ventes) : des réponses courtes prêtes à coller pour les commentaires publics qui ne sont ni un achat direct ni un mot-clé, pour ne pas laisser Marien improviser sous chaque vidéo. Proposition, à valider, à adapter au ton du moment :

- **Question technique ou objection sur le sujet du script** (ex. sous le script 2 : « moi j'ai testé seul, ça a marché ») → réponse publique courte, jamais d'attaque : *« Tant mieux si ça a tenu pour toi ! Le point du script, c'est que ça part vite en échec sans plan écrit ni correction — si jamais tu doutes sur un exercice, mon Programme Débutant est en lien en bio. »*
- **Demande de prix ou de contenu en commentaire** (ex. « c'est quoi dedans ? », « combien ? ») → réponse publique courte qui renvoie au lien, sans délayer par DM inutile : *« 29 €, tout est détaillé en lien en bio (programme, vidéos, nutrition). »*
- **Profil qui correspond à l'avatar papa malgré tout** (mention d'enfants sous un script débutant) → bascule sur le tunnel PAPA (partie A), pas de DM Programme Débutant : règle de tri déjà écrite dans `docs/ventes/dm-commentaires.md`.
- **Commentaire hors sujet ou spam** → pas de réponse, ou réponse neutre du Community Manager, aucune escalade.

Ces formulations sont des brouillons de préparation, pas des messages envoyés : à valider par Marien comme le reste (`memory/regles.md`).

### 2. Points spécifiques à vérifier avant tournage

**Script 2** — le point « durée réelle du programme à préciser si Marien veut la dire » reste ouvert (signalé dans `docs/acquisition/scripts-lot-2026-09.md`, section finale, et jamais refermé dans le journal depuis). La VO reste volontairement vague (« le plan écrit pour tes premières semaines ») donc le script n'affirme rien de faux en l'état, mais Marien peut vouloir préciser à l'oral.

**Script 3** — décrit le contenu du Programme Débutant en détail : « trois séances par semaine, écrites jour par jour, avec la progression sur plusieurs semaines », « une vidéo de démonstration » par exercice, « une partie nutrition simple, sans régime ». Ces trois affirmations sont listées depuis le 08/09 comme **« à vérifier dans Payhip »** (`docs/acquisition/scripts-lot-2026-09.md`, section « Contenu réel des produits ») et je n'ai trouvé aucune trace, dans `memory/` ou dans le journal, d'une vérification faite depuis. **Donnée manquante** : le contenu exact du PDF Programme Débutant vendu sur Payhip n'est pas confirmé dans la mémoire du projet. Si une des trois affirmations est fausse (pas de vidéo par exercice, par exemple), le script 3 promet quelque chose qui n'existe pas au moment de l'achat — impact direct sur la confiance et sur un remboursement possible. Proposition la plus courte : Marien ouvre le PDF vendu et confirme ou corrige les trois points avant le 25/09.

### 3. Checklist avant tournage — scripts 2 et 3

- [ ] **Script 3 : confirmer le contenu réel du Programme Débutant** (3 séances/semaine, vidéo par exercice, partie nutrition sans régime) contre le PDF vendu sur Payhip. Bloquant si un point est faux.
- [ ] **Lien en bio : non confirmé.** La bio Instagram collée le 08/09 (147 caractères, mot-clé PAPA, `memory/journal.md`) n'est pas documentée avec le lien cliquable qu'elle porte réellement. `memory/business.md` cite un hub `coach-neiram.netlify.app` et des pages produit Netlify séparées (dont `programme-debutant-coachneiram`), sans dire laquelle est en lien de bio aujourd'hui, ni si le hub pointe bien vers la fiche Payhip du Programme Débutant. **Donnée manquante** : à vérifier par Marien directement dans l'app Instagram (Modifier le profil → lien) avant le 22/09, sans quoi le CTA des deux scripts renvoie peut-être vers la mauvaise page ou une page obsolète.
- [ ] **Montant affiché sur la page de destination** : 29 € dans `memory/offres.md` et dans les deux scripts — à vérifier que le prix affiché sur Payhip (ou la page Netlify intermédiaire) correspond bien, pas d'ancien tarif resté en ligne.
- [ ] Carte HOOK à produire pour chaque script (« Essayer seul d'abord, on verra après ? » pour le 2, « 29 euros, il y a quoi dedans ? » pour le 3) — aucune des deux n'existe encore.
- [ ] Carte CTA « Programme Débutant, 29 €, lien en bio » à produire — aucune n'a été faite pour les scripts débutant à ce jour (seule la carte « Commente PAPA » existe, réutilisable uniquement côté papa).
- [ ] Notifications de commentaires activées le jour de publication, même sans mot-clé, pour répondre aux objections et questions sous 30 minutes (même règle que le tunnel papa).

---

## Ce qui est prêt, ce qui ne l'est pas

| | Script 2 | Script 3 | Script 4 | Script 5 |
|---|---|---|---|---|
| Texte VO figé | Oui (lot du 08/09) | Oui | Oui, sous réserve du point « trois mois » | Oui |
| Séquence de réponse au CTA | Pas de DM à écrire (lien bio) ; réponses aux commentaires en brouillon ci-dessus | idem | Réutilise la séquence validée du script 1, rien à écrire | idem |
| Lead magnet / page de destination | **Non confirmé** (lien bio) | **Non confirmé** (lien bio) + **contenu PDF à vérifier** | PDF papa à jour (10/09) | PDF papa à jour (10/09) |
| Carte HOOK | À produire | À produire | À produire | À produire |
| Carte CTA | À produire | À produire | Réutilise celle du script 1 | Réutilise celle du script 1 |
| Checklist avant tournage | Ci-dessus | Ci-dessus | Ci-dessus | Ci-dessus |

## Bloqué faute de donnée (résumé)

1. **Lien en bio Instagram non confirmé** — quelle page il ouvre aujourd'hui, et si cette page mène bien à la fiche Payhip du Programme Débutant à 29 €. Bloque la vérification finale des scripts 2 et 3. Action la plus courte : Marien ouvre l'app Instagram, colle l'URL exacte.
2. **Contenu réel du Programme Débutant (PDF Payhip) non vérifié** — trois affirmations du script 3 (séances écrites, vidéo par exercice, partie nutrition) attendent une confirmation depuis le 08/09. Action la plus courte : Marien ouvre le PDF vendu, confirme ou corrige les trois points.
3. **Script 4, mention « trois mois »** — incohérence non tranchée avec la durée réelle de l'offre (6 mois). Action la plus courte : Marien dit s'il faut corriger le texte ou si « trois mois » vise une étape intermédiaire volontaire.
