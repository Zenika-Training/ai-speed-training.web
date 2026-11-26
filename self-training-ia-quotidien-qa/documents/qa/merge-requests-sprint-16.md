# Merge requests du sprint 16 — lanterne-sejour-api (document fictif)

> Document fictif — aucune donnée réelle.
> Résumés copiés depuis GitLab (groupe `sejour/lanterne`) à la fin du sprint 16, avec la liste des modules modifiés par chaque merge request.

| MR | Titre | Ticket | État | Modules modifiés | Résumé |
|---|---|---|---|---|---|
| !51 | Note détaillée dans l'application | `LAN-112` | Fusionnée | `note-detaillee` | Lit les lignes de la note par le connecteur PMS v2 et les affiche avec le total, avant toute action du client. |
| !52 | Calcul du montant de la note dans un module partagé | `LAN-120` | Fusionnée | `calcul-note` (nouveau, partagé) | Sort le calcul du total (lignes, taxe de séjour, remise de fidélité, arrondi) de la note détaillée pour en faire un module partagé. Il est utilisé par le départ express, l'estimation du montant au check-in, l'e-mail de facture et l'export des factures de la réception. Aucun changement fonctionnel annoncé. |
| !53 | Règlement par la pré-autorisation | `LAN-113` | Fusionnée | `preautorisation` | Encaisse le montant par la pré-autorisation quand elle couvre la note et n'a pas expiré ; sinon, affiche « Réglez votre note au comptoir ». |
| !54 | Contester une ligne de la note | `LAN-116` | Brouillon, non fusionnée | `contestation` | Exploration de Malo : bouton « Contester cette ligne » et message envoyé à la réception. Ni relue ni testée. |
| !55 | Accès authentifié au stockage des documents clients | `LAN-118` | Fusionnée | `stockage-documents` | Rend l'authentification obligatoire en préproduction comme en production ; ajoute un test d'accès refusé. |

Le drapeau d'activation `depart-express` est activé pour `LYS-03` seulement (préproduction ; l'activation en production à `LYS-03` est prévue lundi, après la décision du comité). C'est un réglage de configuration, hors merge request. Le calcul partagé (!52) n'est pas derrière ce drapeau : il s'applique dans tous les hôtels.
