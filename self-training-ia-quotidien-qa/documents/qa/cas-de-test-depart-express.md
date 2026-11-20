# Cas de test — LAN-111 Départ express, règlement (document fictif)

> Document fictif — aucune donnée réelle.
> Cas de test manuels rédigés par l'équipe Lanterne pour le sprint 16, en préproduction (`recette`), hôtel `LYS-03` (drapeau `depart-express` activé). Règles : `fiche-depart-express-v2.md`.
> Données : séjours de test préparés en `recette`, avec les cartes de test du prestataire de paiement fictif (numéros commençant par 9999). Jamais de vraie carte.

## Vue d'ensemble

| Id | Intitulé | Règles | Priorité | Automatisation |
|---|---|---|---|---|
| CT-01 | Règlement par la pré-autorisation | DE-2, DE-3, DE-7, DE-9 | Haute | À automatiser |
| CT-02 | Note supérieure à la pré-autorisation | DE-3 | Haute | À automatiser |
| CT-03 | Pré-autorisation expirée | DE-3 | Haute | À automatiser |
| CT-04 | Séjour de groupe exclu | DE-8 | Moyenne | À automatiser |

## CT-01 — Règlement par la pré-autorisation

**Préconditions** : séjour de test dont la pré-autorisation de 300,00 € date de moins de 7 jours ; note de 248,50 € ; jour du départ, après 6 h.

**Étapes**

1. Ouvrir le départ express dans l'application.
2. Vérifier que chaque ligne de la note et le total de 248,50 € sont affichés.
3. Confirmer le règlement.

**Résultat attendu**

- Le montant de 248,50 € est encaissé par la pré-autorisation.
- L'application affiche « Départ confirmé ».
- La chambre passe « libérée » dans le PMS.
- La facture est envoyée par e-mail.

## CT-02 — Note supérieure à la pré-autorisation

**Préconditions** : séjour de test dont la pré-autorisation de 300,00 € date de moins de 7 jours ; note de 640,00 € ; jour du départ.

**Étapes**

1. Ouvrir le départ express dans l'application.
2. Confirmer le règlement.

**Résultat attendu**

- Aucun encaissement n'a lieu.
- L'application affiche « Réglez votre note au comptoir ».
- La chambre n'est pas libérée.

## CT-03 — Pré-autorisation expirée

**Préconditions** : séjour de test dont la pré-autorisation de 300,00 € date de 8 jours ; note de 248,50 € ; jour du départ.

**Étapes**

1. Ouvrir le départ express dans l'application.
2. Confirmer le règlement.

**Résultat attendu**

- Aucun encaissement n'a lieu.
- L'application affiche « Réglez votre note au comptoir ».
- La chambre n'est pas libérée.

## CT-04 — Séjour de groupe exclu

**Préconditions** : séjour de test de type « groupe » ; jour du départ.

**Étapes**

1. Ouvrir l'application le jour du départ.

**Résultat attendu**

- Le départ express n'est pas proposé.
- L'application affiche « Présentez-vous à la réception ».
