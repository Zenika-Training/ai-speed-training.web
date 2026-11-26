---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood/handouts/handout-03-agent.md
---
# Handout — Anatomie d'un agent

**Sous le capot : LLM, agents, harness et orchestrateurs · Zenika · fiche partie 3**

Un modèle qui n'écrit que des tokens finit par lire des fichiers, lancer des tests et ouvrir une PR : grâce à une boucle, des outils et quelques conventions. Cette fiche déroule la boucle, une trace réelle, les tools, MCP, les skills, les sous-agents, le RAG, la planification, le coût de la trace et les façons dont un agent déraille.

> **Ordres de grandeur** : la trace et ses chiffres sont simplifiés et représentatifs, pas un log exporté.

## Agent = modèle + boucle + outils + objectif

*Partie 3 · slide « Agent = modèle + boucle + outils + objectif »*

> **Le modèle n'exécute rien. Il écrit une demande d'action.** Le harness lit cette demande, l'exécute (ou la refuse), et renvoie le résultat au modèle. On recommence jusqu'à ce que le modèle réponde sans demander d'outil.

| Ingrédient   | Rôle                             |
| ------------ | -------------------------------- |
| **Modèle**   | décide de la prochaine action    |
| **Boucle**   | agir, observer, recommencer      |
| **Outils**   | lire, écrire, exécuter, chercher |
| **Objectif** | et un critère d'arrêt            |

Le modèle produit du texte structuré du type « appelle l'outil `bash` avec `npm test` ». C'est un programme classique, le harness, qui décide de l'exécuter : c'est donc **là** qu'on met les permissions, la sandbox, la confirmation humaine.

Le critère d'arrêt est souvent oublié : sans lui, un agent peut tourner longtemps. Les harness ajoutent des limites (nombre de tours, budget de tokens, timeout).

> Les noms de cette boucle : **ReAct** (*Reason + Act*, 2022), *gather context → take action → verify work → repeat* (Anthropic), OODA. Même mécanisme.

## La boucle, tour par tour

*Partie 3 · slide « La boucle, tour par tour »*

Un tour = un appel complet au modèle, qui génère sa réponse token par token. Exemple : « Le test `login` échoue, corrige-le ».

1. **Demande** : le harness assemble le contexte (instructions + tools + historique + résultats) et l'envoie au modèle avec la liste des outils.
2. **Appel au modèle** : il répond, par exemple, « j'appelle `bash` avec `npm test` ».
3. **Appel de tool ?** Si oui, le harness vérifie la **permission** (allow, ask, deny, hooks, sandbox), puis **exécute** le tool.
4. Le **résultat est ajouté au contexte** et le harness renvoie **tout** au modèle (il est sans état), plus la sortie.
5. Le modèle demande par exemple à lire le fichier du test, et ainsi de suite.
6. Quand il répond **sans appel d'outil**, c'est la **réponse finale**.

Une tâche simple : 5 à 20 tours. Une grosse tâche : des centaines. À chaque tour le contexte grossit ; sans prompt caching, le coût du tour n serait proportionnel à toute la conversation depuis le début.

La question « appel d'outil ? » correspond à un champ de la réponse de l'API : `stop_reason: "tool_use"` chez Anthropic, `finish_reason: "tool_calls"` chez OpenAI.

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

## Les tools : le function calling

*Partie 3 · slide « Les tools : le function calling »*

Le modèle ne sait qu'écrire : un **tool** est une fonction qu'il demande et que le harness exécute. Format de l'API Messages d'Anthropic (simplifié) ; OpenAI et Google utilisent des structures équivalentes (`tools` / `tool_calls`, `functionCall`) : le principe est identique, ce qui permet à une gateway de traduire d'un format à l'autre.

**① Le harness déclare le tool** (nom, description, schéma des paramètres), à chaque appel :

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

**② Le modèle demande** :

```json
{
  "type": "tool_use",
  "id": "call_01",
  "name": "run_tests",
  "input": { "path": "tests/login" }
}
```

**③ Le harness exécute** (ou refuse, selon les permissions) **et répond** :

```json
{
  "type": "tool_result",
  "tool_use_id": "call_01",
  "content": "FAIL login:42 expected 200, got 401"
}
```

> Le modèle choisit **sur la description** : nom, description et schéma de chaque tool sont envoyés **en tokens** à chaque tour. 40 tools branchés = des milliers de tokens de préfixe. Une description floue = un tool mal utilisé ou ignoré : **c'est un prompt**.

* Le modèle a été entraîné (phase 2) à produire ce JSON. Le fournisseur peut contraindre la génération (*constrained decoding*, *structured outputs*) : à l'échantillonnage, on interdit les tokens qui rendraient le JSON invalide vis-à-vis du schéma.
* Les tools de base d'un agent de code : lire, écrire et éditer un fichier, chercher (`grep`, `glob`), lancer une commande, aller sur le web.

## Au-delà des tools : MCP, skills, sous-agents, RAG

*Partie 3 · slide « Au-delà des tools : MCP, skills, sous-agents, RAG »*

Quatre façons d'apporter au modèle des outils ou du savoir **sans tout charger** dans le contexte. Chacune se juge à ce qu'elle y ajoute.

| Mécanisme      | Ce que c'est                                                     | Exemple                  | Dans le contexte                 |
| -------------- | ---------------------------------------------------------------- | ------------------------ | -------------------------------- |
| **MCP**        | les tools d'un serveur standard, branché dans tous les harness   | GitHub, Jira, Playwright | ses définitions de tools         |
| **Skill**      | des instructions et des scripts, chargés à la demande            | revue de PR, release     | sa description, puis son contenu |
| **Sous-agent** | une sous-tâche menée par un autre agent, dans un contexte à part | explorer le dépôt        | son résumé seulement             |
| **RAG**        | les passages utiles d'un index de documentation                  | wiki, ADR                | 3 passages, pas 400 pages        |

**MCP** (*Model Context Protocol*) : protocole ouvert lancé par Anthropic en novembre 2024, adopté par OpenAI, Google, Microsoft, GitHub, puis confié à une fondation sous l'égide de la Linux Foundation. Un serveur expose des **tools** (actions), des **resources** (données à lire) et des **prompts** (modèles réutilisables) ; écrit une fois, il fonctionne dans tous les harness compatibles. Transport : `stdio` (local) ou HTTP (distant), en JSON-RPC. Le revers : chaque serveur ajoute ses définitions de tools au contexte, et c'est du **code tiers** qui agit avec vos droits (voir [la fiche 5](handout-05-guardrails-gateways#ce-dont-on-se-protege)). **A2A** (Agent2Agent, initié par Google) connecte des agents entre eux, là où MCP connecte un agent à des outils.

**Skill** : un dossier avec un `SKILL.md` (instructions) et, au besoin, des scripts et des modèles. Seuls le nom et la description restent dans le contexte ; le contenu est chargé quand la tâche s'y prête (chargement progressif). Format ouvert né chez Anthropic, repris par d'autres harness.

**Sous-agent** : le harness lance un autre agent, avec un contexte vierge et ses propres tools, pour une sous-tâche (explorer, relire, tester). Il ne renvoie qu'un résumé : le contexte principal reste propre. C'est la parade à la dérive de contexte.

**RAG** (*Retrieval-Augmented Generation*) : on découpe la documentation en morceaux, un modèle d'embedding calcule un vecteur par morceau ([fiche 2](handout-02-llm-slm#embeddings-du-numero-au-sens)) ; à la question, on prend les morceaux les plus proches et on les injecte dans le contexte ; le modèle répond en citant ses sources (« maxRetries = 3 \[ADR-012] »). Bases vectorielles courantes : pgvector, Qdrant, Weaviate, Elasticsearch. Utile pour la documentation en langage naturel ; pour le code, les agents préfèrent souvent la **recherche agentique** (`grep`, lecture de fichiers), toujours à jour.

## La planification : l'agent découpe avant d'agir

*Partie 3 · slide « La planification : l'agent découpe avant d'agir »*

Pas besoin de le lui demander : face à une tâche, l'agent **planifie de lui-même**. Planifier fait partie de son raisonnement.

| Étape         | Ce qui se passe                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **Analyser**  | le modèle lit la demande et le contexte chargé : instructions, `AGENTS.md`, fichiers lus            |
| **Planifier** | il décompose la tâche en étapes ; beaucoup de harness lui donnent un tool de **todo list**          |
| **Exécuter**  | étape par étape ; la todo list, cochée au fil de l'eau, est renvoyée dans le contexte à chaque tour |
| **Vérifier**  | la boucle s'applique à chaque étape                                                                 |

La qualité du plan dépend de ce qui est dans le contexte : une demande précise, des instructions projet, les bons fichiers. Un plan bancal vient presque toujours d'un contexte pauvre.

> **À ne pas confondre : le mode plan.** C'est un **mode du harness** (Claude Code, Cursor, Copilot…) : l'agent explore sans toucher à votre code, écrit son plan et attend votre accord avant d'éditer. Utile sur une tâche large ou ambiguë : corriger un plan coûte moins cher que corriger un diff.

Le mode plan n'est pas un vrai bac à sable : l'agent peut lire et lancer des commandes d'exploration ; l'interdiction d'éditer passe surtout par la consigne donnée au modèle et par l'étape d'approbation. Vous l'activez (Shift+Tab, `/plan`), mais certains harness laissent aussi l'agent y entrer de lui-même. Il ne change pas la façon de planifier : il formalise le plan et le fait valider.

Sur plusieurs agents, découper devient le travail d'un orchestrateur ([fiche 4](handout-04-harness-orchestrateurs#harness-ou-orchestrateur)) ; écrit dans des fichiers relus par l'équipe, le plan devient le SDD (spec → plan → tâches, [fiche 4](handout-04-harness-orchestrateurs)).

## Ce que coûte cette trace

*Partie 3 · slide « Ce que coûte cette trace »*

La somme des contextes envoyés (12 + 14 + 15 + 19 + 20 + 21 + 21 = 122 k, plus les sorties) donne **~130 k tokens d'entrée cumulés**, pour un bug simple.

* **Le constat** : le préfixe déjà vu domine. Chaque tour ne rajoute que quelques milliers de tokens ; tout le reste a déjà été lu au tour précédent.
* **Avec le prompt caching** : ce préfixe est lu en cache, facturé ~10 %. Sans cache, la facture d'entrée de cette trace serait plusieurs fois plus élevée (jusqu'à environ dix fois selon les tarifs, ordre de grandeur).

### Le prompt caching

**Le principe** : les fournisseurs gardent en mémoire le calcul d'un préfixe déjà vu. Si votre requête commence **exactement** comme la précédente, cette partie n'est pas recalculée : réponse plus rapide, tokens d'entrée facturés beaucoup moins cher (**~90 %** de réduction possible sur les tokens lus en cache, ordre de grandeur).

Anatomie d'une requête d'agent, du plus stable au plus volatil :

1. system prompt ;
2. définitions des tools ;
3. instructions projet (`AGENTS.md`…) ;
4. conversation et résultats des tools (croît à chaque tour) ;
5. nouveau message.

Un agent de code renvoie à chaque tour un préfixe énorme et quasi identique. Sans prompt caching, chaque tour coûterait le prix plein. C'est pourquoi les harness placent les éléments stables au début et les volatils à la fin.

| Fournisseur       | Fonctionnement                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anthropic**     | points de cache explicites (`cache_control`) ; lecture facturée ~10 % du prix d'entrée, écriture légèrement plus chère que l'entrée normale |
| **OpenAI**        | cache automatique des préfixes longs, remise appliquée sans configuration                                                                   |
| **Google Gemini** | cache implicite, plus *context caching* explicite avec durée de vie                                                                         |

> **Conséquence pratique** : ne modifiez pas le début du contexte en cours de session. Changer le system prompt, ajouter ou retirer un serveur MCP (donc des définitions d'outils), ou mettre l'heure exacte dans les instructions casse le cache pour tout ce qui suit.

Pourcentages et durées de vie changent régulièrement : ce sont des ordres de grandeur, la page tarifaire du fournisseur fait foi.

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
