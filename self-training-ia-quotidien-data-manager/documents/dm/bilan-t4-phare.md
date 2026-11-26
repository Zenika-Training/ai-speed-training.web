# Bilan du T4 2026 de l'équipe Phare — notes brutes (document fictif)

> Document fictif — aucune donnée réelle. Tous les chiffres sont fictifs.
> Notes prises par Nadia et toi le 14 décembre 2026, pour le rapport trimestriel à Mathilde (comité de
> portefeuille du 18 décembre).

## Livraisons prévues au T4 : 6

| # | Livraison                                                         | État                                                          |
| - | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| 1 | Indicateurs du départ express, 3 hôtels pilotes                   | livrée (octobre)                                              |
| 2 | Correction de l'incident PHA-42 et tests de volume                | livrée (octobre)                                              |
| 3 | Définition unique du CA, data owner nommé (Bastien)               | livrée (décembre)                                             |
| 4 | Migration de l'entrepôt, étape 1 sur 3                            | livrée (novembre)                                             |
| 5 | Migration de l'entrepôt, étape 2 sur 3                            | **en retard** : prévue fin novembre, désormais fin janvier. L'étape 3 doit finir avant la fin du contrat de l'ancien entrepôt, le 31 mars 2027 : il reste 2 mois au lieu de 4. |
| 6 | Atelier « lire un chiffre » pour les directions d'hôtel           | reporté à janvier (priorité donnée à la migration)            |

## Incident

- **PHA-42, 14 octobre** : le tableau de bord affichait 61,5 % d'adoption du départ express à `LIL-07` au lieu
  de 28,0 % (export PMS arrivé en deux fichiers). Céline prévenue avant le comité produit ; corrigé en deux jours ;
  test de volume ajouté.

## Indicateurs du départ express (fin novembre, hôtels pilotes)

- Taux d'adoption : `LYS-03` 31 %, `LIL-07` 28 %, `NTE-02` 24 %. Seuil de réussite fixé par le produit : 30 %.
- Incidents de paiement : 3 sur 1 140 départs express.

## Coûts cloud

- 8 600 € en juillet, 12 280 € en octobre (+43 %).
- Causes : bac à sable oublié (2 100 €/mois), rafraîchissement toutes les 15 minutes (≈ 1 300 €/mois).
- Actions : bac à sable arrêté le 13 novembre, rafraîchissement remis à une fois par nuit le 14 novembre.
  Novembre : 9 900 €. Décembre attendu : environ 8 900 €.

## Équipe

- Hugo parti dans l'équipe Escale le 3 novembre ; Lou dans l'équipe depuis le 26 octobre.
- La migration a perdu son meilleur connaisseur : c'est la cause principale du retard de l'étape 2.

## Arbitrage du T1 2027 (validé avec les sponsors le 10 décembre)

- Retenues : D1, D2 (avec la vue hebdomadaire de D9), D5, D8. D4 en pilote mesuré sur 2 hôtels.
- En attente : D6 (avis de la DPO). En cadrage avec leurs sponsors : D3, D7.

## Ce qu'on ne sait pas

- La satisfaction des clients n'est pas mesurée par Phare (l'analyse des avis, D6, n'est pas lancée).
