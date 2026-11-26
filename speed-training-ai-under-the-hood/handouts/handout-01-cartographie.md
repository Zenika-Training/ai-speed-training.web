---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood/handouts/handout-01-cartographie.md
---
# Handout — Cartographie

**Sous le capot : LLM, agents, harness et orchestrateurs · Zenika · fiche partie 1**

Six mots qu'on mélange (LLM, SLM, agent, harness, orchestrateur, SDD) : une définition, des produits du marché et la place de chacun dans la pile. Cette fiche reprend l'ouverture et la partie 1 dans l'ordre des slides.

## À la fin de la session, vous saurez…

*Ouverture · slide « À la fin de la session, vous saurez… »*

Le fil rouge de la session : **suivre une requête de bout en bout**, de votre prompt jusqu'au fichier modifié sur le disque. Quelles briques interviennent, dans quel ordre, et où se jouent la qualité, le coût et la sécurité.

| Vous saurez     | Ce que cela couvre                                        |
| --------------- | --------------------------------------------------------- |
| **Nommer**      | distinguer agent, LLM, SLM, harness, orchestrateur et SDD |
| **Expliquer**   | tokens, embeddings, couches, attention, context window    |
| **Décortiquer** | la boucle d'un agent et ses appels d'outils               |
| **Choisir**     | un harness, un orchestrateur, un modèle adapté            |
| **Sécuriser**   | guardrails et gateways : qui fournit quoi                 |

Parcours (2 h, sans lab) :

| Partie                       | Durée  | Fiche       |
| ---------------------------- | ------ | ----------- |
| 1. Cartographie              | 20 min | cette fiche |
| 2. LLM et SLM sous le capot  | 35 min | fiche 2     |
| 3. Anatomie d'un agent       | 20 min | fiche 3     |
| 4. Harness et orchestrateurs | 20 min | fiche 4     |
| 5. Guardrails et gateways    | 15 min | fiche 5     |

## Six notions, une phrase chacune

*Partie 1 · slide « Six notions, une phrase chacune »*

| Notion                                                       | En une phrase                                                                                                               | Exemples (pas un classement)                                      |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **LLM** (Large Language Model), le moteur                    | Un réseau de neurones de dizaines à centaines de milliards de paramètres qui **prédit le token suivant**.                   | GPT-5, Claude, Gemini, Mistral Large, DeepSeek                    |
| **SLM** (Small Language Model), le petit moteur              | Même architecture, **1 à ~15 milliards** de paramètres. Tourne sur un laptop, un téléphone, un petit GPU.                   | Phi-4, Gemma 3, Llama 3.2 3B, Qwen3, Ministral                    |
| **Agent**, le modèle qui agit                                | Un modèle placé dans une **boucle** avec des **outils** et un objectif : il décide lui-même de la prochaine action.         | Copilot coding agent, Devin, Codex                                |
| **Harness**, tout sauf le modèle                             | Le code qui entoure le modèle : boucle, outils, contexte, permissions, sandbox, hooks.                                      | Claude Code, Codex CLI, Gemini CLI, OpenCode                      |
| **Orchestrateur**, le chef d'orchestre                       | Coordonne **plusieurs agents ou étapes** : routage, parallélisme, état partagé, reprise sur erreur.                         | LangGraph, CrewAI, MS Agent Framework, Google ADK, Spec Kit (SDD) |
| **SDD** (Spec-Driven Development), l'orchestrateur des specs | Un **orchestrateur préconfiguré** basé sur les specs : la spec écrite devient la source de vérité que les agents exécutent. | GitHub Spec Kit, Kiro, OpenSpec, BMAD                             |

Beaucoup de produits couvrent plusieurs cases. Claude Code est à la fois un harness et, une fois lancé avec un modèle, un agent ; il sait aussi orchestrer des sous-agents. Copilot existe en complétion (pas agentique), en mode agent dans l'IDE et en agent cloud. **On classe des rôles, pas des marques.**

Le SDD est un cas particulier d'orchestrateur : au lieu de décrire soi-même le graphe, on prend une chaîne toute faite (spécifier → planifier → découper → implémenter), pilotée par les specs. GitHub Spec Kit en est l'exemple le plus courant.

## Une analogie qui tient la route

*Partie 1 · slide « Une analogie qui tient la route »*

Image à garder : **une flotte de véhicules de livraison**. Le moteur ne livre rien tout seul : il faut un véhicule équipé pour sa mission, un dispatch et un bon de commande.

| Notion                           | Dans la flotte                   | Pourquoi                                                                                           |
| -------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| LLM / SLM                        | le **moteur**                    | puissant ou économe, il ne sait que tourner                                                        |
| Agent                            | le **véhicule**                  | moteur + équipement + une mission                                                                  |
| Harness                          | les **spécificités du véhicule** | un grand coffre, un caisson frigo, un hayon : même moteur, véhicules différents selon l'équipement |
| Orchestrateur                    | le **dispatch**                  | répartit les tournées entre véhicules                                                              |
| SDD                              | le **bon de commande**           | ce qu'on livre, à qui, et comment vérifier que c'est livré                                         |
| Guardrails et gateway (partie 5) | **glissières** et **péage**      | on y passe tous, on y contrôle et on y compte                                                      |

Limite de l'analogie : un moteur ne « décide » rien, alors qu'un LLM choisit la prochaine action d'un agent. Le **pouvoir de décision est dans le modèle**, le **pouvoir d'exécution est dans le harness**. C'est exactement cette séparation qui rend les guardrails possibles.

## Qui parle à qui : la pile complète

*Partie 1 · slide « Qui parle à qui : la pile complète »*

Une requête descend la pile de haut en bas :

1. la **méthode** (SDD) produit des tâches ;
2. l'**orchestrateur** les distribue à des agents (A, B, C…) ;
3. chaque **agent** est un harness qui appelle un modèle ;
4. tous les appels au modèle passent par la **gateway**, qui applique les **guardrails** ;
5. derrière : n'importe quel fournisseur (LLM cloud comme Anthropic ou OpenAI, hyperscaler comme Bedrock, Vertex ou Azure, souverain comme Mistral ou Scaleway, SLM local comme Ollama ou vLLM).

Deux messages clés :

* **Les outils sont exécutés par le harness, pas par le modèle.** Le modèle ne fait qu'écrire une demande d'appel d'outil. C'est fondamental pour la sécurité.
* **La gateway est le seul point par lequel tout passe** : l'endroit naturel pour la gouvernance d'entreprise.

Dans un usage individuel (un développeur avec Claude Code sur son poste), les couches « méthode », « orchestrateur » et « gateway » peuvent être absentes. La pile se construit à mesure qu'on industrialise.

## Quiz : qui est qui ?

*Partie 1 · slide « Quiz : qui est qui ? »*

| Nom                  | Réponse       | À retenir                                                     |
| -------------------- | ------------- | ------------------------------------------------------------- |
| Ollama               | runtime local | fait tourner un SLM en local ; ce n'est pas un modèle         |
| Gemma 3 4B           | SLM           | modèle ouvert de ~4 milliards de paramètres                   |
| Claude Sonnet        | LLM           | le moteur                                                     |
| Claude Code          | harness       | et agent une fois lancé avec un modèle                        |
| LangGraph            | orchestrateur | graphe d'états, reprise, humain dans la boucle                |
| LiteLLM              | gateway       | point de passage unique vers les modèles                      |
| MCP                  | protocole     | ni un agent ni un outil : une prise standard pour les outils  |
| Copilot coding agent | agent         | le harness tourne chez GitHub : issue en entrée, PR en sortie |

Les pièges volontaires : Ollama est un **moteur qui fait tourner des modèles**, pas un modèle ; MCP est un **protocole** ; Copilot coding agent n'est **pas un modèle** mais un agent : un harness qui fait tourner un modèle en boucle avec des outils.
