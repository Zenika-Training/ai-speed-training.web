# Notes de session de test exploratoire — règlement du départ express (document fictif)

> Document fictif — aucune donnée réelle.
> Notes prises pendant la session, telles quelles, sans relecture.

**Charte** : explorer le règlement par la pré-autorisation (`LAN-113`, MR !53) en préproduction (`recette`), hôtel `LYS-03`, drapeau `depart-express` activé.
**Date et durée** : 21/10/2026, de 11 h 00 à 12 h 15 (heure de Paris).
**Environnement** : `lanterne-sejour-api` 1.16.0-rc2, service Paiement de l'équipe Gouvernail, prestataire de paiement de test.
**Données** : séjours de test `ST-0411` à `ST-0415`, préparés avec l'outil de données de test ; cartes de test commençant par 9999.

## Notes

- **11 h 02, ST-0411** : pré-autorisation de 300,00 € prise il y a 2 jours, note de 248,50 €. Tout est conforme : « Départ confirmé », chambre libérée, 248,50 € encaissés.
- **11 h 07** : ça sent bon pour LAN-113, on avance vite.
- **11 h 14, ST-0412** : pré-autorisation du 13/10, soit 8 jours, note de 248,50 €. J'ouvre le départ express et je confirme. L'application affiche « Départ confirmé » avec la coche verte, la chambre est libérée, la facture arrive par e-mail. Pourtant la console du prestataire de test n'a **aucune capture** pour PA-7702 : le solde de la pré-autorisation n'a pas bougé. Je m'attendais à « Réglez votre note au comptoir » (règle DE-3).
  - La cause : MR !53 ne gère pas l'expiration, Inès l'a oublié. Gouvernail a dû passer la durée de la pré-autorisation à 10 jours sans prévenir.
  - CRITIQUE, bloquant pour tout le sprint : on ne peut pas livrer, tous les clients vont partir sans payer.
- **11 h 31, ST-0413** : même préparation que ST-0412 (pré-autorisation de 8 jours). Même résultat : « Départ confirmé », aucune capture. Reproduit 2 fois sur 2.
- **11 h 47, ST-0414** : pré-autorisation de 400,00 €, note de 640,00 €. « Réglez votre note au comptoir », chambre non libérée, rien d'encaissé. Conforme.
- **11 h 58, ST-0415** : pré-autorisation de 150,00 €, note de 132,00 €. Conforme, mais le chargement a duré environ 9 secondes. Je l'ai refait 3 fois ensuite : moins d'une seconde à chaque fois. Pas reproduit.
- **12 h 05** : pour le mail de facture, j'ai repris les coordonnées du client croisé au comptoir de LYS-03 hier : Mme Exemple-Fictif, exemple.fictif@exemple.invalid, +33 1 00 00 00 99, chambre 214. À mettre dans le ticket pour que Théo puisse la retrouver.
- **12 h 10** : capture d'écran de ST-0412 enregistrée sous `ST-0412-depart-confirme.png` (non jointe ici).

## Échelle de sévérité de l'équipe Lanterne

| Sévérité | Définition |
|---|---|
| Bloquante | Une fonction principale est inutilisable et aucun contournement n'existe. |
| Majeure | Une règle métier ou un montant est faux ; un contournement existe ou le périmètre touché est limité. |
| Mineure | Une gêne sans effet sur la règle métier ni sur l'argent. |
| Cosmétique | Un défaut d'aspect ou de texte. |

La **priorité** (quand corriger) n'est pas la sévérité : elle se décide avec le PO, selon le planning et l'extension du drapeau à d'autres hôtels.
