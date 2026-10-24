# Fiche fonctionnalité — LAN-111 Départ express, version 1 (document fictif)

> Document fictif — aucune donnée réelle. Tous les chiffres sont fictifs.
> Rédigée après les échanges avec les experts (sprint 15), avant la revue de maquette avec les chefs de réception.

## Le besoin

Le matin, de 7 h à 10 h, les clients font la queue au comptoir pour régler leur note (atelier du sprint 14 ; audit d'une seule matinée à `LYS-03` : 38 départs, attente médiane 9 min). Les clients d'affaires veulent régler dans l'application et partir. La réception veut garder la main sur les contestations ; les étages doivent contrôler le minibar. Le passage au comptoir reste possible : le départ express est facultatif.

## Règles

| Id | Règle | Source | Statut |
|---|---|---|---|
| DE-1 | Proposé le jour du départ, de 6 h à l'heure de départ du séjour (12 h par défaut). | Atelier ; doc v2.1 (D1) | Si un départ tardif est accordé : question à Céline (`LAN-101` à spécifier) |
| DE-2 | Le client voit chaque ligne de sa note et le montant total avant de confirmer. | Armelle | Décidé |
| DE-3 | Règlement avec la pré-autorisation si elle couvre le montant et n'a pas expiré (7 jours) ; sinon, page du prestataire de paiement. Aucune donnée de carte ne passe par Lanterne. | Gaspard ; Aurèle | Décidé ; la page du prestataire demande un sprint à l'équipe Gouvernail |
| DE-4 | Si le client conteste une ligne, le départ express s'arrête pour ce séjour : la réception reprend la main. | Cheffe de réception de `LYS-03` (atelier) | Décidé |
| DE-5 | Les informations de société se saisissent avant l'émission de la facture ; une facture émise ne se modifie pas (avoir à la réception). | Armelle | Décidé |
| DE-6 | Minibar : déclaration du client, contrôle des étages en 30 minutes, écart facturé après le départ avec un message ? | Josiane ; Armelle (avis divergents) | À trancher par Céline |
| DE-7 | À la confirmation, la chambre passe « libérée » dans le PMS et l'application Étages est prévenue. | Josiane | Application Étages : accès à obtenir auprès de la direction des opérations |
| DE-8 | Séjours exclus en v1 : réglés directement par une société, séjours de groupe → « présentez-vous à la réception ». | Armelle | Décidé |
| DE-9 | Facture envoyée par e-mail et disponible dans l'application ; stockage avec accès authentifié. | Aurèle ; `LAN-81` | Décidé ; constat de sécurité ouvert sur la préproduction |
| DE-10 | Les informations de société ne sont conservées pour les séjours suivants qu'avec l'accord explicite du client. | Éloïse | Décidé |
| DE-11 | Carte-clé déposée dans l'urne à la sortie. | Atelier | `NTE-02` n'a pas d'urne : question à la réception de `NTE-02` |
| DE-12 | Composants de Lueur 3.2 uniquement ; accessibilité AA. | Design system Lueur | Décidé |

## Systèmes touchés

| Système | Ce qui change | Groupe propriétaire | État |
|---|---|---|---|
| Connecteur PMS v2 | Lignes de la note ; chambre passée à « libérée » | équipe Amarre | Disponible (`LAN-73`) |
| Service Paiement | Encaissement par la pré-autorisation ; page du prestataire | équipe Gouvernail | Pré-autorisation : disponible ; page : à obtenir |
| Application Étages | Être prévenue des chambres libérées | direction des opérations (support : équipe Amarre) | À obtenir |
| Stockage des documents clients | Accès à la facture depuis l'application | équipe Escale | Constat de sécurité ouvert |

## Critère de succès (proposé)

Part des départs réglés dans l'application sur l'hôtel du pilote. Valeur de départ : non mesuré. Garde-fous : litiges sur la note après le départ ; frais facturés après le départ. Rattachement : aucun résultat clé du trimestre ne couvre le départ express — question à Céline.

## Écrans à concevoir avec Maëlle

`Départ express — votre note` · `Départ express — informations de société` · `Départ express — règlement` · `Départ express — confirmation`

## Questions encore ouvertes

- Minibar (DE-6) : Céline tranche après la revue avec les chefs de réception.
- Heure limite quand un départ tardif est accordé (DE-1) : Céline.
- Urne de `NTE-02` (DE-11) : réception de `NTE-02`.
