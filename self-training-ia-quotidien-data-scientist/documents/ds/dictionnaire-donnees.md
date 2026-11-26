# Dictionnaire de données — membres_fidelite.csv (document fictif)

> Document fictif — aucune donnée réelle. Export du 1er octobre 2025, préparé par Nadia. « 12m » = les 12 mois
> avant l'export ; « suivants » = les 12 mois après.

| Colonne                        | Description                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| `membre_id`                    | Identifiant du membre                                                                        |
| `date_adhesion`                | Date d'inscription au programme                                                              |
| `niveau`                       | Niveau au 1er octobre 2025 : bleu, argent, or                                                |
| `canal_adhesion`               | Où le membre s'est inscrit : app, site, comptoir                                             |
| `age`                          | Âge déclaré à l'inscription (le formulaire de l'app ne le demande plus depuis juin 2024)      |
| `nb_sejours_12m`               | Nombre de séjours sur les 12 mois avant l'export                                             |
| `nuitees_12m`                  | Nombre de nuitées sur les 12 mois avant l'export                                             |
| `panier_moyen_eur`             | Dépense moyenne par séjour, en euros                                                         |
| `a_utilise_depart_express`     | 1 si le membre a fait au moins un départ express sur les 12 mois avant l'export               |
| `note_satisfaction_moy`        | Note moyenne des avis laissés (1 à 5) ; vide si aucun avis                                   |
| `jours_depuis_dernier_sejour`  | Jours entre le dernier séjour et l'export                                                    |
| `a_recu_offre_retention`       | 1 si la relation client a envoyé l'offre de rétention au membre                              |
| `nb_sejours_12m_suivants`      | Nombre de séjours dans les 12 mois après l'export                                            |
| `date_resiliation`             | Date de résiliation du programme, si le membre a résilié                                     |
| `churn`                        | 1 si le membre n'a fait aucun séjour dans les 12 mois après l'export                         |
