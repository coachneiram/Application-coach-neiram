# Message de parrainage aux clients présentiels

Rédigé le 2026-09-06 (agent Ventes). Décision de Marien : proposer le parrainage à chacun des 16 clients individuels, en fin de séance. Mécanique (`memory/offres.md`) : le parrain reçoit sur son mois suivant une réduction égale à son tarif séance (hebdo), 55 € (mensuel) ou 25 % (à distance), due seulement si le filleul signe. Ni fausse urgence ni pression : une phrase, une réponse, on passe à autre chose.

## À dire en fin de séance (version orale, ~40 mots)

> Une chose avant que tu partes. Si tu connais quelqu'un qui veut s'y mettre sans se blesser, envoie-le-moi. S'il signe, ton mois suivant baisse de {avantage}. Tu n'as rien à vendre : tu lui donnes mon Instagram, je fais le reste.

## Version message (WhatsApp, ~40 mots), à envoyer seulement au client qui n'a pas eu la séance dans la semaine

> Salut {prénom}, une info rapide. Si quelqu'un autour de toi veut s'y mettre sans se blesser, envoie-le-moi. S'il signe, ton mois suivant baisse de {avantage}. Rien à vendre de ton côté, tu lui donnes mon Instagram et je m'occupe du reste.

## L'avantage à insérer, selon la formule du client

| Formule (tarif d'août 2026) | Avantage pour le parrain | Formulation |
|---|---|---|
| Hebdo 3 mois, 280 €/mois | 70 € | « de 70 € » |
| Hebdo 6 mois, 250 €/mois | 62,50 € | « de 60 € et quelques » ou « d'une séance » |
| Hebdo 12 mois, 220 €/mois | 55 € | « de 55 € » |
| Mensuel, 210 €/mois | 55 € | « de 55 € » |
| À distance, 150 €/mois | 25 %, soit 37,50 € | « d'un quart » |
| Client à l'ancienne grille (juillet 2026 : 240 / 220 / 200 / 170) | son tarif séance ou 55 € | à trancher par Marien : avantage calculé sur son tarif réel ou sur la grille actuelle |

Les formules réelles des 16 clients ne sont pas dans le CRM (colonnes Offre et Durée vides). Tant qu'elles n'y sont pas, Marien choisit la ligne de tête. Les cours collectifs et associations ne sont pas concernés.

## Quand la personne répond

- « Je pense à quelqu'un » : demander le prénom et comment il préfère être contacté. Ne jamais écrire au filleul en premier sans son accord transmis par le parrain. Créer le lead : `node tools/crm.mjs lead --prenom <prénom> --source Parrainage --canal Salle --offre Présentiel --notes "parrain : <client C-0xx>" --relance-jours 3`.
- « Je ne vois personne » : « Aucun souci, l'offre reste valable toute l'année. » Fin. Pas de deuxième relance.
- Le filleul signe : Marien applique la réduction sur le mois suivant du parrain et le note dans le Sheet CA.

## Contrôle

Au rapport du lundi 14 septembre : nombre de clients à qui c'est dit (objectif 16 sur deux semaines, au rythme d'une séance hebdo par client), nombre de leads « Parrainage » dans le CRM. Zéro lead après 16 propositions : le message ou le moment sont à revoir, pas la mécanique.
