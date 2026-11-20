# Besoin en données de test — règlement par la pré-autorisation (document fictif)

> Document fictif — aucune donnée réelle.
> Rédigé par l'équipe Lanterne pour la recette du sprint 16 (`LAN-113`). Règles : `regles-pre-autorisation.md` (RP-1 à RP-8). Cas de test : `cas-de-test-depart-express.md` (CT-01 à CT-04).

## Ce qu'on veut

Un jeu de réservations de test pour la préproduction (`recette`), importé tel quel avant la campagne. Une ligne = un séjour de test. Aucune donnée personnelle : pas de nom, pas d'e-mail, pas de téléphone.

## Colonnes attendues

Séparateur `;`, décimales avec une virgule, dates au format `AAAA-MM-JJ`.

| Colonne | Contenu |
|---|---|
| `id_reservation` | `T-01`, `T-02`… |
| `hotel` | `LYS-03`, `LIL-07` ou `NTE-02` |
| `type_sejour` | `individuel`, `societe` (réglé directement par la société) ou `groupe` |
| `date_arrivee`, `date_depart` | octobre 2026 ; le départ est après l'arrivée |
| `nb_nuits` | nombre de nuits entre les deux dates (1 à 3) |
| `carte` | carte de test du prestataire de paiement fictif : `9999 0000 0000 00NN` (NN de 01 à 99) |
| `preautorisation_eur` | montant bloqué ; vide si le séjour n'a pas de pré-autorisation |
| `age_preautorisation` | âge au départ, au format `hhh:mm` (en recette la pré-autorisation est antidatée : cet âge est une donnée à part) ; vide s'il n'y a pas de pré-autorisation |
| `note_eur` | montant de la note |
| `cas_vise` | l'identifiant du besoin couvert (B-01…) |
| `resultat_attendu` | `Encaissé sur la pré-autorisation`, `Réglez votre note au comptoir`, `Présentez-vous à la réception` ou `Confirmation directe` |

## Les cas à couvrir (une ligne au moins chacun)

| Id | Cas | Règle |
|---|---|---|
| B-01 | Note nulle : 0,00 € | RP-2 |
| B-02 | Note minimale : 0,01 € | RP-3 |
| B-03 | Cas nominal : note couverte, pré-autorisation valide (au moins trois lignes, dont un séjour de plusieurs nuits) | RP-5, CT-01 |
| B-04 | Limite : note de 480,00 € pour une pré-autorisation de 480,00 € (couverte) | RP-3 |
| B-05 | Limite : note de 480,01 € pour une pré-autorisation de 480,00 € (non couverte) | RP-3 |
| B-06 | Note supérieure à la pré-autorisation : 640,00 € pour 300,00 € | RP-6, CT-02 |
| B-07 | Limite : pré-autorisation de 167 h 59 (valide) | RP-4 |
| B-08 | Limite : pré-autorisation de 168 h 00 (expirée) | RP-4 |
| B-09 | Pré-autorisation de 8 jours (192 h), note couverte | RP-4, CT-03 |
| B-10 | Expirée et insuffisante | RP-6 |
| B-11 | Séjour de groupe | RP-1, CT-04 |
| B-12 | Séjour réglé directement par une société | RP-1 |
| B-13 | Aucune pré-autorisation | RP-6 |

## Résultat attendu par cas

- Séjour de groupe ou de société : `Présentez-vous à la réception` (RP-1, avant tout autre contrôle).
- Note de 0,00 € : `Confirmation directe` (RP-2).
- Séjour éligible, pré-autorisation de moins de 168 h, note inférieure ou égale à la pré-autorisation : `Encaissé sur la pré-autorisation` (RP-5).
- Tous les autres cas : `Réglez votre note au comptoir` (RP-6, au sprint 16).
