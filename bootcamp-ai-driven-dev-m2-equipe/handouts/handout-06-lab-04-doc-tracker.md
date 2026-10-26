---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-06-lab-04-doc-tracker.md
---
# Handout — Lab 4 · Extension speckit-doc-tracker

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Créer une extension Spec Kit `speckit-doc-tracker` qui enrichit chaque commit d'un indicateur de part de code générée par l'IA (4.1, 4.2) et vérifie que `SPEC.md` est à jour (4.3). Identique pour GitHub Copilot et Claude Code : prérequis, un projet déjà initialisé par `specify init` (lab 3.2).

## 4.1 · Créer et installer l'extension

**Objectif** : créer une extension Spec Kit `speckit-doc-tracker` qui enrichit chaque commit d'un **indicateur de part de code généré par l'IA** et d'une vérification de `SPEC.md`.

1. **Créer le projet d'extension** :

```text
speckit-doc-tracker/
├── extension.yml        # manifeste : nom, description, commandes
└── commands/
    └── commit.md        # skill : logique de /speckit.doc-tracker.commit
```

Dans `extension.yml` :

```yaml
schema_version: '1.0'
extension:
  id: doc-tracker
  name: 'Documentation Tracker'
  version: '0.0.1'
  description: 'Tracks documentation of projects in SPEC.md'

requires:
  speckit_version: '>=0.9.0'

provides:
  commands:
    - name: speckit.doc-tracker.commit
      file: commands/commit.md
      description: 'Writes commit messages, updates documentation on each commit.'
```

2. **Installer en local** pour itérer :

```bash
specify extension add --dev ./speckit-doc-tracker
specify extension list        # vérifier qu'elle est active
```

> Prendre l'habitude de committer **via l'assistant de code** (et non en ligne de commande directe) est ce qui rend la traçabilité possible : l'assistant connaît le **contexte complet** du diff. Un `git commit -m "..."` direct court-circuite tous les contrôles ; la valeur est dans le flux complet : diff → analyse → message → vérification.

> L'extension est d'abord développée et versionnée à part, puis ses artefacts installés sont versionnés dans le dépôt du projet, comme n'importe quel fichier de config.

## 4.2 · La commande de commit enrichie

1. **Écrire la skill `commands/commit.md`** : elle demande à l'agent d'analyser les fichiers stagés, d'estimer la part IA, puis de générer un commit conventionnel avec le footer dédié :

```text
feat(auth): add refresh token endpoint

Implements JWT refresh flow with 7-day expiry.

AI-Generated: ~75%
```

2. **Tester** en invoquant la commande :

```text
/speckit.doc-tracker.commit
```

L'agent lit le diff stagé, rédige le message, ajoute le footer `AI-Generated`.

> L'estimation de la part IA est **approximative par nature** : ce qui compte, c'est d'établir une **convention d'équipe cohérente** et de la rendre visible dans l'historique git.

## 4.3 · SPEC.md à jour avant chaque commit

1. **Ajouter le format de `SPEC.md`** dans `templates/SPEC.md`. Dans les étapes suivantes, l'extension peut faire référence à ce fichier.

```markdown
# [Project Name] Specification

Purpose: [One sentence describing what the project provides and to whom.]

## Normative Language

The key words MUST, MUST NOT, REQUIRED, SHOULD, SHOULD NOT, RECOMMENDED, MAY, and OPTIONAL in this document are to be interpreted as described in RFC 2119.

Implementation-defined means the behavior is part of the implementation contract, but this specification does not prescribe one universal policy. Implementations MUST document the selected behavior.

## §1 Problem Statement

## §2 Goals & Non-Goals

## §3 System Overview

## §4 Domain Model

## §5 Functional Behavior

## §6 Technical Architecture

## §7 Glossary

## §8 References
```

2. **Enrichir la commande** : avant de finaliser le commit, l'extension **détecte si `SPEC.md` doit être mis à jour** au regard du diff stagé :

| Situation                              | Action de l'extension                                                      |
| -------------------------------------- | -------------------------------------------------------------------------- |
| Nouveau endpoint / composant ajouté    | Vérifie que §5 (Functional Behavior) de `SPEC.md` reflète le changement    |
| Modification d'architecture            | Vérifie que §3 / §6 (System Overview / Technical Architecture) sont à jour |
| `SPEC.md` non modifié depuis N commits | Suggère de lancer `/speckit.analyze` pour auditer la couverture            |

3. **En cas de drift détecté** : l'agent **propose de lancer `/specify` ou `/plan`** pour mettre `SPEC.md` à jour, puis de **reprendre le commit** une fois fait.
4. **Fil rouge** : l'extension sera installée dès le départ du **TP de pilotage E2E** (lab 5) ; chaque commit vérifiera que `SPEC.md` documente les endpoints et que les **logs applicatifs** (structurés, avec niveau et contexte) sont décrits dans la spec (§5 Functional Behavior).

> Le commit devient un **point de synchronisation** entre le code et la spec : ni contraignant, ni silencieux. Le principe est « guider puis bloquer » : l'agent ne rejette pas brutalement, il montre ce qui dérive et propose de le corriger via la commande Spec Kit appropriée, à la différence d'un pre-commit hook rigide.

> Variante « ceinture et bretelles » : la commande **guide**, mais si l'équipe veut une règle **non contournable**, on double le contrôle par un hook qui refuse un `git commit` lancé directement (côté Copilot : un `preToolUse` dans `.github/hooks/` ; côté Claude Code : un `PreToolUse` sur `Bash`, comme au lab 1.2). C'est le principe « la policy vit dans le runtime, pas dans le prompt ».
