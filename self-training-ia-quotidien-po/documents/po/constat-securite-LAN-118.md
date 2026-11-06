# Constat de sécurité LAN-118 — stockage des documents clients (document fictif)

> Document fictif — aucune donnée réelle.
> Résumé rédigé par Aurèle à partir d'une alerte Wiz. L'export brut de l'alerte n'est pas joint :
> il décrit l'infrastructure (noms de machines, adresses internes).

| Champ | Valeur |
|---|---|
| Ticket | `LAN-118` |
| Élément | Stockage des documents clients (équipe Escale), environnement de préproduction |
| Constat | Les factures de test déposées en préproduction sont lisibles sans authentification, par quiconque connaît leur adresse. |
| Données concernées | Des factures de test, générées avec des données fictives. La production n'est pas concernée à ce jour. |
| Sévérité | Haute : Aurèle classe ce constat en sévérité haute. |
| Échéance de correction | Sous 30 jours à compter de l'ouverture du constat, au début du sprint 15 : l'échéance tombe pendant le sprint 16. |
| Correction attendue | Accès authentifié obligatoire en préproduction, comme en production ; un test qui vérifie qu'un accès sans authentification est refusé. |

## Pourquoi c'est lié au départ express

Le départ express affichera les factures dans l'application. Si la même configuration passait en
production, des factures réelles seraient lisibles par n'importe qui.

## Ce qu'Aurèle demande

- Planifier la correction dans le sprint 16.
- Ne pas activer l'affichage des factures dans l'application avant la correction.
- Ne jamais coller l'export brut de l'alerte dans un outil d'IA : il contient des noms de machines et des adresses internes.
