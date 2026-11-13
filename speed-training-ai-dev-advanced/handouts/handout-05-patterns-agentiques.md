---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-advanced/handouts/handout-05-patterns-agentiques.md
---
# Handout — Patterns agentiques

**Développeur IA — Avancé · Zenika · fiche module 5**

Qui décide de l'étape suivante, et qui juge le résultat : cette fiche reprend le module 5, des cinq patterns d'orchestration à l'agent as a judge, au best-of-N et à la fiabilité composée.

## Cinq patterns d'orchestration

*Module 5 · slide « Cinq patterns d'orchestration »*

Les cinq patterns de « Building effective agents » (Anthropic, 2024). Les cinq sont des **workflows** : le **code** décide de l'étape suivante, du plus figé (chaîne : chemin connu à l'avance) au plus dynamique (orchestrateur-workers, évaluateur : un LLM décide du découpage ou de l'arrêt). L'**agent** autonome, qui choisit lui-même ses étapes, vient ensuite. Rappel de la Foundation : « Chat, workflow ou agent ? ».

| Pattern                   | Principe                                                       | Exemple dev                                                                                     |
| ------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Chaîne**                | étapes fixes, chaque sortie nourrit la suivante                | le flux SDD : spec → plan → tâches → code, chaque étape relue                                   |
| **Routeur**               | un classifieur oriente vers le bon agent ou le bon modèle      | les demandes simples vont à un modèle léger, les complexes à un modèle de raisonnement          |
| **Parallélisation**       | tâches indépendantes, ou vote entre plusieurs, puis agrégation | trois revues du même diff : sécurité, performance, lisibilité                                   |
| **Orchestrateur-workers** | le découpage est décidé dynamiquement par un LLM               | les sous-agents d'un harness : l'agent principal décide combien en lancer et ce que fait chacun |
| **Évaluateur**            | un générateur, un évaluateur ; on itère jusqu'au critère       | un agent écrit l'endpoint, un autre le relit avec une grille                                    |

* Parallélisation et orchestrateur-workers se ressemblent ; dans le second, c'est le **modèle** qui décide du découpage, pas le développeur.
* Le conseil de l'article : commencer simple, n'ajouter un agent que si l'avantage est démontré.

## Patterns agentiques : qui décide, qui juge ?

*Module 5 · slide « Patterns agentiques : qui décide, qui juge ? »*

Quand le modèle décide, deux questions rangent tous les patterns : **qui décide de l'étape suivante** (le code, le modèle, un planificateur) et **qui juge le résultat** (des tests, le modèle lui-même, un autre agent, un humain). Exemples sur le fil rouge : la pagination par curseur sur `GET /bookings`.

| Pattern              | Qui décide                                  | Qui juge                                   | Quand l'utiliser                                             | Son coût                                                     |
| -------------------- | ------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **ReAct**            | le modèle, à chaque tour                    | les sorties des tools (tests, compilation) | tâche ouverte avec un retour rapide : corriger un test rouge | un tour par action ; le contexte grossit à chaque tour       |
| **Plan-and-Execute** | le plan, écrit par le modèle                | une vérification par étape                 | tâche à plusieurs étapes dont on veut relire le plan         | un appel de plus pour le plan ; une étape peut être inventée |
| **GOAP**             | un planificateur, sur des actions déclarées | l'état but atteint                         | processus connu : livrer, migrer, déployer                   | décrire les actions une fois ; ensuite prévisible            |
| **Reflection**       | le modèle                                   | le même modèle, avec ses angles morts      | relire un brouillon, peu cher                                | un tour de plus ; il ne voit pas ce qu'il a mal compris      |
| **Agent as a judge** | le générateur                               | un agent distinct, avec une grille         | entre deux étapes, avant la revue humaine                    | un contexte et un appel de plus ; à calibrer                 |
| **Best-of-N**        | N agents isolés                             | les tests, puis un juge                    | tâche incertaine, plusieurs approches plausibles             | **× N** tokens, et N diffs à départager                      |

* **ReAct** (Yao et al., 2022) : Pensée → Action → Observation. C'est la boucle agentique de la Foundation ; le juge, c'est la réalité (la sortie d'un test, une erreur de compilation).
* **Plan-and-Execute** : le modèle écrit un plan, on le relit, puis il l'exécute étape par étape. C'est « planifier avant de coder » de la Foundation, formalisé.
* **Reflection** : l'agent relit sa propre sortie et la corrige. Utile et peu cher, mais il partage les angles morts de l'auteur.
* Combinaisons courantes : Plan-and-Execute avec un agent as a judge entre les étapes ; best-of-N avec des tests, puis un juge.

> Plus le **modèle** décide, plus il faut un **juge** solide.

## Plan-and-Execute ou GOAP : qui écrit le plan ?

*Module 5 · slide « Plan-and-Execute ou GOAP : qui écrit le plan ? »*

|                  | Plan-and-Execute                          | GOAP                                                    |
| ---------------- | ----------------------------------------- | ------------------------------------------------------- |
| **Qui planifie** | le LLM, en langage naturel                | un algorithme, sur des actions déclarées                |
| **Le plan**      | souple, mais une étape peut être inventée | chaque action a ses **préconditions** et ses **effets** |
| **Imprévu**      | on corrige le plan, ou on relance         | il **replanifie** depuis l'état réel                    |
| **Pour**         | tâches ouvertes : explorer, refactorer    | processus connus : livrer, migrer, déployer             |

**GOAP** (Goal-Oriented Action Planning) vient de l'IA de jeu vidéo : Jeff Orkin, pour le jeu *F.E.A.R.* (2005). Trois ingrédients : un **état du monde** (des faits), un **état but**, et des **actions**, chacune avec ses **préconditions**, ses **effets** et un coût. Un planificateur (une recherche de chemin, de type A\*) cherche la suite d'actions la moins coûteuse qui mène de l'état actuel à l'état but. Le LLM **exécute** les actions ; il ne **choisit** plus leur ordre.

### Un exemple détaillé sur le fil rouge

**État but** : `GET /bookings` paginé, tests verts, contrat OpenAPI à jour, PR ouverte.

**État de départ** : la spec est lue ; il n'y a pas encore de test.

| Action                   | Préconditions                     | Effets                 | Coût |
| ------------------------ | --------------------------------- | ---------------------- | ---- |
| Écrire le test           | spec lue                          | test rouge             | 1    |
| Implémenter              | test rouge                        | tests verts            | 3    |
| Mettre à jour le contrat | implémentation faite              | contrat OpenAPI à jour | 1    |
| Ouvrir la PR             | tests verts **et** contrat à jour | PR ouverte             | 1    |

Le planificateur trouve la chaîne : écrire le test, implémenter, mettre à jour le contrat, ouvrir la PR. Chaque action n'est possible que si ses préconditions sont vraies dans l'état réel.

**Replanification.** Après « implémenter », les tests sont encore rouges : l'état réel n'est pas celui que l'action promettait. Le planificateur ne continue pas, il **replanifie** depuis l'état réel : refaire « implémenter », ou passer par une action « analyser l'échec » si elle est déclarée. « Ouvrir la PR » reste impossible tant que « tests verts » n'est pas vrai.

* **Prévisible et explicable** : « pourquoi cette étape ? Parce que sa précondition est vraie et que son effet rapproche du but. » L'ordre est calculé, donc reproductible et testable.
* Le LLM garde sa place : il exécute chaque action (écrire le test, écrire le code) et peut aider à déclarer les actions.
* Exemple de framework : **Embabel** (JVM) planifie ses agents en GOAP. On retrouve l'idée, sans le nom, dans les workflows de SDD où chaque étape a une entrée et une sortie vérifiables.
* Ce n'est pas l'un ou l'autre : un processus de livraison en GOAP peut contenir une action « explorer » confiée à un agent ReAct. Plan-and-Execute pour l'exploration, GOAP pour ce qu'on sait décrire en actions.

## Agent as a judge : une grille, un autre contexte

*Module 5 · slide « Agent as a judge : une grille, un autre contexte »*

C'est le pattern « évaluateur » d'Anthropic appliqué au code : un **générateur** écrit le diff, un **juge** le lit avec le ticket et une grille, rend un verdict (OK, ou retour au générateur) ; **l'humain décide du merge**. Le juge **prépare la preuve**, il ne décide pas.

Ce qui fait un bon juge :

* **Une grille explicite**, pas « est-ce que c'est bien ? » : un verdict par critère, avec la ligne concernée. C'est la grille « Relire le code généré » de la Foundation.
* **Un contexte vierge** : un sous-agent ou une session qui n'a pas vu la génération. Un juge qui a vu le raisonnement de l'auteur le suit.
* **Si possible un autre modèle**, ou au moins un autre prompt : un modèle a tendance à préférer ses propres productions.
* **Déterministe d'abord** : tests, lint, typage, analyse statique ; l'agent ensuite ; l'humain en dernier. Le juge ne remplace pas les tests : il juge ce qu'ils ne voient pas (lisibilité, écart à la spec, cas non testés).

Une grille à copier, à adapter à ton équipe :

```text
Tu relis un diff que tu n'as pas écrit. Ne modifie rien.
Entrées : le ticket (TICKET.md), la spec, le diff.
Pour chaque critère, réponds OK, À CORRIGER ou NON VÉRIFIABLE,
avec le fichier et la ligne concernés :
1. Correction : le diff fait-il ce que demande le ticket ?
2. Cas limites : entrées vides, bornes, valeurs invalides.
3. Sécurité : entrées non validées, secrets, droits.
4. Tests : chaque critère d'acceptation a-t-il un test ?
5. Dépendances : chaque import et chaque API appelée existent-ils ?
6. Lisibilité : le diff reste-t-il petit et dans le style du dépôt ?
Termine par un verdict : MERGEABLE ou RETOUR AU GÉNÉRATEUR,
et les trois points à relire en priorité par un humain.
```

| Biais connu             | Ce qui se passe                           | Parade                                         |
| ----------------------- | ----------------------------------------- | ---------------------------------------------- |
| **Préférence pour soi** | le modèle préfère ses propres productions | un autre modèle, ou un autre prompt            |
| **Verbosité**           | il préfère les réponses longues           | demander un verdict court, critère par critère |
| **Position**            | il préfère la première option présentée   | inverser l'ordre des options et comparer       |

**Calibrer** le juge : le faire noter une dizaine de cas déjà jugés par un humain, et vérifier qu'il est d'accord. C'est le principe des evals.

> Le juge **prépare la preuve** ; l'humain **décide**.

## Best-of-N : N tentatives, un juge

*Module 5 · slide « Best-of-N : N tentatives, un juge »*

La **même tâche** est lancée **N fois**, en parallèle. Chaque tentative est **isolée** (un worktree par tentative, voir le module 6) ; les **tests** filtrent, puis un **juge** départage les survivantes.

* **Quand** : une tâche incertaine, plusieurs approches plausibles : un bug coriace, un algorithme.
* **Exemple** : un bug intermittent sur le tri des réservations. Trois agents, trois worktrees, trois correctifs. Deux font passer le test de non-régression ; le juge compare les deux diffs (le plus petit, celui qui ne touche pas au store) ; l'humain relit le gagnant.
* **Coût** : **× N** tokens, et autant de diffs à départager.
* **Pas pour** : une tâche simple (on paie N fois pour rien) ni une tâche sans test discriminant (on paie N fois et on relit N diffs).

> Best-of-N achète de la **fiabilité** avec des **tokens**. Sans juge, c'est **vous** qui départagez.

## La fiabilité composée : 10 étapes à 95 % ≈ 60 %

*Module 5 · slide « La fiabilité composée : 10 étapes à 95 % ≈ 60 % »*

Fiabilité d'une chaîne d'agents fiables à 95 % chacun :

| Étapes        | 1    | 2    | 3    | 5    | 10       |
| ------------- | ---- | ---- | ---- | ---- | -------- |
| **Fiabilité** | 95 % | 90 % | 86 % | 77 % | **60 %** |

> Les fiabilités se **multiplient** : 0,95 × 0,95 × … dix fois ≈ **0,60**. La parade : une chaîne **courte**, et un **juge** entre les étapes (les tests, puis un agent).

* L'hypothèse est simplificatrice (étapes indépendantes, une erreur = un échec), mais l'ordre de grandeur suffit à calmer l'envie d'empiler les agents.
* Une vérification entre deux étapes (tests, juge, relecture) remet la fiabilité de l'étape près de 100 % : c'est pour ça que les tests comptent tant.
* L'échelle de construction : appel direct → tools → workflow déterministe dès qu'il faut des étapes et des validations explicites → agent supplémentaire seulement si l'avantage est démontré.

## Le coût caché : l'érosion de la connaissance

*Module 5 · slide « Le coût caché : l'érosion de la connaissance »*

| Effet                          | Ce qui se passe                                           |
| ------------------------------ | --------------------------------------------------------- |
| **Écrire moins**               | le code vous appartient moins quand vous ne l'écrivez pas |
| **Relire n'est pas apprendre** | on valide une forme, pas un raisonnement                  |
| **Lent et invisible**          | on le découvre en incident, deux ans plus tard            |

> Ce n'est pas un argument contre l'autonomie, c'est sa **condition** : ce qu'on automatise, il faut savoir le **reprendre**.

* L'IA amplifie ce que vous êtes déjà : bonne base de code → meilleure ; mauvaise → bien pire.
* La documentation est ce qui reste quand la mémoire de l'équipe s'efface (module 4). Supprimer la revue humaine, c'est perdre le principal moment où la connaissance circule.
* Deux questions à se poser : sur le code que votre agent a produit la semaine dernière, lequel sauriez-vous expliquer à un collègue ? Qui saurait reprendre ce module sans l'agent ?

## Quel pattern ?

*Module 5 · slide « Quiz : quel pattern ? » (tip du module)*

| Situation                                                                                 | Pattern          |
| ----------------------------------------------------------------------------------------- | ---------------- |
| « Propose un plan, je le relis, puis exécute-le étape par étape »                         | Plan-and-Execute |
| Test, code, contrat, PR : un planificateur choisit l'ordre et replanifie si un test casse | GOAP             |
| Un agent qui n'a pas vu la session relit le diff avec la grille                           | agent as a judge |
| Trois agents tentent le même bug ; on garde celui dont les tests passent                  | best-of-N        |

> **Tip du module** : ajoute un agent seulement si tu sais **qui jugera son travail**. Un agent de plus, c'est une sortie de plus à juger ; ce qui rend l'autonomie tenable, ce sont les **tests**, les **commits fréquents**, la **relecture du diff** et un juge entre les étapes.

## Pour aller plus loin

*Hors deck : deux patterns pour prolonger le module, à lire seul.*

### La boucle longue autonome, avec l'état dans un fichier

L'agent relance sa propre tâche en relisant, à chaque tour, un **fichier d'état** (ce qui est fait, ce qui reste, les décisions prises) au lieu de compter sur la context window. C'est la demande initiale écrite dans un fichier de la Foundation, poussée jusqu'au bout : chaque tour repart d'un contexte court et propre, et l'état survit à une session perdue.

* Pour les tâches longues et répétitives : migrer cinquante fichiers, résorber une liste de warnings.
* Garde-fous : un nombre de tours maximal, un plafond de dépense, un test qui arrête la boucle, et un humain qui relit le fichier d'état.
* Le risque est celui de la fiabilité composée : chaque tour ajoute une chance d'erreur ; on juge entre les tours.

### Le débat multi-agents

Plusieurs agents, souvent sur des modèles différents, défendent chacun une solution ; un juge ou un vote tranche. Proche du best-of-N, avec des échanges entre les agents.

* Utile pour une décision d'architecture ou un arbitrage entre approches, rarement pour écrire du code.
* Coût élevé (plusieurs agents, plusieurs tours) pour un gain qui dépend de la qualité du juge : sans grille, le débat produit surtout du texte.

## À retenir

1. Un pattern répond à deux questions : **qui décide** de l'étape suivante, **qui juge** le résultat.
2. Cinq workflows où le code décide ; ensuite le modèle décide, et il faut un **juge** plus solide.
3. **Plan-and-Execute** : le LLM écrit le plan ; **GOAP** : un planificateur, sur des actions avec préconditions et effets, replanifie.
4. Un **agent as a judge** a une grille, un contexte vierge et se calibre ; **best-of-N** achète de la fiabilité avec des tokens.
5. Les fiabilités se **multiplient** : chaîne courte, juge entre les étapes ; ce qu'on automatise, il faut savoir le **reprendre**.

**Mots-clés** : workflow, ReAct, Plan-and-Execute, GOAP, précondition / effet, replanification, reflection, agent as a judge, grille d'évaluation, best-of-N, fiabilité composée, human-in-the-loop — voir le glossaire.
