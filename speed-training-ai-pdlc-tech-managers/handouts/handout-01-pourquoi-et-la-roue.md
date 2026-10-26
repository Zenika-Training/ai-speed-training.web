---
url: >-
  /ai-speed-training.web/speed-training-ai-pdlc-tech-managers/handouts/handout-01-pourquoi-et-la-roue.md
---
# Handout — Pourquoi changer, et la roue du PDLC

**Le nouveau PDLC IA — ce qui change pour votre équipe · Zenika · fiche modules 0 et 1**

Pourquoi le cycle de delivery change maintenant, ce qui est déjà acté, et le modèle du nouveau cycle : six phases, une spec à chaque passage, et des niveaux de délégation qui disent qui tient le verdict.

## Ce qui marche déjà, et ce qui coince à l'échelle

*Module 0 · slide « Ce qui marche déjà, et ce qui coince à l'échelle »*

Beaucoup d'équipes ont déjà de bonnes pratiques avec l'IA. Ce qui coince, c'est le passage à l'échelle :

| Ce qui coince                                                                                      | Ce qui y répond                          |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Chacun dans son couloir** : chaque équipe avance avec son propre cycle                           | La roue du PDLC (module 1)               |
| **Des DoR / DoD qui varient** : « prêt » et « fini » ne veulent pas dire la même chose partout     | Les quality gates (module 2)             |
| **Une qualité qui tient localement** : elle repose sur des personnes                               | Les quality gates (module 2)             |
| **Un contexte dans les têtes** : précieux, mais invisible pour un nouvel arrivant et pour un agent | Le Context Nexus (module 3)              |
| **Des réussites IA locales** : de belles trouvailles qui ne se partagent pas                       | Les rôles et la toolkit (modules 4 et 5) |
| **Une valeur difficile à montrer** : on sent le gain, on a du mal à le prouver                     | La mesure (module 6)                     |

> Les bonnes pratiques existent déjà : le nouveau cycle sert à les partager.

## Pourquoi maintenant

*Module 0 · slide « Pourquoi maintenant »*

Trois marches :

1. **Productivité individuelle** : chacun gagne du temps avec son assistant. Beaucoup d'équipes y sont déjà.
2. **Cas d'usage connectés** : l'IA suit le travail d'une phase à l'autre, avec un contexte partagé. C'est le pilote.
3. **Processus et organisation** : le cycle, les rôles et la mesure s'alignent sur ce nouveau mode. C'est le passage à l'échelle.

L'expérimentation a fait ses preuves ; reste à la mener ensemble, à l'échelle.

## Ce qui est acté, ce qui se cale avec vous

*Module 0 · slide « Ce qui est acté, ce qui se cale avec vous »*

| Acté                                                       | À caler pendant le pilote, avec les retours des équipes |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| La roue en six phases                                      | Le curseur de délégation à l'IA, étape par étape        |
| Des gates G1 à G4, passées sur preuve                      | La gate de bout en bout                                 |
| Quatre casquettes dans chaque équipe                       | Les seuils des gates, calibrés chaque mois              |
| Pendant le pilote, un humain valide chaque tâche           | Le détail des indicateurs                               |
| Claude Code, Spec Kit et LiteLLM comme outils de référence | Le calendrier de chaque vague                           |

## Le fil rouge : Vélora

*Module 0 · slide « Le fil rouge : Vélora »*

Vélora, groupe hôtelier fictif, veut vendre le late check-out en ligne. Quatre équipes interdépendantes, reliées par des contrats :

* **Offre** : qui peut partir plus tard, et quand ; publie l'éligibilité.
* **Prix** : le prix, entre un plancher et un plafond.
* **Paiement** : en ligne ou à l'hôtel, en périmètre sensible ; dépend de l'offre et du prix.
* **Expérience** : la tuile dans l'application, jusqu'à l'achat ; dépend de l'offre et du prix.

Les exemples du module 3 prennent une autre équipe du même groupe : l'équipe Notifications et son service d'envoi VelNotif.

## Une roue en six phases

*Module 1 · slide « Une roue en six phases »*

| Phase        | La question                         |
| ------------ | ----------------------------------- |
| **Discover** | Est-ce que ça vaut la peine ?       |
| **Design**   | Quelle solution, quels critères ?   |
| **Develop**  | Le code et ses tests                |
| **Deploy**   | En production, observable           |
| **Deepen**   | La valeur est-elle au rendez-vous ? |
| **Drop**     | Retirer ce qui ne sert plus         |

**La boucle se referme** :

* Deepen rend un seul verdict, à partir d'une seule analyse (lecture métier et lecture technique ensemble) : continuer, repartir en Discover pour faire évoluer, ou retirer. « Continuer » est aussi une décision, et elle se trace.
* Drop non plus n'est pas une fin : le retrait repart en Discover, comme une demande.
* Un signal de production ne compte comme appris que s'il revient en Discover sous forme d'expression de besoin, au même niveau d'exigence qu'une demande neuve. Une mise à jour de statut ne suffit pas.
* Pas de sortie par défaut : une analyse incomplète laisse l'incrément en observation.

## Chaque phase remet une spec à la suivante

*Module 1 · slide « Chaque phase remet une spec à la suivante »*

| Phase        | Ce qu'elle remet     | Chez Vélora                                                                      |
| ------------ | -------------------- | -------------------------------------------------------------------------------- |
| **Discover** | Business Intent Spec | le problème, les utilisateurs, un critère de succès chiffré, son responsable     |
| **Design**   | Solution Design Spec | le contrat d'API de l'offre en v1, les critères d'acceptation, des NFR chiffrées |
| **Develop**  | Code + Test Specs    | le code, et un test par critère d'acceptation                                    |
| **Deploy**   | Runtime Specs        | le runbook, le flag, le retour arrière, le coût IA relevé                        |
| **Deepen**   | Opportunity Spec     | continuer, ajuster ou arrêter, au regard du critère de départ                    |
| **Drop**     | Retirement Spec      | retirer la vente au comptoir : dépendances et impacts                            |

Entre deux phases, on ne se passe pas un ticket ou un mail : on se passe une sortie contractualisée, relue et signée. C'est le principe du Spec-Driven Development :

> Le contexte dit à l'IA ce qu'elle doit savoir ; la spec, ce qu'elle a le droit et le devoir de faire.

Le contexte partagé (le Context Nexus, module 3) circule autrement : toutes les phases le lisent, tout le temps, et la gate ne le contrôle pas.

## La grille des six phases

*Module 1 · slide « Zoom sur une phase : Develop »*

Chaque phase suit la même grille. La slide détaille Develop ; voici les six, en deux tableaux.

**Ce qui entre, ce qui sort**

| Phase        | But                                            | Entrée                                             | Sortie                                                                                                                                             | Gate de sortie             |
| ------------ | ---------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| **Discover** | Cadrer un besoin qui vaut d'être traité        | Un brief métier, ou un retour de Deepen ou de Drop | Business Intent Spec : intention, objectifs et métriques, solutions existantes repérées                                                            | G1 Ready to Spec           |
| **Design**   | Transformer l'intention en contrat de solution | Business Intent Spec                               | Solution Design Spec : spec fonctionnelle, stories, critères d'acceptation, contrat d'API, versions de design figées, exigences non fonctionnelles | G2 Ready to Build          |
| **Develop**  | Produire du code conforme à la spec            | Solution Design Spec                               | Code + Test Specs : le code, ses tests, la doc, la spec mise à jour de ce que l'implémentation a appris                                            | G3 Ready to Release        |
| **Deploy**   | Livrer de façon traçable et observable         | Code + Test Specs                                  | Runtime Specs : conditions d'exploitation, observabilité technique et métier, alertes et escalade, retour arrière                                  | G4 Released and Observable |
| **Deepen**   | Mesurer la valeur réelle et conclure           | Runtime Specs                                      | Opportunity Spec, ou une recommandation de retrait                                                                                                 | G5 Opportunity or Retire   |
| **Drop**     | Retirer proprement                             | Recommandation de retrait                          | Retirement Spec : le périmètre du retrait                                                                                                          | G6 Retirement Scoped       |

**Qui fait quoi**

| Phase        | Ce que fait l'IA                                                                                                                         | Ce que fait l'humain                          | Jamais délégué                                                           | Responsable                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| **Discover** | Recherche le contexte ; rédige un brouillon de l'expression de besoin ; vérifie les données disponibles et l'adéquation à l'architecture | Formule l'intention                           | Si ça vaut la peine, et sa priorité                                      | Produit, avec l'UX                              |
| **Design**   | Vérifie ce qui est réutilisable ; interroge la spec par discipline ; propose des options, des prototypes, des brouillons de stories      | Choisit parmi les options                     | L'architecture et les critères d'acceptation                             | PO, UX, tech lead et architecte, ensemble       |
| **Develop**  | Contrôles déterministes (lint, analyses, tests) ; génère code, tests et doc ; aide à la remédiation et au refactoring                    | Relit, signe, tient le jugement d'ingénierie  | L'approbation en périmètre sensible et en comité de changement           | Les développeurs, la QA pour le rapport de test |
| **Deploy**   | Capture les traces de déploiement et de flags ; orchestre la release et la vérifie après coup                                            | Décide de la release                          | L'activation en périmètre critique, le déploiement en périmètre sensible | La QA et les équipes plateforme                 |
| **Deepen**   | Observe la production ; détecte les régressions ; assemble les preuves d'usage, de performance et de coût                                | Conclut : continuer, faire évoluer ou retirer | L'arbitrage valeur / coût / risque                                       | Les équipes data analysent, le produit conclut  |
| **Drop**     | Cartographie dépendances, données et intégrations ; inventorie les utilisateurs touchés ; extrait ce qui se réutilise                    | Communique auprès des utilisateurs touchés    | La décision de retrait                                                   | Le produit, avec les métiers                    |

## L'unité de travail devient la spec

*Module 1 · slide « L'unité de travail devient la spec »*

| Aujourd'hui, souvent               | Dans le nouveau cycle                                     |
| ---------------------------------- | --------------------------------------------------------- |
| Un ticket décrit une tâche         | Une spec décrit l'intention, les critères et les contrats |
| Le développeur écrit le code       | Le développeur valide et tient le jugement d'ingénierie   |
| La revue arrive à la fin           | La preuve est demandée à chaque passage de phase          |
| Les prompts restent dans les têtes | Prompts, contexte et règles sont versionnés avec le code  |

Le travail se déplace vers le contexte, les specs et les décisions ; la vitesse de frappe passe au second plan. Règle d'or : l'agent rédige, un humain relit et signe. Une spec que personne n'a relue n'est pas une spec.

Le long du flux, quelques convictions :

* **Idea** : une seule porte d'entrée, l'expression de besoin. Pas d'expression de besoin, pas de spec.
* **Shape et spec** : l'intention vit dans la spec, pas dans le code. La spec a un responsable nommé, elle épingle les versions de ce qu'elle utilise, et elle est mise à jour quand le code diverge ; ce que l'implémentation invente est signalé.
* **Code** : le déterminisme d'abord (hooks, linters), les agents ensuite. Les règles des agents reflètent celles de la CI.
* **Build et review** : l'approbation suit la criticité. Pas d'approbation par un agent en périmètre sensible ; chaque agent agit sous sa propre identité.
* **Deploy** : Release ≠ Activation. Chaque déploiement et chaque bascule de flag sont tracés.
* **Observe** : le contexte est épinglé par tâche, et on mesure la dérive.
* **La boucle** : chaque incident revient comme un changement court qui enrichit le contexte.

## Qui tient le verdict ?

*Module 1 · slide « Qui tient le verdict ? »*

Un niveau de délégation dit qui tient le verdict, quelle que soit la quantité d'IA utilisée.

| Niveau            | Qui produit  | Qui tient le verdict    | Ce que l'humain voit                |
| ----------------- | ------------ | ----------------------- | ----------------------------------- |
| **Human**         | Une personne | Une personne            | Tout                                |
| **AI-assisted**   | L'IA propose | Une personne            | Chaque sortie, avant qu'elle compte |
| **AI-executed**   | L'IA         | Un contrôle automatique | Un échantillon, et chaque échec     |
| **AI-autonomous** | L'IA         | Un contrôle automatique | Les exceptions seulement            |

* **Un niveau se donne à une activité**, pas à une équipe ni à un outil. Un développeur qui génère presque tout son code mais décide du merge : AI-assisted. Une CI qui bloque un merge d'elle-même : AI-executed.
* **AI-autonomous** est réservé aux actions déterministes et réversibles (tests, analyse, capture de traces) : il ne produit jamais d'intention et ne décide jamais.
* **L'attribution suit le verdict** : au-delà d'AI-assisted, ce que l'IA produit est attribué à l'exécution elle-même. La trace, l'identité de l'agent et le coût doivent donc être en place avant.

## La rampe : l'autonomie se gagne

*Module 1 · slide « La rampe : l'autonomie se gagne »*

* **Monter d'un cran** demande une preuve dont le seuil est fixé avant la période de mesure, jamais choisi après coup. Pas de gate, pas de montée au-delà d'AI-assisted.
* **Redescendre est automatique** : si la qualité baisse (les défauts qui passent la gate augmentent), l'activité revient au niveau inférieur, sans décision.
* **Le calendrier ne fait rien avancer.** Pendant le pilote, AI-assisted partout et un humain sur chaque tâche : c'est un plafond, et personne n'est tenu de l'atteindre.
* **Qui fait avancer une étape** : proposé sur preuve mesurée, enregistré, puis ratifié par une instance de gouvernance encore en cours de définition.

**Trois plafonds, quelle que soit la preuve :**

1. **Le jamais délégué** reste humain, une activité par phase : si ça vaut la peine et sa priorité (Discover), l'architecture et les critères d'acceptation (Design), l'approbation en périmètre sensible (Develop), l'activation en périmètre critique (Deploy), l'arbitrage valeur / coût / risque (Deepen), la décision de retrait (Drop). Certaines activités le restent pour des raisons réglementaires, d'autres parce qu'elles demandent un jugement : une gate ne peut pas répondre de ses actes.
2. **Le périmètre sensible** ne dépasse pas AI-assisted.
3. **Pas d'autonomie sans trace** : chaque action tracée, attribuée, son coût connu.

**Point de vigilance** : quand on approuve presque tout, la relecture peut devenir un tampon. L'étape glisse alors vers de l'AI-executed que personne n'a décidé ni mesuré.

> Demandez « qui tient le verdict ? », pas « combien d'IA ? ».

## Les principes du programme

*Modules 0 et 1 · pour aller plus loin*

Les règles qui guident la transformation, et qu'on retrouve dans chaque module :

1. **Le résultat avant la production** : on prouve l'adoption par un événement réel, pas par un taux de complétion.
2. **Ce qui n'est pas écrit n'existe pas** : ce qui n'est pas dans le cadre d'usage n'est pas une règle.
3. **Le contrôle ne prend jamais de retard sur l'adoption** : pas de nouvelle vague tant que l'écart se creuse.
4. **Chaque exception a un nom** : une exception anonyme devient le nouveau standard.
5. **Pas de capacité sans compteur** : aucun agent en service sans compteur, quota et responsable.
6. **Qui maîtrise écrit** : ceux qui savent écrivent les standards, et les prouvent par écrit.
7. **Réparer le processus d'abord** : on nomme l'écart avant d'accepter le cas d'usage.
8. **Rien ne compte tant que ce n'est pas mesuré** : une gate demande une preuve ; une déclaration ne suffit pas.
9. **L'accès avant les compétences** : on outille d'abord, on forme ensuite.
10. **L'adoption est une distribution** : une équipe en difficulté n'est jamais compensée par la moyenne.
11. **La télémétrie d'abord** : les systèmes avant les sondages.
12. **Les métriques sont visibles** : pas de donnée collectée sans restitution.
13. **Le contexte ne se présume jamais** : les conventions tacites échouent en silence ; les nôtres échouent bruyamment.

## Encore à caler

*Module 1 · pendant le pilote*

* **Le curseur de délégation** : aucune règle ne le place encore, activité par activité.
* **La place du niveau AI-autonomous** : faut-il quatre niveaux, ou trois ?
* **L'identité des agents en revue** : sous quelle identité un agent relit et approuve.
* **L'érosion de la vigilance** : comment détecter qu'une relecture est devenue un tampon.
