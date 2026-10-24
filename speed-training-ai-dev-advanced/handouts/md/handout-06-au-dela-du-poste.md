# Handout — Au-delà du poste

**Développeur IA — Avancé · Zenika · fiche module 6**

Ce que change l'agent dans la chaîne de prod et pour l'entreprise : cette fiche reprend le module 6 et la clôture, de la revue de PR en CI jusqu'à la réversibilité.

## De la revue locale à la revue de PR en CI

_Module 6 · slide « De la revue locale à la revue de PR en CI »_

|                  | Revue locale              | Revue de PR en CI                                    |
| ---------------- | ------------------------- | ---------------------------------------------------- |
| **Exécution**    | un hook sur le poste      | le runner CI, à chaque PR                            |
| **Périmètre vu** | diff local et conventions | PR complète, spec, règles d'équipe, analyse statique |
| **Restitution**  | dans la session           | commentaire de PR et quality gate                    |

- L'agent quitte la machine du dev et entre dans la **chaîne de production collective** : ce qui se passe sur la machine reste au poste ; tout ce qui entre dans le dépôt partagé, la CI, le ticketing et la supervision relève de la chaîne.
- Les mêmes primitives (instructions, skills, hooks) se retrouvent en CI : c'est pour ça qu'on les versionne.
- Rappel de l'ordre : déterministe d'abord (lint, tests, analyse statique), agentique ensuite, humain en dernier.

> Donner plus de contexte autour du changement à l'agent de revue réduit **beaucoup les faux positifs** :

```text
git diff -U10 origin/main...HEAD
```

`-U10` donne 10 lignes de contexte au lieu des 3 par défaut ; `--function-context` donne la fonction modifiée en entier.

## Pair-programming à trois

_Module 6 · slide « Pair-programming à trois »_

Le dev et un relecteur (deux personnes) + l'agent de revue, **en même temps**.

| Cycle de PR asynchrone                    | 2 personnes + 1 agent, en synchrone                      |
| ----------------------------------------- | -------------------------------------------------------- |
| 1. Le dev soumet la PR                    | 1. L'agent de revue (CI) produit son rapport             |
| 2. Le relecteur commente (24 h d'attente) | 2. Le dev et le relecteur trient les remarques en direct |
| 3. Le dev corrige (12 h d'attente)        | 3. L'agent applique les corrections                      |

> Moins d'attente, des retours plus pertinents, une validation immédiate. Et un moment où la connaissance circule.

## Politique de merge graduée

_Module 6 · slide « Politique de merge graduée »_

Toutes les PR ne se valent pas : la gouvernance suit le **risque**.

| Type de PR                       | Politique         | Encadrement                    |
| -------------------------------- | ----------------- | ------------------------------ |
| **Doc, correctif mineur**        | merge automatique | encadré par les evals et la CI |
| **Fonctionnelle**                | revue synchrone   | dev + relecteur                |
| **Architecture, cœur, sécurité** | double validation | humaine, obligatoire           |

> Les agents **préparent les preuves** (evals, diffs, specs) ; sur le cœur de métier, **l'humain décide**.

Les **evals** (jeux de tests qui mesurent la qualité des réponses d'un agent ou d'une skill) deviennent des quality gates comme les autres.

## Où placer les contrôles

_Module 6 · slide « Où placer les contrôles »_

| Garde               | Ce qu'elle contrôle                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Garde d'entrée**  | injection, jailbreak ; données perso, secrets → masquer ; sujets interdits ; taille, débit, budget  |
| **Garde de sortie** | toxicité, hors périmètre ; fuite de données ; ancrage (grounding) ; format / schéma valide          |
| **Garde d'action**  | liste blanche de tools ; sandbox, conteneur, réseau ; droits minimaux (tokens) ; validation humaine |

> Les gardes d'entrée et de sortie **réduisent** le risque. La garde d'action le **borne** : un agent sans réseau ne peut pas exfiltrer.

- Défense en profondeur : aucun étage n'est suffisant seul.
- Les gardes d'entrée et de sortie sont souvent elles-mêmes des modèles (classifieurs, petits modèles), donc faillibles, avec de la latence et du coût. On les place sur les données externes non fiables (prompt injection) et sur les sorties qui partent vers des clients.
- La garde d'action est déterministe : un refus sur `git push` ne se contourne pas par un prompt astucieux. Pour un agent de code, c'est le premier investissement : permissions du harness, sandbox ou conteneur, tokens à portée minimale.
- **Trio létal** : données privées + contenu non fiable + capacité d'envoyer vers l'extérieur. Casser un des trois, c'est le rôle de la garde d'action.

## L'AI gateway : un seul point de passage

_Module 6 · slide « L'AI gateway : un seul point de passage »_

Un **proxy entre vos agents et les fournisseurs de modèles** : une seule API côté agents, N fournisseurs derrière, aucune clé de fournisseur sur les postes.

| Fonction          | Ce qu'elle apporte                                           |
| ----------------- | ------------------------------------------------------------ |
| **Routage**       | choix du modèle, **fallback** si un fournisseur tombe        |
| **FinOps**        | quotas et **plafond de dépense** par équipe                  |
| **Observabilité** | tokens, coût et latence par appel (souvent en OpenTelemetry) |
| **Emballement**   | coupe l'agent coincé dans une boucle                         |
| **Guardrails**    | masquage, détection d'injection : appliqués **à tous**       |
| **Traçabilité**   | modèles autorisés, résidence des données, audit              |

- La gouvernance sans modifier les agents : ajouter un masquage ou changer de fournisseur se fait dans la gateway, une fois.
- Le **plafond de dépense** est le garde-fou le plus simple, à poser dans la gateway.
- Attention au **cache sémantique** de certaines gateways : il renvoie une réponse déjà générée pour une question « proche ». Utile pour une FAQ, dangereux pour un agent de code. À ne pas confondre avec le **prompt caching** du fournisseur (module 1), qui ne change pas la réponse.

## Le budget caché : au-delà des tokens

_Module 6 · slide « Le budget caché : au-delà des tokens »_

Plus d'agents, c'est plus de PR. Donc plus de **builds**, de **tests**, de **mutation testing** : la facture est **double**, les tokens et les **runners CI**.

| Étape                 | Effet                                |
| --------------------- | ------------------------------------ |
| Adoption des agents   | plus de travail en parallèle         |
| Multiplication des PR | plus de CI, de tests, de mutation    |
| Résultat              | facture tokens **+** facture runners |

> Un budget IA, c'est **tokens + CI + stockage + temps de revue**. Le temps de revue humaine est le poste le plus oublié, et c'est lui qui limite le parallélisme.

## Investir ou attendre : le test à trois questions

_Module 6 · slide « Investir ou attendre : le test à trois questions »_

| Question         | Investir                                 | Attendre                                             |
| ---------------- | ---------------------------------------- | ---------------------------------------------------- |
| **Spécifique ?** | contexte propre à l'équipe ou au produit | générique : ce que le modèle fera bientôt nativement |
| **Répété ?**     | plusieurs fois par semaine               | rare : le geste qu'on fait deux fois par an          |
| **Maintenu ?**   | un propriétaire identifié                | orphelin : personne ne le maintiendra                |

> Trois oui : on écrit la skill ou le hook. Un non : **on attend**.

- Le critère du propriétaire est le plus discriminant : une skill non maintenue est pire qu'absente (agentic debt).
- La seule mesure qui vaut est la vôtre : combien de fois la skill s'est déclenchée, et le temps qu'elle a évité de réexpliquer. Trois skills utilisées valent mieux que vingt dans le dépôt.

## Réversibilité : éviter le vendor lock-in

_Module 6 · slide « Réversibilité : éviter le vendor lock-in »_

| Principe                  | Pourquoi                                                                         |
| ------------------------- | -------------------------------------------------------------------------------- |
| **Harness ≠ fournisseur** | l'adhérence est dans le harness ; les modèles changent tous les trimestres       |
| **Modèle via la gateway** | basculer sans réécrire l'outillage                                               |
| **Formats ouverts**       | `AGENTS.md`, `SKILL.md`, MCP survivent à un changement d'outil                   |
| **Résidence des données** | à exiger au contrat : aucune donnée ne sert au réentraînement, hébergement connu |

Modèle via la gateway : les agents appellent un nom interne (ex. `code-standard`), la gateway choisit le modèle réel derrière. Changer de modèle devient un réglage côté gateway, à condition que le harness accepte une adresse d'API personnalisée.

Choisir un harness, un modèle, un fournisseur : trois décisions désormais séparables, selon trois postures.

| Posture                     | Exemples                                                                                            | Ce que ça implique                                                                                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Mono-fournisseur**        | Claude Code                                                                                         | le harness impose la famille de modèles : cohérence maximale, arbitrage impossible ; l'hébergement reste négociable |
| **Catalogue multi-éditeur** | GitHub Copilot                                                                                      | un contrat, plusieurs modèles au choix en session : arbitrage coût / puissance sans changer d'outil                 |
| **Agnostique**              | OpenCode, Pi, Aider ; Codex par configuration (fournisseurs compatibles API OpenAI, modèles locaux) | le fournisseur est un paramètre : liberté totale, intégration (permissions, support) à votre charge                 |

> **Tip du module** : Tracé et portable : un agent qu'on peut **auditer**, et **quitter**. Commits tracés, specs versionnées, appels journalisés par la gateway, formats ouverts.

## Une requête, de bout en bout

_Clôture · slide « Une requête, de bout en bout »_

Exemple : « ajoute la pagination par curseur sur GET /bookings, avec ses tests ».

1. **SDD** : une tâche issue d'une **spec relue**.
2. **Orchestrer** : la tâche est confiée à un **agent**.
3. **Harness** : construit le **contexte**, préfixe stable en tête (`AGENTS.md`, demande initiale).
4. **Gateway** : **filtre**, **route** et **journalise** l'appel.
5. **Modèle** : **prefill** en cache, puis **decode**.
6. **Harness** : hook, permission, tool, puis il **reboucle**.

> **Le modèle prédit, le harness agit, la gateway gouverne.**

## Trois idées à garder

_Clôture · slide « Trois idées à garder »_

| Idée                               | En une phrase                                                                               | Le réflexe                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **1. Le contexte fait la facture** | l'entrée domine, le préfixe stable est en cache, les sous-agents isolent sans être gratuits | mesurer ce qui entre                      |
| **2. Le harness agit**             | ce qui doit arriver se configure (hook, sandbox, tests), ça ne se demande pas               | hook plutôt que consigne                  |
| **3. La gouvernance se trace**     | spec versionnée, commit tracé, appels par la gateway, revue humaine là où ça compte         | ce qui n'est pas tracé n'est pas gouverné |

Pour aller plus loin : « Building effective agents », Anthropic (2024) ; « Attention Is All You Need », Vaswani et al. (2017) ; « Intro to LLMs », Andrej Karpathy ; OWASP Top 10 for LLM (2025).

## À retenir

1. La revue passe du poste à la **CI** ; la gouvernance des merges suit le **risque**.
2. La **garde d'action** borne le risque, les gardes d'entrée et de sortie le réduisent.
3. La **gateway** route, plafonne, observe et trace, pour toute l'entreprise.
4. Un budget IA compte aussi la **CI** et le **temps de revue** ; on investit sur le **spécifique, répété, maintenu**.

**Mots-clés** : guardrails, gateway, prompt injection, trio létal, plafond de dépense, evals, quality gate, human-in-the-loop, vendor lock-in — voir le glossaire.
