# Tunnel ManyChat → Instagram → Calendly → CRM

Rédigé le 2026-09-06 (agent Acquisition + Ventes). **En pause depuis le 06/09, décision de Marien : à reprendre quand le contenu génère des réponses.** Statut : **messages validés par Marien le 06/09**, leads en ligne assignés à Marien jusqu'à confirmation du périmètre de Clara. Rien n'est en ligne tant que Marien n'a pas créé le compte ManyChat et collé les scénarios.

## 1. Ce que fait ce tunnel, et ce qu'il ne fait pas

**Il fait** : quand quelqu'un commente un mot-clé sous un Reel, répond à une story ou écrit en DM, ManyChat lui répond en privé dans la seconde, pose deux questions de qualification, et l'envoie vers l'appel découverte Calendly. Chaque personne qualifiée est écrite dans l'onglet Leads du CRM sans saisie manuelle.

**Il ne fait pas** : de la prospection sortante. L'API Instagram interdit d'écrire à quelqu'un qui n'a pas écrit en premier, et après 24 h sans réponse de la personne, ManyChat ne peut plus rien envoyer. Les relances au-delà de 24 h sont faites par Marien ou Clara, à partir de la liste `node tools/crm.mjs relances`. C'est conforme à `memory/regles.md` : aucun message commercial ne part sans décision humaine, sauf les réponses automatiques que Marien a validées ici.

Deux contraintes techniques qui dictent la forme des messages (confiance élevée) :

- Sous un commentaire, Instagram n'autorise **qu'une seule réponse privée**. Le premier DM doit donc demander un geste (un bouton à toucher) pour ouvrir la conversation.
- Une fois la personne a répondu, ManyChat peut envoyer des messages pendant 24 h. Un seul rappel automatique est prévu, à 23 h, jamais plus.

## 2. Prérequis côté Marien

| Étape | Où | Contrôle |
|---|---|---|
| Compte Instagram en mode professionnel (Créateur ou Entreprise) | Instagram → Paramètres → Type de compte | Le menu « Outils professionnels » apparaît |
| Compte Instagram relié à la Page Facebook « Coach Neiram » | Instagram → Paramètres → Centre de comptes | La Page apparaît dans les comptes liés |
| Accès aux messages autorisé pour les outils connectés | Instagram → Paramètres → Messages et réponses aux stories → Contrôles des messages → « Autoriser l'accès aux messages » | Interrupteur activé |
| Compte ManyChat créé avec le bouton « Se connecter avec Facebook », puis Instagram connecté | manychat.com | Le tableau de bord affiche `@coachneiram` |
| Forfait | ManyChat | Le gratuit suffit pour les scénarios 3.1 à 3.4. L'écriture dans le CRM (section 5) demande l'action « External Request », réservée au forfait Pro (de l'ordre de 15 €/mois pour un petit volume de contacts, à vérifier sur la page tarifs). Confiance moyenne sur ce point : à confirmer à l'inscription. |

Ordre conseillé : tout monter en gratuit, tester, puis passer en Pro le jour où la première pub part.

## 3. Les cinq automatisations

Un seul mot-clé pour l'offre papas : **PAPA**. Un seul pour le présentiel : **SALLE**. Faciles à taper, sans accent, lisibles dans un CTA de Reel (« Commente PAPA »). Dans ManyChat, saisir chaque mot-clé en majuscules et en minuscules, la correspondance se fait sur le message entier ou sur le mot contenu (choisir « contient »).

| # | Déclencheur (ManyChat) | Ce qui se passe |
|---|---|---|
| 3.1 | Commentaire contenant PAPA sur n'importe quel post ou Reel (« Comments Growth Tool », tous les posts) | Réponse publique courte + DM P1 |
| 3.2 | Réponse à une story ou DM contenant PAPA (« Keyword ») | DM P1 |
| 3.3 | Commentaire, story ou DM contenant SALLE | DM S1 |
| 3.4 | Tout DM sans mot-clé (« Default Reply », une fois par 24 h) | DM D1 (menu) |
| 3.5 | Pub Meta « Envoyer un message » (« Instagram Ads » growth tool), le jour du lancement | DM P1, avec la source « Pub Meta » |

Mots-clés de sécurité : `STOP` désabonne la personne (message : « C'est noté, je ne t'écrirai plus automatiquement. »). `HUMAIN` ou `MARIEN` coupe l'automatisation et notifie Marien.

## 4. Les messages

Ton : tutoiement, direct, pas de jargon, pas de promesse chiffrée, aucun témoignage inventé (il n'y a pas encore de client en ligne). Prénom : ManyChat ne récupère pas toujours le prénom sur Instagram, les messages n'en dépendent donc pas. Les réponses proposées entre crochets sont des boutons (« quick replies »).

### 4.1 Tunnel PAPA (Créneau Protégé)

**Réponse publique au commentaire** (ManyChat en tire une au hasard, pour ne pas répéter la même phrase sous 40 commentaires) :
1. « Je t'ai envoyé ça en message privé. »
2. « C'est parti, regarde tes messages. »
3. « Envoyé en privé, dis-moi si tu ne vois rien. »

**P1, premier DM** (une seule réponse privée possible, donc un bouton obligatoire) :
> Salut ! Tu as commenté PAPA sous ma vidéo. Je peux te montrer comment garder un créneau sport dans une semaine de jeune papa, sans rogner sur la famille ni sur le sommeil. Ça t'intéresse ?
> [Oui, montre-moi] [Pas pour moi]

**P2, si « Pas pour moi »** :
> Pas de souci. Si un jour ton créneau sport saute trop souvent, tu sais où me trouver. Bonne journée.
> → tag `papa_non`, fin. Pas de ligne CRM.

**P3, question 1** (si « Oui ») :
> Top. Pour ne pas te répondre à côté, une question : quand tu essaies de t'y remettre, c'est quoi qui lâche en premier ?
> [Le créneau saute] [La motivation, au bout de 3 semaines] [Le dos, le souffle, je suis rouillé] [Je n'ai jamais vraiment commencé]
> → réponse enregistrée dans le champ `cn_frein`.

**P4, question 2** (une phrase d'accroche selon la réponse, puis la même question) :
- Créneau saute : « Classique : le sport passe après tout le reste, et tout le reste ne s'arrête jamais. »
- Motivation : « Trois semaines, c'est la durée normale d'une reprise sans cadre. Ce n'est pas un problème de volonté. »
- Dos, souffle : « Le corps envoie la facture d'un an ou deux sans mouvement. Ça se rattrape, à condition de doser. »
- Jamais commencé : « Alors tu pars sans mauvaise habitude à défaire, ça compte. »
> Et ces six derniers mois, tu as essayé quoi ?
> [Une appli ou des vidéos, seul] [La salle, seul] [Rien, pas le temps] [Un coach, ça n'a pas tenu]
> → réponse enregistrée dans `cn_essai`. **C'est ici que la ligne CRM est créée** (section 5).

**P5, proposition** :
> Merci, c'est clair. Tu sais déjà à peu près quoi faire. Ce qui manque, c'est quelqu'un derrière toi pour que ça tienne au-delà de trois semaines. C'est exactement ce que je fais avec « Le Créneau Protégé ».
> Je te propose un appel de 30 minutes, gratuit, pour voir si ça te correspond. Si ce n'est pas pour toi, je te le dis.
> Tu choisis ton créneau ici : {lien Calendly « Appel découverte - le créneau protégé »}
> [Je réserve] (bouton lien) [J'ai une question avant]

**P6, si « J'ai une question avant »** :
> Vas-y, écris-la ici. Je te réponds moi-même, en général dans la journée.
> → tag `papa_question`, notification à Marien (ManyChat « Notify admin »), automatisation en pause pour ce contact. Marien répond à la main ; l'agent Ventes prépare la réponse si Marien colle la question.

**P7, rappel unique à 23 h** (seulement si aucun clic sur le lien Calendly et pas de « question ») :
> Je te laisse tranquille après ce message. Si tu veux qu'on regarde ensemble comment caler un créneau qui tient, le lien est là : {lien Calendly}. Sinon, aucun problème.
> → fin de l'automatisation. La suite est humaine, via la date de relance du CRM (J+2).

### 4.2 Tunnel SALLE (présentiel Clermont-Ferrand)

**S1** :
> Salut ! Tu as écrit SALLE. Tu t'entraînes, ou tu veux commencer, à Clermont-Ferrand ?
> [Oui, à Clermont] [Non, ailleurs]

**S2, ailleurs** :
> En salle, je coache uniquement à Clermont. À distance, j'accompagne les jeunes papas qui reprennent le sport. C'est ton cas ?
> [Oui] → enchaîne sur P3. [Non] → « Alors je ne suis pas la bonne personne pour toi, et je préfère te le dire. Bonne continuation. » Fin, pas de ligne CRM.

**S3, Clermont** :
> Parfait. Tu es inscrit quelque part aujourd'hui ?
> [Fitness Park Le Brezet] [Une autre salle] [Pas encore]
> → réponse dans `cn_salle`. **Ligne CRM créée ici** (offre « Présentiel », source « Instagram », canal « DM Instagram », statut « Qualifié », assigné Marien, relance J+1).

**S4** :
> Merci. Je te réponds moi-même dans la journée pour voir ce qui est possible : bilan sur place à Fitness Park, ou premier échange par téléphone.
> → notification à Marien, automatisation en pause.

Le présentiel reste humain dès la troisième question, parce qu'aucun rendez-vous présentiel n'existe dans Calendly. Recommandation : créer un événement Calendly « Premier échange présentiel, 15 min, téléphone » et l'insérer dans S4. À décider par Marien.

### 4.3 Réponse par défaut (D1, tout DM sans mot-clé)

> Salut, ici Marien. Je lis et je réponds moi-même à tous les messages, en général dans la journée. En attendant, dis-moi ce qui t'amène :
> [Reprendre le sport, je suis papa] → P3 · [M'entraîner à Clermont] → S3 · [Autre chose] → « Ok, je te lis et je reviens vers toi. » (fin)

Elle ne se déclenche qu'une fois par 24 h et par personne, donc un client qui écrit pour déplacer une séance la voit une fois puis parle à Marien normalement.

## 5. Écriture dans le CRM

Action ManyChat « External Request » placée juste après P4 (et après S3) :

- Méthode `POST`, URL : la valeur de `CRM_URL` (l'URL `/exec` du script), en-tête `Content-Type: application/json`.
- Corps (le secret se colle dans ManyChat, nulle part ailleurs ; il vit déjà dans les propriétés du script et dans l'environnement Claude Code) :

```json
{
  "secret": "<CRM_SECRET>",
  "action": "addLead",
  "lead": {
    "prenom": "{{full_name}}",
    "nom": "@{{ig_username}}",
    "source": "Instagram",
    "canal": "DM Instagram",
    "probleme": "{{cn_frein}}",
    "offre": "Créneau Protégé",
    "interet": 3,
    "statut": "Qualifié",
    "assigne": "Marien",
    "derniere": "aujourdhui",
    "prochaine": "Vérifier si RDV Calendly pris, sinon relancer en DM",
    "relanceJours": 2,
    "notes": "ManyChat mot-clé PAPA. A essayé : {{cn_essai}}"
  }
}
```

- Mapping de la réponse : `$.id` → champ ManyChat `cn_lead_id`. Ce numéro (`L-AAAAMMJJ-nnn`) sert ensuite à Marien ou Clara pour consigner l'appel : `node tools/crm.mjs interaction --lead <id> ...`.
- Pour la pub (3.5), la même requête avec `"source": "Pub Meta"`.
- Pour SALLE : `"offre": "Présentiel"`, `"probleme": "{{cn_salle}}"`, `"relanceJours": 1`, notes « ManyChat mot-clé SALLE ».
- Si Clara fait le setting des leads en ligne (à confirmer, `memory/equipe.md`), remplacer `"assigne": "Marien"` par `"Clara"` dans le tunnel PAPA uniquement.

Deux champs ont été ajoutés au script `apps-script/crm.gs` pour ça : `relanceJours` (date de relance = aujourd'hui + N, calculée côté script, ManyChat ne sachant pas le faire) et `derniere: "aujourdhui"` (remplit « Dernière interaction » à la création). **Marien doit recoller le script mis à jour dans l'éditeur Apps Script et redéployer** (Déployer → Gérer les déploiements → modifier → nouvelle version). L'URL ne change pas.

Ce que le CRM ne verra pas seul : la réservation Calendly. Le rapport du lundi croise le connecteur Calendly avec les leads « Qualifié » du CRM ; Marien ou Clara passe le lead en « Appel » quand le RDV est pris.

## 6. Mise en place, dans l'ordre (environ une heure)

1. Prérequis Instagram (section 2). Contrôle : ManyChat affiche le compte connecté.
2. Créer les champs personnalisés : `cn_frein`, `cn_essai`, `cn_salle` (texte), `cn_lead_id` (texte), `cn_source` (texte). Créer les tags `papa_non`, `papa_question`, `papa_qualifie`, `salle_qualifie`.
3. Construire le flux PAPA (P1 à P7) dans « Automation → New Flow ». Nommer `PAPA - Créneau Protégé`.
4. Brancher les déclencheurs 3.1 (Comments, tous les posts, mot-clé PAPA, réponse publique aléatoire) et 3.2 (Keyword PAPA sur DM et story).
5. Construire le flux SALLE (S1 à S4), déclencheur 3.3.
6. Régler la « Default Reply » (D1) et les mots-clés `STOP`, `HUMAIN`.
7. Test depuis un autre compte Instagram : commenter PAPA sous le dernier Reel. Attendu : réponse publique, DM P1 en moins de 10 s, boutons qui fonctionnent, P5 avec le lien Calendly cliquable.
8. Seulement après le test : forfait Pro, action External Request (section 5), nouveau test. Contrôle : `node tools/crm.mjs leads --statut Qualifié` affiche la ligne, avec « Dernière interaction » et « Date relance » remplies. Supprimer la ligne de test à la main.
9. Ajouter le CTA « Commente PAPA » aux Reels papas du calendrier éditorial (skill `calendrier-editorial`), et garder les CTA Payhip sur les Shorts « mythes ». Un CTA par contenu.

Marien peut m'envoyer une capture d'écran à chaque étape, je guide à partir de l'écran.

## 7. Ce qu'on mesure chaque lundi

| Indicateur | Où | Seuil de lecture |
|---|---|---|
| Commentaires PAPA / SALLE | ManyChat (déclenchements) | 0 sur la semaine : le CTA n'est pas dit ou pas vu, problème de contenu |
| Taux « Oui » à P1 | ManyChat | < 50 % : le P1 promet mal |
| Arrivées à P5 | ManyChat | l'écart P3 → P5 mesure la qualification |
| Clics Calendly | ManyChat (bouton lien) | |
| RDV pris | Connecteur Calendly | l'indicateur qui compte |
| Leads CRM créés, et sans action depuis 48 h | `node tools/crm.mjs leads`, agent Coordination | |

Hypothèse de départ, sans aucune donnée : 10 commentaires PAPA → 5 « Oui » → 3 arrivées à P5 → 1 RDV. À corriger avec les vrais chiffres dès la deuxième semaine.

## 8. Décisions attendues de Marien

1. ~~Valider chaque message de la section 4~~ Fait le 06/09.
2. Mot-clés PAPA et SALLE : ok, ou autres.
3. ~~Assigné des leads en ligne~~ Marien, décidé le 06/09. À rebasculer sur Clara quand son périmètre est confirmé.
4. Créer ou non un événement Calendly présentiel de 15 min.
5. Date de passage en forfait Pro (recommandation : la semaine du lancement des pubs, fin septembre).
