---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-02-prerequis.md
---
# Handout — Prérequis des labs

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Ce qu'il faut installer et vérifier avant le J1, pour GitHub Copilot comme pour Claude Code. Les concepts des labs sont identiques dans les deux harness : seuls les emplacements de fichiers et les commandes changent (table de correspondance dans les slides, Ch. 1, « un concept, plusieurs harness »).

## Le harness

### GitHub Copilot

* Une **licence GitHub Copilot** active (Pro, Business ou Enterprise). Elle est nécessaire **y compris pour le CLI**.
* **GitHub Copilot CLI** installé et authentifié. Trois canaux d'installation, le même outil au bout :

```bash
brew install --cask copilot-cli          # macOS / Linux
npm install -g @github/copilot           # tout OS, exige Node.js 22+
curl -fsSL https://gh.io/copilot-install | bash   # script d'install
# Windows : winget install GitHub.Copilot

copilot --version   # vérifier que la commande répond
copilot             # doit ouvrir une session interactive ; /login si non authentifié
```

> Piège de nom sur Homebrew : `brew install copilot` installe **AWS Copilot** (déploiement ECS), qui n'a aucun rapport. Il faut bien `--cask copilot-cli`. Le canal d'installation n'a en revanche aucune incidence sur les labs : `brew` livre le même binaire que `npm`, sans exiger d'environnement Node.

Trois vérifications à faire **avant** la session (ce sont les blocages classiques du J1) :

1. La licence Copilot couvre bien le CLI, et pas seulement l'IDE.
2. Sur les plans Business / Enterprise, **Copilot Memory** et les **agent skills** doivent être activés par un administrateur de l'organisation.
3. L'authentification passe par `/login` dans la session, ou par une variable `GH_TOKEN` / `GITHUB_TOKEN` / `COPILOT_GITHUB_TOKEN`.

### Claude Code

* Une **licence Claude Code** active (Claude Pro, Max, Team ou Enterprise), ou un accès à l'**API Anthropic** via une clé de la Console. L'un ou l'autre suffit pour authentifier le CLI.
* **Claude Code CLI** installé et authentifié. Deux canaux d'installation, le même outil au bout :

```bash
npm install -g @anthropic-ai/claude-code          # tout OS, exige Node.js 18+
curl -fsSL https://claude.ai/install.sh | bash    # script d'install natif (macOS/Linux/WSL)

claude --version   # vérifier
claude             # doit ouvrir une session interactive ; /login si non authentifié
```

Trois vérifications à faire **avant** la session :

1. L'authentification passe soit par `/login` (compte claude.ai), soit par une variable `ANTHROPIC_API_KEY` (accès API direct) : choisissez un seul mode et tenez-vous-y pour toute la session, les deux ne se combinent pas.
2. Sur les plans Team / Enterprise, l'accès aux MCP externes et aux hooks peut être restreint par la politique d'administration de l'organisation.
3. Lancez `claude` depuis la racine du projet, sans quoi le contexte de départ est vide.

## Socle commun (tous les labs)

| Outil                                                                    | Pourquoi                                                                           | Vérifier                             |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------ |
| **Git**                                                                  | Tous les labs. Plusieurs supposent un dépôt **initialisé** (`git init` au minimum) | `git --version`                      |
| **Node.js** + `npm` / `npx` (22+ pour Copilot CLI, 18+ pour Claude Code) | CLI (canal npm), serveurs MCP en `npx`, OpenSpec                                   | `node --version`                     |
| **Python 3.10+** + `uv`                                                  | Graphify, Spec Kit, Schemathesis                                                   | `python3 --version` · `uv --version` |
| **GitHub CLI** (`gh`), version récente (mi-2026 ou postérieure)          | `gh skill` et la PR du lab 9                                                       | `gh --version`                       |
| Un **navigateur**                                                        | Ouvrir le graphe Graphify, l'app Pomodoro, l'interface E2E                         | —                                    |

## Par lab : ce qu'il faut en plus

| Lab                                       | Outillage spécifique                                                                                                                              | Sans quoi                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **1.1** Outils MCP                        | Socle. Un **dépôt git** (sinon les outils GitHub n'ont rien à lire). Claude Code : un **jeton GitHub** (`GITHUB_TOKEN`), lab facultatif           | Le serveur MCP répond dans le vide   |
| **1.2** Hook local                        | Un shell `bash` (ou `powershell` sous Windows). Droit d'exécution sur les scripts (`chmod +x`)                                                    | Le hook est chargé mais ne fait rien |
| **1.3** Graphify                          | `uv` ou `pip` → paquet `graphifyy`. Un navigateur pour `graph.html`                                                                               | Pas de graphe                        |
| **2.1 / 2.2** User stories                | Rien de plus                                                                                                                                      | —                                    |
| **3.1** Pomodoro OpenSpec                 | `npm install -g @fission-ai/openspec@latest`                                                                                                      | —                                    |
| **3.2** Pomodoro Spec Kit                 | `uv tool install specify-cli` (depuis git → **accès réseau à GitHub**)                                                                            | —                                    |
| **4.1 → 4.6** Extensions Spec Kit         | Spec Kit (3.2) + un projet déjà initialisé par `specify init`                                                                                     | `specify extension add` échoue       |
| **5.2** Pilotage E2E                      | **Docker + docker-compose** · **Playwright** (télécharge ses navigateurs au premier lancement, ~400 Mo) · une **clé d'API LLM** (voir ci-dessous) | Le TP ne démarre pas                 |
| **5.3** Variante contrat d'API            | `pip install schemathesis` (ou Pact) · même clé d'API · une spec OpenAPI                                                                          | Idem                                 |
| **6** Rétro-documentation                 | `npx reversa` (Node) · le projet legacy choisi et **ses** prérequis (pour `spring-petclinic-angularjs` : **JDK + Maven + Node**)                  | Le projet ne se lance pas            |
| **7** Poste terminal-first *(facultatif)* | `tmux`, `yazi`, `lazygit`. Optionnel pour yazi : `ffmpegthumbnailer fd ripgrep fzf zoxide`                                                        | —                                    |
| **8** Développement parallèle             | Git worktrees (natif). Une PetClinic qui **démarre**, donc son runtime (JDK + Maven, ou Python)                                                   | L'agent débugge un faux problème     |
| **9** Skill d'équipe                      | `gh` authentifié + un dépôt GitHub où pousser une PR                                                                                              | Pas de mise en situation             |

## Clé d'API LLM (labs 5.2 et 5.3)

C'est l'**application que vous construisez** qui appelle un modèle, pas votre agent. Trois options, à préparer **avant** la session :

* **Google AI Studio (Gemini)** : gratuit et le plus généreux en quota, le chemin le plus court aujourd'hui ;
* **OpenRouter** : palier gratuit limité (quelques dizaines de requêtes par jour, vite atteint sur ce TP) ;
* **votre propre clé d'API**, chez le fournisseur de votre choix.

> Sur les modèles gratuits, les données sont fréquemment traitées hors UE : **aucune donnée sensible ou client** dans ce lab. Votre licence Copilot ou votre abonnement Claude Code ne couvre **pas** cet usage : il sert à développer, pas à alimenter le produit livré.

> **Si vous avez déjà une clé d'API, c'est la meilleure option**, et de loin la plus proche de la réalité d'un projet : ni quota gratuit à ménager ni modèle imposé, et si la clé porte sur une offre payante ou un point d'accès en UE, la mise en garde sur les données ne s'applique plus. C'est aussi le seul montage transposable tel quel après la formation. Le framework du lab s'attend à un point d'accès **compatible OpenAI** ; la plupart des fournisseurs en exposent un, sinon l'adapter fait partie du TP.

## Runtime de la codebase

Les labs 1.3, 7 et 8 travaillent sur la **PetClinic** (choix de la version : handout « Lab 1 »). Les labs 1.3 et 8 exigent qu'elle **compile et démarre** : prévoyez le runtime correspondant (JDK + Maven pour la version Java, Python pour la version Django). Les autres labs (1.1, 1.2) se contentent d'un dépôt contenant du code.
