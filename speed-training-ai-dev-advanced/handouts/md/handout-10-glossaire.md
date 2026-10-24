# Handout — Glossaire des mots-clés IA

**Développeur IA — Avancé · Zenika · glossaire**

Une phrase par terme : les mêmes mots, avec le même sens, que dans la formation business et la Foundation, puis les termes propres à l'Avancé.

Les termes techniques anglais sont gardés (harness, tools, context window, skill) : ce sont ceux que vous entendrez dans les outils et les réunions. On dit **context rot** pour la dégradation d'une session, et **drift** pour l'écart entre la spec et le code.

## Tronc commun : les bases (rappel)

_Ouverture et module 1_

| Terme                                  | En une phrase                                                                                                                                                                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IA générative**                      | IA qui produit du contenu (texte, image, code) au lieu de seulement classer ou prédire un chiffre.                                                                                                                                                                                                |
| **LLM** (Large Language Model)         | Modèle entraîné sur d'énormes volumes de texte, qui génère une réponse en prédisant le mot suivant.                                                                                                                                                                                               |
| **Token**                              | Morceau de mot traité par le modèle ; c'est aussi l'unité de facturation (≈ ¾ de mot en anglais).                                                                                                                                                                                                 |
| **Hallucination**                      | Réponse fausse mais présentée avec assurance et vraisemblance.                                                                                                                                                                                                                                    |
| **Knowledge cutoff** (date de coupure) | Date à laquelle s'arrêtent les données d'entraînement du modèle ; il ignore tout ce qui s'est passé après, sauf s'il fait une recherche web.                                                                                                                                                      |
| **Assistant**                          | Le produit qu'on utilise au quotidien (ChatGPT, Copilot, Claude.ai, Gemini) : une interface posée sur un harness, autour d'un modèle.                                                                                                                                                             |
| **Harness**                            | Tout le logiciel autour du modèle : consignes, mémoire, tools, enchaînement des étapes. Deux assistants sur le même modèle diffèrent par leur harness.                                                                                                                                            |
| **Tools**                              | Capacités que le modèle peut appeler pendant sa réponse : recherche web, calcul, lecture de fichiers, Jira, Figma… (_tool calling_).                                                                                                                                                              |
| **MCP** (Model Context Protocol)       | Standard pour brancher de nouveaux tools sur un assistant : applications et données de l'entreprise.                                                                                                                                                                                              |
| **Agent**                              | Modèle qui enchaîne lui-même des actions avec des tools, en boucle, jusqu'à atteindre un objectif : c'est la **boucle agentique** (modèle + tools + boucle + objectif, que le harness fait tourner). Les éditeurs utilisent aussi « agent » pour de simples assistants personnalisés.             |
| **Boucle agentique** (agent loop)      | Le cycle demande → le modèle choisit un tool → le harness l'exécute → le résultat entre dans le contexte → on recommence si besoin.                                                                                                                                                               |
| **Prompt**                             | La demande envoyée au modèle, consignes comprises.                                                                                                                                                                                                                                                |
| **Skill**                              | Savoir-faire emballé (consignes, modèles, exemples, parfois des scripts) que l'assistant charge **à la demande**, quand la tâche correspond. Plus léger que des instructions permanentes, partageable dans une équipe. Claude parle d'« Agent Skills » ; d'autres assistants ont des équivalents. |
| **Vibe coding**                        | Produire vite un prototype en langage naturel, sans regarder le code ; parfait pour explorer, insuffisant pour livrer.                                                                                                                                                                            |
| **AI-driven development**              | Développement logiciel où l'IA écrit beaucoup de code, sous la direction et le contrôle d'ingénieurs.                                                                                                                                                                                             |

## Tronc commun : contexte, risques et coûts (rappel)

_Modules 1, 3 et 6_

| Terme                                    | En une phrase                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context window**                       | Tout ce que le modèle « voit » au moment de répondre : consignes, historique, pièces jointes, résultats des tools.                                                              |
| **Session**                              | Une conversation ; elle accumule du contexte, utile ou parasite.                                                                                                                |
| **Mémoire**                              | Informations que l'assistant réinjecte automatiquement d'une session à l'autre (profil, préférences) ; souvent désactivable.                                                    |
| **Grounding**                            | Ancrer la réponse dans des sources vérifiables plutôt que dans la « mémoire » du modèle.                                                                                        |
| **RAG** (Retrieval-Augmented Generation) | Technique de grounding : on cherche les bons extraits de documents internes et on les ajoute au contexte avant de répondre.                                                     |
| **Cache**                                | Mise en mémoire du début du contexte pour ne pas le repayer plein tarif à chaque message (il est relu à prix réduit) ; changer de modèle ou de tools en cours de route le perd. |
| **Human-in-the-loop**                    | Un humain qualifié valide la sortie de l'IA _avant_ qu'elle soit utilisée.                                                                                                      |
| **Prompt injection**                     | Instructions malveillantes cachées dans un contenu (email, document, page web) qui détournent un assistant.                                                                     |
| **Fuite de données**                     | Données confidentielles envoyées à un assistant non maîtrisé (version grand public).                                                                                            |
| **Plafond de dépense** (spend cap)       | Limite de budget configurée pour éviter les factures surprises.                                                                                                                 |

## Rappel de la Foundation

_Termes de la Foundation repris dans les modules 1 à 6_

| Terme                                              | En une phrase                                                                                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agent de code**                                  | Agent qui lit, modifie et exécute du code dans un dépôt (Copilot, Claude Code, Codex, Cursor…).                                                                                                   |
| **System prompt**                                  | Consignes que le harness place en tête de chaque appel, avant les instructions projet et la conversation.                                                                                         |
| **Tool definitions**                               | Nom, description et paramètres de chaque tool, envoyés au modèle à chaque appel : ils pèsent dans la context window et se lisent comme un prompt.                                                 |
| **Instructions projet** (`AGENTS.md`)              | Fichier versionné dans le dépôt, chargé à chaque session : conventions, commandes, pièges. C'est l'équivalent dev des instructions personnalisées.                                                |
| **Demande initiale**                               | Premier message de la session, cadré pour la tâche du jour : objectif, fichiers clés, commandes, invariants, pièges. Pour une tâche longue, on l'écrit dans un fichier rechargé à chaque session. |
| **Invariant**                                      | Règle qui doit rester vraie quoi que fasse l'agent (un contrat d'API, une règle métier, un test qui doit passer).                                                                                 |
| **Niveau d'autonomie**                             | Ce que l'agent peut faire sans demander : proposer, modifier après accord, ou agir seul.                                                                                                          |
| **Permissions**                                    | Les actions autorisées à l'agent (lire, écrire, lancer une commande, accéder au réseau).                                                                                                          |
| **Revue IA**                                       | Relecture d'un diff par un agent ; elle aide l'humain, elle ne décide pas du merge.                                                                                                               |
| **Progressive disclosure**                         | L'agent ne voit d'abord que le nom et la description d'une skill, et ne charge son contenu que quand il en a besoin.                                                                              |
| **Context rot** (en business : dérive de contexte) | Dégradation des réponses quand la context window se remplit d'ajouts, de corrections et d'informations périmées ou contradictoires : la session reste crédible mais s'éloigne du besoin initial.  |
| **Compaction**                                     | Résumé automatique ou demandé de la session pour libérer de la context window.                                                                                                                    |
| **Lost in the middle**                             | Le modèle exploite moins bien ce qui se trouve au milieu d'un long contexte.                                                                                                                      |
| **Trio létal**                                     | Données privées + contenu non fiable + capacité d'envoyer vers l'extérieur : la combinaison qui rend une fuite possible.                                                                          |

## Termes propres à l'Avancé : sous le capot

_Module 1_

| Terme                         | En une phrase                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Prefill / decode**          | Les deux temps d'une réponse : lire tout le contexte, puis générer token par token.                                 |
| **KV cache**                  | Mémoire de calcul du modèle qui évite de relire le contexte déjà traité.                                            |
| **Prompt caching**            | Le fournisseur réutilise le début inchangé du contexte d'un appel à l'autre, moins cher et plus rapide.             |
| **Reasoning tokens** (effort) | Tokens de « réflexion » que le modèle génère avant de répondre ; ils améliorent les tâches difficiles et se paient. |
| **SLM**                       | Petit modèle, souvent local et spécialisé, moins cher et plus rapide qu'un LLM.                                     |

## Termes propres à l'Avancé : le harness et le contexte

_Modules 2 et 3_

| Terme                               | En une phrase                                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Agentic debt**                    | Dette créée quand on empile sur son harness des réglages, extensions et contournements qu'on ne maîtrise plus.                     |
| **Allowlist**                       | Liste des commandes que l'agent peut lancer sans demander. Ce n'est pas une sandbox.                                               |
| **Sandbox**                         | Environnement isolé qui limite ce que l'agent peut toucher, même si on l'a autorisé.                                               |
| **Hook**                            | Action déterministe déclenchée par le harness à un moment précis (avant une commande, après une édition), quoi que dise le modèle. |
| **Sous-agent** (subagent)           | Agent lancé par l'agent principal dans un contexte isolé, qui ne renvoie que son résultat.                                         |
| **Context engineering**             | Choisir ce qui entre dans la context window, quand et sous quelle forme.                                                           |
| **Recherche agentique**             | L'agent cherche lui-même dans le code (grep, lecture de fichiers) au lieu de recevoir des extraits préparés.                       |
| **Embeddings / indexation du code** | Représentation du code qui permet de retrouver les passages pertinents par le sens ou par la structure.                            |

## Termes propres à l'Avancé : spec et qualité

_Module 4_

| Terme                                           | En une phrase                                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **SDD** (Spec-Driven Development)               | Développement où la spec versionnée est la source de vérité que l'agent implémente et que les tests vérifient.                     |
| **Spec-first / spec-anchored / spec-as-source** | Les trois postures du SDD : la spec sert à démarrer, reste maintenue avec le code, ou devient la seule chose qu'on édite.          |
| **Spec-centric / workflow-centric**             | Les deux familles d'outillage du SDD : la référence est la spec versionnée, ou une discipline de travail encodée en skills.        |
| **Drift**                                       | Écart qui s'installe entre la spec et le code.                                                                                     |
| **Tests de construction / tests fonctionnels**  | Tests qui aident l'agent à converger sur l'implémentation, jetables / tests des effets observables, durables : la spec exécutable. |
| **Mutation testing**                            | Technique qui modifie le code exprès pour vérifier que les tests détectent le changement.                                          |

## Termes propres à l'Avancé : orchestrer et gouverner

_Modules 5 et 6_

| Terme                       | En une phrase                                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Orchestrateur**           | Logiciel ou agent qui répartit le travail entre plusieurs agents et assemble leurs résultats.                                             |
| **Fiabilité composée**      | La fiabilité d'une chaîne d'agents est le produit de celle de chaque étape : 0,95 sur 10 étapes donne environ 60 %.                       |
| **Worktree** (git worktree) | Deuxième répertoire de travail rattaché au même dépôt, sur une autre branche : deux agents peuvent travailler en parallèle sans se gêner. |
| **Guardrails**              | Contrôles en entrée, en sortie et sur les actions d'un agent.                                                                             |
| **Gateway** (AI gateway)    | Point de passage unique entre les agents et les fournisseurs de modèles : routage, coût, traçabilité, règles.                             |
| **Evals**                   | Jeux de tests qui mesurent la qualité des réponses d'un agent ou d'une skill.                                                             |
| **Quality gate**            | Contrôle automatique qu'une PR doit passer avant le merge (tests, analyse statique, evals, revue agentique).                              |
| **Vendor lock-in**          | Dépendance à un fournisseur qui rend coûteux un changement d'outil ou de modèle ; formats ouverts et gateway la réduisent.                |
