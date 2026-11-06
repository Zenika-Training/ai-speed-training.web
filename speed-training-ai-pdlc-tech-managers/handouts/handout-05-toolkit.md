---
url: >-
  /ai-speed-training.web/speed-training-ai-pdlc-tech-managers/handouts/handout-05-toolkit.md
---
# Handout — La toolkit

**Le nouveau PDLC IA — ce qui change pour votre équipe · Zenika · fiche module 5**

Avec quoi travaille une équipe, et sous quelles règles : les outils de chaque étape, Spec Kit commande par commande, le kit qu'une équipe reçoit, et la passerelle unique vers les modèles.

## Un outil par étape

*Module 5 · slide « Un outil par étape »*

Trois choix de référence : Claude Code comme agent de code, Spec Kit pour le Spec-Driven Development, LiteLLM comme passerelle vers les modèles. Pour le reste, nous décrivons des catégories : la fonction compte plus que la marque.

| Étape               | Avec quoi                                                                    | La conviction                                                                                  |
| ------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Idea**            | Un assistant généraliste, le backlog connecté                                | Une seule porte d'entrée, l'expression de besoin. Pas d'expression de besoin, pas de spec.     |
| **Spec et shape**   | Spec Kit ; l'outil de design et le design system, lus par l'agent            | L'intention vit dans la spec, pas dans le code. Tout est contexte, y compris le design system. |
| **Code**            | Claude Code ; des hooks et des linters                                       | Le déterminisme d'abord. Les règles de l'agent sont celles de la CI.                           |
| **Build et review** | La CI, des scanners de sécurité accessibles à l'agent, des agents relecteurs | L'approbation suit la criticité ; pas d'approbation par un agent en périmètre sensible.        |
| **Deploy**          | La CI/CD, les feature flags, la gestion des changements                      | Release ≠ Activation : chaque déploiement et chaque bascule de flag sont tracés.               |
| **Observe**         | Les logs, la supervision, les traces des agents                              | On épingle le contexte de chaque tâche et on mesure la dérive.                                 |
| **Partout**         | LiteLLM, la passerelle vers les modèles                                      | Un seul chemin gouverné vers les modèles.                                                      |

## Spec Kit, commande par commande

*Module 5 · slide « Un outil par étape »*

| Commande           | Ce qu'elle produit                                                                                           | Où, sur la roue                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| *(avant Spec Kit)* | L'expression de besoin, rédigée avec l'agent, validée par un humain                                          | Discover, jusqu'à G1                                |
| `constitution`     | Les principes que toute spec respecte                                                                        | Design                                              |
| `specify`          | La spec fonctionnelle : le quoi et le pourquoi, avec ses critères d'acceptation                              | Design                                              |
| `clarify`          | Les questions ouvertes, tranchées ; celles qui touchent une autre équipe deviennent une discussion avec elle | Design ; de nouveau en Develop si un contrat change |
| `plan`             | Le plan technique, à partir de la stack et des contrats épinglés des autres équipes                          | Design                                              |
| `tasks`            | Le découpage en tâches                                                                                       | Design                                              |
| `analyze`          | Un rapport de cohérence entre spec, plan et tâches, à corriger avant de coder                                | Design, jusqu'à G2                                  |
| `implement`        | Le code et ses tests, tâche par tâche                                                                        | Develop, jusqu'à G3                                 |
| `converge`         | Ce qui manque encore par rapport à la spec, ajouté en nouvelles tâches                                       | Develop, après un changement                        |

L'équipe n'invente pas la constitution : elle reprend les règles et contrats de l'organisation (module 3), chacun avec sa source. S'il manque un principe, elle le signale au lieu de l'ajouter de son côté.

## Les couches de la plateforme

*Module 5 · pour aller plus loin*

Ce qui se trouve sous les outils de l'équipe, de l'IDE jusqu'à la mesure :

1. **Les agents de code** : le code se produit dans l'IDE, la qualité se décide dans la spec.
2. **L'outillage SDD** : la spec devient le contrat d'exécution de l'agent.
3. **La passerelle** : un seul point d'entrée vers les modèles, avec quotas, authentification et traçabilité.
4. **Le registre d'agents et les connecteurs MCP** : des agents et des skills versionnés, un accès standard aux outils.
5. **La fabrique de contexte** : conventions, ADR, runbooks et specs rendus lisibles par les agents (le Context Nexus).
6. **L'orchestration multi-agents** : plusieurs agents spécialisés sur une même tâche.
7. **Les versions de prompts et le FinOps** : prompts et règles versionnés comme du code, consommation par équipe et par cas d'usage.
8. **La CI/CD et les quality gates** : le code produit par l'IA tenu aux mêmes exigences, sans gate allégée.
9. **L'observabilité** : les métriques de delivery et d'usage de l'IA, ensemble.

L'ordre compte : le contexte et la passerelle avant l'orchestration. Un contexte métier structuré vaut plus qu'un orchestrateur de plus.

## Le kit d'une équipe

*Module 5 · slide « Dire, interdire, bloquer, prouver »*

Ce que la plateforme fournit à une équipe qui entre dans le pilote :

1. **Un fichier d'instructions pour l'agent** : son périmètre ; ce que décident les humains (l'intention et les contrats) ; s'arrêter et signaler un écart avec un contrat plutôt que choisir une interprétation ; ne pas produire de code sur un contexte périmé ; un test par critère d'acceptation ; être économe en tokens.
2. **Des permissions versionnées** : ce que l'agent peut lancer (tests, lint, contrôles de gate) et ce qui lui est interdit (activer un flag).
3. **Un hook de garde** pour les 2 ou 3 règles qu'un prompt ne garantit pas : activer un flag, écrire hors du périmètre de l'équipe, modifier un fichier généré. Chaque blocage est expliqué et journalisé.
4. **Une CI qui rejoue les contrôles des gates** : lint, typage, tests et couverture, scans de sécurité et de dépendances ; le même contrôle que l'équipe peut lancer avant son créneau de gate.
5. **Spec Kit**, avec une constitution sourcée.
6. **Des scripts réservés aux humains, tracés** : activer un flag avec son motif (une ligne de journal), signer le code en périmètre sensible.
7. **L'accès au Context Nexus** : lecture de tout le contexte, écriture dans le seul dossier de l'équipe.

## Dire, interdire, bloquer, prouver

*Module 5 · slide « Dire, interdire, bloquer, prouver »*

Une instruction ne suffit pas : un agent peut l'oublier. La même règle, « un agent n'active jamais un feature flag », tient sur quatre couches :

| Couche                     | Ce qu'elle fait                        | Pour la règle du flag                                                              |
| -------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| **L'instruction demande**  | Le fichier d'instructions de l'agent   | « Tu ne bascules jamais un flag toi-même. »                                        |
| **La permission interdit** | La liste autorisé / interdit           | La commande d'activation est refusée à l'agent.                                    |
| **Le hook bloque**         | Une règle exécutée avant chaque action | Toute tentative, même par une modification de fichier, est bloquée et journalisée. |
| **La gate prouve**         | La CI et le contrôle de gate           | G4 vérifie que chaque flag actif a sa ligne de journal, signée par un humain.      |

Les règles de l'agent et celles de la CI sont symétriques : sinon, rien ne passe. Un garde-fou ne bloque jamais le travail par accident : s'il tombe en panne, il laisse passer, et la gate vérifie quand même.

## Une seule porte vers les modèles

*Module 5 · slide « Une seule porte vers les modèles »*

* **Un seul point d'entrée** : chaque appel passe par la passerelle (LiteLLM). Sans elle, ni maîtrise des coûts, ni audit, ni gouvernance.
* **L'appel nomme une tâche et une classe de données**, pas un fournisseur : la passerelle route. Une règle qui dépend du bon choix de chaque personne qui code reste une convention ; la passerelle en fait un contrôle.
* **Une identité et un quota par agent et par équipe** : un jeton partagé entre plusieurs agents rend la consommation impossible à attribuer.
* **Un budget de tokens par exécution** : le dépasser est un NO-GO, lu avec le verdict qualité.
* **Chaque gate relève le coût.**

| Classe de données                                 | Modèles permis                                   | Hébergement                                 | Approbation                         |
| ------------------------------------------------- | ------------------------------------------------ | ------------------------------------------- | ----------------------------------- |
| **Publiques**                                     | Tout modèle admis                                | Tout fournisseur admis                      | Automatique                         |
| **Internes**                                      | Modèles admis, sans entraînement sur nos données | Région ou environnement dédiés              | Automatique                         |
| **Confidentielles**                               | Liste restreinte                                 | Juridiction et environnement dédiés         | Accord humain                       |
| **Réglementées** (paiement, données personnelles) | Liste restreinte et auditée                      | Fournisseur sous contrat, dans le périmètre | Humain authentifié, jamais un agent |

Les modèles sont admis, revus et retirés selon des critères connus, et nous gardons la possibilité d'en changer, tâche par tâche. La passerelle est aussi un point unique de défaillance : en mode dégradé, les humains attendent les tokens.

> Lisez le coût avec la qualité, jamais seul.

## L'économie des tokens

*Module 5 · slide « Une seule porte vers les modèles »*

**Les réflexes de l'équipe**

* **Une session neuve après chaque gate** : l'agent repart d'un contexte propre et du brief à jour, et la session coûte moins.
* **Lire un fichier précis** plutôt que tout le dépôt.
* **Suivre le budget** en direct : c'est le rôle de l'Orchestrator (module 4).

**Ce qui fait la facture** : le modèle appelé, la taille du contexte, le nombre d'itérations, les boucles et relances des agents, les sessions abandonnées.

**Pour un manager** : s'attendre à des frictions de budget au début ; lire le coût au niveau de l'équipe, jamais par personne, et toujours à côté de la qualité. Le coût IA par point de complexité livré figure parmi les indicateurs du module 6.

## Encore à caler

*Module 5 · pendant le pilote*

* **Le routage par sensibilité** : les règles par classe de données ne sont pas encore toutes appliquées par la passerelle.
* **Qui admet un nouveau modèle**, et qui accorde une dérogation.
* **L'identité des agents en revue** : sous quelle identité un agent relit et approuve.
* **Le contexte d'une tâche** : l'épingler tâche par tâche, ou versionner le contexte global.
