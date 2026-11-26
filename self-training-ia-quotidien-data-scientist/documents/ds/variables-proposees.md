# Variables proposées pour le modèle de churn (rédigé par une IA, document fictif)

> Document fictif — aucune donnée réelle.
> Proposition d'un assistant IA, à partir du dictionnaire de données, avec la demande : « Propose-moi les meilleures
> variables pour prédire le churn. » Non relue.

| #  | Variable proposée                    | Construction                                              | Pourquoi (selon l'IA)                      |
| -- | ------------------------------------ | --------------------------------------------------------- | ------------------------------------------ |
| 1  | `niveau`                             | encodée en trois colonnes                                 | les membres « or » partent très peu        |
| 2  | `nb_sejours_12m`                     | telle quelle                                              | l'activité récente                         |
| 3  | `jours_depuis_dernier_sejour`        | telle quelle                                              | un membre qui ne vient plus va partir      |
| 4  | `panier_moyen_eur`                   | telle quelle                                              | la valeur du membre                        |
| 5  | `a_utilise_depart_express`           | telle quelle                                              | « le départ express fidélise »             |
| 6  | `satisfaction_basse`                 | 1 si `note_satisfaction_moy` < 3                          | les mécontents partent plus                |
| 7  | `age_complete`                       | `age`, les vides remplacés par la moyenne                 | l'âge joue sur la fidélité                 |
| 8  | `a_recu_offre_retention`             | telle quelle                                              | « la variable la plus prédictive »         |
| 9  | `nb_sejours_12m_suivants`            | telle quelle                                              | l'activité du membre                       |
| 10 | `a_resilie`                          | 1 si `date_resiliation` est remplie                       | un membre qui résilie est perdu            |
| 11 | `anciennete_jours`                   | 1er octobre 2025 − `date_adhesion`                        | les nouveaux membres sont plus volatils    |

Score attendu avec ces variables : « au-delà de 99 % ».
