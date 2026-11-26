# Comparaison de modèles de churn (rédigée par une IA, document fictif)

> Document fictif — aucune donnée réelle.
> Note produite par un assistant IA après l'entraînement de trois modèles sur `membres_fidelite.csv` (doublons et
> valeurs 999 retirés, 2 994 membres ; 30 % gardés pour le test, soit 899 membres dont 85 sont partis). Non relue.

## Résultats sur le jeu de test

| Modèle                                                      | Variables                          | Accuracy | AUC   | Parmi les 10 % les plus à risque (89 membres) |
| ----------------------------------------------------------- | ---------------------------------- | -------- | ----- | --------------------------------------------- |
| A — régression logistique                                   | 1 à 6 et 11 (sans âge)             | 91,0 %   | 0,78  | 28 sont vraiment partis (sur 85)              |
| B — gradient boosting                                       | 1 à 6 et 11 (sans âge)             | 90,3 %   | 0,75  | 24 sont vraiment partis                       |
| C — gradient boosting                                       | 1 à 6, 8 à 11 (sans âge)           | 100,0 %  | 1,00  | 85 sont vraiment partis                       |

## Recommandation

**Le modèle C est de loin le meilleur** : 100 % de précision, une AUC parfaite. Il identifie tous les membres qui
partent. Les modèles A et B, autour de 90 %, sont décevants. Nous recommandons de mettre C en production pour la
campagne de janvier.
