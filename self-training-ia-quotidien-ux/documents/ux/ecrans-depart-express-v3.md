# Départ express — les quatre écrans, version 3 (document fictif)

> Document fictif — aucune donnée réelle. Tous les montants sont fictifs.
> Version à transmettre aux développeurs, après les six sessions de test et la correction des textes (charte éditoriale de Lanterne). Fiche `LAN-111`, règles DE-1 à DE-12.

## Rappels utiles

- Séjour de l'exemple : chambre 312 de `LYS-03`, 2 nuits, départ avant 11 h, pré-autorisation de 250,00 € prise à l'arrivée.
- Composants : Lueur 3.2 uniquement (`Bouton`, `CarteChambre`, `BandeauStatut`, `ChampDate`, `ListeDemandes`). Les champs de texte et la case à cocher de l'écran 2 n'existent pas dans Lueur 3.2 : besoins non couverts, décrits en fin de document.
- Rappels des règles : DE-2 chaque ligne et le total avant de confirmer ; DE-3 règlement par la pré-autorisation, sinon comptoir en attendant la page du prestataire (`LAN-114`) ; DE-4 une contestation arrête le départ express ; DE-5 informations de société avant la facture, une facture émise ne se modifie pas ; DE-9 facture par e-mail et dans l'application ; DE-10 informations de société conservées avec accord explicite seulement ; DE-11 carte-clé dans l'urne ; DE-12 Lueur 3.2, accessibilité AA.

## Ce qui a changé depuis la version 2

| Écran | Changement | Raison |
|---|---|---|
| 1 | Une ligne sous « Contester une ligne » dit que cela arrête le départ express | Le bouton a été pris pour « Annuler » par trois participants sur six |
| 2 | Une phrase d'introduction dit à qui l'écran s'adresse | Trois participants sur six l'ont jugé inutile pour eux, un quatrième a hésité 12 s avant de le passer |
| 3 | Le message de dépassement dit pourquoi et ce qui s'est passé pour l'argent | Quatre participants sur six l'ont mal compris |
| 4 | Le rappel de l'urne est remonté sous le bandeau de succès | Trois participants sur six ne l'ont pas vu |

## Écran 1 — Votre note

| Élément | Composant | Texte |
|---|---|---|
| Titre | — | Votre note |
| Introduction | — | Vérifiez chaque ligne avant de continuer. |
| Séjour | `CarteChambre` | Chambre 312 · 2 nuits · départ avant 11 h |
| Ligne 1 | `ListeDemandes` | Nuitées (2 nuits) — 198,00 € |
| Ligne 2 | `ListeDemandes` | Petit-déjeuner — 24,00 € |
| Ligne 3 | `ListeDemandes` | Bar de l'hôtel — 11,50 € |
| Ligne 4 | `ListeDemandes` | Taxe de séjour — 3,40 € |
| Total | — | Total à régler : 236,90 € |
| Action principale | `Bouton` | Continuer |
| Action secondaire | `Bouton` | Contester une ligne |
| Précision | — | Contester une ligne arrête le départ express. |

Comportements :

- Le total et chaque ligne s'affichent avant tout engagement du client (DE-2), le montant avec sa devise.
- « Contester une ligne » arrête le départ express pour ce séjour (DE-4). `BandeauStatut` alerte : « Votre contestation est transmise à la réception. Le départ express s'arrête ici : présentez-vous au comptoir. » Les deux boutons passent à l'état désactivé.

États :

| État | Composant | Texte |
|---|---|---|
| Chargement | `Bouton` chargement | Chargement de votre note |
| Liste vide | `ListeDemandes` vide | Aucune ligne à régler pour ce séjour. Présentez-vous à la réception. |
| Erreur de chargement | `BandeauStatut` erreur | Votre note ne s'affiche pas. Réessayez ou présentez-vous à la réception. |

Il n'y a pas de ligne « minibar » dans cette version : la règle DE-6 reste à trancher (voir les questions ouvertes).

## Écran 2 — Informations de société (facultatif)

| Élément | Composant | Texte |
|---|---|---|
| Titre | — | Informations de société |
| Introduction | — | Remplissez ces champs seulement si la facture doit être au nom d'une société. |
| Champ 1 | champ de texte (besoin non couvert) | Raison sociale |
| Champ 2 | champ de texte (besoin non couvert) | Numéro de TVA intracommunautaire |
| Choix | case à cocher (besoin non couvert), non cochée par défaut | Conserver ces informations pour mes prochains séjours |
| Mention | — | Une facture émise ne peut plus être modifiée. |
| Action principale | `Bouton` | Continuer |
| Action secondaire | `Bouton` | Passer cette étape |

Comportements :

- Les informations se saisissent avant l'émission de la facture (DE-5).
- Elles ne sont conservées pour les séjours suivants que si la case est cochée par le client (DE-10).
- « Passer cette étape » conduit à l'écran 3 sans rien enregistrer.

États :

| État | Texte |
|---|---|
| Chargement (`Bouton`) | Enregistrement en cours |
| Erreur de saisie (message sous le champ) | Ce numéro de TVA n'est pas reconnu. Vérifiez-le ou passez cette étape. |

L'écran n'a pas d'état « vide ».

## Écran 3 — Règlement

| Élément | Composant | Texte |
|---|---|---|
| Titre | — | Règlement |
| Rappel | — | Total à régler : 236,90 € |
| Action principale | `Bouton` | Régler avec ma pré-autorisation |

États et messages :

| État | Composant | Texte |
|---|---|---|
| Chargement | `Bouton` chargement | Règlement en cours |
| Montant au-delà de la pré-autorisation | `BandeauStatut` alerte | Le montant de votre note dépasse votre pré-autorisation de 250,00 €. Rien n'a été prélevé : réglez votre note au comptoir. |
| Pré-autorisation expirée (7 jours) | `BandeauStatut` alerte | Votre pré-autorisation a expiré. Rien n'a été prélevé : réglez votre note au comptoir. |
| Règlement refusé | `BandeauStatut` erreur | Le règlement n'a pas abouti. Réessayez ou présentez-vous à la réception. |

Comportements :

- Le règlement se fait par la pré-autorisation si elle couvre le montant et n'a pas expiré (DE-3). Aucune donnée de carte ne passe par Lanterne.
- Quand une alerte s'affiche, le bouton principal est désactivé.
- La page du prestataire de paiement n'est pas livrée (`LAN-114`) : le comptoir la remplace.

## Écran 4 — Confirmation

| Élément | Composant | Texte |
|---|---|---|
| Succès | `BandeauStatut` succès | Votre note est réglée. |
| Carte-clé (sous le bandeau) | — | Avant de partir, déposez votre carte-clé dans l'urne à la sortie. |
| Facture | — | Votre facture est envoyée par e-mail. Vous la retrouvez aussi dans l'application. |
| Action principale | `Bouton` | Terminer |

Comportements et états :

- À la confirmation, la chambre passe « libérée » dans le PMS et l'application Étages est prévenue (DE-7). Cette dépendance n'est pas obtenue : la réception libère la chambre comme avant (`LAN-117`).
- Chargement : `Bouton` « Confirmation en cours ».
- À `NTE-02`, il n'y a pas d'urne (DE-11) : le texte de la carte-clé n'est pas défini pour cet hôtel.

## Accessibilité (WCAG 2.1 AA)

- `BandeauStatut` alerte : texte blanc `#FFFFFF` sur orange `#F28C28`, contraste de 2,45:1 (défaut `LAN-108`, corrigé dans Lueur 3.3 seulement). Contournement retenu en maquette : texte `#1F2933` sur `#F28C28`, 6,01:1.
- Texte de détail en gris : `#6B7580` sur fond blanc, 4,69:1.
- Cible tactile des boutons : 44 px de haut, règle de Lueur (le critère WCAG 2.5.5 est de niveau AAA, pas AA).
- L'information d'un bandeau ne repose pas sur la couleur seule : le texte dit l'état.

## Besoins non couverts par Lueur 3.2

| Besoin | Où | Pourquoi |
|---|---|---|
| Champ de texte | Écran 2 : raison sociale, numéro de TVA (`LAN-115`) | Aucun composant de Lueur 3.2 ne permet de saisir du texte |
| Case à cocher | Écran 2 : « Conserver ces informations… » (DE-10) | L'accord explicite du client, non coché par défaut, ne peut pas se recueillir autrement |

Ce que l'on ne sait pas : si Lueur 3.3 prévoit ces deux composants, et si d'autres produits du portefeuille Séjour en ont le même besoin. Question à Maëlle. `LAN-115` est prévu au sprint 17.

## Questions ouvertes

- **Minibar (DE-6)** : déclaration du client, contrôle des étages, écart facturé après le départ ? Céline tranche après la revue avec les chefs de réception.
- **Urne de `NTE-02` (DE-11)** : texte et comportement à définir avec la réception de `NTE-02`.
- **Note à 0,00 €** : que fait le départ express si la liste est vide ? Règle non définie.
- **Numéro de TVA** : format attendu et vérification non définis.
- **« Rien n'a été prélevé »** : à confirmer avec l'équipe Gouvernail avant la mise en production.
- **Écran 2 pour tous** : faut-il le montrer à tous les clients ? Décision de Yann et Céline.
- **Solution provisoire pour `LAN-115`** : à décider avec Maëlle en attendant ses réponses.
