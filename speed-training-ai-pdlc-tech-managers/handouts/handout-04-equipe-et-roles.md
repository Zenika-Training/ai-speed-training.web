---
url: >-
  /ai-speed-training.web/speed-training-ai-pdlc-tech-managers/handouts/handout-04-equipe-et-roles.md
---
# Handout — Équipe et nouveaux rôles

**Le nouveau PDLC IA — ce qui change pour votre équipe · Zenika · fiche module 4**

Qui porte quelle casquette dans l'équipe, avec quelle charge, et quels rôles arrivent autour d'elle : de quoi nommer les casquettes et repérer les surcharges avant que l'outillage n'arrive.

## Même équipe, nouvelles casquettes

*Module 4 · slide « Même équipe, nouvelles casquettes »*

* **La forme de l'équipe ne change pas** : pas de réorganisation, pas de recrutement pour le pilote.
* Les nouveaux rôles sont des casquettes, pas des postes : des personnes déjà là les portent, en plus ou à la place d'une partie de leur travail actuel.
* On entre dans le pilote en équipe entière : tous les rôles produit ensemble. Une équipe à moitié embarquée garde deux façons de travailler.
* **La responsabilité suit le rôle** : si quelqu'un change de poste, la casquette passe à quelqu'un d'autre.

| Métier          | Ce qui change                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PO, BA**      | Écrire des specs qu'une machine peut vérifier : critères d'acceptation, cas limites, invariants. Le PO est souvent le Specification Engineer naturel. |
| **Développeur** | Écrire moins, valider davantage et exercer son jugement d'ingénierie : relire, signer, décider.                                                       |
| **Tech lead**   | Moins de « oui / non » au fil de l'eau, davantage de contexte à tenir et de décisions à porter.                                                       |
| **Architecte**  | Faire converger les solutions des équipes vers une architecture commune ; co-responsable de G2.                                                       |
| **QA**          | Évaluer ce que produisent les agents : jeux de données de référence, seuils, non-régression.                                                          |
| **UX**          | Enrichir le design system que les agents réutilisent, plutôt que produire chaque maquette.                                                            |

> Personne ne perd son métier : chacun ajoute une casquette, et en confie une partie à l'agent.

## Les quatre casquettes de l'équipe

*Module 4 · slide « Quatre casquettes dans l'équipe »*

| Casquette                         | Mission                                                                                      | Ce qu'elle tient                                                                                                                                                       | Porteur typique              | Charge indicative                            |
| --------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------- |
| **Context Engineer**              | Tenir le contexte que lit l'agent, pour qu'une demande soit exécutable sans tout redécouvrir | Glossaire, ADR, modèles de données, contrats d'interface, règles métier ; un contexte sourcé, daté, réutilisable, sans contradiction (Definition of Ready du contexte) | BA senior, tech lead         | ~0,25 ETP                                    |
| **Specification Engineer**        | Transformer l'intention produit en spec qu'une machine peut vérifier                         | Specs, critères d'acceptation, invariants, cas limites ; rien ne part en génération avec une question ouverte (Definition of Ready de la génération)                   | PO, BA, architecte           | ~0,35 ETP                                    |
| **Agentic Workflow Orchestrator** | Organiser le travail des agents                                                              | Découpage des tâches, enchaînement des agents, points de relecture, budget de tokens (Definition of Done de la génération)                                             | Tech lead, staff engineer    | ~0,3 ETP, tournant sur 2 ou 3 personnes      |
| **Decision Guarantor**            | Porter, en son nom, la responsabilité de ce qui part en production                           | La décision de mise en production ; la liste des décisions de l'équipe qu'on ne délègue jamais à un agent                                                              | Tech lead, expert du domaine | ~0,15 ETP, nommé, jamais tournant ni délégué |

Les charges sont des ordres de grandeur, encore en discussion : chaque équipe les ajuste à sa taille et à son contexte.

## L'Evaluation Engineer, depuis un pool

*Module 4 · slide « Quatre casquettes dans l'équipe »*

Obligatoire dès le pilote, mais partagé entre plusieurs équipes (environ 0,25 ETP par équipe). Il prouve qu'une sortie tient la Definition of Done sur la durée, pas sur un seul essai : jeux de données de référence, banc d'évaluation, seuils, suites de non-régression. Il propose aussi, preuves à l'appui, de faire avancer une activité sur la rampe de délégation (module 1).

Porteurs typiques : QA ou SDET, développeur fonctionnel senior, chercheur UX expérimenté.

## Le premier goulot à repérer

*Module 4 · slide « Le premier goulot à repérer »*

Le tech lead est le porteur typique de trois des quatre casquettes :

| Casquette                       | Charge indicative |
| ------------------------------- | ----------------- |
| Context Engineer                | ~0,25 ETP         |
| Agentic Workflow Orchestrator   | ~0,3 ETP          |
| Decision Guarantor              | ~0,15 ETP         |
| **Total, en plus de son poste** | **≈ 0,7 ETP**     |

Trois leviers :

1. **Répartir** : le contexte à un profil qui aime structurer (BA, UX, data) ; la spec au PO.
2. **Faire tourner** l'Orchestrator sur 2 ou 3 personnes.
3. **Garder stable** le Decision Guarantor : c'est la casquette qui demande le plus de continuité.

Quelques règles :

* le Decision Guarantor est une personne nommée ; il ne tourne pas et ne se délègue pas au fil de l'eau ;
* l'Orchestrator tourne, pour ne pas reposer sur une seule personne ;
* une personne peut porter plusieurs casquettes, tant que la charge reste tenable ;
* conseil : éviter qu'une seule personne instruise et décide seule ; la personne qui prépare une décision et celle qui la signe gagnent à être deux ;
* un profil manquant (pas de BA, pas de QA) est un écart à noter et à remonter, pas une faute.

Une surcharge révèle ce que la personne porte déjà aujourd'hui.

## Autour de l'équipe : les rôles par vague

*Module 4 · slide « Autour de l'équipe »*

Plus on avance, moins il s'agit de créer un poste : le rôle prolonge souvent un rôle qui existe déjà.

### Pilote

| Rôle                  | Mission                                     | Où                    | Porteur typique        | Charge indicative    |
| --------------------- | ------------------------------------------- | --------------------- | ---------------------- | -------------------- |
| Les quatre casquettes | Voir plus haut                              | Dans l'équipe         | —                      | —                    |
| Evaluation Engineer   | Prouver la qualité des sorties sur la durée | Partagé entre équipes | QA, SDET, chercheur UX | ~0,25 ETP par équipe |

### Passage à l'échelle

| Rôle                   | Mission                                                                                                                                                        | Où                                           | Porteur typique                              | Charge indicative        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------- | ------------------------ |
| AgentOps               | Tenir une plateforme d'agents stable, versionnée, réversible : connecteurs, passerelle et quotas, secrets, versions des modèles et des prompts, retour arrière | Partagé entre équipes                        | Ingénieur plateforme, SRE                    | 1 à 2 ETP pour 5 équipes |
| Capability Librarian   | Faire passer une bonne pratique locale (un skill, un prompt) dans la bibliothèque commune, et retirer ce qui est obsolète                                      | Partagé entre équipes, avec les AI Champions | Knowledge manager, architecte de référentiel | 0,5 à 1 ETP              |
| Convergence Arbitrator | Ramener les solutions des équipes vers une architecture commune, repérer les doublons, décider d'arrêter                                                       | Gouvernance                                  | Un collège de 4 à 6 architectes              | ~2 h par semaine         |

### Industrialisation

| Rôle                           | Mission                                                                                                        | Où          | Porteur typique                               | Charge indicative |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------- | ----------------- |
| FinOps IA                      | Rendre visibles et arbitrer les coûts d'exécution : budgets, coût par équipe et par fonctionnalité             | Gouvernance | FinOps cloud, contrôle de gestion             | ~0,3 ETP          |
| Trace & Audit Steward          | Produire des traces exploitables et réutilisables, sans risque juridique : schéma, rétention, pseudonymisation | Gouvernance | Data engineer, DPO opérationnel               | ~0,5 ETP          |
| Risque modèles et fournisseurs | Anticiper les ruptures : modèles, licences, réglementation, réversibilité ; feu vert avant tout nouveau modèle | Gouvernance | Risk officer, architecte d'entreprise, achats | 0,3 à 0,5 ETP     |

## Qui tient quoi aux gates

*Module 4 · pour aller plus loin*

| Gate                           | Responsable                             | Casquettes impliquées                                                                                 |
| ------------------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **G1** Ready to Spec           | Le produit                              | Context Engineer (le contexte de départ)                                                              |
| **G2** Ready to Build          | PO, UX, tech lead, architecte, ensemble | Specification Engineer produit la spec ; Convergence Arbitrator tranche les divergences entre équipes |
| **G3** Ready to Release        | Les développeurs et la QA               | Decision Guarantor signe ; Evaluation Engineer tient les seuils ; Orchestrator tient le découpage     |
| **G4** Released and Observable | La QA et les équipes plateforme         | AgentOps ; plus tard, FinOps IA et Trace & Audit                                                      |
| **G5** Opportunity or Retire   | Les équipes data, puis le produit       | Evaluation Engineer, Capability Librarian                                                             |
| **G6** Retirement Scoped       | Le produit, avec les métiers            | —                                                                                                     |

## Les AI Champions

*Module 4 · slide « Autour de l'équipe »*

Des relais dans les équipes, pas une équipe parallèle. Ils restent dans leur équipe et :

1. accélèrent l'adoption sur le terrain ;
2. traduisent la stratégie en cas d'usage concrets ;
3. font remonter les retours ;
4. partagent les pratiques entre pairs ;
5. reprennent le flambeau après le programme.

Ils travaillent avec le Capability Librarian pour faire circuler ce qui marche. Attention à leur charge : un Champion qui porte aussi une casquette cumule trois rôles.

## Encore à caler

*Module 4 · pendant le pilote*

* **Le Context Engineer** : une casquette par équipe pendant le pilote ; transverse ensuite, comme l'architecture ou la sécurité ?
* **La convergence** : un collège d'architectes, un centre d'excellence, ou les AI Champions ?
* **Le Specification Engineer** : il produit la spec, il la valide, ou les deux ? Qui répond de sa qualité ?
* **Le Decision Guarantor** : comment il s'articule avec la gouvernance existante.
* **Casquettes et intitulés de poste** : la correspondance reste à établir.
