# MVP 1 — Installation (ce que Marien doit faire, 30 minutes)

## 1. Le classeur CRM

Un classeur Google Sheets « CRM CoachNeiram » est créé dans ton Drive, dossier « AI Business OS » (https://docs.google.com/spreadsheets/d/1iwHuHR-RqKnNOl_lgKdwG19IFwet-sfNM5H0hyVBbHs/edit), avec l'onglet Clients prérempli à partir des lignes de septembre du Sheet CA (prénoms et initiales tels qu'ils y figurent, tarif, canal). Les dates de début et la durée d'engagement sont à compléter par toi : c'est ce qui permet d'anticiper les renouvellements.

## 2. Le script d'écriture (une fois)

1. Ouvre le classeur → **Extensions → Apps Script**.
2. Supprime le contenu de `Code.gs`, colle le contenu de `apps-script/crm.gs`, enregistre.
3. **Paramètres du projet** (roue dentée) → **Propriétés du script** → ajoute la propriété `SECRET` avec une valeur longue et aléatoire (30 caractères ou plus). Ne la colle nulle part ailleurs que dans l'environnement Claude Code (étape 3).
4. Dans l'éditeur, sélectionne la fonction `installer` → **Exécuter**. Autorise l'accès au classeur quand Google le demande. Les onglets Leads, Interactions, Clients, Parametres apparaissent avec leurs listes déroulantes.
5. **Déployer → Nouveau déploiement → Application Web**. Exécuter en tant que : **moi**. Accès : **Tout le monde** (le secret protège l'écriture). Copie l'URL du déploiement (elle finit par `/exec`).

## 3. Les variables d'environnement et l'accès réseau

**Accès réseau (obligatoire, vérifié le 06/09/2026).** L'environnement Claude Code de ce dépôt bloque par défaut les connexions vers `script.google.com` (réponse 403 de la passerelle). Dans claude.ai/code → Environnements → ton environnement → réglages réseau, ajoute à la liste des domaines autorisés :

```
script.google.com
script.googleusercontent.com
```

Le second domaine sert aux redirections des applications web Apps Script. Sans cette autorisation, `tools/crm.mjs` affiche « fetch failed » même avec les bonnes variables.

Dans l'environnement Claude Code de ce dépôt (claude.ai/code → Environnements → variables), ajoute :

```
CRM_URL=<URL du déploiement /exec>
CRM_SECRET=<la même valeur que la propriété SECRET>
```

Ne les écris jamais dans un fichier du dépôt ni dans la conversation.

## 4. Vérification

Dans une session Claude Code sur ce dépôt :

```
node --test tests/*.test.mjs
node tools/crm.mjs relances
node tools/crm.mjs lead --prenom Test --source Autre --dry-run
```

La première commande doit afficher tous les tests verts. La deuxième doit répondre `{"ok":true,"relances":[]}` si le script est déployé. Supprime ensuite toute ligne « Test » créée par erreur.

## 5. Le rapport du lundi

Une Routine hebdomadaire (lundi 7 h, heure de Paris, identifiant `trig_018oJMRejWmgQDWfAz6crvb5`) relance cette session, exécute le skill `rapport-lundi` et dépose le rapport en **brouillon** dans ta boîte Gmail. Rien n'est envoyé. Limite connue : une Routine créée depuis une session ne transporte pas les connecteurs (Drive, Gmail). Si le rapport du lundi signale « connecteur indisponible », il aura utilisé le dernier export en cache et écrit le rapport dans `docs/rapports/`. Dans ce cas, recrée la Routine depuis claude.ai/code → Routines en cochant les connecteurs Google Drive et Gmail, avec le même texte de consigne (il est dans `.claude/skills/rapport-lundi/SKILL.md`). Si tu ne veux plus de la Routine : dis-le dans la session, ou désactive-la dans claude.ai/code → Routines.

## 6. À me donner quand tu peux

- Le périmètre exact de Clara (voir `memory/equipe.md`).
- Un export ou des captures d'Instagram Insights (90 jours).
- La liste des prospects en discussion aujourd'hui, pour amorcer l'onglet Leads (je te donnerai les commandes, ou tu saisis directement dans le Sheet).
