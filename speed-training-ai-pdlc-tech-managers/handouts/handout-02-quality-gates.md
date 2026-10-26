---
url: >-
  /ai-speed-training.web/speed-training-ai-pdlc-tech-managers/handouts/handout-02-quality-gates.md
---
# Handout — Les quality gates

**Le nouveau PDLC IA — ce qui change pour votre équipe · Zenika · fiche module 2**

Où le travail s'arrête, sur quelles preuves, et qui décide : ce qu'est une gate, les deux niveaux de gates, les six gates de la roue, ce qui change au quotidien, les garde-fous et la calibration.

## Une gate vérifie des preuves, ce n'est pas une réunion

*Module 2 · slide « Une gate vérifie des preuves, ce n'est pas une réunion »*

Une gate porte des assertions vérifiables, chacune avec un seuil, que la machine évalue sur des artefacts qui existent déjà. Elle n'ajoute ni réunion ni document.

1. **L'équipe demande**, sur ce qu'elle a déjà produit : spec, code, tests, runbook.
2. **La machine vérifie** des critères chiffrés, sans jugement : c'est le gate-check, que l'équipe peut lancer elle-même avant son créneau.
3. **Un humain décide** GO ou NO-GO, en quelques minutes, sur ce que la machine ne voit pas.
4. **C'est tracé** : quels critères, quelle version de la gate, qui a décidé (humain, ou agent avec son identité), combien ça a coûté. Une décision tracée se rejoue.

> Une gate se passe sur preuve, jamais sur déclaration.

Une gate n'est pas un rituel : un rituel sert à s'aligner, juger, arbitrer ; une gate vérifie un contrat. Seule la sortie d'une phase passe la gate : le contexte partagé reste hors de son contrôle.

## Deux niveaux de gates

*Module 2 · slide « Deux niveaux de gates »*

|                           | Gates de phase                    | Gates de tâche                                                               |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| **Où**                    | À chaque passage de phase         | Entre deux étapes d'une tâche confiée à un agent                             |
| **Ce qu'elles protègent** | L'incrément livré                 | L'exécution et son contexte                                                  |
| **Cadence**               | Une fois par incrément            | À chaque exécution, plusieurs fois par jour                                  |
| **Qui tranche**           | Un humain nommé                   | Un contrôle automatique, avec un checkpoint humain sur la plupart des étapes |
| **En cas d'échec**        | L'incrément revient dans la phase | L'étape est rejouée                                                          |

Une gate de tâche contrôle en deux couches : d'abord des règles déterministes (lint, schéma, tests, budget), puis la grille d'un agent critique (conformité, structure, données, risques). Les quatre checkpoints humains :

* **Approuver** : l'intention est-elle bien posée ?
* **Valider** : l'analyse tient-elle ?
* **Choisir** : quelle option retenir ?
* **Signer** : la livraison est-elle acceptée ?

Règles des gates de tâche :

* une gate qui échoue renvoie à l'étape, jamais d'avertissement qui laisse passer ;
* une gate qui ne sait pas trancher remonte à l'humain au lieu de deviner ;
* elle peut renvoyer une action humaine : « allez voir l'équipe d'architecture sur tel point » ;
* **budget de tokens dépassé = NO-GO**, au même titre qu'un test rouge : qualité et coût se lisent ensemble ;
* un contexte périmé (« stale ») fait échouer la gate.

Les gates de tâche rendent les gates de phase tenables : sans elles, tout s'accumule au dernier passage.

## Les six gates

*Module 2 · slide « Quatre gates à connaître »*

| Gate                           | Ce qu'on montre                                                                                                                             | Mode                                                           | Verdict tenu par                  | Verdict                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------- | ------------------------------------------- |
| **G1** Ready to Spec           | L'expression de besoin en 5 champs, un critère de succès chiffré et son responsable, les données disponibles, l'adéquation à l'architecture | Contrôle automatique, puis humain                              | Le produit                        | Prêt à spécifier                            |
| **G2** Ready to Build          | La spec relue, des critères évaluables, des NFR chiffrées, le contrat v1 publié, les versions figées                                        | Contrôle automatique, puis humain sur l'intention de solution  | PO, UX, tech lead, architecte     | Definition of Ready                         |
| **G3** Ready to Release        | Tests et scans au vert au seuil convenu, la spec à jour, rien de stale, la trace de revue, le plan d'activation des flags                   | Automatique d'abord ; humain obligatoire en périmètre sensible | Les développeurs et la QA         | Definition of Done                          |
| **G4** Released and Observable | Le journal des déploiements et des flags, les KPI et alertes instrumentés, le runbook, le retour arrière, le coût IA attribué               | Automatique ; signature humaine en périmètre sensible          | La QA et les équipes plateforme   | Livré et observable                         |
| **G5** Opportunity or Retire   | L'usage, la performance face à la promesse, les coûts (IA compris), les incidents                                                           | Humain, sur des preuves assemblées automatiquement             | Les équipes data, puis le produit | Continuer, repartir en Discover, ou retirer |
| **G6** Retirement Scoped       | La carte des impacts (pour chaque élément : migrer, archiver ou supprimer), les utilisateurs touchés, ce qu'on garde                        | Humain                                                         | Le produit, avec les métiers      | Le retrait repart en Discover               |

G2 et G3 donnent la même Definition of Ready et la même Definition of Done à toutes les équipes. Les NFR sont chiffrées, sans adjectif : « rapide » n'est pas un critère, « p95 sous 300 ms » en est un.

## La machine vérifie, l'humain juge

*Module 2 · slide « La machine vérifie, l'humain juge »*

**G2 Ready to Build**

| La machine vérifie                                                                                                                                          | L'humain juge                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Chaque story a des critères d'acceptation écrits comme des assertions qu'un agent peut évaluer                                                              | Les exigences non fonctionnelles sont chiffrées (performance, disponibilité, accessibilité, rétention) |
| Les versions des composants, maquettes et tokens référencés sont figées                                                                                     | La Definition of Ready est atteinte                                                                    |
| Le contrat d'API est publié et valide                                                                                                                       | L'intention de solution est la bonne                                                                   |
| La spec passe la grille : chaque question des disciplines (front, back, architecture, sécurité, data) est résolue dans la spec ou devient une action nommée |                                                                                                        |

NO-GO : retour en Design, avec les questions restées ouvertes et, pour chacune, la personne à aller voir.

**G3 Ready to Release**

* Les contrôles déterministes sont au vert, aux seuils convenus (couverture, mutation).
* Les failles de sécurité sont résolues, ou acceptées avec un responsable et une échéance. On passe ou on revient, jamais « on avertit et on merge ».
* L'implémentation est conforme à la spec ; tout écart, tout composant inventé est signalé.
* La revue nomme son relecteur et, si c'est un agent, l'identité sous laquelle il agit.
* La criticité est notée, et le circuit d'approbation y correspond.
* Un plan d'activation des flags existe : ce qui est livré, ce qui est activé, la condition de retour arrière.

NO-GO : retour en Develop, avec le critère en échec nommé.

**Ce que la machine ne voit pas** : la spec dit-elle la bonne chose ? Chaque critère a-t-il son test ? Le code respecte-t-il le contrat ? Qui signe, sous quelle identité ? Combien ça a coûté ? Le temps humain va là : on lit, on ne tamponne pas.

## Ce qui change au quotidien

*Module 2 · slide « Ce qui change au quotidien »*

* **Un NO-GO nomme le critère**, et si besoin la personne à aller voir. On corrige, on revérifie, on redemande : ce n'est pas une sanction.
* **Release ≠ Activation** : déployer et activer sont deux décisions humaines, tracées, avec retour arrière. G4 se déclenche au déploiement, puis à chaque bascule de flag (voir le journal ci-dessous).
* **Une exception a un nom** : un responsable, une raison, une date de fin, et une trace. Sinon, elle devient la règle.
* **Pas de nouveau rituel** : les gates nourrissent les revues qui existent déjà (la revue produit hebdomadaire pour G1 et G5, la revue d'architecture pour G2 et G3, la revue mensuelle pour G4 et G6). On y ajoute un seul point, une fois par mois : la calibration.

**Le journal des flags** : une ligne par bascule.

```text
| AAAA-MM-JJThh:mm | nom-du-flag | on | prénom.nom | motif |
```

Une bascule sans ligne de journal est un NO-GO. Le retour arrière, c'est une bascule « off », sa ligne de journal et un message à l'équipe.

> Un NO-GO qui nomme son critère vaut mieux qu'un GO par gentillesse.

## Les huit garde-fous

*Module 2 · pour aller plus loin*

1. **Le déterminisme d'abord** : linter, schéma ou assertion de pipeline avant tout agent juge. L'agent juge intervient là où une règle ne peut pas trancher, et d'abord sur des changements peu critiques. Les règles des agents reflètent celles de la CI.
2. **Une gate humaine par défaut** : chaque tâche a une gate humaine dès le pilote. La confiance se gagne par l'observation ; l'équipe versionne chaque assouplissement, aucun ne se décrète.
3. **L'approbation suit la criticité** : l'équipe déclare la criticité et la note. En périmètre sensible ou en comité de changement, aucune approbation par un agent : un humain authentifié à chaque étape.
4. **Une gate renvoie, elle ne bloque pas en silence** : chaque reste à faire devient une action nommée, avec un interlocuteur nommé.
5. **Pas de gate sans compteur** : chaque gate a un compteur, un seuil et un responsable. Une gate que personne ne mesure n'est qu'un rituel au ton plus sévère.
6. **Preuve, puis décision, puis trace** : on enregistre les critères, la version de la gate, qui a décidé et le coût en tokens.
7. **Des gates calibrées, et une calibration observée** : taux de passage, taux d'échappement, cadence de revue.
8. **Des exceptions nommées, tracées, avec une date de fin** : réservées aux incidents critiques et aux écarts d'équipe justifiés, avec un responsable, une raison et une échéance.

## La calibration

*Module 2 · slide « Ce qui change au quotidien »*

Chaque gate a une version et des mesures ; l'équipe les relit une fois par mois :

* le **taux de passage** au premier essai ;
* le **taux d'échappement** : ce qui a passé la gate et a cassé plus tard ;
* le **nombre d'allers-retours** avant le GO.

Ce qu'on en fait :

* une gate qui ne se déclenche jamais est retirée ;
* une gate qui se déclenche toujours est mal réglée : on la recalibre ;
* un taux d'échappement qui monte fait redescendre l'activité d'un niveau de délégation, automatiquement ;
* une étape qui tient durablement un très haut taux de passage (par exemple autour de 97 % sur trois mois) peut alléger sa vérification humaine, sur un seuil fixé à l'avance : les échecs restants maintiennent la surveillance.

## Encore à caler : la gate de bout en bout

*Module 2 · pendant le pilote*

Chaque gate peut passer alors que l'ensemble dérive : aucune gate ne vérifie encore la qualité telle que le client la vit, sur plusieurs équipes. Deux pistes, aucune n'est retenue :

* une gate agrégée, au niveau du train de release ;
* des rituels de convergence, tranchés par un arbitre.

Dans les deux cas, les équipes devront d'abord harmoniser leurs rituels et leurs artefacts. Nous trancherons avec les équipes pilotes.
