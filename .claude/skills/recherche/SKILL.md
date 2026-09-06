---
name: recherche
description: Recherche structurée (marché, concurrents, tendances fitness, entreprises et associations locales, clubs, salles, outils IA) avec distinction explicite FAIT / HYPOTHÈSE / RECOMMANDATION. À invoquer quand un agent ou Marien a besoin d'une information externe vérifiable.
---

# Recherche

## Quand

Question sur le marché, un concurrent, une tendance, un partenaire local potentiel, un outil, une API. Jamais pour une information que seul Marien possède (ses chiffres, ses préférences, son réseau) : dans ce cas, demander.

## Procédure

1. Formuler la question en une phrase et le critère de réponse utile (quelle décision elle éclaire).
2. Chercher avec les outils web disponibles (WebSearch, Firecrawl). Zone par défaut : Clermont-Ferrand et Puy-de-Dôme pour le présentiel, France pour l'en ligne.
3. Pour chaque élément trouvé, noter la source et la date.
4. Classer chaque énoncé :
   - **FAIT** : vérifié sur une source datée, citée.
   - **HYPOTHÈSE** : plausible, non vérifié, avec ce qui permettrait de vérifier.
   - **RECOMMANDATION** : ce que Marien devrait faire, avec impact et effort.
5. Terminer par trois actions au maximum.

## Format de sortie

```
Question : …
FAITS
- … (source, date)
HYPOTHÈSES
- … (comment vérifier)
RECOMMANDATIONS
1. … (impact, effort)
```

## Règles

- Ne jamais présenter un nom de concurrent ou de partenaire comme vérifié sans source.
- Pour un partenaire local : nom, activité, pourquoi eux, personne à contacter si publique, canal d'approche. Pas de données personnelles hors informations professionnelles publiques.
- Pour un outil ou une API : voie officielle d'abord (API, OAuth, connecteur), conditions d'utilisation, coût, ce qui est impossible.
