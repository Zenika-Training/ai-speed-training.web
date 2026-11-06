---
name: charte-lanterne
description: Relit des textes d'interface de l'application Lanterne selon sa charte éditoriale (vouvoiement, phrases courtes, boutons, erreurs, états) et propose des corrections sans rien promettre.
---

# Charte éditoriale de Lanterne

> Document fictif — aucune donnée réelle. Skill d'exemple, tirée de la charte éditoriale de Lanterne.

Utilise cette skill quand on te demande de relire, réécrire ou vérifier des textes d'écran de Lanterne (titres, libellés de boutons, messages, états).

## Règles de la charte

- **Vouvoiement** du client, partout, sans exception.
- **Phrases courtes** : 20 mots au maximum, une idée par phrase.
- **Pas de jargon** : « note », jamais « folio » ; pas de sigle sans explication, pas de code technique (« Erreur 402 »). « Pré-autorisation » reste permis.
- **Pas d'humour, pas de familiarité, pas d'émoji** : le client règle de l'argent.
- **Ne promettre que ce que le produit fait.** Le départ express ne rembourse rien et ne tranche aucune contestation : jamais « remboursé », « accepté », « sous 24 h ». Une contestation arrête le départ express et la réception reprend la main.
- **Montant** toujours avec sa devise (`236,90 €`).
- **Textes simples à traduire** : mots courants, pas d'expression imagée ni de jeu de mots.

## Libellés de boutons

- Un verbe d'action à l'infinitif qui dit ce qui va se passer : « Continuer », « Régler la note ». Jamais « OK », « Valider » seul ou « Oui ».
- 32 caractères au maximum, espaces compris. Donne le nombre de caractères et signale que ce compte est à vérifier à la main.

## Messages d'erreur

- Dire ce qui s'est passé et ce que le client peut faire, en deux phrases courtes au plus.
- Pas de code, pas de reproche, pas de point d'exclamation.
- Si le client ne peut rien faire seul, l'envoyer à la réception.

## États à écrire pour chaque écran

| État      | Règle                                                                                        |
| --------- | -------------------------------------------------------------------------------------------- |
| Chargement | dit ce qui se prépare ; sur un bouton, un verbe au présent (« Règlement en cours »)          |
| Vide      | dit pourquoi il n'y a rien et ce que le client peut faire                                    |
| Erreur    | voir ci-dessus                                                                               |
| Succès    | confirme ce qui est fait, sans rien promettre d'autre                                        |

## Vocabulaire

| On écrit         | On n'écrit pas                  |
| ---------------- | ------------------------------- |
| note             | folio, addition                 |
| réception        | front desk                      |
| régler           | payer, checker                  |
| pré-autorisation | pré-auth, empreinte bancaire    |
| départ express   | check-out digital               |

## Comment rendre la relecture

Rends un tableau en texte, une ligne par texte relu :

| Texte actuel | Problème | Règle de la charte | Proposition |
| ------------ | -------- | ------------------ | ----------- |

Règles de rendu :

- Cite la règle de la charte pour chaque correction ; si aucune règle ne s'applique, ne corrige pas.
- N'écris que ce que l'application fait réellement ; en cas de doute sur ce que fait le produit, pose la question.
- Termine par la liste des textes qui promettent quelque chose au client, même si tu les as corrigés.
