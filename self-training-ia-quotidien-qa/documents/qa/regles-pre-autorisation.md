# Règles de la pré-autorisation — règlement du départ express (document fictif)

> Document fictif — aucune donnée réelle. Tous les chiffres sont fictifs.
> Précise DE-1, DE-3, DE-4 et DE-8 de `fiche-depart-express-v2.md` pour `LAN-113`. Rédigé par Yann, relu par l'équipe Gouvernail.

## Définitions

- **Note** : montant total à payer, en euros, au centime près (par exemple 480,00 €).
- **Pré-autorisation** : montant bloqué sur la carte du client à l'arrivée. Dans les exemples, elle vaut **480,00 €**.
- **Âge** : temps écoulé depuis la pose de la pré-autorisation, mesuré à la minute près.

## Règles

| Id | Règle |
|---|---|
| RP-1 | **Éligibilité.** Un séjour réglé directement par une société ou un séjour de groupe n'a pas de départ express : l'application affiche « Présentez-vous à la réception ». Ce contrôle passe avant tous les autres. |
| RP-2 | **Note nulle.** Une note de 0,00 € ne donne lieu à aucun règlement : le client confirme directement. |
| RP-3 | **Couverture.** La pré-autorisation couvre la note si la note est **inférieure ou égale** à son montant (100 % inclus). Aucune tolérance au-dessus : 480,01 € n'est pas couvert. |
| RP-4 | **Expiration.** La pré-autorisation vaut 7 jours : elle est valide tant que son âge est **strictement inférieur à 168 h**. À 168 h 00 exactement, elle est expirée. |
| RP-5 | **Règlement.** Si le séjour est éligible, si la pré-autorisation n'est pas expirée et si elle couvre la note, la note est encaissée sur la pré-autorisation, **une seule fois**, pour son montant exact. |
| RP-6 | **Sinon.** Si la pré-autorisation est expirée, insuffisante, expirée et insuffisante, ou absente, le client est dirigé vers la page du prestataire de paiement. Tant que cette page n'est pas livrée (`LAN-114`, pas avant le sprint 17), l'application affiche « Réglez votre note au comptoir ». |
| RP-7 | **Refus.** Si le prestataire refuse l'encaissement, le départ express s'arrête pour ce séjour : « Présentez-vous à la réception ». Aucune seconde tentative automatique. |
| RP-8 | **Contestation.** Si le client conteste une ligne de la note (DE-4), le départ express s'arrête pour ce séjour, quelle que soit la pré-autorisation. |

## Ce que les règles ne prévoient pas

Pas de remise, pas de tolérance de dépassement, pas de prolongation de la pré-autorisation, pas de règlement en plusieurs fois.
