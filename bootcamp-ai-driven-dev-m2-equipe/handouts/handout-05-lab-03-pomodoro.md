---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-05-lab-03-pomodoro.md
---
# Handout — Lab 3 · Pomodoro

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Spécifier puis générer une petite application Pomodoro (HTML + JavaScript, côté client), d'abord avec OpenSpec (3.1), puis avec GitHub Spec Kit (3.2).

## 3.1 · Construire un Pomodoro avec OpenSpec

**Objectif** : spécifier puis générer une petite app **Pomodoro** (HTML + JS, côté client) avec **OpenSpec**.

1. Créez un dossier `Pomodoro`, placez-vous dedans (côté Claude Code : ouvrez-y Claude), puis installez et initialisez OpenSpec :

```bash
npm install -g @fission-ai/openspec@latest
openspec init --tools github-copilot    # GitHub Copilot
openspec init --tools claude            # Claude Code
```

2. **Proposer** : lancez le skill `openspec-propose` avec le besoin : **25 min de focus / 10 min de pause** par défaut ; *(avancé)* boutons **pause** et **reset** ; *(avancé)* un **design « Chupa Chups »**. Invitez l'IA à proposer des features.
3. **Appliquer** : une fois les specs définies, lancez le skill `openspec-apply-change` avec le nom du changement, puis **testez** l'application.
4. **Archiver** : si vous êtes satisfait, lancez le skill `openspec-archive-change` pour archiver les specs.
5. **Extension** : ajoutez un **bouton de bascule** entre mode *Chupa Chups* et mode *Coca-Cola*.

| Skill OpenSpec            | GitHub Copilot                                 | Claude Code                         |
| ------------------------- | ---------------------------------------------- | ----------------------------------- |
| `openspec-propose`        | `/openspec-propose`                            | `/opsx:propose`                     |
| `openspec-apply-change`   | `/openspec-apply-change <nom-du-changement>`   | `/opsx:apply <nom-du-changement>`   |
| `openspec-archive-change` | `/openspec-archive-change <nom-du-changement>` | `/opsx:archive <nom-du-changement>` |

> On a fait **spec d'abord, code ensuite**, et la spec reste la **source de vérité** régénérable.

## 3.2 · Construire le Pomodoro avec Spec Kit

**Objectif** : refaire le **Pomodoro** avec **GitHub Spec Kit**, en gardant la **charte visuelle** de l'étape précédente et en parcourant **tout le cycle** Spec Kit.

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init Pomodoro-SpecKit --integration copilot   # GitHub Copilot
specify init Pomodoro-SpecKit                         # Claude Code : choisir l'assistant + le shell
```

1. **Copilot : observer ce que l'init a écrit.** `git status` montre les commandes `/speckit.*` déposées dans les dossiers que Copilot lit. Ce sont des fichiers versionnés, pas une dépendance externe.
2. Déroulez les **4 étapes** : `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`.
3. **Réutilisez** la **charte « Chupa Chups »** produite avec OpenSpec : reprenez la spec ou les fichiers, ou **injectez une capture d'écran** au moment du `specify`.
4. Faites du **mode « Coca-Cola »** une **nouvelle feature** : relancez un `/speckit.specify` dédié, puis `plan` / `tasks` / `implement`.

> **À vous de jouer** : plusieurs chemins fonctionnent.

> Spec Kit est un projet GitHub : l'intégration Copilot est de première classe. Les mêmes 30+ intégrations restent disponibles (`--integration claude`, `cursor`, `gemini`…) : le TP est identique, seul le flag change.
