---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-advanced/handouts/handout-06-paralleliser-worktrees-ade.md
---
# Handout — Paralléliser : worktrees et ADE

**Développeur IA — Avancé · Zenika · fiche module 6**

Faire travailler plusieurs agents en même temps sans tout casser : cette fiche reprend le module 6 et la clôture, du worktree à l'ADE, du bilan du parallélisme à la revue de PR en CI.

## Agents en parallèle sur worktrees

*Module 6 · slide « Agents en parallèle sur worktrees »*

Un dépôt, **deux répertoires de travail**, deux agents **en même temps**. Un **git worktree** est un deuxième répertoire de travail rattaché au même dépôt : même historique, autre branche. Chaque agent a ses fichiers, sa branche et son contexte.

|             | Worktree A                           | Worktree B                                |
| ----------- | ------------------------------------ | ----------------------------------------- |
| **Branche** | `feat/bookings-pagination`           | `feat/rooms-min-capacity`                 |
| **Agent**   | BOOK-142 : pagination de `/bookings` | ROOM-77 : filtre de capacité sur `/rooms` |
| **Fin**     | revue · merge · nettoyage            | revue · merge · nettoyage                 |

Les commandes de git, à lancer depuis le dépôt principal (git 2.5 ou plus) :

```text
git worktree add ../kit-bookings -b feat/bookings-pagination
git worktree add ../kit-rooms -b feat/rooms-min-capacity
git worktree list
git worktree remove ../kit-bookings
```

* Un worktree **ne partage pas** les dépendances installées : `npm install` dans chacun (c'est un coût du parallélisme).
* Une branche ne peut être extraite que dans **un seul** worktree à la fois.
* Une fois la branche mergée : `git worktree remove <dossier>`, puis `git branch -d <branche>`.
* Le seul fichier partagé entre les deux tickets du kit est `openapi.yaml` : les deux agents le modifient, en général à deux endroits différents (git fusionne seul), parfois au même endroit (un conflit à résoudre).
* Ce qui est portable d'un harness à l'autre, c'est **git** : plusieurs éditeurs et harness créent aussi un worktree par session parallèle (voir « Où ça se règle dans mon outil »).

> **Paralléliser demande d'isoler** : chaque agent a ses fichiers, sa branche et son contexte.

## L'ADE : piloter des agents, plus des fichiers

*Module 6 · slide « L'ADE : piloter des agents, plus des fichiers »*

Un **ADE** (Agentic Development Environment) est un poste de travail pensé pour **superviser plusieurs agents**, quand l'IDE est pensé pour écrire du code.

|                       | IDE                  | ADE                                               |
| --------------------- | -------------------- | ------------------------------------------------- |
| **Unité de travail**  | le fichier, l'onglet | la **session d'agent** : un worktree, une branche |
| **Ce qu'on regarde**  | le code qu'on écrit  | N agents : état, terminal, diff                   |
| **Ce qu'on valide**   | sa propre ligne      | un diff, puis une PR                              |
| **Où tourne l'agent** | dans l'éditeur       | sur le poste, en arrière-plan ou dans le cloud    |

Ce que fait un ADE, quel que soit le produit :

* créer un **worktree et une branche par session** d'agent, et les nettoyer après le merge ;
* lancer un harness dans chaque session, avec ses terminaux ;
* montrer d'un coup d'œil l'**état** de chaque agent (au travail, en attente d'une permission, fini) et **notifier** ;
* afficher le **diff** de chaque session, permettre de le commenter, ouvrir la PR.

**Conductor** et **Orca** en sont deux exemples : Conductor est une application de bureau qui lance des agents en parallèle, chacun dans son worktree ; Orca gère worktrees, terminaux et agents de plusieurs fournisseurs, avec un navigateur intégré. D'autres produits suivent la même tendance (applications de bureau des harness, vues « agents » des éditeurs) : la frontière bouge vite.

**Agents en arrière-plan ou dans le cloud** : on confie un ticket, l'agent travaille dans un environnement distant et rend une PR. Même modèle mental : une tâche = un environnement isolé = une branche = une PR à juger.

> Ce qui ne change pas : le **harness**, les primitives (instructions, skills, hooks) et les formats ouverts. Un ADE orchestre des sessions, il ne remplace ni le harness ni la revue. Retenez le **rôle**, pas le produit.

## Développement parallèle : le bilan

*Module 6 · slide « Développement parallèle : le bilan »*

| Ce qu'on gagne                                       | Ce que ça coûte                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| **Temps** : deux features avancent ensemble          | **Tokens × n** : chaque agent a son propre contexte                 |
| **Isolation** : les agents ne se perturbent pas      | **Conflits de merge** : si les features touchent les mêmes fichiers |
| **Revue** : des PR plus petites, plus lisibles       | **Services partagés** : ports, base de données, dépendances         |
| **Supervision** : un ADE montre tout au même endroit | **Relecture** : tout passe par vous, le goulot c'est l'humain       |

> **Tip du module** : paralléliser demande d'isoler, et quelqu'un pour relire. **Features indépendantes** seulement ; au-delà de **2 sessions**, on subit.

* Quand ça vaut le coup : features vraiment indépendantes (modules distincts), plus de 15 à 20 min d'agent chacune, équipe à l'aise avec le merge.
* Déconseillé : services partagés (bases, ports), dépendances très lourdes à réinstaller par worktree.
* La limite du parallélisme n'est pas la machine : c'est la **capacité de revue humaine**. Sans méthode, l'IA peut même ralentir : dans l'étude METR (juillet 2025, 16 développeurs, 246 tâches), les développeurs avec IA ont pris 19 % plus longtemps.

## De la revue locale à la revue de PR en CI

*Module 6 · slide « De la revue locale à la revue de PR en CI »*

Plus d'agents, plus de PR : la **CI relit** d'abord, puis le merge suit le **risque**.

|                  | Revue locale              | Revue de PR en CI                                    |
| ---------------- | ------------------------- | ---------------------------------------------------- |
| **Exécution**    | un hook sur le poste      | le runner CI, à chaque PR                            |
| **Périmètre vu** | diff local et conventions | PR complète, spec, règles d'équipe, analyse statique |
| **Restitution**  | dans la session           | commentaire de PR et quality gate                    |

* L'agent quitte la machine du dev et entre dans la **chaîne de production collective** : ce qui se passe sur la machine reste au poste ; tout ce qui entre dans le dépôt partagé, la CI, le ticketing et la supervision relève de la chaîne.
* Les mêmes primitives (instructions, skills, hooks) se retrouvent en CI : c'est pour ça qu'on les versionne.
* Rappel de l'ordre : déterministe d'abord (lint, tests, analyse statique), agentique ensuite, humain en dernier.
* Donner plus de contexte autour du changement à l'agent de revue réduit beaucoup les faux positifs :

```text
git diff -U10 origin/main...HEAD
```

`-U10` donne 10 lignes de contexte au lieu des 3 par défaut ; `--function-context` donne la fonction modifiée en entier.

### Une politique de merge graduée

Toutes les PR ne se valent pas : la gouvernance suit le **risque**.

| Type de PR                       | Politique         | Encadrement                    |
| -------------------------------- | ----------------- | ------------------------------ |
| **Doc, correctif mineur**        | merge automatique | encadré par les evals et la CI |
| **Fonctionnelle**                | revue synchrone   | dev + relecteur                |
| **Architecture, cœur, sécurité** | double validation | humaine, obligatoire           |

> Les agents **préparent les preuves** (evals, diffs, specs) ; sur le cœur de métier, **l'humain décide**. L'auto-merge sans humain n'est toléré que sur des correctifs annexes ou de la doc, avec des evals strictes.

Les **evals** (jeux de tests qui mesurent la qualité des réponses d'un agent ou d'une skill) deviennent des quality gates comme les autres. La revue synchrone à trois (le dev, le relecteur et l'agent de revue) est décrite dans « Au-delà du poste (pour aller plus loin) ».

L'exercice 3 met le parallélisme en pratique : voir « Les exercices ».

## Une requête, de bout en bout

*Clôture · slide « Une requête, de bout en bout »*

Exemple : « ajoute la pagination par curseur sur GET /bookings, avec ses tests ».

1. **Spec** : une tâche issue d'une **spec relue** (module 4).
2. **Pattern** : un **plan**, un **juge** prévu (module 5).
3. **Worktree** : un agent **isolé**, sur sa branche (module 6).
4. **Harness** : contexte **stable**, préfixe en tête, hooks et permissions (modules 1 à 3).
5. **Juge** : les **tests**, puis un **agent distinct** (modules 4 et 5).
6. **PR** : la **CI** relit, l'**humain** décide du merge (module 6).

> **Un dev, plusieurs agents, un système** : configurer, isoler, juger.

## Trois idées à garder

*Clôture · slide « Trois idées à garder »*

| Idée                                      | En une phrase                                                                               | Le réflexe               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------ |
| **1. Le contexte fait la facture**        | l'entrée domine, le préfixe stable est en cache, les sous-agents isolent sans être gratuits | mesurer ce qui entre     |
| **2. Ce qui doit arriver se configure**   | hook, sandbox, tests, spec versionnée : ça ne se demande pas au modèle                      | hook plutôt que consigne |
| **3. Plusieurs agents : isoler et juger** | un worktree par agent, un juge entre les étapes, un humain avant le merge                   | pas d'agent sans juge    |

Pour aller plus loin : « Building effective agents », Anthropic (2024) ; « ReAct », Yao et al. (2022) ; « Judging LLM-as-a-Judge », Zheng et al. (2023) ; Jeff Orkin, « Three States and a Plan: The A.I. of F.E.A.R. » (2006) ; OWASP Top 10 for LLM (2025). La gouvernance au-delà du poste (guardrails, gateway, budget, réversibilité) est dans le handout « Au-delà du poste (pour aller plus loin) ».

## À retenir

1. Paralléliser demande d'**isoler** : un worktree, une branche, un agent.
2. Un **ADE** pilote des sessions d'agent, pas des fichiers ; retenez le rôle, pas le produit.
3. Ce qui sature d'abord, c'est **l'humain qui relit** : au-delà de deux sessions, on subit.
4. Plus d'agents, plus de PR : la **CI relit**, le merge suit le **risque**.

**Mots-clés** : worktree, isolation, ADE, agent en arrière-plan, revue de PR en CI, merge gradué, human-in-the-loop — voir le glossaire.
