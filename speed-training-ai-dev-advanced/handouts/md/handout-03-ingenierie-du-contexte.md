# Handout — Ingénierie du contexte

**Développeur IA — Avancé · Zenika · fiche module 3**

La context window est un budget : cette fiche reprend le module 3, pour donner à l'agent le bon contexte, au bon moment, au bon coût.

## Ce qui entre dans la context window

_Module 3 · slide « Ce qui entre dans la context window »_

| Élément                                | Entre quand ?                   | Ensuite                                                              |
| -------------------------------------- | ------------------------------- | -------------------------------------------------------------------- |
| **`AGENTS.md`**, **tool definitions**  | au démarrage                    | dans chaque appel, **en cache**                                      |
| **Historique**                         | à chaque échange                | grossit, compacté près de la limite                                  |
| **Fichiers lus**, **sorties de tools** | à la demande                    | renvoyés **jusqu'à la fin** de la session                            |
| **Skills**                             | quand le modèle les juge utiles | nom et description d'abord, contenu ensuite (progressive disclosure) |

> Pour le savoir : **regarder** la jauge, **demander** à l'agent ce qu'il a lu, **élaguer** ce qui ne sert plus.

- **Regarder** : l'occupation du contexte, les tool calls, les fichiers lus ; la plupart des harness les affichent (voir « Où ça se règle dans mon outil »).
- **Demander** : « Quels fichiers as-tu lus ? Sur quelle hypothèse pars-tu ? »
- **Élaguer** : MCP inutiles, vieux objectifs, gros logs, par un rewind ou une session propre.
- Un fichier lu reste dans la context window jusqu'à la fin de la session (ou la compaction) : lire 3 000 lignes pour y trouver une fonction, c'est les repayer à chaque tour.

Ce qui s'accumule au fil d'une session, ou pas :

| Ressource               | Au fil des échanges                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Temps de calcul**     | le préfixe ne se recalcule pas (le KV cache le garde), mais chaque token généré relit tout le cache : plus le contexte est long, plus la réponse ralentit |
| **Mémoire GPU**         | s'accumule jusqu'à la limite de la context window ; au-delà, le harness compacte ou on repart propre                                                      |
| **Facturation**         | réduite : le préfixe déjà vu est lu en cache, tant que le début du contexte ne change pas                                                                 |
| **Attention du modèle** | se dégrade (lost in the middle, context rot) : compacter restaure aussi la fiabilité, pas seulement le coût                                               |

La taille des context windows (de ~128 k à ~1 M tokens selon les modèles) bouge à chaque génération ; la qualité baisse avant même la limite.

## Avec ou sans demande initiale

_Module 3 · démo « Avec ou sans demande initiale »_

La même tâche, deux sessions propres : on compte les fichiers lus et le contexte consommé avant le premier plan, et on juge la justesse du plan.

Une demande initiale cadrée donne à l'agent l'objectif, les fichiers clés, les commandes, les invariants et les pièges. Les deux demandes à coller et le relevé à remplir sont dans le handout [« Les démos »](#handout-08-demos/avec-ou-sans-demande-initiale), pour rejouer la démo.

- Une demande initiale est **orientée tâche**, pas dépôt ; courte et relue. Les noms (chemin, commande, invariant) sont des ancres. Pour une tâche longue, on l'écrit dans un fichier rechargé à chaque session.
- En la relisant, on découvre souvent les zones floues du projet, avant de lancer l'agent.

> Le gain annoncé n'est pas le gain mesuré : **on compte**. Sur un petit dépôt, la recherche agentique suffit souvent.

## Réduire les tokens : un levier par buffer

_Module 3 · slide « Réduire les tokens : un levier par buffer »_

| Buffer               | Levier                | Comment                          |
| -------------------- | --------------------- | -------------------------------- |
| **Sorties de tools** | filtrer               | erreurs seules, dernières lignes |
| **Données lourdes**  | traiter hors contexte | un script, un index              |
| **Entre sessions**   | mémoire ciblée        | ne plus tout réexpliquer         |
| **Réponse**          | demander du concis    | pas de préambule                 |
| **Code généré**      | en écrire moins       | moins à relire ensuite           |

> Comprimer la prose du modèle rapporte peu : l'**entrée** domine. Faire **écrire moins de code** rapporte deux fois : maintenant et à la relecture.

- Les outils changent, les buffers restent : chaque levier existe sous forme de plugin, de hook ou de skill dans l'écosystème.
- **Lire les chiffres avec esprit critique** : les gains annoncés sont mesurés en conditions de pointe, pas en moyenne de session, et ne s'additionnent que si votre usage déclenche vraiment chaque levier. Entre un outil très populaire au gain fragile et un outil discret au gain vérifié, choisissez le second.
- Rendre la consommation visible la réduit déjà : voir la context window se remplir pousse à compacter, repartir propre, mieux cadrer.

Deux lignes à coller dans `AGENTS.md`, qui captent l'essentiel du gain d'un plugin de concision :

```text
Réponds de façon dense et factuelle. Pas de préambule, ne reformule
pas ma question, pas de hedging. Une phrase = une information.
```

## Le piège des sous-agents

_Module 3 · slide « Le piège des sous-agents »_

Un cas vécu : une demande de recherche un peu large → **6 sous-agents** lancés en parallèle → chacun charge toutes les pages qu'il lit → **1 M de tokens en 30 min**, quota épuisé.

- La jauge de la session principale allait **très bien** : chaque sous-agent brûlait dans sa propre context window.
- La vue de la context window ne montre pas ce que consomment les sous-agents : regardez la **consommation totale** de la session (la plupart des harness la ventilent par sous-agent).
- En facturation à l'usage, sans quota, la même situation donne une facture sans plafond.
- On borne **périmètre** et **nombre d'agents** avant de lancer, avec un périmètre écrit.

> Un sous-agent protège ta context window, **pas ton budget** : déléguer est une décision de coût.

## RAG : le retour des embeddings

_Module 3 · slide « RAG : le retour des embeddings »_

Exemple : « Quelle est notre convention de pagination pour les API ? »

| Étape                        | Ce qui se passe                                                                        | Exemple                               |
| ---------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------- |
| **Indexer** (indexing)       | la doc est découpée en morceaux ; un modèle d'embedding calcule un vecteur par morceau | wiki technique et ADR indexés         |
| **Chercher** (retrieval)     | la question est vectorisée ; on prend les morceaux les plus proches                    | les 3 passages sur la pagination      |
| **Augmenter** (augmentation) | ces morceaux entrent dans le contexte, avec la question                                | 3 passages, pas les 400 pages du wiki |
| **Générer** (generation)     | le modèle répond à partir des passages et cite ses sources                             | « Curseur opaque, 100 max [ADR-012] » |

- L'index par embeddings sert surtout pour la **documentation en langage naturel**. Pour le code, la **recherche agentique** (l'agent cherche lui-même avec grep et la lecture de fichiers) suffit souvent.
- Trois architectures pour indexer du code : **découpage naïf** (blocs fixes : simple, mais coupe les fonctions ; petits dépôts, prose) ; **découpage par l'AST** (fonctions, classes, souvent avec tree-sitter ; dépôts moyens à gros) ; **graphe de code** (AST + relations, pour répondre à « qui appelle cette fonction ? »).
- Le critère : si l'agent lit 40 fichiers pour trouver où brancher l'endpoint, il manque une demande initiale cadrée ou un index. Commencez par la demande initiale, indexez ensuite.

## La mémoire de l'agent

_Module 3 · slide « La mémoire de l'agent »_

Trois familles, du plus explicite au plus automatique, et aucun standard :

| Famille                | Ce que c'est                    | Vigilance                                      |
| ---------------------- | ------------------------------- | ---------------------------------------------- |
| **Fichier versionné**  | instructions et notes du projet | relues en PR, comme du code                    |
| **Mémoire du harness** | l'agent écrit ses notes         | propriétaire, souvent plafonnée : **à relire** |
| **Middleware tiers**   | serveur MCP ou plugin           | indexé, à votre main, exportable               |

- Le bon mécanisme est la **progressive disclosure** : chercher dans un index compact, puis ne charger que le détail des entrées retenues, pour **~10× moins de tokens**. Même pattern que le RAG et les skills : filtrer avant de charger.
- Séparez ce que l'équipe a **décidé** (instructions projet, relues) de ce que l'agent a **appris** (mémoire, à relire).

> Une mémoire qu'on ne peut pas **relire** finit par contenir des faits périmés.

## Exploiter les traces

_Module 3 · slide « Exploiter les traces »_

Une session contient ce qui a été **tenté** et ce qui a **échoué**, ce qui **manquait** (doc, tool, convention), ce qui a **fini par marcher** : c'est de l'**inférence déjà payée**. On en extrait du contexte durable, relu, puis on jette la session.

| Fichier              | Contenu                                             |
| -------------------- | --------------------------------------------------- |
| `troubleshooting.md` | erreur → cause → fix                                |
| `api-fixes.md`       | noms, docs à corriger                               |
| `next-session.md`    | ce qu'on recharge à la prochaine session            |
| `user-guide.md`      | commandes qui marchent, pièges                      |
| `new-tool.md`        | le script ou le tool qui aurait évité le frottement |

- `next-session.md` est une **compaction choisie** : on décide de ce qui est gardé, au lieu de laisser le harness résumer quand la context window est pleine.
- Le frottement de l'agent est un signal : s'il galère avec une API, c'est souvent l'API, la doc ou le tool qui parle mal. Les corriger aide aussi les humains.
- « Résume cette session » vaut moins qu'une extraction ciblée. Non relue, une extraction n'est jamais une source d'autorité.

```text
Extrais de cette session, sans rien modifier d'autre :
dans troubleshooting.md, chaque erreur rencontrée sous la forme
erreur → cause → fix ; dans next-session.md, ce qu'il faut recharger
pour reprendre la tâche. Je relis avant de committer.
```

> **Tip du module** : donne à l'agent **de quoi chercher**, pas tout le dépôt. Une demande initiale cadrée, des sorties filtrées, des sous-agents bornés : le contexte est un budget.

## À retenir

1. Ce qui est lu reste jusqu'à la fin de la session : **regarder, demander, élaguer**.
2. Une **demande initiale** cadrée réduit l'exploration ; on mesure le gain, on ne le suppose pas.
3. Un levier par buffer, et l'**entrée** d'abord ; un sous-agent isole le contexte, **pas la facture**.
4. RAG, mémoire et skills suivent le même principe : **filtrer avant de charger**.

**Mots-clés** : context engineering, demande initiale, recherche agentique, RAG, embeddings / indexation du code, mémoire, progressive disclosure, compaction, context rot — voir le glossaire.
