---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood/handouts/handout-04-harness-orchestrateurs.md
---
# Handout — Harness et orchestrateurs

**Sous le capot : LLM, agents, harness et orchestrateurs · Zenika · fiche partie 4**

Le harness est le produit qui implémente la boucle d'un agent avec tout ce qu'il faut autour ; l'orchestrateur est ce qu'on ajoute quand un seul agent ne suffit plus. Cette fiche détaille l'anatomie d'un harness, le marché, les patterns d'orchestration (les cinq de base, quatre de plus, qui trace le chemin) et le SDD.

> **Ordres de grandeur** : le marché bouge très vite (renommages, rachats). Les listes ci-dessous donnent des familles, pas un classement.

## Anatomie d'un harness

*Partie 4 · slide « Anatomie d'un harness »*

> **Agent de code = modèle + harness.** Le harness est tout le code, la configuration et la logique d'exécution qui ne sont pas le modèle (définition reprise de LangChain, « The Anatomy of an Agent Harness »).

Même modèle, deux harness : des résultats et des coûts **très différents** (ordre de grandeur des comparatifs de 2026, pas un benchmark de référence). Le harness est un levier de performance au même titre que le choix du modèle.

| Composant           | Ce qu'il fait                                                 |
| ------------------- | ------------------------------------------------------------- |
| **Boucle**          | tours, arrêt, reprise, gestion d'erreurs                      |
| **Outils intégrés** | fichiers, shell, recherche, web, MCP                          |
| **Contexte**        | assemblage, compaction, cache, mémoire                        |
| **Permissions**     | allow / ask / deny, sandbox, conteneur                        |
| **Hooks**           | scripts déterministes avant / après chaque action             |
| **Sous-agents**     | déléguer avec un contexte isolé                               |
| **Observabilité**   | traces, coût par session, rejouer les décisions               |
| **Extensions**      | skills, commandes, plugins, instructions projet (`AGENTS.md`) |

Les **hooks** sont déterministes : un hook qui lance le linter après chaque modification ne dépend pas de la bonne volonté du modèle. C'est le premier guardrail côté poste.

## Le marché des harness

*Partie 4 · slide « Le marché des harness »*

| Famille                    | Idée                                                                                                                                    | Exemples                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Intégrés verticalement** | terminal + IDE, par l'éditeur du modèle                                                                                                 | Claude Code (Anthropic), Codex (OpenAI), Gemini CLI (Google), Mistral Vibe  |
| **Intégrés à l'outillage** | plateforme de développement, multi-modèles                                                                                              | GitHub Copilot (IDE, CLI, cloud), Cursor, Kiro (AWS), JetBrains Junie       |
| **Agnostiques**            | open source, modèle au choix                                                                                                            | OpenCode, Aider, Cline, OpenHands, Goose                                    |
| **SDK d'agents**           | pour construire votre propre harness : la boucle, les outils et le contexte en bibliothèque ; on écrit l'agent métier, pas la plomberie | Claude Agent SDK, OpenAI Agents SDK, Google ADK, Vercel AI SDK, Pydantic AI |
| **Agents cloud**           | le harness tourne ailleurs : on assigne une issue, on reçoit une PR                                                                     | Copilot coding agent, Codex cloud, Devin, Jules                             |

Critères de choix :

* lock-in modèle (un seul fournisseur ou plusieurs) ;
* finesse des permissions et sandbox ;
* gestion du contexte ;
* extensibilité (skills, hooks, MCP) ;
* possibilité de passer par la gateway de l'entreprise ;
* licence.

## Cinq patterns de base

*Partie 4 · slide « Les cinq patterns de base »*

Les cinq patterns viennent de *Building effective agents* (Anthropic, décembre 2024). Les trois premiers sont des **workflows** (chemin connu à l'avance) ; les deux derniers donnent plus de place à la **décision du modèle**.

| Pattern                   | Principe                                         | Exemple                                                                                                           |
| ------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Chaîne**                | étapes fixes, chaque sortie nourrit la suivante  | spec → plan → tâches → code (le flux SDD lui-même)                                                                |
| **Routeur**               | on oriente vers le bon agent ou le bon modèle    | un SLM classe les tickets entrants : les simples vont à un modèle économique, les complexes à un modèle frontière |
| **Parallélisation**       | tâches indépendantes, ou vote entre plusieurs    | trois sous-agents de revue (sécurité, performance, lisibilité) sur une même PR                                    |
| **Orchestrateur-workers** | le découpage est décidé dynamiquement par un LLM | refacto sur 12 modules ; les sous-agents de Claude Code ou de Copilot                                             |
| **Évaluateur**            | on itère jusqu'à ce que le critère soit atteint  | un agent écrit, un autre relit avec une grille, jusqu'à validation                                                |

## Au-delà des cinq : quatre patterns de plus

*Partie 4 · slide « Au-delà des cinq : quatre patterns de plus »*

Les cinq patterns de 2024 sont la base. Quatre autres sont devenus courants depuis ; tous laissent une large place à la décision des modèles.

| Pattern          | Principe                                                                                              | Exemple                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Agent juge**   | un agent **outillé** vérifie le travail d'un autre : il lance les tests, lit le diff, puis tranche    | barrière avant la revue humaine ; évaluer d'autres agents                |
| **Adversarial**  | un agent cherche la faille, l'autre défend ; un arbitre tranche (variante : le **débat**)             | red team : un agent écrit des tests pour casser le code, l'autre corrige |
| **Handoff**      | l'agent courant **passe la main**, avec la conversation et le contexte, à un spécialiste              | support : triage → facturation (OpenAI Agents SDK, Google ADK)           |
| **Hiérarchique** | un orchestrateur d'orchestrateurs : un lead délègue à des chefs d'équipe, qui délèguent à des workers | une équipe d'agents par domaine (CrewAI, LangGraph)                      |

* **Agent juge ou évaluateur ?** L'évaluateur relit du texte et renvoie des commentaires en boucle ; le juge (*Agent-as-a-Judge*, Zhuge et al., 2024) **vérifie en agissant** et rend un verdict. C'est la parade au « faux succès » de la [fiche 3](handout-03-agent#comment-un-agent-deraille).
* **Pourquoi un adversaire ?** Un agent se relit mal lui-même ; un adversaire n'a pas le même biais. Le prix : deux à trois fois plus d'appels.
* **Handoff ou routeur ?** Le routeur décide une fois, à l'entrée ; avec le handoff, chaque agent peut passer la main en cours de route, sans chef central.

On entend aussi parler de **tableau noir** (*blackboard* : les agents lisent et écrivent un état partagé), d'**humain dans la boucle** (une étape de validation dans le graphe) ou d'**essaim** : ce sont des combinaisons de ces briques.

## Qui trace le chemin ?

*Partie 4 · slide « Qui trace le chemin ? »*

Derrière tous les patterns, une même question : **qui décide de la prochaine étape ?** Du plus prévisible au plus flexible :

| Approche           | Qui trace le chemin                                            | Exemple                                             |
| ------------------ | -------------------------------------------------------------- | --------------------------------------------------- |
| **Graphe**         | le **développeur**, à l'avance : nœuds et transitions          | LangGraph, n8n, Temporal                            |
| **GOAP**           | un **algorithme**, à partir du but et de l'état actuel         | jeu vidéo (F.E.A.R., 2005), Embabel                 |
| **Plan & exécute** | le **modèle**, au départ ; on exécute, on replanifie si besoin | mode plan de Claude Code, `/plan` du SDD            |
| **ReAct**          | le **modèle**, à chaque tour, sans plan global                 | la boucle d'agent de la [fiche 3](handout-03-agent) |

**GOAP** (*Goal-Oriented Action Planning*, Jeff Orkin, 2005) : chaque action est décrite par ses **préconditions** et ses **effets** (« éditer » demande « fichier lu » et produit « code modifié »). Un algorithme de recherche (A\*) calcule la suite d'actions qui mène de l'état actuel au but. Le plan est **calculé, pas généré** : déterministe, explicable, recalculé quand l'état change. Le LLM peut interpréter le but ou exécuter une action, pas choisir l'ordre.

En pratique, on mélange : un graphe dont certains nœuds sont des agents ReAct, un plan écrit exécuté étape par étape. Le SDD est un **plan & exécute** dont le plan est relu par un humain.

## Le marché des orchestrateurs

*Partie 4 · slide « Le marché des orchestrateurs »*

| Famille                                              | Ce qu'elle apporte                                       | Exemples                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frameworks d'agents (code)** : on décrit le graphe |                                                          | **LangGraph** (graphe d'états, reprise, humain dans la boucle), **CrewAI** (équipes de rôles), **Microsoft Agent Framework** (successeur d'AutoGen et Semantic Kernel, annoncé en octobre 2025), **Google ADK**, **OpenAI Agents SDK** (handoffs), **LlamaIndex**, **Mastra** (TypeScript) |
| **Exécution durable** : ne jamais perdre une tâche   | reprise après crash, tâches de plusieurs heures, retries | Temporal, Inngest, Restate                                                                                                                                                                                                                                                                 |
| **Plateformes cloud managées** : agents hébergés     |                                                          | AWS Bedrock AgentCore, Vertex AI Agent Engine, Azure AI Foundry Agents                                                                                                                                                                                                                     |
| **Low-code** : glisser-déposer                       |                                                          | n8n, Dify, Flowise, Langflow                                                                                                                                                                                                                                                               |
| **Orchestration intégrée au harness**                | sous-agents, agents parallèles en worktrees, workflows   | Claude Code, Copilot, Codex                                                                                                                                                                                                                                                                |

> On n'a pas besoin d'un framework d'orchestration pour commencer. Pour un usage développeur, l'orchestration intégrée au harness suffit souvent. Les frameworks deviennent utiles quand on construit un **produit agentique** (agent de support client, pipeline de traitement de documents) ou quand on a besoin de **garanties de reprise**.

Temporal est un moteur de workflows généraliste, pas spécifique à l'IA : on l'utilise de plus en plus pour les agents, car une tâche d'agent longue rencontre forcément des pannes réseau, des quotas, des redémarrages.

## Et le SDD dans tout ça ?

*Partie 4 · slide « Et le SDD dans tout ça ? »*

| Étape              | Contenu                                    | Artefact     |
| ------------------ | ------------------------------------------ | ------------ |
| **1. Spécifier**   | le quoi et le pourquoi, relu par un humain | `spec.md`    |
| **2. Planifier**   | le comment technique                       | `plan.md`    |
| **3. Découper**    | de petites tâches vérifiables              | `tasks.md`   |
| **4. Implémenter** | un agent (ou des workers) par tâche        | code + tests |

> Le SDD est un **orchestrateur préconfiguré** basé sur les specs : une **chaîne** déjà câblée, dont chaque sortie est un fichier versionné relu par un humain.

Avec un orchestrateur comme LangGraph, vous décrivez le graphe ; avec le SDD, le graphe est fourni (spec → plan → tâches → code). Il donne aux agents un **objectif écrit** et un **critère d'arrêt**, ce qui manquait dans les modes d'échec de la [fiche 3](handout-03-agent#comment-un-agent-deraille) (dérive de contexte, faux succès). Le SDD produit le plan, le fait valider par un humain, puis l'exécute.

**Outillage** (au-dessus de n'importe quel harness : Copilot, Claude Code, Gemini CLI…) :

| Outil               | Particularité                                          |
| ------------------- | ------------------------------------------------------ |
| **GitHub Spec Kit** | commandes `/specify`, `/plan`, `/tasks`, multi-harness |
| **Kiro**            | IDE AWS centré sur les specs                           |
| **OpenSpec**        | propositions de changement versionnées                 |
| **BMAD Method**     | rôles d'agents : analyste, PM, architecte, développeur |
