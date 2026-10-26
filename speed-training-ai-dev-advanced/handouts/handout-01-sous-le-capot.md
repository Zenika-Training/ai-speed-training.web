---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-advanced/handouts/handout-01-sous-le-capot.md
---
# Handout — Sous le capot

**Développeur IA — Avancé · Zenika · fiche module 1**

Pourquoi un agent coûte cher, est lent ou se trompe : cette fiche reprend l'ouverture et le module 1 dans l'ordre des slides, de la boucle agentique jusqu'à la facture d'une session.

## Vibe coding vs AI-driven dev

*Ouverture · slide « Vibe coding vs AI-driven dev »*

|             | Vibe coding                         | AI-driven dev                               |
| ----------- | ----------------------------------- | ------------------------------------------- |
| **Logique** | explorer vite                       | produire de façon fiable                    |
| **Pour**    | spike, POC jetable, script ponctuel | fonctionnalité livrée dans un code existant |
| **Exemple** | « fais-moi une API de démo »        | paginer GET /bookings, avec ses tests       |
| **Réflexe** | on tente, on observe, on jette      | on cadre, on vérifie, on capitalise         |

> **Viber pour explorer, piloter pour livrer.** Cette formation est du côté droit : livrer en restant à gauche, c'est accepter du code qu'on n'a ni relu ni vérifié.

## La boucle, tour par tour

*Ouverture · slide « La boucle, tour par tour »*

Rappel de la Foundation, sur l'exemple du fil rouge : « Ajoute la pagination sur l'endpoint /bookings ».

1. Le harness envoie la demande et la liste des tools.
2. Le modèle répond « j'appelle bash avec `npm test -- bookings` ».
3. Le harness vérifie que c'est autorisé, exécute, récupère la sortie : un test échoue, `nextCursor is undefined`.
4. Il renvoie **tout** au modèle (le modèle est sans état), plus la sortie.
5. Le modèle demande à lire le fichier du test, et ainsi de suite jusqu'à une réponse **sans appel de tool**.

* Le « appel de tool ? » est un champ de la réponse de l'API (`stop_reason: "tool_use"` chez Anthropic, `finish_reason: "tool_calls"` chez OpenAI).
* La même boucle porte plusieurs noms : **ReAct** (Pensée → Action → Observation), **Plan-and-Execute**, ou « gather context → take action → verify work → repeat ». Tous décrivent le même mécanisme : planifier, agir, observer le résultat, réajuster.
* À chaque tour, le contexte grossit : c'est tout le sujet de ce module.

## Qui parle à qui : la pile complète

*Module 1 · slide « Qui parle à qui : la pile complète »*

Une requête descend la pile, de la méthode jusqu'au fournisseur :

| Couche                   | Rôle                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| **Méthode** (SDD)        | `spec.md` → `plan.md` → `tasks.md`, relus par l'humain                 |
| **Orchestrateur**        | découpe, distribue, attend, agrège, reprend sur erreur                 |
| **Agent** = harness      | boucle, tools, contexte ; appelle le modèle                            |
| **Gateway + guardrails** | auth, routage, quotas, cache, journalisation, filtrage entrée / sortie |
| **Fournisseurs**         | LLM cloud, hyperscaler, souverain, SLM local                           |

* Les **tools** (fichiers, terminal, git, navigateur, serveurs MCP) sont **exécutés par le harness, jamais par le modèle** : le modèle n'écrit qu'une demande d'appel. C'est fondamental pour la sécurité.
* La **gateway** est le seul point par lequel tout passe : l'endroit naturel de la gouvernance (module 6).
* Seul sur son poste, un dev n'a souvent ni méthode, ni orchestrateur, ni gateway : la pile se construit à mesure qu'on industrialise.

## Harness vs orchestrateur : la frontière

*Module 1 · slide « Harness vs orchestrateur : la frontière »*

|                     | Harness                                                                                                       | Orchestrateur                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Fait**            | d'un modèle un agent                                                                                          | travailler plusieurs agents                                                                        |
| **Responsabilités** | gère **une** boucle d'agent ; exécute les tools, applique les permissions ; construit et compacte le contexte | décompose et route les tâches ; parallélise, attend, agrège ; persiste l'état, reprend après panne |
| **Se pilote**       | depuis un terminal, un IDE ou une API                                                                         | en code, en graphe ou en YAML                                                                      |
| **Exemples**        | Claude Code, Codex CLI, Copilot CLI, OpenCode                                                                 | LangGraph, CrewAI, OpenAI Agents SDK, Temporal                                                     |

> **La frontière bouge** : les harness lancent des sous-agents, les orchestrateurs embarquent leur boucle. Retenez le **rôle**, pas le produit. Ce qu'un orchestrateur dédié apporte en plus : la persistance d'état et la reprise après panne.

## KV cache : ne pas tout recalculer à chaque token

*Module 1 · slide « KV cache : ne pas tout recalculer à chaque token »*

Une réponse se fait en deux temps : le **prefill** (lire tout le contexte, en parallèle) puis le **decode** (générer token par token). Pour chaque nouveau token, le modèle a besoin des clés et valeurs (K, V) de tous les tokens précédents ; elles ne changent plus une fois calculées, on les garde en mémoire GPU : c'est le **KV cache**.

| Point           | Ce qu'il faut savoir                                                                        |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Sans cache**  | chaque token recalculerait K et V de tous les précédents : un coût **quadratique**          |
| **Le prix**     | Llama 3 8B : **128 Ko par token**, **16 Go** pour 128 k tokens, pour une seule conversation |
| **Les parades** | têtes K/V partagées (GQA), cache quantifié, mémoire paginée (PagedAttention)                |

Les deux chiffres des benchmarks en découlent : le **TTFT** (time to first token, le prefill) et le **débit** en tokens/s (le decode).

## Du KV cache au prompt caching

*Module 1 · slide « Du KV cache au prompt caching »*

Le **prompt caching** : le fournisseur garde le KV cache d'un **préfixe déjà vu**. Même début de requête, le prefill est sauté : plus rapide, et **~90 % de remise** sur l'entrée lue en cache.

Anatomie d'une requête d'agent, du plus stable au plus volatil :

1. **System prompt**
2. **Tool definitions**
3. **Instructions projet**
4. **Conversation + résultats des tools**
5. **Nouveau message**

* Modifier le début casse le cache pour **tout ce qui suit** : changer le system prompt, ajouter ou retirer un serveur MCP (donc des tool definitions), changer de modèle, mettre l'heure exacte dans les instructions.
* **Cache expiré** : l'agent n'a **rien oublié**, la conversation est renvoyée en entier. Mais le préfixe est **repayé plein tarif**, et la réponse arrive plus tard.
* **Durée de vie** : de quelques minutes à quelques heures sans activité, selon le fournisseur et l'option choisie. Remises et durées changent souvent : retenez l'ordre de grandeur.

Avant une longue pause (qui casse le cache) : tâche finie → repartir sur une session propre ; tâche en cours → compacter, pour revenir sur un contexte court. La commande de chaque harness est dans « Où ça se règle dans mon outil ».

## Ce que coûte cette trace

*Module 1 · slide « Ce que coûte cette trace »*

La trace de la Foundation : sept tours d'un agent qui ajoute la pagination par curseur sur GET /bookings. Contextes envoyés de 12 k à 21 k tokens, soit **118 k tokens d'entrée cumulés** pour une tâche simple.

| Point                      | Ce qu'il faut savoir                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Le constat**             | l'entrée fait le volume : chaque tour renvoie tout le préfixe déjà vu, et n'ajoute que quelques milliers de tokens |
| **Avec le prompt caching** | ce préfixe est lu en cache, à ~10 % du prix                                                                        |
| **La sortie**              | ~5× plus chère au token, mais petite en volume                                                                     |

Où part la facture d'une session :

| Élément                                            | Sur toute la session                                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| System prompt, tool definitions, `AGENTS.md`       | gros mais stable : lu en cache                                                                 |
| Historique des tours précédents                    | en cache, si rien ne change avant                                                              |
| Fichier lu en entier, log de build de 3 000 lignes | payé plein tarif une fois, puis renvoyé à chaque tour : il pèse sur toute la fin de la session |
| Nouvelle demande                                   | plein tarif, mais petite                                                                       |
| Réponse et tokens de raisonnement                  | prix de sortie ; le raisonnement est souvent invisible                                         |

> Réduire ce qui **entre** rapporte plus que raccourcir la **sortie** : sorties de tools filtrées, fichiers lus en partie, session propre, modèle adapté.

Pour mesurer sa propre facture : chaque harness affiche la consommation de la session, et des outils recalculent à partir des logs locaux (ex. ccusage). On mesure son usage, on ne compare pas les outils.

## Tokens de raisonnement : choisir l'effort

*Module 1 · slide « Tokens de raisonnement : choisir l'effort »*

Le modèle « réfléchit » en tokens avant de répondre. Ces **reasoning tokens** sont facturés comme de la **sortie** (×5 face à l'entrée), et souvent invisibles : masqués, résumés ou affichés selon le fournisseur.

| Effort · classe de modèle | Pour                                             |
| ------------------------- | ------------------------------------------------ |
| **Bas** · modèle léger    | renommer, documenter, appliquer un pattern       |
| **Moyen** · généraliste   | paginer un endpoint et ses tests, relire un diff |
| **Haut** · raisonnement   | bug difficile, migration, architecture           |

> L'effort se choisit **par tâche** : plus lent, plus cher, et **pas toujours meilleur**. Sur une tâche simple, trop de raisonnement mène à la sur-ingénierie et aux détours.

Bon réflexe : commencer au niveau moyen, monter quand l'agent échoue sur un problème réellement difficile. Les harness appellent ce réglage effort, thinking ou niveau de raisonnement : voir « Où ça se règle dans mon outil ».

## Les SLM : petits, locaux, spécialisés

*Module 1 · slide « Les SLM : petits, locaux, spécialisés »*

| Point                      | Ce qu'il faut savoir                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Définition pratique**    | de ~1 à ~15 milliards de paramètres : assez petit pour tourner sur un poste ou un seul GPU (la frontière n'est pas normalisée) |
| **Exemples**               | Gemma 4, Qwen3.5, Phi-4-mini, Granite 4, Ministral                                                                             |
| **Bons cas d'usage**       | classer, extraire, router, compléter du code, **données qui ne sortent pas**                                                   |
| **Limites**                | raisonnement long, agents autonomes sur de gros dépôts                                                                         |
| **Pour les faire tourner** | Ollama, LM Studio, llama.cpp sur le poste ; vLLM sur un serveur                                                                |

* **Pattern hybride** : le SLM **trie et route**, le LLM **raisonne**.
* Argument entreprise : un SLM sur un serveur interne ne fait sortir aucune donnée, et son coût est fixe (le matériel), pas à l'usage.

> **Tip du module** : garde le **début du contexte** stable, c'est lui que le cache rentabilise. Instructions, tools et modèle fixés en début de session ; ce qui change va à la fin.

## À retenir

1. Le modèle **prédit**, le harness **agit** : il exécute les tools et construit le contexte.
2. Le **KV cache** évite de recalculer ; le **prompt caching** rentabilise un **préfixe stable**.
3. En session, l'**entrée** fait le volume ; la sortie et le raisonnement sont chers au token.
4. Modèle et effort se choisissent **par tâche**, du SLM au modèle de raisonnement.

**Mots-clés** : prefill, decode, KV cache, prompt caching, reasoning tokens, SLM, harness, orchestrateur, gateway — voir le glossaire.
