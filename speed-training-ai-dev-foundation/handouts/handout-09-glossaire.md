---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-foundation/handouts/handout-09-glossaire.md
---
# Handout — Glossaire des mots-clés IA

**Développeur IA — Foundation · Zenika · glossaire**

Une phrase par terme : les mêmes mots, avec le même sens, que dans la formation business, puis les termes propres aux développeurs.

Les termes techniques anglais sont gardés (harness, tools, context window, skill) : ce sont ceux que vous entendrez dans les outils et les réunions.

## Tronc commun : les bases

*Ouverture et module 1*

| Terme                                  | En une phrase                                                                                                                                                                                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LLM** (Large Language Model)         | Modèle entraîné sur d'énormes volumes de texte, qui génère une réponse en prédisant le mot suivant.                                                                                                                                                                                   |
| **Token**                              | Morceau de mot traité par le modèle ; c'est aussi l'unité de facturation (≈ ¾ de mot en anglais).                                                                                                                                                                                     |
| **Hallucination**                      | Réponse fausse mais présentée avec assurance et vraisemblance.                                                                                                                                                                                                                        |
| **Knowledge cutoff** (date de coupure) | Date à laquelle s'arrêtent les données d'entraînement du modèle ; il ignore tout ce qui s'est passé après, sauf s'il fait une recherche web.                                                                                                                                          |
| **Assistant**                          | Le produit qu'on utilise au quotidien (ChatGPT, Copilot, Claude.ai, Gemini) : une interface posée sur un harness, autour d'un modèle.                                                                                                                                                 |
| **Harness**                            | Tout le logiciel autour du modèle : consignes, mémoire, tools, enchaînement des étapes. Deux assistants sur le même modèle diffèrent par leur harness.                                                                                                                                |
| **Tools**                              | Capacités que le modèle peut appeler pendant sa réponse : recherche web, calcul, lecture de fichiers, Jira, Figma… (*tool calling*).                                                                                                                                                  |
| **MCP** (Model Context Protocol)       | Standard pour brancher de nouveaux tools sur un assistant : applications et données de l'entreprise.                                                                                                                                                                                  |
| **Agent**                              | Modèle qui enchaîne lui-même des actions avec des tools, en boucle, jusqu'à atteindre un objectif : c'est la **boucle agentique** (modèle + tools + boucle + objectif, que le harness fait tourner). Les éditeurs utilisent aussi « agent » pour de simples assistants personnalisés. |
| **Boucle agentique** (agent loop)      | Le cycle demande → le modèle choisit un tool → le harness l'exécute → le résultat entre dans le contexte → on recommence si besoin.                                                                                                                                                   |

## Tronc commun : demander et capitaliser

*Ouverture, modules 2 à 4*

| Terme                                                    | En une phrase                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt**                                               | La demande envoyée au modèle, consignes comprises.                                                                                                                                                                                                                                                |
| **Rewind**                                               | Revenir corriger la demande de départ plutôt qu'empiler des corrections dans la conversation.                                                                                                                                                                                                     |
| **Instructions personnalisées / assistant personnalisé** | Consignes enregistrées une fois et réappliquées : toujours (instructions personnalisées) ou dans un espace dédié (GPT, Projet Claude, agent Copilot).                                                                                                                                             |
| **Skill**                                                | Savoir-faire emballé (consignes, modèles, exemples, parfois des scripts) que l'assistant charge **à la demande**, quand la tâche correspond. Plus léger que des instructions permanentes, partageable dans une équipe. Claude parle d'« Agent Skills » ; d'autres assistants ont des équivalents. |
| **Vibe coding**                                          | Produire vite un prototype en langage naturel, sans regarder le code ; parfait pour explorer, insuffisant pour livrer.                                                                                                                                                                            |
| **AI-driven development**                                | Développement logiciel où l'IA écrit beaucoup de code, sous la direction et le contrôle d'ingénieurs.                                                                                                                                                                                             |

## Tronc commun : le contexte

*Modules 1, 4 et 5*

| Terme                                    | En une phrase                                                                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Context window**                       | Tout ce que le modèle « voit » au moment de répondre : consignes, historique, pièces jointes, résultats des tools.           |
| **Session**                              | Une conversation ; elle accumule du contexte, utile ou parasite.                                                             |
| **Mémoire**                              | Informations que l'assistant réinjecte automatiquement d'une session à l'autre (profil, préférences) ; souvent désactivable. |
| **Grounding**                            | Ancrer la réponse dans des sources vérifiables plutôt que dans la « mémoire » du modèle.                                     |
| **RAG** (Retrieval-Augmented Generation) | Technique de grounding : on cherche les bons extraits de documents internes et on les ajoute au contexte avant de répondre.  |

## Tronc commun : risques et coûts

*Module 5*

| Terme                              | En une phrase                                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Human-in-the-loop**              | Un humain qualifié valide la sortie de l'IA *avant* qu'elle soit utilisée.                                                                                                      |
| **Prompt injection**               | Instructions malveillantes cachées dans un contenu (email, document, page web) qui détournent un assistant.                                                                     |
| **Fuite de données**               | Données confidentielles envoyées à un assistant non maîtrisé (version grand public).                                                                                            |
| **Cache**                          | Mise en mémoire du début du contexte pour ne pas le repayer plein tarif à chaque message (il est relu à prix réduit) ; changer de modèle ou de tools en cours de route le perd. |
| **Plafond de dépense** (spend cap) | Limite de budget configurée pour éviter les factures surprises.                                                                                                                 |

## Termes propres aux développeurs : la machine

*Modules 1 et 2*

| Terme                | En une phrase                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agent de code**    | Agent qui lit, modifie et exécute du code dans un dépôt (Copilot, Claude Code, Codex, Cursor…).                                                   |
| **Non-déterminisme** | La même demande peut donner des sorties différentes : une réponse est un tirage, pas un calcul.                                                   |
| **Autorégression**   | Le modèle génère token par token, chaque token produit devenant l'entrée du suivant : ce qu'il a écrit oriente ce qu'il écrira.                   |
| **System prompt**    | Consignes que le harness place en tête de chaque appel, avant les instructions projet et la conversation.                                         |
| **Tool definitions** | Nom, description et paramètres de chaque tool, envoyés au modèle à chaque appel : ils pèsent dans la context window et se lisent comme un prompt. |
| **Permissions**      | Les actions autorisées à l'agent (lire, écrire, lancer une commande, accéder au réseau).                                                          |

## Termes propres aux développeurs : cadrer, produire, capitaliser

*Modules 2 à 4*

| Terme                                 | En une phrase                                                                                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Instructions projet** (`AGENTS.md`) | Fichier versionné dans le dépôt, chargé à chaque session : conventions, commandes, pièges. C'est l'équivalent dev des instructions personnalisées.                                                |
| **Demande initiale**                  | Premier message de la session, cadré pour la tâche du jour : objectif, fichiers clés, commandes, invariants, pièges. Pour une tâche longue, on l'écrit dans un fichier rechargé à chaque session. |
| **Invariant**                         | Règle qui doit rester vraie quoi que fasse l'agent (un contrat d'API, une règle métier, un test qui doit passer).                                                                                 |
| **Plan d'exécution**                  | Liste d'étapes vérifiables que l'agent propose avant de coder, et que le dev corrige avant de le laisser faire.                                                                                   |
| **Niveau d'autonomie**                | Ce que l'agent peut faire sans demander : proposer, modifier après accord, ou agir seul.                                                                                                          |
| **Revue IA**                          | Relecture d'un diff par un agent ; elle aide l'humain, elle ne décide pas du merge.                                                                                                               |
| **Brownfield / greenfield**           | Code existant à faire évoluer / projet partant de zéro.                                                                                                                                           |
| **Progressive disclosure**            | L'agent ne voit d'abord que le nom et la description d'une skill, et ne charge son contenu que quand il en a besoin.                                                                              |

## Termes propres aux développeurs : garder la main

*Module 5*

| Terme                                              | En une phrase                                                                                                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Context rot** (en business : dérive de contexte) | Dégradation des réponses quand la context window se remplit d'ajouts, de corrections et d'informations périmées ou contradictoires : la session reste crédible mais s'éloigne du besoin initial. |
| **Compaction**                                     | Résumé automatique ou demandé de la session pour libérer de la context window.                                                                                                                   |
| **Lost in the middle**                             | Le modèle exploite moins bien ce qui se trouve au milieu d'un long contexte.                                                                                                                     |
| **Trio létal**                                     | Données privées + contenu non fiable + capacité d'envoyer vers l'extérieur : la combinaison qui rend une fuite possible.                                                                         |
| **Shadow AI**                                      | Usage d'outils d'IA non validés par l'entreprise.                                                                                                                                                |
