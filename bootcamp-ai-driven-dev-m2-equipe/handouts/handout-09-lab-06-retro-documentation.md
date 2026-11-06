---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-09-lab-06-retro-documentation.md
---
# Handout — Lab 6 · Rétro-documentation

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Partir d'un projet legacy sans documentation, en extraire les spécifications, les injecter dans un outil SDD, puis recréer l'application. Identique pour GitHub Copilot et Claude Code.

1. **Projet conseillé** : **`spring-petclinic-angularjs`** (AngularJS 1 + Spring Boot 2) : domaine déjà connu, **front legacy** (AngularJS en fin de vie). Tout petit projet legacy maîtrisé convient (PHP, jQuery…). Prévoyez ses prérequis (JDK + Maven + Node).
2. **Rétro-spécifier avec Reversa** : l'IA s'appuie sur une **vraie méthodologie** (14 sous-agents, pipeline en phases).

```bash
npx reversa install     # détecte la stack, prépare la structure
# puis, dans l'agent : /reversa  → specs écrites dans _reversa_sdd/
```

3. **Relire** les specs générées, les **passer dans Spec Kit**, puis **régénérer** le front en **stack moderne** (Angular, React).
4. **Comparer** : l'app régénérée respecte-t-elle l'**intention** du legacy ?

> Reversa **ne touche pas** au code existant (il écrit dans `.reversa/` et `_reversa_sdd/`) : il **documente** avant de régénérer.
