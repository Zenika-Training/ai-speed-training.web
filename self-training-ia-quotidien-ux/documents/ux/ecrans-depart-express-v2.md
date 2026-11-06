# Départ express — les quatre écrans, version 2 (document fictif)

> Document fictif — aucune donnée réelle. Tous les montants sont fictifs.
> Textes provisoires, écrits vite pour la revue de maquette : à reprendre avant la mise en production.
> Écrans issus de la revue avec les chefs de réception (fiche `LAN-111`, règles DE-1 à DE-12).

## Rappels utiles pour les textes

- Composants : Lueur 3.2 uniquement (`Bouton`, `CarteChambre`, `BandeauStatut`, `ChampDate`, `ListeDemandes`). Les champs de saisie de texte et la case à cocher de l'écran 2 sont des besoins signalés à Maëlle, en attendant leurs versions provisoires.
- DE-4 : si le client conteste une ligne, le départ express s'arrête pour ce séjour ; la réception reprend la main.
- DE-9 : la facture est envoyée par e-mail et disponible dans l'application.
- DE-10 : les informations de société ne sont conservées qu'avec l'accord explicite du client (case non cochée par défaut).
- DE-11 : carte-clé déposée dans l'urne à la sortie. L'hôtel `NTE-02` n'a pas d'urne : question ouverte.
- Séjour de l'exemple : 2 nuits, chambre 312 de `LYS-03`, départ prévu à 11 h. Pré-autorisation prise à l'arrivée : 250,00 €.

## Écran 1 — Départ express : votre note

| Élément | Composant | Texte provisoire |
|---|---|---|
| Titre | — | Ton folio de départ |
| Introduction | — | Voici ton folio. Vérifie chaque ligne avant de continuer. |
| Séjour | `CarteChambre` | Chambre 312 · 2 nuits · départ avant 11 h |
| Ligne 1 | `ListeDemandes` | Nuitées (2 nuits) — 198,00 € |
| Ligne 2 | `ListeDemandes` | Petit-déjeuner — 24,00 € |
| Ligne 3 | `ListeDemandes` | Bar de l'hôtel — 11,50 € |
| Ligne 4 | `ListeDemandes` | Taxe de séjour — 3,40 € |
| Total | — | Total : 236,90 |
| Action principale | `Bouton` | OK |
| Action secondaire | `Bouton` | Contester une ligne |
| Après « Contester une ligne » | `BandeauStatut` alerte | Contestation reçue. On s'occupe de tout ! |

États : normal uniquement. Aucun texte écrit pour le chargement de la note ni pour une note sans ligne.

## Écran 2 — Départ express : informations de société (facultatif)

| Élément | Composant | Texte provisoire |
|---|---|---|
| Titre | — | Infos société (facultatif) |
| Champ 1 | champ de texte (besoin signalé) | Raison sociale |
| Champ 2 | champ de texte (besoin signalé) | N° TVA intracom. |
| Choix | case à cocher (besoin signalé), non cochée | Conserver mes infos pour mes prochains séjours |
| Action principale | `Bouton` | Valider et générer le folio |
| Action secondaire | `Bouton` | Passer |
| Erreur de saisie | message sous le champ | Champ invalide |

États : normal uniquement.

## Écran 3 — Départ express : règlement

| Élément | Composant | Texte provisoire |
|---|---|---|
| Titre | — | Règle ton folio |
| Rappel | — | Total : 236,90 |
| Action principale | `Bouton` | Régler ma note avec ma pré-autorisation de séjour |
| Montant au-delà de la pré-autorisation | `BandeauStatut` alerte | Erreur 402 : le montant dépasse la pré-autorisation. |
| Pré-autorisation expirée | `BandeauStatut` alerte | Erreur 402 : pré-autorisation expirée. |
| Paiement refusé | `BandeauStatut` erreur | Erreur 402. Réessaie plus tard. |

États du bouton : normal et désactivé. Aucun texte écrit pour l'état chargement pendant le paiement.

## Écran 4 — Départ express : confirmation

| Élément | Composant | Texte provisoire |
|---|---|---|
| Succès | `BandeauStatut` succès | C'est dans la boîte ! 🎉 |
| Facture | — | Ta facture arrive par mail. Remboursement immédiat en cas d'erreur. |
| Carte-clé | — | Dépose ta carte dans l'urne en sortant. |
| Action principale | `Bouton` | OK |
