# Du commentaire au rendez-vous — séquence DM Instagram

Rédigé le 08/09/2026 (agent Ventes), à partir des chapitres 11-12 de la vidéo « Comment trouver des clients sur Instagram avec moins de 1000 abonnés » et des règles de `memory/regles.md`. **Statut : validée par Marien le 08/09/2026, en tutoiement.** Messages 1, 2 et relance de silence : niveau B (texte fixe, seul le prénom change). Message 3 (proposition d'appel) et toute mention de prix : niveau C, validation à chaque envoi.

## Le calcul qui justifie l'effort

Chaîne décrite par le créateur : 1 Short avec appel à commenter → 11 commentaires → 11 DM envoyés → 5 réponses qualifiées → 2 ventes. Pour le Créneau Protégé (6 mois, 1 500 € comptant, `memory/offres.md`), deux ventes sur un Short valent 3 000 €. Un Short à 300 vues avec 11 commentaires vaut plus qu'un Short à 4 200 vues sans conversation. Hypothèse de rendement à vérifier sur les 14 premiers jours : 1 vente pour 10 commentaires qualifiés.

Conséquence sur l'appel à l'action des contenus papa : **« Commente PAPA »** plutôt que « DM-moi PAPA ». Le commentaire est public (il pousse le Short), il donne à Marien la liste exacte des personnes à contacter, et un DM entrant reste possible pour ceux qui préfèrent. Décision à prendre par Marien avant le tournage du script 1 (18/09).

## Règle de tri avant d'écrire

Un commentaire « PAPA » ouvre un DM. Un commentaire flatteur ou une question technique reçoit une réponse publique (Community Manager) et un DM seulement s'il vient d'un profil qui correspond à l'avatar (homme, 28-45 ans, mention d'enfants ou photo de famille visible, France). Pas de DM à un compte professionnel, à un autre coach, à un compte sans publication.

Tutoiement (décision de Marien du 08/09) : un prospect qui arrive par un Short en tutoiement est tutoyé en DM. Le vouvoiement reste pour les prospects rencontrés en salle que Marien a vouvoyés en face à face (`memory/positionnement.md`).

## Message 1 — sous 30 minutes après le commentaire (niveau B une fois validé)

Délai issu du chapitre 15 de la vidéo : à 24 h la personne a oublié qu'elle a commenté (« j'ai pas compris de quelle ressource tu parles »). Passer la journée annule le commentaire. Conséquence pratique : publier à une heure où Marien peut répondre dans la demi-heure qui suit (pas avant une séance d'une heure), et activer les notifications de commentaires sur le compte.

> Salut {prénom}, voici la méthode en 1 page promise sous ma vidéo. [PDF « Le Créneau Protégé en 1 page », `docs/acquisition/lead-magnet-papa.md`] Question directe pour que je t'oriente : aujourd'hui, ce qui t'empêche de reprendre, c'est plutôt le temps, l'énergie le soir, ou tu ne sais pas par quoi commencer ?

Le lead magnet est livré dans le même message que la question (chapitre 14 de la vidéo : le contenu gratuit ouvre la conversation, la qualification se fait dedans). Une seule question, trois réponses possibles. Pas de lien externe, pas d'offre, pas de prix.

## Message 2 — après sa réponse (niveau B une fois validé)

Il choisit un des trois freins. Réponse en trois temps : reformuler, donner une vraie piste utilisable sans moi, poser la question de qualification.

- Temps : « Le temps, c'est le frein n°1 des papas que je suis. Ce qui marche : trois créneaux de trente minutes, bloqués dans l'agenda comme des rendez-vous de boulot, chez toi ou au bureau. Une heure trente sur ta semaine. Tu vois plutôt ça sur des pauses déjeuner, un jour de télétravail, ou le week-end ? »
- Énergie : « Le soir, l'énergie n'est jamais là, c'est normal : la séance se place avant que la journée soit finie, pas après. Tu es plutôt matin, pause déjeuner, ou fin d'après-midi ? »
- Par quoi commencer : « Commencer sans plan, c'est ce qui fait arrêter au bout de trois semaines. Je peux t'indiquer un point de départ. Tu as déjà fait de la salle avant les enfants, ou tu pars de zéro ? »

Chaque piste est vraie et suffit à quelqu'un qui ne veut pas aller plus loin. Sa réponse dit s'il est à Clermont (présentiel possible) ou à distance (Créneau Protégé).

## Message 3 — proposition d'appel (niveau C, validation à chaque fois)

> Vu ce que tu me dis, je peux te proposer 20 minutes en visio pour construire ton créneau, sans engagement. Si ça te parle, dis-moi tes deux créneaux possibles cette semaine et je t'envoie le lien.

Pas de lien Calendly dans le premier message d'appel (règle du 06/09 : Marien passe par WhatsApp, Clara aura Calendly). Pas de prix avant l'appel. Si la personne demande le prix par DM : « Le suivi dépend de la formule, on le voit en 20 minutes, ça évite de te donner un chiffre qui ne correspond pas à ton cas. »

## Silence

Une relance à J+2 (« Je te laisse tranquille après ce message : si tu veux le point de départ dont je parlais, dis-moi simplement "oui". »), puis stop. Trois tentatives maximum, tout compris (`memory/regles.md`).

## CRM

Chaque commentaire « PAPA » qui reçoit un DM entre dans le CRM : `node tools/crm.mjs lead --prenom <prénom> --source Instagram --relance-jours 2`. Chaque réponse : `node tools/crm.mjs interaction`. Le compte des commentaires, DM envoyés, réponses, appels et ventes par Short alimente la mesure à J+14 du calendrier.

## Manuel, puis Clara, puis automatisation (chapitre 15)

Ordre du créateur : faire les conversations soi-même, puis confier à un setter, puis automatiser seulement à partir de 20 à 30 commentaires par jour. Cela confirme la mise en pause de ManyChat décidée le 06/09 : le tunnel rédigé (`docs/acquisition/tunnel-manychat.md`) se réactive quand le seuil est atteint, pas avant. Étape 2 = Clara prend les DM entrants avec cette séquence ; Marien garde l'appel.

## Les seules métriques (chapitre 15, 16:56)

Par Short : nombre de commentaires avec le mot-code, nombre de conversations ouvertes (réponse au message 1), nombre d'appels proposés, tenus, ventes. Les vues et les abonnés se lisent, ils ne se pilotent pas. Le rapport du lundi reprend ces cinq chiffres.

## Les deux portes d'entrée

- **Commentaire « PAPA » sous un Short** : Marien ouvre le DM avec le message 1 (PDF + question). C'est lui qui écrit en premier.
- **DM entrant « PAPA »** (la bio l'invite) : même message 1, en réponse. Dans les deux cas le PDF part avec la question, jamais seul.

## Ce que Marien fait, ce que l'équipe fait

- Marien : envoie les DM (compte personnel, aucun outil ne pilote Instagram), tranche tu/vous, valide la séquence une fois.
- Community Manager : chaque jour de publication, liste les commentaires « PAPA » et les profils qui correspondent à l'avatar, avec le message 1 prêt à coller.
- Ventes : prépare le message 2 adapté et le message 3 pour validation, tient le CRM.
