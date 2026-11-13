# Lanterne — Parcours Départ, version 2.1 (document fictif)

> Document fictif — aucune donnée réelle.
> Page de l'espace Confluence de l'équipe Lanterne · Propriétaire : Yann · Statut : publiée ·
> Dernière mise à jour : il y a 14 mois.

## 1. Objet

Cette page décrit ce que Lanterne propose au client le jour de son départ, à l'hôtel `LYS-03`.

## 2. Ce que voit le client

- La veille du départ, à 18 h, une notification rappelle l'heure de départ (`LAN-95`).
- Le jour du départ, l'écran d'accueil affiche l'heure de départ et l'adresse de la réception.
- Le règlement de la note se fait au comptoir de la réception.

## 3. Règles en vigueur

| Id | Règle |
|---|---|
| D1 | L'heure de départ standard est 12 h. |
| D2 | La pré-autorisation de paiement prise à l'arrivée (écran « Arrivée — étape 1 : vos informations ») est valable 3 jours. La réception la lève après le règlement. |
| D3 | Lanterne n'affiche pas le détail de la note : le PMS de l'hôtel ne transmet pas les lignes de consommation (voir `LAN-58`). |
| D4 | La facture relève du PMS de l'hôtel : Lanterne ne l'affiche pas. |
| D5 | Le départ tardif n'est pas disponible dans Lanterne (voir `LAN-101`). |

## 4. Systèmes concernés

- Service Lanterne (`lanterne-sejour-api`), module `pms` : lecture de l'heure de départ du séjour.
- Service Notifications : rappel de la veille.

## 5. Historique de la page

| Version | Quand | Changement |
|---|---|---|
| 2.0 | Il y a 18 mois | Création, à la mise en production de Lanterne sur `LYS-03` |
| 2.1 | Il y a 14 mois | Ajout du rappel de la veille (`LAN-95`) |
