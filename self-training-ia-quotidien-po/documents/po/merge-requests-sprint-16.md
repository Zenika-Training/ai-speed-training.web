# Merge requests du sprint 16 — lanterne-sejour-api (document fictif)

> Document fictif — aucune donnée réelle.
> Résumés copiés depuis GitLab (groupe `sejour/lanterne`) à la fin du sprint 16.

| MR | Titre | Ticket | État | Résumé |
|---|---|---|---|---|
| !51 | Note détaillée dans l'application | `LAN-112` | Fusionnée | Lit les lignes de la note par le connecteur PMS v2 et les affiche avec le total, avant toute action du client. |
| !53 | Règlement par la pré-autorisation | `LAN-113` | Fusionnée | Encaisse le montant par la pré-autorisation quand elle couvre la note et n'a pas expiré ; sinon, affiche « Réglez votre note au comptoir ». |
| !54 | Contester une ligne de la note | `LAN-116` | Brouillon, non fusionnée | Exploration de Malo : bouton « Contester cette ligne » et message envoyé à la réception. Ni relue ni testée. |
| !55 | Accès authentifié au stockage des documents clients | `LAN-118` | Fusionnée | Rend l'authentification obligatoire en préproduction comme en production ; ajoute un test d'accès refusé. |

Le drapeau d'activation `depart-express` est activé pour `LYS-03` seulement. C'est un réglage de configuration, hors merge request.
