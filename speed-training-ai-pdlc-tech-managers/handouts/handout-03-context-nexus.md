---
url: >-
  /ai-speed-training.web/speed-training-ai-pdlc-tech-managers/handouts/handout-03-context-nexus.md
---
# Handout — Le Context Nexus

**Le nouveau PDLC IA — ce qui change pour votre équipe · Zenika · fiche module 3**

Ce que l'équipe écrit et entretient pour que les agents travaillent bien : les quatre registres, le découpage des ADR, les niveaux, les contrats et leurs versions, et quand on met tout ça à jour.

## Ce que l'agent ne devine pas

*Module 3 · slides « Avec ou sans contexte » et « Ce que l'agent ne devine pas »*

Le **Context Nexus** réunit en un seul système ce que l'équipe sait, veut, exige et fait, lisible par les humains et consommable par les agents.

* **Un agent ne devine rien** : il travaille avec ce qu'on lui donne, rien de plus. Une convention non écrite lui reste invisible ; une nuance implicite devient une erreur en production.
* **La documentation devient une entrée du travail** : l'agent la lit avant de produire. Sa qualité borne celle de ce qui en sort.
* **Il ne s'installe pas, il s'applique** : ni outil ni format, le Nexus réorganise ce que l'équipe a déjà (wiki, ADR, runbooks, DoD) sans ajouter de couche de documentation.

> L'IA est bonne en général ; elle ne connaît pas nos décisions.

## Les quatre registres

*Module 3 · slide « Quatre registres »*

| Registre      | La question    | Ce qu'on y trouve                                                                                                                                               | Signé par                                   | Comment l'agent le lit                                                                             |
| ------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Knowledge** | Ce qu'on sait  | Glossaire métier, carte d'architecture, conventions, anti-patterns, contraintes réglementaires, **Decision Contexts**                                           | Tech lead                                   | Cherché à la demande ; les conventions universelles sont toujours chargées                         |
| **Purpose**   | Ce qu'on veut  | Specs et user stories, critères d'acceptance, **Decision Directives**, objectifs, hypothèses produit                                                            | Produit                                     | Injecté pour la tâche en cours ; les directives universelles sont toujours chargées                |
| **Contracts** | Ce qu'on exige | Des assertions **vérifiables, avec un seuil**, évaluables sans jugement humain : DoD, sécurité, accessibilité, performance, contrats d'API, qualité des données | Tech lead, avec UX ou Data selon le domaine | Toujours chargés ; vérifiés par des outils (tests, contrôle d'accessibilité, validation de schéma) |
| **Process**   | Ce qu'on fait  | Runbooks, procédures de déploiement et de retour arrière, playbooks d'incident                                                                                  | L'équipe                                    | Exécuté : l'agent ne lit pas un runbook, il le déroule                                             |

Les signataires sont des rôles, pas des personnes : si quelqu'un change de poste, le registre garde un responsable.

« On vise une bonne accessibilité » ne se vérifie pas. « Toutes les interfaces respectent le niveau WCAG AA » est un contrat : il se vérifie, avec un seuil.

## La règle d'or

*Module 3 · slide « Quatre registres »*

**Purpose et Contracts restent humains**, à toutes les phases : l'agent peut proposer, observer, signaler ; il ne formule jamais l'intention et ne fixe jamais les exigences. Cette règle rend le reste négociable.

**Knowledge et Process** passent aux agents par étapes :

1. l'humain écrit ;
2. l'agent propose, l'humain valide ;
3. l'agent entretient sous supervision, et signale les dérives.

## Découper une ADR

*Module 3 · slide « Une décision d'architecture (ADR), deux artefacts »*

L'ADR classique mêle le pourquoi et la règle dans un seul document. Dans le Nexus, l'équipe découpe obligatoirement toute ADR acceptée en deux artefacts, parce qu'ils ont deux lecteurs différents :

|              | Decision Context                                                                                                                   | Decision Directive                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Registre** | Knowledge                                                                                                                          | Purpose                                                                   |
| **Contenu**  | La situation qui a rendu la décision nécessaire, les options évaluées, pourquoi on a écarté les autres, les conséquences observées | La règle d'exécution, courte, formulée en positif, directement applicable |
| **Nature**   | De la mémoire, pas une directive                                                                                                   | Une instruction, pas une explication                                      |
| **Lu par**   | L'humain qui veut comprendre (six mois plus tard, une nouvelle recrue), l'agent à la demande                                       | L'agent, à chaque tâche du périmètre                                      |

La directive renvoie à son contexte et au contrat qui la vérifie : les critères que contrôle la gate vivent dans Contracts.

Exemple, chez Vélora : l'équipe Notifications décide que « les messages clients passent par VelNotif, pas par un prestataire d'envoi externe ».

```text
Decision Context (Knowledge)
  Situation : trois services envoyaient déjà des messages, chacun avec son prestataire.
  Options : garder un prestataire par service ; un service interne commun.
  Écarté : un prestataire par service (pas de plage « ne pas déranger » commune,
  doublons entre services, consentements gérés trois fois).
  Conséquences observées : à compléter après 30 jours en production.

Decision Directive (Purpose)
  Tout message client passe par l'API VelNotif.
  Contexte : knowledge/decision-contexts/velnotif.md
  Vérifié par : contracts/velnotif-api.md (aucun appel direct à un prestataire d'envoi)
```

**Le niveau** dépend de la portée de la décision : une décision d'équipe reste au niveau de l'équipe ; une décision qui vaut pour tout le groupe devient une directive universelle, au niveau de l'organisation.

Une décision ultérieure remplace explicitement l'ancienne (`supersedes`) et garde le lien vers elle.

## La grille registres × niveaux

*Module 3 · slide « Trois niveaux pour chaque registre »*

Les registres disent ce qu'est une information ; les niveaux disent jusqu'où elle s'applique. Le Nexus est une grille :

|                            | Knowledge                                 | Purpose                       | Contracts                                         | Process              |
| -------------------------- | ----------------------------------------- | ----------------------------- | ------------------------------------------------- | -------------------- |
| **Organisation**           | conventions universelles, anti-patterns   | directives universelles       | sécurité, accessibilité, performance de référence | runbooks partagés    |
| **Programme** (facultatif) | glossaire commun, architecture du domaine | —                             | contraintes d'intégration entre équipes           | déploiement commun   |
| **Équipe**                 | connaissance métier, Decision Contexts    | specs, directives de l'équipe | contrats de l'équipe, DoD                         | runbooks de l'équipe |

* **Chaque niveau hérite** du niveau au-dessus et peut l'étendre, jamais le remplacer : ce qui est vrai en haut reste vrai en bas.
* Le niveau programme est facultatif et sert dès que deux équipes ou plus partagent un contexte. Il peut y en avoir plusieurs.
* Les specs ne vivent qu'au niveau de l'équipe.
* Chaque case a son responsable : au niveau organisation, l'architecture, la sécurité et la qualité, la plateforme ; au niveau programme, l'architecte ou le responsable technique du domaine ; au niveau équipe, le tech lead, le produit et l'équipe.

## Étendre, déroger, contredire

*Module 3 · slide « Trois niveaux pour chaque registre »*

| Cas                       | Ce que c'est                                                           | Ce qui se passe                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Étendre**               | L'équipe ajoute ce que le niveau au-dessus ne couvre pas               | Toujours autorisé                                                                                                         |
| **Déroger**               | L'équipe déclare une exception à une règle précise du niveau au-dessus | Prise en compte seulement si le responsable du niveau au-dessus l'a approuvée ; sinon, exclue du contexte donné à l'agent |
| **Contredire en silence** | L'équipe écrit l'inverse d'une règle du dessus, sans le déclarer       | Bloqué et signalé au responsable                                                                                          |

Une exception porte deux mentions : à quoi elle déroge, et qui l'a approuvée.

```yaml
register: contracts
level: équipe
exception-to: org/contracts/performance.md
exception-approved-by: responsable qualité de l'organisation
```

La dérogation silencieuse devient impossible : c'est soit une extension, soit une exception approuvée, soit un conflit bloqué.

## Contrats, versions et épinglage

*Module 3 · slide « Des contrats d'API publiés tôt évitent des réunions »*

Un contrat entre équipes remplace une partie des réunions d'alignement : ce qu'une équipe promet aux autres est écrit, versionné et vérifiable.

* **Publier tôt une v1 courte** : les équipes qui en dépendent peuvent commencer. Un contrat parfait gardé pour soi ne sert à personne.
* **L'équipe numérote chaque version** ; les équipes consommatrices épinglent la version sur laquelle elles travaillent.
* **Un changement majeur** passe les consommateurs en **« stale »** : ce n'est pas une panne, c'est le signal qu'il faut se parler.
* **La spec avant le code** : relire le changement, mettre à jour la spec, puis les tâches, le code et les tests, épingler la nouvelle version, republier.

Les statuts d'un artefact : brouillon → actif → stale (plus validé depuis trop longtemps, ou dépendance changée) → de nouveau actif, ou déprécié, ou remplacé (le lien est gardé). Un artefact stale reste en place, signalé. Une gate qui s'appuie sur un contexte stale n'affirme rien : d'où le critère « rien de stale » de G3.

## Contribuer sur événement

*Module 3 · slide « Le Nexus se met à jour à des moments précis »*

Toute base de connaissance meurt de la même façon : quand contribuer devient facultatif. Dans le Nexus, des événements que l'équipe vit déjà déclenchent chaque contribution.

| Quand…                   | …on met à jour                                                               |
| ------------------------ | ---------------------------------------------------------------------------- |
| une ADR est acceptée     | on la découpe : Decision Context en Knowledge, Decision Directive en Purpose |
| un ticket est créé       | on vérifie que la spec est structurée et reliée à ses contrats               |
| une MR est mergée        | les directives qu'elle touche                                                |
| une gate échoue          | le responsable tranche : seuil mal calibré, ou régression                    |
| un incident est résolu   | le runbook, et le motif de fragilité dans Knowledge                          |
| une revue de sprint      | on range les specs terminées                                                 |
| une revue d'architecture | on revalide les Decision Contexts existants                                  |

Les agents peuvent signaler un écart (« ce runbook ne correspond plus à ce que j'ai observé ») ; le responsable humain valide.

Plutôt que deviner, on écrit « à confirmer ». Chaque information dit d'où elle vient.

## Comment l'agent reçoit le contexte

*Module 3 · pour aller plus loin*

Avant chaque tâche, l'outillage assemble un **task brief** en parcourant la grille de l'organisation jusqu'à l'équipe :

* **toujours chargé** (system prompt) : les règles et contrats qui s'appliquent partout ;
* **injecté pour la tâche** : la spec en cours et les directives qui la concernent ;
* **cherché à la demande** : la connaissance (glossaire, Decision Contexts, architecture) ;
* **exécuté** : les runbooks et les outils de vérification, sous forme de skills.

La façon dont l'agent lit un registre dicte la façon de l'écrire : une directive courte et sans nuance, un Decision Context complet et daté.

## Démarrer

*Module 3 · slide « Trois niveaux pour chaque registre »*

* **Deux niveaux** suffisent pour commencer : organisation et équipe.
* **Les Contracts d'abord** : les plus rapides à rendre vérifiables, et le point où les équipes se cassent entre elles.
* Des **fichiers Markdown versionnés dans le dépôt** suffisent : 5 à 10 règles absolues de l'organisation, les contrats de l'équipe, un en-tête par fichier (registre, niveau, responsable, statut, version).
* Pendant les premières semaines, les humains écrivent tout ; les agents proposent ensuite.

## Encore à caler

*Module 3 · pendant le pilote*

* **Qui tient le cycle de vie du Nexus de bout en bout** : la répartition par registre et par niveau est une proposition, pas encore une décision.
* **Le Context Engineer** (module 4) et les signataires par registre : comment les deux se combinent dans l'équipe.
