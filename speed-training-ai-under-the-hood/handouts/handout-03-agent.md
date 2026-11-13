---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood/handouts/handout-03-agent.md
---
# Handout — Anatomie d'un agent

**Sous le capot : LLM, agents, harness et orchestrateurs · Zenika · fiche partie 3**

Un modèle qui n'écrit que des tokens finit par lire des fichiers, lancer des tests et ouvrir une PR : grâce à une boucle, des outils et quelques conventions. Cette fiche déroule la boucle, le format des appels d'outils, la mémoire, le RAG, MCP, une trace réelle, son coût et les façons dont un agent déraille.

> **Ordres de grandeur** : la trace et ses chiffres sont simplifiés et représentatifs, pas un log exporté.

## Agent = modèle + outils + boucle + objectif

*Partie 3 · slide « Agent = modèle + outils + boucle + objectif »*

> **Le modèle n'exécute rien. Il écrit une demande d'action.** Le harness lit cette demande, l'exécute (ou la refuse), et renvoie le résultat au modèle. On recommence jusqu'à ce que le modèle réponde sans demander d'outil.

| Ingrédient   | Rôle                             |
| ------------ | -------------------------------- |
| **Modèle**   | décide de la prochaine action    |
| **Outils**   | lire, écrire, exécuter, chercher |
| **Boucle**   | agir, observer, recommencer      |
| **Objectif** | et un critère d'arrêt            |

Le modèle produit du texte structuré du type « appelle l'outil `bash` avec `npm test` ». C'est un programme classique, le harness, qui décide de l'exécuter : c'est donc **là** qu'on met les permissions, la sandbox, la confirmation humaine.

Le critère d'arrêt est souvent oublié : sans lui, un agent peut tourner longtemps. Les harness ajoutent des limites (nombre de tours, budget de tokens, timeout).

> Les noms de cette boucle : **ReAct** (*Reason + Act*, 2022), *gather context → take action → verify work → repeat* (Anthropic), OODA. Même mécanisme.

## La boucle, tour par tour

*Partie 3 · slide « La boucle, tour par tour »*

Un tour = un appel complet au modèle (prefill + decode). Exemple : « Le test `login` échoue, corrige-le ».

1. **Demande** : le harness assemble le contexte (instructions + tools + historique + résultats) et l'envoie au modèle avec la liste des outils.
2. **Appel au modèle** : il répond, par exemple, « j'appelle `bash` avec `npm test` ».
3. **Appel de tool ?** Si oui, le harness vérifie la **permission** (allow, ask, deny, hooks, sandbox), puis **exécute** le tool.
4. Le **résultat est ajouté au contexte** et le harness renvoie **tout** au modèle (il est sans état), plus la sortie.
5. Le modèle demande par exemple à lire le fichier du test, et ainsi de suite.
6. Quand il répond **sans appel d'outil**, c'est la **réponse finale**.

Une tâche simple : 5 à 20 tours. Une grosse tâche : des centaines. À chaque tour le contexte grossit ; sans prompt caching, le coût du tour n serait proportionnel à toute la conversation depuis le début.

La question « appel d'outil ? » correspond à un champ de la réponse de l'API : `stop_reason: "tool_use"` chez Anthropic, `finish_reason: "tool_calls"` chez OpenAI.

## Tool calling : ce qui transite réellement

*Partie 3 · slide « Tool calling : ce qui transite réellement »*

Format de l'API Messages d'Anthropic (simplifié). OpenAI et Google utilisent des structures équivalentes (`tools` / `tool_calls` / message de rôle `tool`) : le principe est identique, ce qui permet à une gateway de traduire d'un format à l'autre.

**① Le harness déclare l'outil**

```json
{
  "name": "run_tests",
  "description": "Lance les tests",
  "input_schema": {
    "type": "object",
    "properties": {
      "path": { "type": "string" }
    }
  }
}
```

**② Le modèle demande**

```json
{
  "type": "tool_use",
  "id": "call_01",
  "name": "run_tests",
  "input": { "path": "tests/login" }
}
```

**③ Le harness répond**

```json
{
  "type": "tool_result",
  "tool_use_id": "call_01",
  "content": "FAIL login:42 expected 200, got 401"
}
```

> Le modèle choisit **sur la description** : nom, description et schéma de chaque outil sont envoyés **en tokens** à chaque tour. 40 outils MCP branchés = des milliers de tokens de préfixe.

* Le modèle a été entraîné (phase 2) à produire ce JSON. Le fournisseur peut contraindre la génération (*constrained decoding*, *structured outputs*) : à l'échantillonnage, on interdit les tokens qui rendraient le JSON invalide vis-à-vis du schéma.
* Une mauvaise description = un outil mal utilisé ou ignoré. Quand vous écrivez un serveur MCP ou une skill, soignez la description : **c'est un prompt**.

## Mémoire : quatre étages

*Partie 3 · slide « Mémoire : quatre étages »*

Un modèle n'a qu'une mémoire, la context window. Les étages 2, 3 et 4 sont des stratégies du harness pour décider **quoi y remettre**.

| Étage                 | Contenu                                                                            | Rôle                 |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------- |
| **1. Context window** | la conversation en cours ; rapide, chère, limitée                                  | mémoire de travail   |
| **2. Compaction**     | quand la context window sature, le harness résume l'historique et repart du résumé | résumé               |
| **3. Fichiers**       | `AGENTS.md`, `CLAUDE.md`, notes, plans : relus à chaque session                    | mémoire persistante  |
| **4. Recherche**      | `grep`, index sémantique (RAG), MCP : on va chercher seulement ce qui sert         | mémoire à la demande |

> Les agents de code privilégient souvent la **recherche agentique** (`grep`, `find`, lecture de fichiers) plutôt qu'un index vectoriel : toujours à jour, et le code se cherche bien par mots exacts.

Les deux approches coexistent : Claude Code a fait le choix de la recherche par outils dès le départ, d'autres (Cursor par exemple) indexent le dépôt. L'index est utile sur de très gros dépôts ou de la documentation en langage naturel ; la recherche par outils est plus fiable et toujours fraîche sur du code.

## RAG : le retour des embeddings

*Partie 3 · slide « RAG : le retour des embeddings »*

Exemple de question : « Comment configure-t-on le retry du client HTTP interne ? »

| Étape                             | Ce qui se passe                                                                          | Exemple                                           |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **1. Indexer** (*indexing*)       | la doc est découpée en morceaux ; un modèle d'embedding calcule un vecteur par morceau   | wiki technique et ADR indexés dans pgvector       |
| **2. Chercher** (*retrieval*)     | la question est vectorisée ; on prend les morceaux les plus proches (similarité cosinus) | les 3 passages sur la politique de retry          |
| **3. Augmenter** (*augmentation*) | ces morceaux entrent dans le contexte, avec la question                                  | 3 passages, pas les 400 pages du wiki             |
| **4. Générer** (*generation*)     | le modèle répond à partir des passages et cite ses sources                               | « maxRetries = 3, backoff exponentiel \[ADR-012] » |

Bases vectorielles courantes : pgvector, Qdrant, Weaviate, Elasticsearch. L'index est utile pour la documentation en langage naturel ; pour le code, la recherche agentique reste souvent préférable (voir [mémoire](#memoire-quatre-etages)). Les modèles d'embedding : [fiche 2](handout-02-llm-slm#embeddings-du-numero-au-sens).

## MCP : une prise standard pour les outils

*Partie 3 · slide « MCP : une prise standard pour les outils »*

**Model Context Protocol** : l'« USB-C » des agents. Protocole ouvert lancé par Anthropic en novembre 2024, adopté par OpenAI, Google, Microsoft, GitHub, puis confié à une fondation sous l'égide de la Linux Foundation. Un serveur MCP écrit une fois fonctionne dans tous les harness compatibles. Transport : `stdio` (local) ou HTTP (distant), en JSON-RPC.

* **Ce qu'expose un serveur** : **Tools** (actions), **Resources** (données à lire), **Prompts** (modèles réutilisables).
* **Exemples de serveurs** : GitHub, Playwright, PostgreSQL, Atlassian, Figma, Sentry.
* **Le revers** : chaque serveur ajoute des définitions d'outils au contexte, et c'est du **code tiers** qui agit avec vos droits. Un serveur malveillant ou une donnée piégée dans sa réponse est un vecteur d'attaque (voir [la fiche 5](handout-05-guardrails-gateways#ce-dont-on-se-protege)).

MCP n'apporte aucune « intelligence » : c'est de la plomberie standardisée, mais c'est elle qui a rendu les agents utiles en entreprise (accès à Jira, aux bases, au CI).

**Et entre agents ?** **A2A** (Agent2Agent, initié par Google en avril 2025) est un protocole pour que des agents de fournisseurs différents se découvrent et se délèguent des tâches. **MCP connecte un agent à des outils ; A2A connecte des agents entre eux.**

## Une trace réelle, commentée

*Partie 3 · slide « Une trace réelle, commentée »*

| Tour | Le modèle demande                | Le harness renvoie              | Contexte |
| ---- | -------------------------------- | ------------------------------- | -------- |
| 1    | `bash: npm test -- login`        | échec : `expected 200, got 401` | 12 k     |
| 2    | `read_file: tests/login.spec.ts` | 80 lignes                       | 14 k     |
| 3    | `grep: "createSession"`          | 3 occurrences                   | 15 k     |
| 4    | `read_file: src/auth/session.ts` | 210 lignes                      | 19 k     |
| 5    | `edit: session.ts` (2 lignes)    | diff appliqué, après accord     | 20 k     |
| 6    | `bash: npm test -- login`        | succès : `1 passed`             | 21 k     |
| 7    | *pas d'outil* : réponse finale   | « Corrigé : le token expirait » | 21 k     |

À lire :

* **7 appels au modèle**, et à chaque tour **tout** le contexte est renvoyé : la colonne « Contexte » grossit.
* Le **tour 5** est le point de contrôle humain : le harness demande l'accord avant d'écrire, selon sa configuration de permissions.
* Question : que se passe-t-il si, au tour 4, le fichier fait 5 000 lignes ? Le contexte explose, le coût des tours suivants aussi, et la qualité baisse (context rot). D'où l'intérêt des outils de lecture partielle et des sous-agents qui lisent à part.

## Ce que coûte cette trace

*Partie 3 · slide « Ce que coûte cette trace »*

La somme des contextes envoyés (12 + 14 + 15 + 19 + 20 + 21 + 21 = 122 k, plus les sorties) donne **~130 k tokens d'entrée cumulés**, pour un bug simple.

* **Le constat** : le préfixe déjà vu domine. Chaque tour ne rajoute que quelques milliers de tokens ; tout le reste a déjà été lu au tour précédent.
* **Avec le prompt caching** : ce préfixe est lu en cache, facturé ~10 %. Sans cache, la facture d'entrée de cette trace serait plusieurs fois plus élevée (jusqu'à environ dix fois selon les tarifs, ordre de grandeur). Voir [le prompt caching](handout-02-llm-slm#du-kv-cache-au-prompt-caching-la-facture-de-vos-agents).

## Comment un agent déraille

*Partie 3 · slide « Comment un agent déraille »*

| Mode d'échec            | Ce qui se passe                                                                                        | Parade                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| **Boucle sans fin**     | la même correction est tentée dix fois, sans progrès                                                   | limite de tours, détection de répétition                                |
| **Dérive de contexte**  | trop d'informations, l'objectif initial se dilue                                                       | sessions courtes, sous-agents, plan écrit                               |
| **Faux succès**         | « tous les tests passent »… après avoir supprimé le test (ou ajouté un skip, mocké la fonction testée) | vérification indépendante, revue de diff                                |
| **Outil halluciné**     | appel d'une fonction ou d'une option CLI qui n'existe pas                                              | schémas stricts, messages d'erreur utiles                               |
| **Explosion de coût**   | un agent autonome laissé la nuit                                                                       | budget par tâche, alertes, gateway                                      |
| **Injection indirecte** | un fichier, une page web ou une issue contient des instructions que l'agent suit                       | voir [la fiche 5](handout-05-guardrails-gateways#ce-dont-on-se-protege) |

Chaque parade se situe dans le **harness** ou dans l'**orchestration**, pas dans le modèle. Les modèles récents évitent un peu mieux le faux succès, mais la vérification indépendante reste indispensable : c'est l'un des arguments du SDD et des agents « évaluateurs » (voir [la fiche 4](handout-04-harness-orchestrateurs#et-le-sdd-dans-tout-ca)).
