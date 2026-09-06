# Script du CRM

`crm.gs` se colle dans l'éditeur Apps Script du classeur « CRM CoachNeiram » (Extensions → Apps Script). Il ne contient aucun secret : le secret se saisit dans les propriétés du script. Procédure complète dans `docs/mvp1/installation.md`.

Ce que le script protège, comme `coach-sync.gs` de l'app client :
- secret partagé obligatoire sur chaque requête ;
- statuts, canaux et responsables vérifiés contre des listes fermées ;
- textes plafonnés à 500 caractères ;
- aucune suppression possible par l'API : une ligne ne s'efface qu'à la main dans le Sheet.
