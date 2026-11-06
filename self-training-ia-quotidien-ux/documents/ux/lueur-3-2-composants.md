# Lueur 3.2 — composants et règles d'usage (document fictif)

> Document fictif — aucune donnée réelle.
> Extrait de la documentation du design system Lueur, partagé par les produits du portefeuille Séjour.

## Versions

- Lanterne utilise **Lueur 3.2**, figée : aucun changement sans nouvelle version.
- Un écran de Lanterne n'utilise qu'une seule version de Lueur.
- **Lueur 3.3** est en préparation. Ses composants ne sont pas utilisables dans Lanterne tant que l'équipe n'a pas migré (`LAN-109`).

## Les cinq composants de Lueur 3.2

| Composant | Usage | États |
|---|---|---|
| `Bouton` | Action principale ou secondaire ; une seule action principale par écran | normal, désactivé, chargement |
| `CarteChambre` | Résumé d'un séjour ou d'une chambre | normal |
| `BandeauStatut` | Message d'état en haut d'écran | succès, alerte, erreur |
| `ChampDate` | Saisie d'une date ou d'une heure | normal, erreur |
| `ListeDemandes` | Liste d'éléments avec un statut (demandes, lignes) | normal, vide |

## Composant de Lueur 3.3, non disponible pour Lanterne

| Composant | Usage | Disponibilité |
|---|---|---|
| `EtapesArrivee` | Suivi d'étapes numérotées | Lueur 3.3 seulement |

## Règles d'usage

- Accessibilité : niveau AA des WCAG 2.1 (contraste, libellés, ordre de lecture).
- Un montant s'affiche toujours avec sa devise, avant toute action qui engage le client.
- Un message d'erreur dit ce qui s'est passé et ce que le client peut faire.
- Ton : vouvoiement du client, phrases courtes, pas de jargon (« note » plutôt que « folio »).
- Un besoin qu'aucun composant ne couvre se signale à Maëlle : on n'invente pas de composant.
