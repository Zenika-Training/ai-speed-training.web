---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-01-memo.md
---
# Handout — Mémo du module 2

**Bootcamp AI-Driven Development · Module 2 · Zenika · fiche mémo**

Ce que vous retenez des deux jours : un harness outillé et borné, une context window maîtrisée, la spec (et la doc) comme patrimoine, et des pratiques partagées en équipe.

## 1. Boîte à outils d'agents personnels

**Agent de code = Modèle + Harness.** Le modèle raisonne ; le harness lui donne les moyens d'agir : boucle d'outils, contexte et mémoire, permissions et sandboxing, sous-agents et hooks, observabilité. Un même modèle dans deux harness différents peut produire des résultats très différents.

| Brique                                               | Rôle                                                      | Activation     |
| ---------------------------------------------------- | --------------------------------------------------------- | -------------- |
| `AGENTS.md` (`CLAUDE.md`, `copilot-instructions.md`) | Règles stables, conventions, structure du projet          | toujours actif |
| Agent Skills (`SKILL.md`)                            | Savoir-faire réutilisable, avec scripts embarqués         | à la demande   |
| Hooks                                                | Scripts déterministes sur les événements du cycle de vie  | événementiel   |
| Agents custom / sous-agents                          | Périmètre borné, contexte isolé                           | isolation      |
| MCP                                                  | Brancher l'agent sur l'écosystème (forge, doc, ticketing) | outils         |

**Un concept, plusieurs harness :**

| Concept                | GitHub Copilot                                  | Claude Code                      |
| ---------------------- | ----------------------------------------------- | -------------------------------- |
| Instructions de projet | `.github/copilot-instructions.md` · `AGENTS.md` | `CLAUDE.md` · `AGENTS.md`        |
| Skills                 | `.github/skills/<nom>/`                         | `.claude/skills/<nom>/`          |
| Sous-agents            | `.github/agents/*.agent.md`                     | `.claude/agents/` + outil `Task` |
| Hooks                  | `.github/hooks/*.json`                          | `.claude/settings.json`          |
| MCP                    | `mcp-config.json`                               | `.mcp.json`                      |
| Context window         | `/context` · jauge VS Code                      | `/context` · `/usage`            |
| Mode non interactif    | `copilot -p "…"`                                | `claude -p "…"`                  |

**Piloter l'autonomie** : observer → demander à chaque action → laisser faire dans le périmètre → ne plus rien demander → aller au bout seul. Le mode n'est qu'un défaut : les droits vivent dans un fichier (`--allow-tool`, `permissions.allow/ask/deny`, `config.toml`). Une allowlist n'est pas une sandbox : le seul périmètre réel est l'isolation.

> La policy vit dans le runtime, pas dans le prompt : un hook refuse ce qu'une consigne d'`AGENTS.md` ne fait que suggérer.

## 2. Mémoire, tokens et indexation

* Le **KV Cache** évite de recalculer l'historique ; il vit côté serveur et expire (5 min chez Anthropic, 24 h ou 30 min chez OpenAI selon le modèle). Un cache expiré coûte de l'argent et de la latence, jamais de la mémoire.
* **Mesurer d'abord** : `/context` (Copilot, Claude Code), `/status` (Codex). La dépense se lit ailleurs : AI Credits (Copilot), `/cost` (Claude Code), `/usage` (Codex), `ccusage`.
* **Réduire** : `/compact [focus on …]`, `/clear` quand la tâche est finie, prompt caching, agents custom, skills à la demande, modèle choisi au démarrage (`/model` en cours de session invalide le cache).
* **Lire les chiffres avec esprit critique** : rtk (gain annoncé −60 à −90 %, mesuré +7,6 % de coût) ; context-mode tient (−97,5 %) ; ponytail (−10,3 % de coût) rapporte plus que caveman (−8,5 %).
* **Mémoire** : fichier versionné (`AGENTS.md`), mémoire native (Auto Memory, Copilot Memory, Codex), middleware (`memoir`). `/memory` l'ouvre dans Claude Code comme dans Copilot CLI. Aucun standard : changer d'agent coûte la mémoire.
* **RAG sur le code** : chunking naïf, AST-aware, knowledge graph. Graphify : `graphify install --platform copilot`, `graphify .`, `graphify hook install`.

## 3. Spec-Driven Development : fondations

* Les assistants **formalisent** les user stories, ils ne remplacent pas les conversations avec les utilisateurs.
* Sans guidelines, une story générée est verbeuse, hors syntaxe, trop technique, sans Definition of Done : écrivez votre guide (skill `story-writing`).
* Trois frameworks : **OpenSpec** (léger, `propose → apply → archive`), **Spec Kit** (`/speckit.constitution → specify → plan → tasks → implement`, le plus adaptable), **BMAD** (20+ agents, Quick Flow ou Standard Flow).
* Règle minimale : la **spécification précède la génération de code**.

## 4. Workflow adapté à l'IA

* Trois postures : **spec-first → spec-anchored → spec-as-source**. Aucun framework n'atteint encore le spec-as-source.
* Customiser sans forker : Spec Kit (extensions = nouvelles capacités, presets = surcharges, bundles = distribution) ; BMAD (overrides TOML, expansion packs) ; OpenSpec (config projet `openspec/config.yaml`, schemas custom dans `openspec/schemas/`).
* La spec n'est qu'une partie de la doc : la **documentation complète** (fonctionnelle et technique) est le patrimoine, le code un artefact régénérable.
* Trois garde-fous : **tests**, **revue agentique** par un agent distinct, **le commit** (doc à jour, part d'IA tracée, `Co-Authored-By:`).
* Tests de construction (pour l'agent, jetables) vs tests fonctionnels (pour l'équipe, durables) ; le score de mutation complète la couverture.

## 5. Mise en pratique sur un projet

* Ce qui coûtait deux semaines en coûte deux jours : l'outil interne « pas assez rentable » le devient (framework de tests d'API ou E2E).
* Migrer un legacy : re-documenter d'abord, puis refondre par étapes (Strangler Fig, Branch by Abstraction, Anti-Corruption Layer, Parallel Run).
* Sur un projet existant : skills et instructions → constitution → specs sur les nouvelles features → rétro-documentation du seul périmètre touché.

## 6. Le futur du dev : coder autrement

* Superviser au lieu d'approuver : poste terminal-first (multiplexeur de terminal au choix, `lazygit` pour relire le diff).
* Git worktrees : `git worktree add -b feat/x ../proj-x`, un agent par worktree ; les fichiers non versionnés (`.env`, `node_modules/`) ne suivent pas.
* Au-delà de deux sessions parallèles, on ne supervise plus, on subit.
* Le coût caché : l'érosion de la connaissance. La revue de code évolue, elle ne disparaît pas.

## 7. Partage & mutualisation en équipe

* Skills versionnés dans le dépôt (`.github/skills/`, `.claude/skills/`, `.agents/skills/`), distribués par `gh skill install <repo> <skill>@<tag>` ou skills.sh.
* Description à la troisième personne, ce que ça fait **et** quand l'utiliser ; test « agent A écrit, agent B teste ».
* Investir si c'est **spécifique**, **répété** et **maintenu** ; sinon attendre.
* `AGENTS.md` d'équipe : socle commun prescriptif, tout écart documenté.

> Le fil rouge : la spec (et la doc) est le patrimoine, le code est un artefact régénérable.
