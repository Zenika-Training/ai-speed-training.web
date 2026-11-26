# Sorties du notebook d'exploration (document fictif)

> Document fictif — aucune donnée réelle. Pour faire la mission M2 sans le kit : les sorties réelles des cellules,
> exécutées sur `membres_fidelite.csv`.

## Lignes et doublons

```text
lignes : 3015 · membre_id distincts : 3000 · lignes en double exact : 15
après suppression des doublons : 3000 lignes · churn : 9,4 %
```

## Valeurs manquantes (après suppression des doublons)

| Colonne                 | Manquant |
| ----------------------- | -------- |
| `age`                   | 6,6 %    |
| `note_satisfaction_moy` | 35,4 %   |
| `date_resiliation`      | 96,5 %   |

Âge manquant selon la date d'inscription : **0,0 %** avant juin 2024, **72,0 %** depuis juin 2024.

## nb_sejours_12m

```text
valeurs égales à 999 : 6 lignes · maximum des autres valeurs : 17
moyenne avec les 999 : 6,24 · moyenne sans : 4,25
```

## Churn par variable (doublons supprimés)

| Groupe                                   | Churn  | Membres |
| ---------------------------------------- | ------ | ------- |
| niveau bleu                              | 13,6 % | 1 778   |
| niveau argent                            | 4,2 %  | 929     |
| niveau or                                | 0,7 %  | 293     |
| départ express : non                     | 10,8 % | 2 145   |
| départ express : oui                     | 6,0 %  | 855     |
| bleu, sans départ express                | 13,6 % | 1 505   |
| bleu, avec départ express                | 13,6 % | 273     |
| argent, sans départ express              | 4,7 %  | 548     |
| argent, avec départ express              | 3,4 %  | 381     |
| or, sans départ express                  | 1,1 %  | 92      |
| or, avec départ express                  | 0,5 %  | 201     |
| offre de rétention reçue : non           | 3,5 %  | 2 743   |
| offre de rétention reçue : oui           | 72,8 % | 257     |

Part des membres qui utilisent le départ express : bleu 15 %, argent 41 %, or 69 %.

## Satisfaction et ancienneté du dernier séjour (doublons et 999 retirés)

| Groupe                               | Churn  |
| ------------------------------------ | ------ |
| note moyenne < 3 (177 membres)       | 19,8 % |
| note moyenne ≥ 3 (1 617 membres)     | 8,7 %  |
| aucun avis                           | 8,8 %  |
| dernier séjour ≤ 90 jours            | 3,5 %  |
| 91 à 180 jours                       | 6,1 %  |
| 181 à 270 jours                      | 10,6 % |
| plus de 270 jours                    | 17,9 % |
