# Du commentaire au rendez-vous — séquence DM Instagram

Rédigé le 08/09/2026 (agent Ventes), à partir des chapitres 11-12 de la vidéo « Comment trouver des clients sur Instagram avec moins de 1000 abonnés » et des règles de `memory/regles.md`. **Statut : proposition, à valider par Marien.** Tant qu'elle n'est pas validée, chaque DM à un prospect reste au niveau C (validation à chaque envoi). Une fois validée, la séquence passe au niveau B pour les messages 1 et 2 seulement ; le message 3 (proposition d'appel) et toute mention de prix restent au niveau C.

## Le calcul qui justifie l'effort

Chaîne décrite par le créateur : 1 Short avec appel à commenter → 11 commentaires → 11 DM envoyés → 5 réponses qualifiées → 2 ventes. Pour le Créneau Protégé (6 mois, 1 500 € comptant, `memory/offres.md`), deux ventes sur un Short valent 3 000 €. Un Short à 300 vues avec 11 commentaires vaut plus qu'un Short à 4 200 vues sans conversation. Hypothèse de rendement à vérifier sur les 14 premiers jours : 1 vente pour 10 commentaires qualifiés.

Conséquence sur l'appel à l'action des contenus papa : **« Commente PAPA »** plutôt que « DM-moi PAPA ». Le commentaire est public (il pousse le Short), il donne à Marien la liste exacte des personnes à contacter, et un DM entrant reste possible pour ceux qui préfèrent. Décision à prendre par Marien avant le tournage du script 1 (18/09).

## Règle de tri avant d'écrire

Un commentaire « PAPA » ouvre un DM. Un commentaire flatteur ou une question technique reçoit une réponse publique (Community Manager) et un DM seulement s'il vient d'un profil qui correspond à l'avatar (homme, 28-45 ans, mention d'enfants ou photo de famille visible, France). Pas de DM à un compte professionnel, à un autre coach, à un compte sans publication.

Vouvoiement : règle de Marien (prospect = vous). Sur Instagram, après un Short en tutoiement, le vouvoiement peut paraître raide ; Marien tranche. La séquence est écrite en vouvoiement, une variante en tutoiement est possible d'un mot.

## Message 1 — dans les 2 heures après le commentaire (niveau B une fois validé)

> Bonjour {prénom}, voici la méthode en 1 page promise sous ma vidéo. [PDF « Le Créneau Protégé en 1 page », `docs/acquisition/lead-magnet-papa.md`] Question directe pour que je vous oriente : aujourd'hui, ce qui vous empêche de reprendre, c'est plutôt le temps, l'énergie le soir, ou vous ne savez pas par quoi commencer ?

Le lead magnet est livré dans le même message que la question (chapitre 14 de la vidéo : le contenu gratuit ouvre la conversation, la qualification se fait dedans). Une seule question, trois réponses possibles. Pas de lien externe, pas d'offre, pas de prix.

## Message 2 — après sa réponse (niveau B une fois validé)

Il choisit un des trois freins. Réponse en trois temps : reformuler, donner une vraie piste utilisable sans moi, poser la question de qualification.

- Temps : « Le temps, c'est le frein n°1 des papas que je suis. Ce qui marche : une seule heure fixe par semaine, connue de toute la maison, plus deux séances de 20 minutes à la maison. Vous avez une salle près de chez vous ou vous seriez plutôt à la maison ? »
- Énergie : « Le soir, l'énergie n'est jamais là, c'est normal : la séance se place avant que la journée ne soit finie, pas après. Vous êtes plutôt matin, pause déjeuner, ou fin d'après-midi ? »
- Par quoi commencer : « Commencer sans plan, c'est ce qui fait arrêter au bout de trois semaines. Je peux vous indiquer un point de départ. Vous avez déjà fait de la salle avant les enfants, ou vous partez de zéro ? »

Chaque piste est vraie et suffit à quelqu'un qui ne veut pas aller plus loin. Sa réponse dit s'il est à Clermont (présentiel possible) ou à distance (Créneau Protégé).

## Message 3 — proposition d'appel (niveau C, validation à chaque fois)

> Vu ce que vous me dites, je peux vous proposer 20 minutes en visio pour construire votre créneau, sans engagement. Si ça vous parle, dites-moi vos deux créneaux possibles cette semaine et je vous envoie le lien.

Pas de lien Calendly dans le premier message d'appel (règle du 06/09 : Marien passe par WhatsApp, Clara aura Calendly). Pas de prix avant l'appel. Si la personne demande le prix par DM : « Le suivi dépend de la formule, on le voit en 20 minutes, ça évite de vous donner un chiffre qui ne correspond pas à votre cas. »

## Silence

Une relance à J+2 (« Je vous laisse tranquille après ce message : si vous voulez le point de départ dont je parlais, dites-moi simplement "oui". »), puis stop. Trois tentatives maximum, tout compris (`memory/regles.md`).

## CRM

Chaque commentaire « PAPA » qui reçoit un DM entre dans le CRM : `node tools/crm.mjs lead --prenom <prénom> --source Instagram --relance-jours 2`. Chaque réponse : `node tools/crm.mjs interaction`. Le compte des commentaires, DM envoyés, réponses, appels et ventes par Short alimente la mesure à J+14 du calendrier.

## Ce que Marien fait, ce que l'équipe fait

- Marien : envoie les DM (compte personnel, aucun outil ne pilote Instagram), tranche tu/vous, valide la séquence une fois.
- Community Manager : chaque jour de publication, liste les commentaires « PAPA » et les profils qui correspondent à l'avatar, avec le message 1 prêt à coller.
- Ventes : prépare le message 2 adapté et le message 3 pour validation, tient le CRM.
