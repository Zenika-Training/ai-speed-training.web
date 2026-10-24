# Revue du sprint 16 — départ express (document fictif)

> Document fictif — aucune donnée réelle.
> Compte rendu rédigé par Yann à la fin du sprint 16.

## Livré et accepté

| Clé | Titre | État |
|---|---|---|
| `LAN-118` | Sécurité : accès authentifié au stockage des documents clients | Livré, vérifié par Aurèle |
| `LAN-112` | Consulter le détail de sa note | Livré, accepté par Yann |
| `LAN-113` | Régler sa note avec la pré-autorisation | Livré, accepté par Yann |

## Activation

- Yann et Céline ont décidé d'activer le départ express sur LYS-03 seulement, à partir du lundi du sprint 17.
- `LIL-07` et `NTE-02` : pas avant la fin du pilote.

## Ce que fait cette première version, et ce qu'elle ne fait pas

- Le client de `LYS-03` voit chaque ligne de sa note et le total, puis la règle avec sa pré-autorisation (valable 7 jours depuis `LAN-90`).
- Si le montant dépasse la pré-autorisation, ou si elle a expiré, l'application affiche « Réglez votre note au comptoir » : la page du prestataire de paiement (`LAN-114`) n'est pas livrée.
- Les informations de société (`LAN-115`) ne sont pas livrées : pour une facture au nom d'une société, le client passe au comptoir.
- Contester une ligne (`LAN-116`) n'est pas livré : le client qui conteste passe au comptoir.
- Le minibar et la confirmation du départ (`LAN-117`) ne sont pas livrés : la réception libère la chambre, comme avant.

## Démonstration

Montrée à la cheffe de réception de `LYS-03` le dernier jour du sprint. Sa remarque : « Le message "Réglez votre note au comptoir" doit dire pourquoi. » Un ticket est à créer.

## Prévu au sprint 17

- `LAN-115` et `LAN-116`.
- Suite de l'analyse de `LAN-119` : cause probable côté PMS (adresse e-mail mal recopiée à l'arrivée), à confirmer.
