---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-11-lab-08-dev-parallele.md
---
# Handout — Lab 8 · Développement parallèle

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Développer deux features indépendantes de la PetClinic en parallèle, avec deux agents sur deux git worktrees, puis les réconcilier. Identique pour GitHub Copilot et Claude Code : seul le CLI lancé dans chaque terminal change.

1. **Créez deux worktrees** depuis la branche `main` de la PetClinic :

```bash
git worktree add ../petclinic-feat-a -b feat/clinic-list
git worktree add ../petclinic-feat-b -b feat/owner-search
```

2. **Recopiez les fichiers non versionnés** dans chaque worktree (`.env`, secrets, configuration locale) : ils ne suivent pas, et sans eux l'application ne démarre pas. L'agent partirait alors en boucle de debug sur un faux problème.
3. **Feature A, page « All Clinics »** : ouvrez un terminal dans `../petclinic-feat-a`, lancez `copilot` ou `claude`, demandez d'implémenter la page selon la user story du lab 2.2.
4. **Feature B, recherche d'owners** : ouvrez un terminal dans `../petclinic-feat-b`, lancez un second agent, demandez le filtre de recherche.
5. **Laissez les deux agents tourner** (surveillez lazygit dans chaque worktree).
6. **Réconciliez** :
   * créez des PR depuis chaque branche ;
   * mergez A → résolvez les éventuels conflits avec B → mergez B ;
   * nettoyez : `git worktree remove` + `git branch -d`.

> Comparez le **temps total** avec une approche séquentielle estimée. Identifiez les fichiers qui auraient conflicté.

> **Variante équipes backend** : deux features vraiment indépendantes côté API fonctionnent tout aussi bien, par exemple **Feature A'**, un nouvel endpoint `GET /clinics/{id}/stats` (agrégation simple), et **Feature B'**, un job de traitement asynchrone `vet-availability-sync`. Le point pédagogique (isolation de contexte, conflits de merge, réconciliation) ne dépend pas de la couche touchée.

> Côté Copilot, le CLI ne gère pas les worktrees : on passe par git, le geste le plus portable. L'**app Copilot** (desktop) place chaque session parallèle dans son propre worktree isolé, création et nettoyage compris.
