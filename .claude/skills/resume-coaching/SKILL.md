---
name: resume-coaching
description: Résumé hebdomadaire des coachings collectifs UpTrainer que Marien ne peut pas suivre en direct. Marien colle les transcriptions ; le skill produit un résumé par coaching orienté action, met à jour memory/apprentissages.md (ce que les agents doivent retenir) et signale les contradictions avec la mémoire. Déclenché chaque samedi (rappel Google Calendar) ou dès qu'une transcription arrive.
---

# Résumé de coaching UpTrainer

## Entrées

Une ou plusieurs transcriptions collées par Marien (texte, captures, ou fichier dans le Drive). Une transcription sans date ni titre : demander les deux avant de résumer, ou les déduire du contenu en le disant.

## Procédure

1. **Lire toute la transcription** avant d'écrire. Si elle arrive par captures, lister les plages horaires lues et signaler les trous.
2. **Trier** chaque idée dans une des quatre cases : FAIT (chiffre, règle, mécanisme démontré), RECOMMANDATION du formateur, EXEMPLE d'un autre coach (à ne pas copier tel quel), HORS SUJET pour Marien (autre marché, autre stade).
3. **Confronter à la mémoire** : `memory/positionnement.md`, `memory/offres.md`, `memory/regles.md`, `memory/idees-contenu.md`, `docs/acquisition/`, `docs/ventes/`. Trois issues possibles : déjà appliqué (dire où), nouveau (proposer), contradictoire (signaler les deux valeurs, ne pas trancher, demander à Marien).
4. **Écrire le résumé** dans `docs/formation/AAAA-MM-JJ-<sujet>.md`, format fixe ci-dessous. Une page maximum par coaching.
5. **Mettre à jour `memory/apprentissages.md`** : une ligne datée par enseignement retenu, avec l'agent concerné (Acquisition, Ventes, Coordination, Réussite client, Pilotage, CM). Pas de doublon : si l'enseignement existe, ajouter la date en fin de ligne.
6. **Journaliser** une ligne dans `memory/journal.md`, committer, pousser.
7. **Répondre à Marien** : trois décisions à prendre au maximum, deux actions concrètes, les contradictions à trancher. Pas de résumé du résumé.

## Format du résumé

```
# <Titre du coaching> — <date>
Source : coaching collectif UpTrainer, <formateur si connu>. Lu : <intégral / plages>.

## En trois phrases
## Ce qui s'applique à Coach Neiram (FAIT / RECOMMANDATION)
- … → déjà appliqué : <fichier> | nouveau : <proposition> | contradictoire : <valeur mémoire> vs <valeur coaching>
## Ce qui ne s'applique pas, et pourquoi
## Décisions pour Marien (3 max)
## Actions (2 max, qui, quand, comment savoir si ça marche)
```

## Règles

- Aucun nom d'autre participant, aucun chiffre d'un autre coach identifiable, aucune donnée personnelle dans le dépôt. « Un coach en perte de poids » suffit.
- Un enseignement entre dans `memory/apprentissages.md` seulement s'il change ce qu'un agent fait. Une idée de contenu va dans `memory/idees-contenu.md`.
- Une recommandation du formateur qui contredit une décision datée de Marien ne l'annule pas : elle est signalée, Marien tranche.
- Le résumé ne déclenche aucune action de niveau C.
