---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-advanced/handouts/handout-05-orchestrer-et-paralleliser.md
---
# Handout — Orchestrer et paralléliser

**Développeur IA — Avancé · Zenika · fiche module 5**

Quand découper le travail en plusieurs agents, et à quel prix : cette fiche reprend le module 5, des patterns d'orchestration au coût caché du parallélisme.

## Cinq patterns d'orchestration

*Module 5 · slide « Cinq patterns d'orchestration »*

Les cinq patterns de « Building effective agents » (Anthropic, 2024). Les cinq sont des **workflows**, du plus figé (chaîne : chemin connu à l'avance) au plus dynamique (orchestrateur-workers, évaluateur : un LLM décide du découpage ou de l'arrêt). L'**agent** autonome, qui choisit lui-même ses étapes, vient ensuite.

| Pattern                   | Principe                                                       | Exemple dev                                                                                     |
| ------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Chaîne**                | étapes fixes, chaque sortie nourrit la suivante                | le flux SDD : spec → plan → tâches → code, chaque étape relue                                   |
| **Routeur**               | un classifieur oriente vers le bon agent ou le bon modèle      | les demandes simples vont à un modèle léger, les complexes à un modèle de raisonnement          |
| **Parallélisation**       | tâches indépendantes, ou vote entre plusieurs, puis agrégation | trois revues du même diff : sécurité, performance, lisibilité                                   |
| **Orchestrateur-workers** | le découpage est décidé dynamiquement par un LLM               | les sous-agents d'un harness : l'agent principal décide combien en lancer et ce que fait chacun |
| **Évaluateur**            | un générateur, un évaluateur ; on itère jusqu'au critère       | un agent écrit l'endpoint, un autre le relit avec une grille                                    |

* Parallélisation et orchestrateur-workers se ressemblent ; dans le second, c'est le **modèle** qui décide du découpage, pas le développeur.
* Le conseil de l'article : commencer simple, n'ajouter un agent que si l'avantage est démontré.

## La fiabilité composée : 10 étapes à 95 % ≈ 60 %

*Module 5 · slide « La fiabilité composée : 10 étapes à 95 % ≈ 60 % »*

Fiabilité d'une chaîne d'agents fiables à 95 % chacun :

| Étapes        | 1    | 2    | 3    | 5    | 10       |
| ------------- | ---- | ---- | ---- | ---- | -------- |
| **Fiabilité** | 95 % | 90 % | 86 % | 77 % | **60 %** |

> Les fiabilités se **multiplient** : 0,95 × 0,95 × … dix fois ≈ **0,60**. La parade : une chaîne **courte**, et une **vérification** entre les étapes.

* L'hypothèse est simplificatrice (étapes indépendantes, une erreur = un échec), mais l'ordre de grandeur suffit à calmer l'envie d'empiler les agents.
* Une vérification entre deux étapes (tests, évaluateur, relecture) remet la fiabilité de l'étape près de 100 % : c'est pour ça que les tests comptent tant.
* L'échelle de construction : appel direct → tools → workflow déterministe dès qu'il faut des étapes et des validations explicites → agent supplémentaire seulement si l'avantage est démontré.

## Agents en parallèle sur worktrees

*Module 5 · slide « Agents en parallèle sur worktrees »*

Un dépôt, **deux répertoires de travail**, deux agents **en même temps**. Un **git worktree** est un deuxième répertoire de travail rattaché au même dépôt : même historique, autre branche.

|             | Worktree A                 | Worktree B                |
| ----------- | -------------------------- | ------------------------- |
| **Branche** | `feat/bookings-pagination` | `feat/bookings-export`    |
| **Agent**   | pagination par curseur     | export CSV                |
| **Fin**     | revue · merge · nettoyage  | revue · merge · nettoyage |

> **Paralléliser demande d'isoler** : chaque agent a ses fichiers, sa branche et son contexte.

Ce qui est portable d'un harness à l'autre, c'est git : plusieurs éditeurs et harness créent désormais un worktree par session parallèle (voir « Où ça se règle dans mon outil »).

## Développement parallèle : le bilan

*Module 5 · slide « Développement parallèle : le bilan »*

| Ce qu'on gagne                                  | Ce que ça coûte                                                     |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| **Temps** : deux features avancent ensemble     | **Tokens × n** : chaque agent a son propre contexte                 |
| **Isolation** : les agents ne se perturbent pas | **Conflits de merge** : si les features touchent les mêmes fichiers |
| **Revue** : des PR plus petites, plus lisibles  | **Services partagés** : ports, base de données, dépendances         |

> **Features indépendantes** seulement. Et ce qui sature d'abord, c'est **vous** : au-delà de **2 sessions**, on subit.

* Quand ça vaut le coup : features vraiment indépendantes (modules distincts), plus de 15 à 20 min d'agent chacune, équipe à l'aise avec le merge.
* Déconseillé : services partagés (bases, ports), dépendances très lourdes à réinstaller par worktree.
* La limite du parallélisme n'est pas la machine : c'est la **capacité de revue humaine**. Sans méthode, l'IA peut même ralentir : dans l'étude METR (juillet 2025, 16 développeurs, 246 tâches), les développeurs avec IA ont pris 19 % plus longtemps.

## Le coût caché : l'érosion de la connaissance

*Module 5 · slide « Le coût caché : l'érosion de la connaissance »*

| Effet                          | Ce qui se passe                                           |
| ------------------------------ | --------------------------------------------------------- |
| **Écrire moins**               | le code vous appartient moins quand vous ne l'écrivez pas |
| **Relire n'est pas apprendre** | on valide une forme, pas un raisonnement                  |
| **Lent et invisible**          | on le découvre en incident, deux ans plus tard            |

> Ce n'est pas un argument contre l'autonomie, c'est sa **condition** : ce qu'on automatise, il faut savoir le **reprendre**.

* L'IA amplifie ce que vous êtes déjà : bonne base de code → meilleure ; mauvaise → bien pire.
* La documentation est ce qui reste quand la mémoire de l'équipe s'efface (module 4). Supprimer la revue humaine, c'est perdre le principal moment où la connaissance circule.
* Deux questions à se poser : sur le code que votre agent a produit la semaine dernière, lequel sauriez-vous expliquer à un collègue ? Qui saurait reprendre ce module sans l'agent ?

## Superviser au lieu d'approuver

*Module 5 · slide « Quiz : quel pattern ? » (tip du module)*

Deux moyens au service du même saut d'autonomie, adoptables séparément :

* **Le poste comme console** : sessions persistantes, une par panneau de terminal ou d'éditeur ; on voit ce que l'agent fait, on ne le devine pas ; le diff est relu ligne à ligne avant de valider.
* **Le parallélisme, quand c'est indépendant** : worktrees, une branche isolée par agent, des PR plus petites, des contextes ciblés.

Ce qui rend l'autonomie tenable, ce n'est pas l'outillage : ce sont les **tests**, les **commits fréquents** et la **relecture du diff**. Sans ce filet, monter d'un cran ne fait qu'accélérer la production de code non vérifié.

> **Tip du module** : superviser au lieu d'approuver, ajoute un agent seulement si tu sais **qui relira son travail**.

L'exercice 3 compare une délégation à des sous-agents et la même chose faite dans la session principale : voir « Les exercices ».

## À retenir

1. Cinq patterns, du plus prévisible au plus autonome : **commencer simple**.
2. Les fiabilités se **multiplient** : chaîne courte, vérification entre les étapes.
3. Paralléliser demande d'**isoler** ; au-delà de **deux sessions**, c'est la revue qui sature.
4. L'autonomie a une condition : savoir **reprendre** ce qu'on automatise.

**Mots-clés** : orchestrateur, sous-agent, fiabilité composée, worktree, parallélisme, isolation, human-in-the-loop — voir le glossaire.
