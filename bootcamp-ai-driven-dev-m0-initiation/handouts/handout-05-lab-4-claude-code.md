---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m0-initiation/handouts/handout-05-lab-4-claude-code.md
---
# Handout — Lab 4 : prendre en main Claude Code

**Bootcamp AI-Driven Development · Module 0 · Zenika · support d'exercice**

Lab optionnel (~30 min) : confier à Claude Code une tâche concrète sur un dépôt réel.

## Rappel : Claude Code

**Claude Code** est un agent Claude qui tourne dans votre terminal et pilote votre dépôt comme un développeur. Pour les profils tech, installable en une commande npm.

* Naviguer dans un dépôt (même gros) avec le bon niveau de contexte.
* Écrire du code, modifier plusieurs fichiers, lancer les tests, corriger les erreurs.
* Exécuter des commandes shell, interagir avec Git, ouvrir une PR.
* Appeler des **MCP**, charger des **Skills** dédiées (SRE, DB, review, tests…).
* Fonctionner en **mode plan** ou en exécution directe.

Où ça brille : refactor multi-fichiers, migration de framework, génération de tests sur du legacy, exploration d'un dépôt inconnu, investigation d'un bug via les logs.

## Étapes

1. **Choisir un petit dépôt** (perso ou side-project anonymisé). Installer Claude Code et le lancer à la racine du dépôt :

```bash
npm install -g @anthropic-ai/claude-code
claude
```

2. **Laisser explorer** : `/init` génère un `CLAUDE.md` (architecture, conventions, commandes).

```text
/init
```

3. **Choisir une mission de 15-30 min** : ajouter un test, renommer une fonction partout, documenter un module, corriger une typo dans 10 fichiers.
4. **Demander un plan** (mode plan) puis laisser exécuter. Observer : Claude Code lit, modifie, teste, explique.
5. **Relire le diff**, accepter / refuser, ouvrir une PR.

> **Règle d'or** : dépôt non critique, pas de secrets dans l'historique, toujours relire le diff avant merge. Pas de dépôt client sans validation DSI.
