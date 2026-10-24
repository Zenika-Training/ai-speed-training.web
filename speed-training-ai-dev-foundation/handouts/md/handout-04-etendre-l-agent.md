# Handout — Étendre l'agent

**Développeur IA — Foundation · Zenika · fiche module 4**

Brancher l'agent sur le reste du SI, et capitaliser ce qui marche, sans alourdir chaque appel.

## Apporter le contexte de l'entreprise

_Module 4 · slide « Apporter le contexte de l'entreprise »_

Deux façons de donner à l'agent ce que **le dépôt ne contient pas** :

|               | **RAG : vos documents**                                                | **Tools / MCP : vos applications**                                         |
| ------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Apporte**   | de la connaissance : ADR, docs d'architecture, wiki, conventions d'API | des données vivantes et la capacité d'agir : tickets, base, CI, navigateur |
| **Exemple**   | « Quelle est notre convention de pagination ? »                        | « Lis le ticket BOOK-142, puis lance les tests e2e dans le navigateur. »   |
| **Vigilance** | des documents à jour, sinon des réponses périmées… mais sourcées       | des droits limités : l'agent agit avec vos accès                           |

- **RAG** : les documents sont indexés à l'avance ; un tool trouve les passages pertinents ; seuls ces passages entrent dans la context window ; le modèle s'appuie dessus et cite ses sources. Pour le code, la recherche dans le dépôt joue déjà ce rôle ; le RAG sert pour ce qui n'est pas dans le dépôt.
- **MCP** (Model Context Protocol) : la prise standard des tools, l'« USB-C » des agents. Un serveur écrit une fois marche dans tous les harness compatibles, en local ou à distance. MCP n'apporte aucune « intelligence » : c'est de la plomberie standardisée.
- Le modèle choisit un tool sur sa **description** : nom, description et paramètres de chaque tool sont envoyés à chaque appel. Une mauvaise description = un tool mal utilisé ou ignoré.

> Dans les deux cas, l'agent ne **sait** rien de plus : on lui **donne** le bon contexte, au bon moment.

## MCP : ce que vous exposez en branchant un serveur

_Module 4 · slide « MCP : ce que vous exposez en branchant un serveur »_

Brancher un serveur, c'est laisser le modèle **décider seul** quelles données partent chez un tiers. Trois questions avant chaque branchement :

| Question                                         | Ce qu'on vérifie                                                              |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| **Qui l'exécute ?** Local ou distant             | Le local reste sur la machine. Le distant reçoit ce que le modèle lui envoie. |
| **Qui l'authentifie ?** Quel jeton, quels droits | Lecture, écriture, suppression : jamais plus large que la tâche.              |
| **Qui le maintient ?** Officiel ou fork          | Un serveur non maintenu est un risque ouvert.                                 |

**Et ce qu'il coûte** : chaque serveur ajoute ses tool definitions à **chaque** appel, avant même le premier message. N'activez que ceux que vous utilisez **vraiment** pour ce projet. Une commande en ligne déjà installée, documentée dans une skill, coûte souvent moins de contexte qu'un serveur MCP complet.

## Une bonne consigne devient une skill

_Module 4 · slide « Une bonne consigne devient une skill »_

Un **savoir-faire emballé** :

- un **dossier** : un `SKILL.md`, plus des scripts, références et gabarits ;
- chargée **à la demande**, quand la tâche correspond : la **progressive disclosure** (l'agent ne voit d'abord que le nom et la description) ;
- la **description** dit quoi et quand : c'est elle qui déclenche ;
- testée en **session vierge** : une autre session la suit sans coaching.

Exemple, la skill « tests-api » :

```text
tests-api/SKILL.md

name: tests-api
description: Écrire ou compléter les tests
  d'un endpoint. À utiliser dès qu'on
  ajoute ou modifie une route.

- Un test par cas limite : liste vide,
  dernière page, curseur invalide.
- Données via tests/factories.
- Base de test réelle, pas de mock.
```

- On n'y met que ce que l'agent **ne peut pas déduire** ; quelques centaines de lignes au plus ; pas de chemins propres à un OS, de versions figées ni d'informations périmées.
- Un **script** embarqué donne le même résultat à chaque fois, là où la même logique en prose est réinterprétée ; et il n'entre pas dans la context window tant que l'agent ne l'ouvre pas.
- Si la skill ne se déclenche pas en session vierge, c'est presque toujours la **description** qu'il faut réécrire.

> Une skill ne pèse dans la context window **que quand elle sert**.

## Où ranger le contexte durable ?

_Module 4 · slide « Quiz : où ranger le contexte durable ? »_

La règle qui tranche : **à quelle fréquence** le contenu doit-il être chargé ?

| Où                      | Chargé                                  | Exemple                                                                                                                    |
| ----------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Instructions projet** | à chaque session                        | « Les tests se lancent avec npm test, jamais sur la base de prod » ; « TypeScript strict, handlers dans src/api/handlers » |
| **Demande initiale**    | pour une tâche                          | « Pour ce ticket : garder le schéma Page de /rooms »                                                                       |
| **Skill**               | à la demande, quand la tâche correspond | « Comment écrire un test d'API selon nos conventions » ; « La procédure de migration de schéma, avec son script »          |
| **Note de reprise**     | pour reprendre une session interrompue  | « Étapes 1 à 3 faites, l'étape 4 bloque sur le curseur »                                                                   |

- Piège : « jamais sur la base de prod » pourrait sembler une skill ; elle doit valoir à chaque session, donc instructions projet.
- Tous ces fichiers sont **versionnés et relus comme du code** : ils entrent dans la context window de toute l'équipe.

> Plus c'est **chargé souvent**, plus c'est **court** : à chaque session, pour une tâche, à la demande.

## À retenir

1. Tools et MCP branchent l'agent sur le SI, mais chaque branchement **expose** quelque chose et **pèse** dans chaque appel.
2. Une skill est un savoir-faire **chargé à la demande** ; sa description la déclenche.
3. Une consigne que tu répètes **trois fois** mérite une skill, testée en session vierge.

**Mots-clés** : RAG, grounding, tools, MCP, tool definitions, skill, progressive disclosure, instructions projet, demande initiale — voir le glossaire.
