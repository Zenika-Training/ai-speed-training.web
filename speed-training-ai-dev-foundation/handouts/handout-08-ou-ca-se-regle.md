---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-foundation/handouts/handout-08-ou-ca-se-regle.md
---
# Handout — Où ça se règle dans mon outil

**Développeur IA — Foundation · Zenika · fiche outils**

La formation parle de concepts ; cette fiche donne, pour quatre harness courants, l'endroit où chaque concept se règle.

> **Vérifié sur la documentation officielle des éditeurs le 21 octobre 2026 ; les outils changent vite.** Les noms de modes, les commandes et les chemins bougent d'une version à l'autre : en cas de doute, la documentation du jour fait foi. « — » signale l'absence d'équivalent documenté.

Les formats ouverts passent d'un outil à l'autre : **`AGENTS.md`** (instructions projet), **`SKILL.md`** (skills) et **MCP** (tools). Une équipe mixte peut versionner un seul jeu de fichiers, chacun garde son harness.

## Les fichiers de contexte

*Slides « Instructions projet (AGENTS.md) » (module 2), « MCP : ce que vous exposez en branchant un serveur » et « Une bonne consigne devient une skill » (module 4)*

| Concept                    | GitHub Copilot                                                                                                                                                   | Claude Code                                                                                                                                                      | Codex                                                                                                      | Cursor                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Instructions projet**    | `AGENTS.md` · `.github/copilot-instructions.md` · `.github/instructions/*.instructions.md` ciblés par glob (`applyTo`)                                           | `CLAUDE.md` (projet : `./CLAUDE.md` ; perso : `~/.claude/CLAUDE.md`) · `AGENTS.md`, lu seulement s'il n'y a pas de `CLAUDE.md` (sinon l'importer : `@AGENTS.md`) | `AGENTS.md` (perso : `~/.codex/AGENTS.md`)                                                                 | `AGENTS.md` · `.cursor/rules/*.mdc`                                                                |
| **Générer un premier jet** | `/init` (CLI) : écrit `.github/copilot-instructions.md`                                                                                                          | `/init`                                                                                                                                                          | `/init` : écrit un `AGENTS.md`                                                                             | `/create-rule` : écrit une règle dans `.cursor/rules`                                              |
| **Skills** (`SKILL.md`)    | `.github/skills/<nom>/` (lit aussi `.claude/skills/` et `.agents/skills/`) ; perso : `~/.copilot/skills/`                                                        | `.claude/skills/<nom>/` ; perso : `~/.claude/skills/`                                                                                                            | `.agents/skills/<nom>/` ; perso : `~/.agents/skills/`                                                      | `.cursor/skills/` ou `.agents/skills/` (lit aussi `.claude/skills/`) ; perso : `~/.cursor/skills/` |
| **Déclencher une skill**   | le modèle, sur la description, ou `/<nom>` dans la demande                                                                                                       | le modèle, sur la description, ou `/<nom>`                                                                                                                       | le modèle, sur la description, ou `$<nom>`                                                                 | le modèle, sur la description, ou `/<nom>`                                                         |
| **Serveurs MCP**           | CLI : `~/.copilot/mcp-config.json` (ou `/mcp add`) · projet : `.mcp.json` ou `.github/mcp.json` · VS Code : `.vscode/mcp.json` (clé `servers`, pas `mcpServers`) | `.mcp.json` à la racine, versionné (ou `claude mcp add`)                                                                                                         | `~/.codex/config.toml` ou `.codex/config.toml` du projet, table `[mcp_servers.<nom>]` (ou `codex mcp add`) | `.cursor/mcp.json` (projet) · `~/.cursor/mcp.json` (perso)                                         |

## Les niveaux d'autonomie

*Slides « Planifier avant de coder » et « Modes de pilotage : monter l'autonomie » (module 2)*

| Niveau d'autonomie                                | GitHub Copilot                                                                                                                                                  | Claude Code                                                                                    | Codex                                                                                                       | Cursor                                                                                                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Observer sans agir** (mode plan, lecture seule) | mode *plan* (`/plan`, Maj+Tab)                                                                                                                                  | mode *plan*                                                                                    | mode plan (`/plan`) · `sandbox_mode = "read-only"`                                                          | mode *Ask* (lecture seule) ou *Plan* (Maj+Tab)                                                                                                                     |
| **Demander à chaque action**                      | permissions `default` (CLI) · *Manual permissions* (VS Code, par défaut)                                                                                        | mode *Manual* (valeur `default`)                                                               | `trust_level = "untrusted"` sur le projet (`approval_policy = "untrusted"` est retiré)                      | mode *Allowlist* : tout ce qui n'est pas listé demande une approbation                                                                                             |
| **Agir dans le périmètre**                        | approbations mémorisées par emplacement (« ne plus demander dans ce dépôt ») · `--allow-tool`                                                                   | *accept edits* (`acceptEdits`)                                                                 | préréglage *Auto* (par défaut) : `approval_policy = "on-request"` + `sandbox_mode = "workspace-write"`      | mode *Auto-review* : liste blanche, sandbox, puis classifieur                                                                                                      |
| **Aller au bout seul**                            | *Autopilot* · *Allow all* (`/yolo`, `--yolo`) · *assisted* (un LLM juge chaque demande)                                                                         | *auto mode* (classifieur, mode de départ par défaut depuis la v2.1.283) · *bypass permissions* | *Auto-review* (`approvals_reviewer = "auto_review"`) · `--yolo` (ni sandbox ni approbation)                 | mode *Run Everything* (`/run-everything` en CLI)                                                                                                                   |
| **Où se déclarent les droits**                    | `--allow-tool` / `--deny-tool` au lancement · approbations mémorisées dans `~/.copilot/permissions-config.json` · VS Code : réglages `chat.tools.*.autoApprove` | `permissions.allow` / `ask` / `deny` dans `.claude/settings.json`, versionné                   | `~/.codex/config.toml` : `approval_policy` et `sandbox_mode`, réglés séparément · `/permissions` en session | *Settings > Agents > Approvals & Execution* · `.cursor/permissions.json` (consignes de l'Auto-review) · CLI : `permissions.allow` / `deny` dans `.cursor/cli.json` |

* Le mode affiché n'est qu'un **défaut** : une autorisation large en configuration fait que l'agent ne demande plus rien. La configuration a le dernier mot.
* « Aller au bout seul » n'est raisonnable que dans un environnement isolé et jetable (conteneur, VM).

## Les actions en session

*Slides « Rewind plutôt qu'empiler » (module 3), « Plus n'est pas mieux » et « Coûts : le token se paie » (module 5)*

| Action                                       | GitHub Copilot                                                                                                               | Claude Code                                                                                        | Codex                                                                         | Cursor                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Revenir en arrière** (rewind, checkpoints) | VS Code : *Restore Checkpoint* sur une demande · CLI : `/rewind` (ou `/undo`), conversation seule ou conversation + fichiers | `/rewind` ou Échap deux fois : revient à un message, restaure le code, la conversation ou les deux | Échap deux fois : édite un message précédent et repart de là ; fichiers : git | *Restore Checkpoint* dans le chat (fichiers) · CLI : `/rewind`       |
| **Voir l'occupation de la context window**   | `/context` · indicateur (petit cercle) dans VS Code                                                                          | `/context`                                                                                         | `/status` · « % context left » en pied d'écran                                | anneau de contexte à côté de la saisie (clic : détail par catégorie) |
| **Voir la dépense**                          | `/usage` (CLI : tokens par modèle, AI Credits)                                                                               | `/usage` (`/cost` en est l'alias)                                                                  | `/usage`                                                                      | tableau de bord *Spending*, hors session                             |
| **Compacter · repartir à zéro**              | `/compact` · `/clear` (alias `/new`)                                                                                         | `/compact` · `/clear` (alias `/new`)                                                               | `/compact` · `/new` (ou `/clear`)                                             | `/summarize` · nouveau chat (CLI : `/clear`)                         |

> Partout, le filet universel reste le même : **revenir au dernier commit** et ouvrir une **session neuve** avec la demande corrigée.

## Sources

Documentation officielle des éditeurs, consultée le 21 octobre 2026.

* **GitHub Copilot**
  * Instructions projet : https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions
  * Skills : https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills
  * CLI (commandes, modes, MCP) : https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
  * Permissions CLI : https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools
  * Context window : https://docs.github.com/en/copilot/concepts/prompting-and-context/context-management
  * VS Code, approbations : https://code.visualstudio.com/docs/agents/run/approvals
  * VS Code, checkpoints : https://code.visualstudio.com/docs/agents/run/review-code-edits
  * VS Code, MCP : https://code.visualstudio.com/docs/agent-customization/mcp-servers
* **Claude Code**
  * Instructions projet (`CLAUDE.md`, `AGENTS.md`) : https://code.claude.com/docs/en/memory
  * Skills : https://code.claude.com/docs/en/skills
  * Modes de permission : https://code.claude.com/docs/en/permission-modes
  * Permissions : https://code.claude.com/docs/en/permissions
  * MCP : https://code.claude.com/docs/en/mcp
  * Checkpoints : https://code.claude.com/docs/en/checkpointing
  * Commandes : https://code.claude.com/docs/en/commands
* **Codex** (les liens developers.openai.com/codex redirigent vers learn.chatgpt.com)
  * `AGENTS.md` : https://developers.openai.com/codex/guides/agents-md
  * Skills : https://developers.openai.com/codex/skills
  * Approbations et sandbox : https://developers.openai.com/codex/agent-approvals-security
  * MCP : https://developers.openai.com/codex/mcp
  * Commandes : https://developers.openai.com/codex/cli/slash-commands
* **Cursor**
  * Règles et `AGENTS.md` : https://cursor.com/docs/rules
  * Skills : https://cursor.com/docs/skills
  * MCP : https://cursor.com/docs/mcp
  * Modes d'exécution : https://cursor.com/docs/agent/security/run-modes
  * Mode Ask : https://cursor.com/help/ai-features/ask-mode
  * Mode Plan : https://cursor.com/docs/agent/plan-mode
  * Checkpoints : https://cursor.com/docs/agent/overview
  * Context window : https://cursor.com/docs/agent/prompting
  * CLI (commandes, permissions) : https://cursor.com/docs/cli/reference/slash-commands
  * Dépense : https://cursor.com/help/models-and-usage/usage-limits
