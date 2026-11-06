---
url: >-
  /ai-speed-training.web/speed-training-ai-pdlc-tech-managers/handouts/handout-10-glossaire.md
---
# Handout — Glossaire

**Le nouveau PDLC IA — ce qui change pour votre équipe · Zenika · glossaire**

Une phrase par terme, dans l'ordre où la formation les introduit. Les termes anglais sont gardés : ce sont ceux que vos équipes liront dans les outils et les documents du programme.

## Le cycle et la délégation

*Modules 0 et 1*

| Terme                                     | En une phrase                                                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **PDLC** (Product Development Life Cycle) | Le cycle de vie d'un produit, de l'idée à son retrait, en six phases : Discover, Design, Develop, Deploy, Deepen, Drop.     |
| **Phase**                                 | Une des six étapes de la roue ; chacune remet une spec à la suivante.                                                       |
| **Spec**                                  | Le document qui décrit l'intention, les critères d'acceptation et les contrats : l'unité de travail du nouveau cycle.       |
| **Spec-Driven Development** (SDD)         | Travailler à partir de specs relues et signées : l'agent produit le code à partir de la spec, pas d'une demande orale.      |
| **Critère d'acceptation**                 | Une condition vérifiable qu'une livraison doit remplir ; chacun a son test.                                                 |
| **Agent**                                 | Un outil d'IA qui enchaîne lui-même des actions (lire, écrire, lancer des tests) pour atteindre un objectif.                |
| **Human**                                 | Niveau de délégation : une personne fait le travail et décide.                                                              |
| **AI-assisted**                           | Niveau de délégation : l'IA produit, une personne voit chaque sortie et décide. Le niveau de tout le pilote.                |
| **AI-executed**                           | Niveau de délégation : l'IA produit, un contrôle automatique décide ; un humain voit un échantillon et chaque échec.        |
| **AI-autonomous**                         | Niveau de délégation : l'IA agit, un contrôle décide, l'humain ne voit que les exceptions ; encore en débat.                |
| **Rampe de délégation**                   | La règle qui fait gagner un niveau à une activité sur résultats mesurés, et la fait redescendre si la qualité baisse.       |
| **Périmètre sensible**                    | Le code et les changements à risque (paiement, données réglementées) : ils restent en AI-assisted, approuvés par un humain. |
| **Pilote**                                | Les premiers mois du programme, avec quelques équipes entières, avant le passage à l'échelle.                               |

## Les quality gates

*Module 2*

| Terme                                  | En une phrase                                                                                                     |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Quality gate**                       | Un point de contrôle où l'on vérifie des preuves avant de passer à la suite ; verdict GO ou NO-GO.                |
| **Gate de phase**                      | Une gate au passage d'une phase à l'autre (G1 à G6), tenue par un humain nommé.                                   |
| **Gate de tâche**                      | Une gate entre deux étapes d'une tâche confiée à un agent, plusieurs fois par jour, surtout automatique.          |
| **Gate-check**                         | Le contrôle automatique d'une gate : des critères chiffrés, que l'équipe peut lancer elle-même avant son passage. |
| **Gate keeper**                        | La personne nommée qui décide GO ou NO-GO sur ce que la machine ne voit pas.                                      |
| **DoR** (Definition of Ready)          | Ce qui doit être prêt avant de commencer à construire ; la gate G2 la vérifie.                                    |
| **DoD** (Definition of Done)           | Ce qui doit être vrai pour qu'un travail soit fini ; la gate G3 la vérifie.                                       |
| **NFR** (exigences non fonctionnelles) | Les exigences de performance, de disponibilité, d'accessibilité ou de rétention, toujours chiffrées.              |
| **Feature flag**                       | Un interrupteur qui active ou coupe une fonctionnalité déjà en production.                                        |
| **Release ≠ Activation**               | Mettre en production et activer sont deux décisions humaines distinctes, tracées et réversibles.                  |
| **Runbook**                            | La procédure écrite pour exploiter un service et réagir à un incident.                                            |
| **Calibration**                        | La revue mensuelle des gates : taux de passage, taux d'échappement, seuils à ajuster.                             |
| **Taux d'échappement**                 | La part de ce qui a passé une gate et a cassé plus tard.                                                          |

## Le Context Nexus

*Module 3*

| Terme                                  | En une phrase                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Context Nexus**                      | Le contexte partagé de l'équipe, lisible par les humains et par les agents : ce qu'elle sait, veut, exige et fait.  |
| **Registre**                           | Une des quatre familles du Nexus : Knowledge, Purpose, Contracts, Process.                                          |
| **Knowledge**                          | Ce qu'on sait : glossaire, architecture, conventions, Decision Contexts.                                            |
| **Purpose**                            | Ce qu'on veut : specs, critères d'acceptation, Decision Directives, objectifs ; écrit par des humains.              |
| **Contracts**                          | Ce qu'on exige : des règles vérifiables avec un seuil (DoD, sécurité, contrats d'API) ; écrites par des humains.    |
| **Process**                            | Ce qu'on fait : runbooks, déploiement, retour arrière.                                                              |
| **Niveau**                             | La portée d'une information : organisation, programme ou équipe ; une règle du groupe vaut pour toutes les équipes. |
| **Exception**                          | Une dérogation d'équipe à une règle du niveau au-dessus, déclarée et approuvée ; sinon l'agent ne la voit pas.      |
| **ADR** (Architecture Decision Record) | La trace écrite d'une décision d'architecture ; dans le Nexus, elle se découpe en deux artefacts.                   |
| **Decision Context**                   | La partie « pourquoi » d'une décision : situation, options, raisons ; rangée dans Knowledge.                        |
| **Decision Directive**                 | La partie « règle » d'une décision, courte et lue par l'agent à chaque tâche ; rangée dans Purpose.                 |
| **Contrat d'API**                      | La description publiée de ce qu'un service offre aux autres équipes, versionnée.                                    |
| **Version fixée** (épinglée)           | La version d'un contrat qu'une équipe déclare utiliser.                                                             |
| **Stale**                              | Le statut d'une spec ou d'un contexte qui dépend d'une version dépassée : à revoir avant de coder.                  |
| **Task brief**                         | Le contexte assemblé pour une tâche précise : ce que l'agent reçoit avant de travailler.                            |

## L'équipe et les rôles

*Module 4*

| Terme                             | En une phrase                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Casquette**                     | Un rôle porté par une personne déjà dans l'équipe, en plus ou à la place d'une partie de son travail.                 |
| **Context Engineer**              | Tient le contexte que lit l'agent : sourcé, daté, réutilisable.                                                       |
| **Specification Engineer**        | Transforme l'intention produit en spec vérifiable.                                                                    |
| **Agentic Workflow Orchestrator** | Découpe le travail, lance les agents, place les relectures, suit le budget de tokens ; tourne entre 2 ou 3 personnes. |
| **Decision Guarantor**            | Signe, en son nom, ce qui part en production ; une personne nommée et stable.                                         |
| **Evaluation Engineer**           | Vérifie dans la durée la qualité de ce que produisent les agents ; partagé entre plusieurs équipes.                   |
| **AI Champion**                   | Un membre d'une équipe qui diffuse les pratiques et fait remonter les retours.                                        |
| **ETP** (équivalent temps plein)  | L'unité des charges indicatives : 0,25 ETP, c'est un quart du temps d'une personne.                                   |

## La toolkit

*Module 5*

| Terme                         | En une phrase                                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Claude Code**               | L'agent de code de référence du programme.                                                                                 |
| **Spec Kit**                  | L'outil de Spec-Driven Development : de la constitution aux tâches, puis au code.                                          |
| **LiteLLM**                   | La passerelle unique vers les modèles : quotas, identités, traces et coûts.                                                |
| **Passerelle** (gateway)      | Le point d'entrée par lequel passe chaque appel aux modèles.                                                               |
| **Classe de données**         | La sensibilité des données d'un appel (publiques, internes, confidentielles, réglementées) ; elle fixe les modèles permis. |
| **Tokens**                    | L'unité de compte des modèles : ce qu'on envoie et reçoit, et ce qu'on paie.                                               |
| **Budget de tokens**          | Le plafond de consommation d'une exécution ; le dépasser est un NO-GO.                                                     |
| **Hook**                      | Un contrôle automatique exécuté avant une action de l'agent, qui bloque et trace ce qu'un prompt ne garantit pas.          |
| **Permission**                | La liste versionnée de ce que l'agent peut lancer, et de ce qui lui est interdit.                                          |
| **CI** (intégration continue) | Les contrôles automatiques lancés à chaque changement de code : lint, tests, scans.                                        |

## Le déploiement et la mesure

*Modules 6 et 7*

| Terme                                       | En une phrase                                                                                              |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Vague**                                   | Un groupe d'équipes qui entre dans le nouveau cycle en même temps, après le pilote.                        |
| **Mesure de référence** (baseline)          | Le point de départ de chaque équipe, mesuré avant l'outillage avec les mêmes indicateurs qu'après.         |
| **Lead time**                               | Le temps entre la création d'un besoin et sa livraison.                                                    |
| **Cycle time**                              | Le temps entre le premier passage « en cours » d'une story et son « terminé », comparé à complexité égale. |
| **Complexité livrée**                       | La somme des poids des stories terminées, rapportée à la taille de l'équipe.                               |
| **Taux de reprise**                         | La part des stories revenues « en cours » après une revue ou la QA.                                        |
| **Coût IA par point**                       | La dépense en tokens de l'équipe, divisée par les points de complexité livrés.                             |
| **Courbe en J**                             | La baisse attendue des premiers mois, avant que l'équipe dépasse sa référence.                             |
| **Indicateur de contexte**                  | Run, travail abandonné, ré-estimation : ils expliquent une variation sans compter comme un gain.           |
| **Gain net**                                | La valeur livrée en plus de la référence, une fois déduit le coût IA supplémentaire.                       |
| **Approbation par réflexe** (le « tampon ») | Une relecture devenue automatique : on approuve tout, on ne lit plus rien.                                 |
