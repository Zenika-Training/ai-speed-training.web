---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m1-bases/handouts/handout-01-memo.md
---
# Handout — Bases du développement agentique

**AI-Driven Development · Module 1 · Zenika · fiche mémo**

Les notions, les prompts et les commandes du Module 1, dans l'ordre du deck : cadrer, générer (greenfield), faire évoluer (brownfield), brancher des outils (MCP).

## L'AI-Driven Development

Un mode de travail où le développeur s'appuie sur des **agents IA** (Claude Code, GitHub Copilot…) plutôt que d'écrire chaque ligne à la main. Le code généré doit être **aussi proche que possible** de celui qu'on aurait écrit : des guidelines, les meilleurs modèles, une relecture systématique. Le développeur **reste responsable** du code généré.

|            | Vibe coding                        | AI-driven development                                      |
| ---------- | ---------------------------------- | ---------------------------------------------------------- |
| **Public** | Product Managers, designers UX/UI… | Ingénieurs logiciel                                        |
| **Code**   | Caché par défaut                   | L'IDE reste l'interface ; le dev maîtrise le code          |
| **Portée** | Prototypage rapide d'applis neuves | Toute appli (legacy, neuve, petite ou grosse…)             |
| **Outils** | Replit, Lovable, Bolt              | Claude Code, GitHub Copilot, Cursor, Windsurf, Antigravity |

Les outils **convergent** : les mêmes techniques s'appliquent partout. Les pas-à-pas du module s'appuient sur Claude Code ; une version symétrique existe pour GitHub Copilot.

> L'IA amplifie le développeur, elle ne le remplace pas. C'est vous qui pilotez.

## Les 4 réflexes

1. **Cadrer** : des instructions custom (`CLAUDE.md`).
2. **Planifier** : le mode plan avant de générer.
3. **Outiller** : skills, agents, MCP.
4. **Relire** : les tests, le diff.

## Planifier, relire, gérer le contexte

**Planifier avant de coder** : définir le problème, le découper, identifier les contraintes (API, sécurité, performance), prototyper mentalement, puis générer.

**Relire le code généré** comme celui d'un contributeur inconnu :

| Axe         | Question                                               |
| ----------- | ------------------------------------------------------ |
| Correction  | Résout-il vraiment le problème ?                       |
| Cas limites | Entrée vide, `null`, grandes valeurs ?                 |
| Sécurité    | Entrées validées ? autorisations correctes ?           |
| Performance | N+1, boucles infinies, fuites mémoire ?                |
| Lisibilité  | Compréhensible dans 6 mois par l'équipe ?              |
| Dépendances | Les imports existent-ils vraiment et sont-ils à jour ? |

```text
Relis le code que tu viens d'écrire : cas limites, sécurité, perf.
```

**Gérer le contexte** : la context window est limitée. Être sélectif, résumer, mentionner les fichiers utiles, découper en conversations courtes, garder le contexte persistant dans des fichiers d'instructions.

```text
Corrige la fonction calculateDiscount dans pricing.service.ts.
Elle reçoit un Cart et un PromoCode, et ignore aujourd'hui
le montant minimum d'achat.
```

## Claude Code : modes de permission et mode plan

On bascule avec **Shift+Tab**.

| Mode                        | Ce qui demande une validation                                      |
| --------------------------- | ------------------------------------------------------------------ |
| `default`                   | Tout (fichiers, commandes)                                         |
| `acceptEdits`               | Commandes seulement : les éditions de fichiers sont auto-acceptées |
| `plan`                      | Lecture seule : propose un plan, aucune édition                    |
| `auto` (Teams / Enterprise) | Un classifieur vérifie chaque action, interruptions minimales      |

> Commencez en **plan**, validez, puis passez en **acceptEdits** pour exécuter. Toujours le mode plan pour les gros changements multi-fichiers.

## `CLAUDE.md` : les instructions custom

Chargé **au début de chaque session**. Il prescrit les **pratiques de code** (stack, conventions, commandes) et des **informations générales** sur l'appli.

* Rester **sous ~200 lignes** ; au-delà, l'adhérence chute.
* Des règles **vérifiables** : « Lance `npm test` avant chaque commit » plutôt que « Teste tes changements ».
* `/init` génère un `CLAUDE.md` de départ en analysant le code.
* Portées : `./CLAUDE.md` (projet, versionné), `~/.claude/CLAUDE.md` (perso), niveau organisation (géré par la DSI).

## Greenfield : le workflow

1. **Définir** : une spécification claire dans un fichier markdown externe.
2. **Architecturer** en mode plan : structure, schéma, endpoints, décisions et compromis, dans `architecture.md`, sans code.
3. **Scaffolder** : structure, configuration, dépendances, un premier composant end-to-end, le fichier d'instructions IA, sans logique métier.
4. **Implémenter feature par feature** : planifier, implémenter, relire, refactorer, ajouter la doc IA manquante, mettre à jour la doc projet, feature suivante.

```text
À partir de cette spécification, propose :
1. La structure de dossiers/modules d'un projet NestJS
2. Le schéma de base (entités et relations)
3. Les endpoints de l'API (design REST)
4. Les décisions d'architecture clés et leurs compromis
N'écris aucun code. Rédige ta proposition dans architecture.md.
```

**Documentation-Driven Development** : faire écrire la doc de la feature (besoin, implémentation cible, questions ouvertes) avant le code.

**Pièges** : sur-scaffolding, tests sautés, dérive d'architecture, dépendances hallucinées, logique métier manquante. Contre-mesures : lire chaque fichier généré, lancer les tests en continu, vérifier que les dépendances existent, tester avec des données réalistes.

## Skills et agents

Une **skill** emballe un savoir-faire reproductible : un `SKILL.md` (mode d'emploi) + des fichiers de support, chargé automatiquement quand sa description correspond à la tâche. `/skills` liste les skills disponibles.

```markdown
---
name: frontend
description: À utiliser pour les tâches de développement frontend.
---

- Charge d'abord architecture-frontend.md
- Crée un plan avant d'implémenter
- Exécute le plan étape par étape, en attendant ma validation
```

**Skills de convention** : une skill atomique par tâche récurrente (`new-endpoint`, `new-service`, `add-tests`, `new-migration`). Une skill qui couvre tout est ignorée.

**Sous-agents** : instances Claude isolées, avec leur propre context window et leur jeu de tools. Intégrés : Explore, Plan, general-purpose. Custom : `.claude/agents/<nom>.md` (tools, modèle, system prompt, mémoire persistante). Seul le résumé revient dans la conversation principale.

## Brownfield : faire évoluer un code existant

* **Comprendre** : demander l'architecture à partir du point d'entrée, ou le rôle d'un fichier.
* **Fichiers de contexte** : `/init`, puis relire de façon critique (concepts métier, pièges et invariants, patterns implicites). Sur un gros code, des fichiers d'instructions **par module**, qui évoluent avec le code.
* **Respecter l'existant** : faire regarder les patterns en place avant de proposer ; « n'introduis aucun nouveau pattern ni dépendance ».
* **Tests sur du legacy** : la tâche à plus forte valeur ; filet de sécurité, documentation du comportement.
* **Refactorer en sécurité** : identifier, tester, planifier, transformer, vérifier, relire. Ne jamais sauter les tests ni la vérification. Nommer le pattern précis (Extract Function, Strategy, Introduce Repository…).
* **Tests de caractérisation** : capturer le comportement actuel avant un gros refactor, pour détecter tout changement.

```text
Avant de refactorer InvoiceCalculator, génère des tests qui capturent
le comportement ACTUEL, peu importe qu'il soit correct : je veux savoir
si je change quelque chose par accident.
```

## MCP : brancher des outils tiers

Le **Model Context Protocol** est un standard ouvert (Anthropic, 2024) : une interface standard entre une IA et des outils externes, en client-serveur, avec des **resources**, des **tools** et des **prompts**. L'« USB des outils IA ».

| Serveur MCP              | Ce qu'il débloque                                    |
| ------------------------ | ---------------------------------------------------- |
| GitHub / GitLab          | Lire des issues, créer des PR, gérer les branches    |
| Jira                     | Lister les sprints, créer / modifier des tickets     |
| Figma                    | Lire les design tokens, inspecter les composants     |
| Context7                 | Docs de librairies à jour injectées dans le contexte |
| SQL (PostgreSQL, MySQL…) | Interroger les schémas, analyser les requêtes lentes |

Configuration : `.mcp.json` (projet) ou `~/.claude/claude.json` (global), ou en ligne de commande. `/mcp` active ou désactive les serveurs dans le chat.

> **Chaque MCP, c'est du contexte** : activer 5 MCP injecte des milliers de tokens à chaque requête. N'activez que ceux que vous utilisez vraiment. Alternative : une CLI (`glab`, `jira-cli-node`) emballée dans une skill, coût de contexte nul quand elle ne sert pas.

**Hooks** : des scripts exécutés à des points clés, toujours, sans décision du LLM. `PreToolUse` peut bloquer une action (exit 2) ; `PostToolUse` ne peut pas l'annuler. Bloquer avant.

## Commandes du module

| Commande                                      | Effet                                      |
| --------------------------------------------- | ------------------------------------------ |
| `claude`                                      | Lancer Claude Code dans le projet          |
| Shift+Tab                                     | Changer de mode de permission              |
| `/plan`                                       | Demander un plan sans édition              |
| `/init`                                       | Générer un `CLAUDE.md` de départ           |
| `/skills`                                     | Lister les skills disponibles              |
| `/mcp`                                        | Activer / désactiver les serveurs MCP      |
| `claude mcp add <nom> -- <commande>`          | Ajouter un serveur MCP (écrit `.mcp.json`) |
| `claude mcp list` / `claude mcp remove <nom>` | Lister / retirer un serveur MCP            |

## La suite

Module 2, Développer avec l'IA en équipe : le **Spec-Driven Development** (OpenSpec, Spec Kit, BMAD), la spec comme source de vérité, les workflows custom et le partage en équipe.
