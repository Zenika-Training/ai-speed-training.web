# Éléments de la Sprint Review du sprint 17 (document fictif)

> Document fictif — aucune donnée réelle.
> Préparé par le Scrum Master avec Yann, le jour 9. La Review a lieu le jour 10, de 14 h à 14 h 45, en visioconférence.

## Objectif du sprint 17

« Les clients d'un hôtel pilote peuvent contester une ligne de leur note et recevoir leur facture après leur départ, et la réception voit les départs express du jour. »

## Parties prenantes invitées

- Céline, responsable métier côté hôtels (décide de l'activation chez les hôtels).
- Un chef de réception de chacun des trois hôtels pilotes : `LYS-03`, `LIL-07`, `NTE-02`.
- Une personne du support client.
- Pour l'équipe : Yann, Inès, Rayan, Malo, Leïla, Théo, Maëlle.

## Definition of Done de l'équipe

1. Les critères d'acceptation sont vérifiés en recette.
2. Tout écart à la fiche fonctionnalité est signalé et accepté par Yann.
3. L'accessibilité AA est vérifiée sur chaque écran touché.
4. La documentation fonctionnelle est mise à jour.
5. La fonctionnalité est montrée à la réception d'un hôtel pilote.

L'activation (quels hôtels, à partir de quand) est décidée par Yann et Céline : elle ne fait pas partie de la Definition of Done.

## État de l'incrément au jour 9

| Clé | Titre | DoD 1 | DoD 2 | DoD 3 | DoD 4 | DoD 5 | État |
|---|---|---|---|---|---|---|---|
| `LAN-116` | Contester une ligne de la note | oui | oui | oui | oui | oui, `LYS-03`, jour 8 | Terminé |
| `LAN-108` | Contraste du bandeau de statut | oui | oui | oui | oui | oui, `LYS-03`, jour 8 | Terminé |
| `LAN-120` | Recevoir sa facture par e-mail après le départ | oui | oui | oui | oui | oui, `LYS-03`, jour 9 | Terminé |
| `LAN-121` | Proposer le départ express aux seuls hôtels activés | oui | oui | oui | oui | oui, `LYS-03`, jour 9 | Terminé |
| `LAN-122` | Tableau des départs express pour la réception | non, 3 critères sur 5 | non évalué | non | non | non | Non terminé |

`LAN-108` ne faisait pas partie du plan du Sprint Planning (19 points) : les développeurs l'ont ajouté au jour 5, avec Yann, en attendant l'extension nécessaire à `LAN-122`.

## Détail de `LAN-122`

- L'extension du connecteur PMS de l'équipe Gouvernail a été livrée le jour 8, au lieu du jour 6 espéré.
- Le tableau fonctionne sur l'environnement de test avec des départs fictifs. Il n'a pas encore tourné sur les données réelles d'un hôtel.
- Recette : 3 critères d'acceptation sur 5 vérifiés. Restent le tri par heure de départ et l'actualisation toutes les minutes.
- Accessibilité AA et documentation : pas commencées. Aucune réception ne l'a vu.
- Estimation du reste à faire par l'équipe : environ deux jours de travail, sans garantie tant que la recette sur données réelles n'est pas faite.

## Déjà au backlog, à affiner pour le sprint 18

`LAN-114` Régler avec la page du prestataire de paiement (dépend de l'équipe Gouvernail), `LAN-117` Déclarer le minibar et confirmer le départ, `LAN-119` Facture non reçue après le départ.

## Activation

Le départ express est activé sur `LYS-03` seulement. `LIL-07` et `NTE-02` : pas avant la fin du pilote, décision de Yann et Céline.
