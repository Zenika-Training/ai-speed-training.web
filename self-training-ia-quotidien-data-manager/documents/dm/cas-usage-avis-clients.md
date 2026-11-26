# Fiche de cas d'usage — Analyse des avis clients avec un LLM (document fictif)

> Document fictif — aucune donnée réelle.
> Fiche remplie par Nora (relation client) le 19 novembre 2026, pour la demande D6. À présenter à Solène (DPO)
> avant tout lancement, comme le demande la politique de données.

## En une phrase

Faire lire les avis laissés par les clients après leur séjour par un modèle de langage, pour sortir les irritants
de chaque hôtel et **repérer les clients mécontents afin que l'équipe les rappelle** avec une offre de
compensation.

## Données utilisées

| Donnée                           | Exemple (fictif)                 | Pourquoi                                       |
| -------------------------------- | -------------------------------- | ---------------------------------------------- |
| Texte libre de l'avis            | « Chambre bruyante, petit-déj froid » | l'analyse des irritants                   |
| Note de 1 à 5                    | 2                                | l'analyse des irritants                        |
| Code de l'hôtel                  | `LIL-07`                         | les irritants par hôtel                        |
| Nom et prénom du client          | M. Exemple Fictif                | « pour personnaliser »                         |
| E-mail du client                 | exemple@fictif.test              | le rappel                                      |
| Numéro de chambre                | 214                              | « au cas où »                                  |
| Dates du séjour                  | 12/10/2026 → 14/10/2026          | les irritants par période                      |

Volume : environ 18 000 avis par an, depuis 2021 (tout l'historique serait chargé).

## Outil

Une API de modèle de langage d'un fournisseur trouvé par l'équipe relation client (essai gratuit en cours, sur un export de 500 avis récents). Pas
encore référencé par la DSI. Hébergement des données : « États-Unis, je crois ».

## Conservation

Les résultats (irritants, clients à rappeler) sont gardés « sans limite, pour suivre l'évolution ».

## Information des clients

Le formulaire d'avis dit : « Votre avis nous aide à améliorer nos services. »

## Calendrier souhaité

Lancement le 6 janvier 2027.
