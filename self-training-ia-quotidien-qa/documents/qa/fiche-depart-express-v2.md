# Fiche fonctionnalité — LAN-111 Départ express, version 2 (document fictif)

> Document fictif — aucune donnée réelle. Tous les chiffres sont fictifs.
> Version validée après la revue de maquette avec les chefs de réception (sprint 15). Elle sert au découpage en user stories.

## Ce qui a changé depuis la version 1

- **Revue de maquette** : les trois chefs de réception ont validé le parcours « note → informations de société → règlement → confirmation ». Ils demandent qu'un séjour exclu affiche clairement « Présentez-vous à la réception » et que le passage au comptoir reste possible.
- **Minibar** : DE-6 est tranché par Céline après la revue (voir ci-dessous).
- **Heure limite** : DE-1 est précisé par Céline : le départ express suit l'heure de départ enregistrée dans le PMS. `LAN-101` reste à spécifier.
- **Urne de `NTE-02`** : la réception de `NTE-02` installera une urne avant toute activation chez elle ; le pilote commence à `LYS-03`.

## Règles

| Id | Règle |
|---|---|
| DE-1 | Proposé le jour du départ, de 6 h à l'heure de départ enregistrée dans le PMS pour le séjour (12 h par défaut, ou l'heure accordée par la réception). |
| DE-2 | Le client voit chaque ligne de sa note et le montant total avant de confirmer. |
| DE-3 | Règlement avec la pré-autorisation si elle couvre le montant et n'a pas expiré (7 jours) ; sinon, page du prestataire de paiement. Aucune donnée de carte ne passe par Lanterne. |
| DE-4 | Si le client conteste une ligne, le départ express s'arrête pour ce séjour : la réception reprend la main. |
| DE-5 | Les informations de société se saisissent avant l'émission de la facture ; une facture émise ne se modifie pas. |
| DE-6 | Minibar : le client déclare ses consommations avant de confirmer ; les étages contrôlent dans les 30 minutes ; un écart est facturé après le départ, avec un message au client. Tranché par Céline après la revue. |
| DE-7 | À la confirmation, la chambre passe « libérée » dans le PMS et l'application Étages est prévenue. |
| DE-8 | Séjours exclus en v1 : réglés directement par une société, séjours de groupe → « Présentez-vous à la réception ». |
| DE-9 | Facture envoyée par e-mail et disponible dans l'application ; stockage avec accès authentifié. |
| DE-10 | Les informations de société ne sont conservées pour les séjours suivants qu'avec l'accord explicite du client. |
| DE-11 | Carte-clé déposée dans l'urne à la sortie (`LYS-03`, `LIL-07` ; `NTE-02` avant activation). |
| DE-12 | Composants de Lueur 3.2 uniquement ; accessibilité AA. Le champ de saisie de texte et la case à cocher manquent à Lueur 3.2 : besoins signalés à Maëlle. |

## Dépendances

| Système | Besoin | État |
|---|---|---|
| Connecteur PMS v2 (équipe Amarre) | Lignes de la note, heure de départ, chambre « libérée » | Disponible |
| Service Paiement (équipe Gouvernail) | Encaissement par la pré-autorisation | Disponible |
| Service Paiement (équipe Gouvernail) | Page du prestataire de paiement | Un sprint de l'équipe Gouvernail, pas avant le sprint 17 |
| Application Étages (direction des opérations) | Être prévenue des chambres libérées | Accès en attente |
| Stockage des documents clients (équipe Escale) | Accès authentifié aux factures | Constat de sécurité à corriger (`LAN-118`) |

## Critère de succès

Part des départs réglés dans l'application sur `LYS-03` pendant le pilote. Valeur de départ : non mesuré. Garde-fous : litiges sur la note après le départ ; frais facturés après le départ. Rattachement : aucun résultat clé du trimestre en cours ne couvre le départ express ; Céline l'assume et le proposera pour le trimestre suivant.
