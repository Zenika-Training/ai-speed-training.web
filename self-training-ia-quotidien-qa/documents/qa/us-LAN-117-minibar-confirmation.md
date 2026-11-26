# LAN-117 — Déclarer le minibar et confirmer le départ (document fictif)

> Document fictif — aucune donnée réelle.
> Ticket de l'équipe Lanterne. Statut : **À affiner**. Estimation : 8 (fictive). Rattachée à la fonctionnalité `LAN-111` (départ express), règles DE-6 et DE-7 de `fiche-depart-express-v2.md`.

## User story

En tant que **client qui quitte l'hôtel**, je veux **déclarer ce que j'ai consommé dans le minibar, puis confirmer mon départ dans l'application**, afin de **partir sans passer au comptoir**.

## Critères d'acceptation

| Id | Critère |
|---|---|
| CA-1 | Avant de confirmer, le client peut déclarer les articles du minibar qu'il a consommés, avec leur quantité, à partir de la liste de l'hôtel. |
| CA-2 | Un client qui n'a rien consommé peut confirmer son départ avec le bouton « Je n'ai rien consommé ». |
| CA-3 | Après la confirmation, les étages contrôlent la chambre rapidement. |
| CA-4 | Si les étages constatent un écart avec la déclaration, il est facturé au client après son départ et le client en est informé. |
| CA-5 | À la confirmation, la chambre passe « libérée » dans le PMS. |
| CA-6 | Le parcours est intuitif et le message de confirmation s'affiche correctement. |
| CA-7 | Le parcours fonctionne sur les principaux téléphones. |

## Hors périmètre

- Les séjours exclus du départ express (DE-8) ne voient pas ce parcours : ils lisent « Présentez-vous à la réception ».
- Le règlement de la note lui-même relève de `LAN-113`.

## Dépendances

| Système | Besoin | État |
|---|---|---|
| Application Étages (direction des opérations) | Être prévenue des chambres libérées | Accès en attente |
| Connecteur PMS v2 (équipe Amarre) | Passer la chambre « libérée » | Disponible |

## Définition de prêt de l'équipe (extrait)

Une story entre dans un sprint quand :

1. **chaque critère d'acceptation est vérifiable** : une valeur ou un résultat observable, sans mot subjectif ;
2. **les cas d'erreur sont écrits** : ce qui se passe quand une étape échoue ;
3. **les dépendances sont levées** ou planifiées avant le début du sprint ;
4. la maquette est validée par le design.
