# Messages de niveau B (envoi sans validation, texte validé une fois)

Rédigé le 2026-09-06. Règle : `memory/regles.md`, niveaux d'autonomie. Un message de cette liste peut être envoyé par un agent sans validation, à condition que le texte soit exactement celui validé ici et que seuls les champs entre accolades changent. Tout autre message reste au niveau C.

Canal par défaut : e-mail (connecteur Gmail, envoi possible une fois le texte validé). WhatsApp perso : jamais piloté par un agent ; Marien copie-colle s'il préfère ce canal. Ton : tutoiement, court, sans emoji, signé Marien.

Statut : **à valider par Marien** (répondre « ok » message par message, ou renvoyer le texte corrigé).

## B1. Rappel de séance, la veille (présentiel et visio)

Déclencheur : séance dans l'agenda Google le lendemain. Envoi la veille à 18 h.

> Objet : Séance demain {heure}
>
> Salut {prénom}, on se voit demain à {heure} {lieu : à Fitness Park / en visio}. Si tu as un empêchement, dis-le-moi ce soir pour qu'on décale. À demain.
> Marien

## B2. Rappel de paiement, 10 jours après l'échéance

Déclencheur : ligne du Sheet CA non cochée « payé » 10 jours après la date prévue. Un seul envoi ; la suite est humaine.

> Objet : Règlement de {mois}
>
> Salut {prénom}, je n'ai pas vu passer le règlement de {mois} ({montant} €). Si c'est déjà parti, ignore ce message. Sinon tu peux faire le virement quand tu as un moment, le RIB est le même. Merci.
> Marien

## B3. Renouvellement, 30 jours avant la fin d'engagement

Déclencheur : colonne « Date fin » de l'onglet Clients du CRM à 30 jours. Un seul envoi ; Marien enchaîne en séance.

> Objet : La suite après {date fin}
>
> Salut {prénom}, ton engagement se termine le {date fin}. Je voulais te le dire tôt pour qu'on en parle tranquillement à la prochaine séance : ce que tu veux garder, ce que tu veux changer, et la formule qui te convient pour la suite. Rien à décider aujourd'hui.
> Marien

## B4. Bilan hebdo, clients en ligne

Déclencheur : résumé hebdomadaire reçu de l'application (Sheet `Suivi Coaching en ligne`), le lundi. Trois variantes selon l'adhérence de la semaine ; les chiffres viennent du Sheet.

Semaine complète (toutes les séances pointées) :
> Objet : Ta semaine
>
> Salut {prénom}, {n} séances sur {n} cette semaine, c'est exactement ce qu'on visait. Le programme continue tel quel, on ajuste à notre prochain point. Bonne semaine.
> Marien

Semaine partielle (au moins une séance pointée) :
> Objet : Ta semaine
>
> Salut {prénom}, {x} séances sur {n} cette semaine. C'est une semaine normale de papa, pas un échec. Regarde juste quel créneau a sauté et ce qui l'a fait sauter, on le sécurise ensemble à notre prochain point.
> Marien

Semaine blanche (aucune séance pointée) :
> Objet : On cale la suite
>
> Salut {prénom}, aucune séance pointée cette semaine. Deux possibilités : tu as fait des séances sans les noter, ou la semaine a tout emporté. Dans les deux cas, réponds-moi en une ligne, je m'adapte.
> Marien
>
> → Ce message est envoyé, puis le client passe en alerte pour Marien (agent Réussite client). Une deuxième semaine blanche : plus d'automatique, Marien appelle.

## Ce qui n'est pas dans cette liste, et reste au niveau C

Réponse à une question d'un client, changement de programme, tout ce qui touche à une douleur ou à la santé, proposition commerciale, message à un prospect, relance après un « non ».

## Mise en service

1. Marien valide les textes ci-dessus.
2. Adresse e-mail de chaque client dans l'onglet Clients du CRM (colonne à ajouter) ; sans e-mail, pas d'envoi automatique.
3. B1 dépend de l'agenda Google : les séances doivent y être avec le prénom du client dans le titre.
4. B2 et B3 dépendent du Sheet CA et de l'onglet Clients (dates de fin).
5. B4 dépend du premier client en ligne.
6. Chaque envoi est journalisé dans l'onglet Interactions du CRM.
