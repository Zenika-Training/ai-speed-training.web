---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-foundation/handouts/handout-02-cadrer-avant-de-coder.md
---
# Handout — Cadrer avant de coder

**Développeur IA — Foundation · Zenika · fiche module 2**

L'agent ne sait que ce qu'on lui donne : cette fiche reprend le module 2 dans l'ordre des slides, et dit quoi lui donner avant qu'il touche au code.

## La context window d'un agent de code

*Module 2 · slide « La context window d'un agent de code »*

C'est **tout** ce que le modèle voit quand il répond :

| Bloc                       | Ce qu'il contient                                                                          | Chargé                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| **System prompt**          | les consignes du harness : rôle, règles de sécurité, format des réponses                   | à chaque appel                                          |
| **Tool definitions**       | la description de chaque tool exposé (lire, écrire, lancer une commande, MCP)              | à chaque appel, avant même le premier message           |
| **Instructions projet**    | le fichier d'instructions du dépôt et les skills chargées : conventions, commandes, pièges | à chaque session (les skills, à la demande)             |
| **Conversation**           | vos messages, les réponses, les corrections et les décisions                               | renvoyée à chaque appel                                 |
| **Tool calls + résultats** | fichiers lus, sorties de commandes, logs d'erreur, résultats de tests                      | le bloc qui grossit le plus vite                        |
| **Espace libre**           | la place qui reste avant la compaction                                                     | quand elle rétrécit, la qualité baisse et le coût monte |

> Chaque tool exposé, chaque fichier lu, chaque sortie de commande **consomme du budget**.

Une demande ciblée donne exactement ce dont l'agent a besoin, ni plus ni moins. À éviter : « Ajoute la pagination à l'API » en collant tout le dépôt. À la place : l'objectif, les fichiers clés, l'invariant et la commande de vérification.

## Vue d'ensemble : l'agent de code

*Module 2 · slide « Vue d'ensemble : l'agent de code »*

Le trajet d'une demande, du haut vers le bas :

1. **Toi** : tu demandes, tu valides aux points clés, tu relis le diff.
2. **Le harness** assemble la context window (les blocs ci-dessus) et l'envoie au LLM à chaque appel.
3. **Le LLM** prédit la suite : soit il répond, soit il écrit une **demande d'action** (« lis bookings.controller.ts », « lance npm test »).
4. **Le harness** vérifie les **permissions**, exécute le tool et remet la sortie dans la context window.
5. La boucle tourne jusqu'à l'objectif.

| Tools, exécutés par le harness | Pour…                                  |
| ------------------------------ | -------------------------------------- |
| **Fichiers**                   | lire la code base, morceau par morceau |
| **Terminal**                   | tests, git                             |
| **Serveurs MCP**               | tickets, base, documentation           |

> Le LLM est au centre, mais il ne touche à rien : tout ce qu'il « sait » vient de la context window, tout ce qu'il « fait » passe par les tools et les permissions.

## Instructions projet (`AGENTS.md`)

*Module 2 · slide « Instructions projet (AGENTS.md) »*

Un fichier **versionné** à la racine, **chargé à chaque session** : conventions, commandes, pièges. **Court**, avec des règles **vérifiables**.

| Vague                     | Concret                             |
| ------------------------- | ----------------------------------- |
| « Formate proprement »    | « Indentation 2 espaces »           |
| « Teste tes changements » | « npm test avant chaque commit »    |
| « Range le code »         | « Handlers dans src/api/handlers/ » |

* **Court** : quelques centaines de lignes au plus ; au-delà, l'adhérence chute. Chaque ligne est relue à chaque appel : elle doit mériter sa place.
* C'est du **contexte**, pas une configuration imposée : l'agent essaie de le suivre. Des règles spécifiques et non contradictoires sont mieux respectées.
* `AGENTS.md` est un format ouvert, lu par la plupart des harness ; certains ont leur propre nom de fichier (voir « Où ça se règle dans mon outil »).

### Le générer, puis le relire

1. **L'agent analyse le dépôt et propose** un premier jet.
2. **Relire** : les concepts métier sont-ils bien identifiés ? les invariants captés ? quelque chose d'halluciné ?
3. **Élaguer** ce qui se déduit du code : l'arborescence et la stack, l'agent les retrouve tout seul.
4. **Ajouter les pièges connus** : votre expertise.

> La génération donne un **point de départ**. Votre expertise **comble les trous**, surtout les pièges.

## Une demande initiale bien cadrée

*Module 2 · slide « Une demande initiale bien cadrée »*

* Le **premier message** de la session : il oriente **toute la suite**.
* **Court et relu** : objectif, fichiers, invariants, vérification.
* Les noms sont des **ancres** : un chemin, une commande, un invariant orientent l'attention vers tout un bloc de code.
* Les **invariants** réduisent les sorties plausibles mais mauvaises.

```text
Pagine GET /bookings par curseur.
Pars de bookings.controller.ts et de shared/pagination.
Fais évoluer le contrat OpenAPI, garde le schéma Page.
Fini quand npm test -- bookings passe.
```

Dans un code inconnu, on ne sait pas l'écrire seul : l'agent explore et propose les fichiers, commandes et pièges, le dev corrige. Pour une **tâche longue**, on écrit la demande dans un **fichier**, rechargé à chaque session : fichiers clés, commandes, invariants, pièges connus.

## Planifier avant de coder

*Module 2 · slide « Planifier avant de coder »*

L'erreur n° 1 : se jeter **directement dans la génération**. Le **mode plan** des harness explore et propose, sans modifier de fichier.

| Étape              | Ce qui se passe                                                                    | Exemple                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1. **Besoin flou** | le ticket tel qu'on le formule en une phrase                                       | « Pagine /bookings. »                                                                                   |
| 2. **Plan relu**   | l'agent propose la demande cadrée et les étapes ; vous les corrigez et les validez | 4 étapes vérifiables, réponse `{ items, nextCursor }`, contrat OpenAPI mis à jour, schéma Page inchangé |
| 3. **Code**        | généré à partir du plan validé, pas du besoin flou                                 | controller + tests, une étape à la fois                                                                 |

* Un bon plan : définir le problème, découper en **étapes vérifiables** (pour chacune, on sait dire « c'est fait » : un test qui passe, un fichier qui existe), identifier les contraintes (contrat d'API, sécurité, performance).
* Corriger un plan coûte quelques secondes ; corriger le code produit à partir d'un mauvais plan coûte une session.

> On demande d'abord un **plan**, on le corrige, *puis* le code : la sortie d'une étape devient le **contexte** de la suivante.

## Niveaux d'autonomie

*Module 2 · slide « Modes de pilotage : monter l'autonomie »*

Tous les harness proposent les **mêmes niveaux d'autonomie**, sous des noms différents : mode plan, demander, accepter les éditions, tout autoriser…

| Niveau d'autonomie           | L'agent…                                    | Pour…                             |
| ---------------------------- | ------------------------------------------- | --------------------------------- |
| **Observer sans agir**       | lit, cherche, propose un plan               | explorer un code inconnu          |
| **Demander à chaque action** | attend ton accord à chaque édition          | apprendre à lire ce qu'il propose |
| **Agir dans le périmètre**   | modifie les fichiers, demande pour le reste | dérouler un plan validé           |
| **Aller au bout seul**       | enchaîne sans rien demander                 | un environnement isolé et jetable |

* Un agent qu'on interrompt à chaque commande coûte plus cher qu'il ne rapporte. À l'inverse, monter l'autonomie sans borner les droits expose à tout ce qu'il peut toucher.
* Progression saine : approbation systématique au début, puis on lit le diff plutôt que chaque commande, et jamais « aller au bout seul » sans isolation (conteneur, VM).
* Autonomie et périmètre de droits sont **deux réglages distincts**.

> On monte d'un niveau quand on fait confiance au **périmètre**, avec un **filet** : tests, commits fréquents, diff relu.

## À retenir

1. **Instructions projet** : chaque session, courtes, vérifiables.
2. **Demande initiale** : la tâche du jour, avec objectif, fichiers, invariants, vérification.
3. **Plan** : des étapes vérifiables, relues avant le code.
4. **Autonomie** : réglée par niveaux, avec un filet.

**Mots-clés** : context window, system prompt, tool definitions, instructions projet, demande initiale, invariant, plan d'exécution, autorégression, niveau d'autonomie, permissions, human-in-the-loop — voir le glossaire.
