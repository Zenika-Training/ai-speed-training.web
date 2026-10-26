---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-foundation/handouts/handout-01-comprendre-la-machine.md
---
# Handout — Comprendre la machine

**Développeur IA — Foundation · Zenika · fiche module 1**

L'agent ne devine pas : il prolonge ce qu'on lui donne. Cette fiche reprend l'ouverture et le module 1 dans l'ordre des slides : ce que fait vraiment un LLM, et ce qu'est un agent de code.

## Vibe coding vs AI-driven dev

*Ouverture · slide « Vibe coding vs AI-driven dev »*

|                      | Vibe coding                      | AI-driven dev                        |
| -------------------- | -------------------------------- | ------------------------------------ |
| **Logique**          | explorer vite                    | produire de façon fiable             |
| **Marche bien pour** | spike, prototype, script jetable | code livré, relu, maintenu           |
| **Réflexe**          | on tente, on observe, on jette   | on cadre, on contrôle, on capitalise |

> Les deux sont utiles : **viber pour explorer, piloter pour livrer**.

## Sortie subie ou sortie pilotée ?

*Ouverture · slide « Sortie subie ou sortie pilotée ? »*

Une scène familière : « Ajoute la pagination sur l'endpoint /bookings. » L'agent part sur de l'offset avec un helper maison ; on répond « on utilise des curseurs » ; il invente son propre format de page ; on rappelle les tests ; il écrit des tests qui mockent tout. Quatre allers-retours : une **sortie subie**.

Chaque relance révélait une information disponible **dès le départ** :

| Ce qu'on a dit               | Ce qu'il fallait donner                  |
| ---------------------------- | ---------------------------------------- |
| « ajoute la pagination »     | un **objectif** et un **critère de fin** |
| « on utilise des curseurs »  | les **conventions** du projet            |
| « le format de page commun » | les **invariants**                       |
| « les tests »                | les **commandes de vérification**        |

> Pas de prompt magique : on construit l'entrée pour une **sortie pilotée**.

## Six notions, une phrase chacune

*Module 1 · slide « Six notions, une phrase chacune »*

| Notion             | En une phrase                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **LLM**            | Le moteur : un réseau de neurones qui **prédit le token suivant**, à partir de tout ce qu'on lui envoie.               |
| **Token**          | L'unité de compte : un morceau de mot ou de code. Le modèle lit, écrit, **limite et facture** en tokens.               |
| **Context window** | Tout ce que le modèle voit : le texte envoyé à chaque appel. **Ce qui n'y est pas n'existe pas.**                      |
| **Harness**        | Tout sauf le modèle : le logiciel qui l'entoure (boucle, tools, contexte, permissions).                                |
| **Tools**          | Les mains : lire un fichier, lancer une commande, chercher. Le modèle les **demande**, le harness les exécute.         |
| **Agent**          | Le modèle qui agit : placé dans une **boucle** avec des tools et un objectif, il choisit lui-même la prochaine action. |

Un même produit couvre plusieurs cases : Claude Code ou Copilot sont des harness, et deviennent des agents une fois lancés avec un modèle et une tâche. On classe des rôles, pas des marques.

## Le texte découpé en tokens

*Module 1 · slide « Le texte découpé en tokens »*

Le modèle ne lit pas des mots, mais des tokens. Découpage réel avec le tokenizer o200k\_base (GPT-4o, GPT-5) ; les autres modèles découpent un peu différemment, l'ordre de grandeur reste le même.

| Texte                                                       | Tokens |
| ----------------------------------------------------------- | ------ |
| « Ajoute la pagination sur l'endpoint /bookings. » (6 mots) | **12** |
| « Add pagination to the /bookings endpoint. » (6 mots)      | **9**  |
| « anticonstitutionnellement » (1 mot)                       | **5**  |
| `return res.status(404).json({ error: "Not found" });`      | **15** |

* Les mots **courants** tiennent en un token, les mots **rares** et les identifiants sont découpés.
* Le **français** consomme plus de tokens que l'anglais pour dire la même chose.
* Un fichier de 2 000 lignes lu par l'agent, c'est des dizaines de milliers de tokens dans la context window.

> Plus de tokens = **plus cher**, **plus lent**, et **plus de place** prise dans la context window.

## Plausible ≠ vrai

*Module 1 · slide « Choisir le token suivant : plausible ≠ vrai » et démo « La souris mange… »*

Après `return res.status(`, le modèle tire le token suivant parmi les candidats **les plus probables** : 200, 404, 201… Le bon code de retour dépend du contrat de l'API ; s'il n'est pas dans le contexte, le modèle écrit le plus fréquent dans ses données d'entraînement.

* **Une part de hasard** : relancer donne une autre réponse. Une réponse est un tirage, pas un calcul.
* **Chaque mot pèse** : `curseur`, `OpenAPI`, `avec tests` déplacent toute la suite.

> Un LLM produit du **plausible**, pas du **vrai**. Sans la bonne information dans le contexte, l'hallucination est le fonctionnement normal.

Quand la sortie bouge beaucoup, la bonne question n'est pas « quel modèle ? » mais « **qu'est-ce que je n'ai pas cadré ?** ».

## Le modèle n'a pas de mémoire

*Module 1 · slide « Le modèle n'a pas de mémoire »*

À chaque appel, le harness renvoie **toute la session** au modèle.

* Une erreur du tour 2 est **relue à chaque tour** suivant.
* La « mémoire » du harness (fichiers d'instructions, notes gardées) est du texte **relu à chaque session** : une info périmée continue de peser.
* Une **nouvelle session** repart de zéro : c'est un outil, pas un échec.

## Chat, workflow ou agent ?

*Module 1 · slide « Chat, workflow ou agent ? »*

|                                      | Chat ou complétion                       | Workflow LLM                          | Agent                                                |
| ------------------------------------ | ---------------------------------------- | ------------------------------------- | ---------------------------------------------------- |
| **Qui décide de l'étape suivante ?** | l'humain                                 | le **code** (chemin écrit à l'avance) | le **modèle**                                        |
| **Tools**                            | aucun ou peu                             | appelés à des étapes fixes            | choisis à chaque tour                                |
| **Appels au modèle**                 | 1 par demande                            | nombre fixe                           | variable, inconnu à l'avance                         |
| **Exemple**                          | suggestion inline, « Tab pour accepter » | résumer chaque PR à l'ouverture       | « Ajoute la pagination à /bookings, avec ses tests » |

> Règle d'Anthropic (*Building effective agents*) : commencer par **la solution la plus simple** qui marche. Un workflow prévisible bat souvent un agent autonome.

## Modèle ≠ harness

*Module 1 · slide « Modèle ≠ assistant (le harness) »*

* Le **modèle** est le moteur ; le **harness** lui donne les moyens d'agir : boucle de tools, contexte, permissions, traces.
* **Même modèle, deux harness** : des résultats très différents. Le harness pèse autant que le choix du modèle.

> Les noms changent tous les trimestres. Les notions restent.

## La boucle agentique

*Module 1 · slide « La boucle agentique »*

**Agent = modèle + tools + boucle + objectif.** Le modèle n'exécute rien : il écrit une **demande d'action**, le harness l'exécute.

1. Le harness envoie la demande et la liste des tools.
2. Le modèle répond « j'appelle bash avec `npm test` ».
3. Le harness vérifie que c'est autorisé, exécute, récupère la sortie.
4. Il renvoie **tout** au modèle, plus la sortie.
5. On recommence jusqu'à une réponse **sans appel de tool**.

C'est dans le harness, pas dans le modèle, qu'on met les permissions, la sandbox et la confirmation humaine. Le meilleur critère d'arrêt est observable : « les tests de /bookings passent ».

## Une trace commentée

*Module 1 · slide « Une trace d'agent, commentée »*

Trace simplifiée et représentative ; les chiffres sont des ordres de grandeur.

| Tour | Le modèle demande                        | Le harness renvoie                | Contexte |
| ---- | ---------------------------------------- | --------------------------------- | -------- |
| 1    | `grep: "bookings"`                       | 6 fichiers                        | 12 k     |
| 2    | `read_file: bookings.controller.ts`      | 20 lignes                         | 14 k     |
| 3    | `read_file: shared/pagination/cursor.ts` | 100 lignes                        | 15 k     |
| 4    | `edit: bookings.controller.ts` + test    | diff appliqué, après accord       | 17 k     |
| 5    | `bash: npm test -- bookings`             | échec : `nextCursor is undefined` | 19 k     |
| 6    | `edit: bookings.controller.ts`           | diff appliqué                     | 20 k     |
| 7    | `bash: npm test -- bookings`             | succès : `12 passed`              | 21 k     |

* L'agent commence par **chercher et lire** : il découvre le code comme nous.
* Au tour 4, le harness demande l'**accord** avant d'écrire, selon ses permissions.
* Au tour 5, c'est l'**échec du test** qui ramène l'agent dans le droit chemin : les tests sont son filet.
* La colonne « contexte » grossit à chaque tour, et à chaque tour on renvoie tout.

> Le code généré est une **proposition plausible**, pas une vérité.

La vue d'ensemble de l'agent de code (context window, tools, permissions) ouvre le module 2 : voir le handout « Cadrer avant de coder ».

## À retenir

1. Le modèle **prédit**, le harness **agit**.
2. Ce qui sort de la boucle est **plausible** ; c'est le contexte (et les tests) qui le rendent juste.
3. Le modèle relit toute la session à chaque appel : ce qui y traîne compte.
4. Un agent, c'est un modèle qui choisit lui-même ses tools, en boucle, jusqu'à un objectif.

**Mots-clés** : LLM, token, context window, harness, tools, agent, boucle agentique, hallucination, permissions — voir le glossaire.
