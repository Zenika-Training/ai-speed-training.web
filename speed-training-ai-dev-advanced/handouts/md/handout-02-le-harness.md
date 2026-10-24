# Handout — Le harness

**Développeur IA — Avancé · Zenika · fiche module 2**

Quelles briques entourent le modèle, et laquelle utiliser pour quoi : cette fiche reprend le module 2, des capacités d'un harness jusqu'à ce qu'il injecte dans la context window.

## Les capacités attendues d'un harness

_Module 2 · slide « Les capacités attendues d'un harness »_

Agent = modèle + tools + boucle + objectif, comme en Foundation ; c'est le harness qui fournit les tools et fait tourner la boucle. Le modèle raisonne ; le harness lui donne les moyens d'agir. Un même modèle dans deux harness peut donner des résultats très différents, en coût comme en réussite.

La grille pour évaluer n'importe quel harness, y compris ceux qui n'existent pas encore :

| Capacité                        | Ce qu'on vérifie                                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Sous-agents**                 | contexte isolé, **et** le droit d'écrire (un sous-agent en lecture seule sait relire, pas corriger) |
| **MCP standard**                | n'importe quel serveur, déclaré dans un fichier versionné                                           |
| **Instructions, skills, hooks** | personnaliser sans toucher au cœur                                                                  |
| **Modes de pilotage**           | monter l'autonomie, borner les droits                                                               |
| **Scriptable**                  | un mode non interactif, pour la CI                                                                  |

Deux philosophies, qui ne s'opposent pas frontalement :

- **Plateforme** (ex. GitHub Copilot, Claude Code) : un harness intégré qui décide de la structure ; Copilot l'étend jusqu'à la forge (issues, PR, CI).
- **Composition** (ex. Pi, OpenCode) : un cœur minimal, des extensions, multi-fournisseur ; on compose son harness.

> Dans les deux cas, le harness est un **actif d'équipe versionné**. Sinon, c'est de l'**agentic debt** : extensions qu'on ne comprend plus, contournements de permissions oubliés, instructions contradictoires empilées. Même remède que la dette technique : versionner, relire, supprimer.

Un seul jeu d'artefacts versionné (`AGENTS.md`, `SKILL.md`, configuration MCP) sert de plus en plus de harness : voir « Où ça se règle dans mon outil ».

## Une allowlist n'est pas une sandbox

_Module 2 · slide « Une allowlist n'est pas une sandbox »_

|                   | Allowlist                                               | Sandbox                                                |
| ----------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| **Agit sur**      | des motifs de commande                                  | les effets : fichiers, réseau, droits                  |
| **Contournement** | `npm test && curl …`, un script qui en appelle un autre | aucun par le prompt : l'agent ne sort pas du périmètre |
| **Forme**         | une liste dans la config du harness                     | conteneur, VM, compte dédié, réseau coupé              |

> Le seul périmètre réel est l'**isolation**. Une allowlist filtre le texte d'une commande, pas ce qu'elle fait : on autorise `npm test`, et un script de test modifié par l'agent peut faire n'importe quoi, avec vos droits.

- « La policy vit dans le runtime, pas dans le prompt » : une consigne « ne lance jamais de commande destructrice » dans `AGENTS.md` n'est qu'une suggestion.
- MCP n'apporte rien sur ce terrain : le protocole standardise le branchement des tools, pas leurs permissions.
- **Autonomie et droits sont deux réglages distincts.** Les niveaux d'autonomie (observer, demander, agir dans le périmètre, aller au bout seul) existent dans tous les harness, sous des noms différents. On monte d'un niveau quand on fait confiance au périmètre, et jamais « sans demander » sans isolation. Ce qui rend la montée acceptable, c'est le filet : tests, commits fréquents, diff relu, hook de vérification.

## Les primitives du harness : qui décide ?

_Module 2 · slide « Les primitives du harness : qui décide ? »_

| Primitive               | Ce que c'est                                               | Qui décide qu'elle s'applique  | Exemple sur l'API du fil rouge                      |
| ----------------------- | ---------------------------------------------------------- | ------------------------------ | --------------------------------------------------- |
| **Instructions projet** | `AGENTS.md` : règles stables, conventions, commandes       | personne : toujours chargées   | « les endpoints suivent le contrat OpenAPI »        |
| **Skill**               | savoir-faire réutilisable, chargé quand la tâche s'y prête | le modèle, sur sa description  | la procédure pour ajouter une migration             |
| **Hook**                | script lancé à un moment précis du cycle de vie            | le harness, à chaque événement | lancer les tests après chaque édition               |
| **Sous-agent**          | travail à part, ne renvoie que son résultat                | l'agent ou toi                 | explorer le module bookings sans polluer la session |
| **MCP**                 | accès à un système externe                                 | le modèle, à la demande        | lire le ticket dans le tracker                      |

> Le critère qui range tout : **qui décide** qu'une primitive s'applique.

- **Règle de base** : règles stables → instructions projet ; savoir-faire → skill ; ce qui doit arriver à coup sûr → hook ; travail à isoler → sous-agent ; système extérieur → MCP.
- **L'erreur classique** : tout mettre dans `AGENTS.md`, qui pèse dans chaque appel. `AGENTS.md` = ce qui est toujours pertinent ; skill = ce qui l'est parfois (sa description est un prompt) ; hook = ce qui doit arriver sans que personne y pense.
- La **demande initiale** n'est pas une primitive du harness : c'est le premier message, cadré pour la tâche du jour (fichiers clés, tests et invariants). Elle évite de gonfler `AGENTS.md` avec du contexte éphémère.
- Le mot « agent » désigne au moins trois choses : l'agent de code, le sous-agent à contexte isolé, l'agent personnalisé d'un outil. Vérifiez duquel on parle.
- Formats ouverts d'abord : `AGENTS.md` et `SKILL.md` sont lus par la plupart des harness ; l'emplacement des hooks et des sous-agents varie.

## Hooks : automatiser le cycle de vie

_Module 2 · slide « Hooks : automatiser le cycle de vie »_

Des **scripts déterministes**, lancés par le harness, quoi que dise le modèle. Le socle commun à tous les harness :

| Événement          | Usage    | Exemples                                                        |
| ------------------ | -------- | --------------------------------------------------------------- |
| **Avant un tool**  | bloquer  | `git push --force`, `rm -rf`, ou réécrire une commande verbeuse |
| **Après un tool**  | formater | le fichier écrit, ou journaliser l'appel                        |
| **Fin de tour**    | vérifier | lancer les tests, relire le diff produit                        |
| **Fin de session** | archiver | la trace, ou proposer une mise à jour des notes                 |

> « Lance toujours les tests » dans les instructions est une **suggestion**. Le hook est une **garantie**.

- Le hook d'**avant un tool** peut renvoyer une décision (autoriser, demander, refuser) et donc bloquer l'appel de façon déterministe ; il peut aussi réécrire les arguments.
- **Piège de nommage** : la « fin de tour » se déclenche quand l'agent a fini sa réponse, pas au `git commit`. Pour contrôler le commit, visez le hook d'avant un tool sur la commande git, ou un hook git classique.
- **Piège CI** : en mode non interactif, certains harness ne chargent pas par défaut les hooks du dépôt, par sécurité. Un hook qui marche en local peut être absent en CI.
- Les noms d'événements varient d'un harness à l'autre : voir « Où ça se règle dans mon outil ».

## Tool calling : ce qui transite réellement

_Module 2 · slide « Tool calling : ce qui transite réellement »_

Trois messages, au format simplifié de l'API Messages d'Anthropic ; OpenAI et Google utilisent des structures équivalentes, d'où la possibilité pour une gateway de traduire d'un format à l'autre.

**① Le harness déclare** le tool :

```json
{
  "name": "run_tests",
  "description": "Lance les tests",
  "input_schema": {
    "type": "object",
    "properties": { "path": { "type": "string" } }
  }
}
```

**② Le modèle demande** :

```json
{ "type": "tool_use", "id": "call_01", "name": "run_tests", "input": { "path": "tests/bookings" } }
```

**③ Le harness répond** :

```json
{ "type": "tool_result", "tool_use_id": "call_01", "content": "FAIL bookings:42 nextCursor is undefined" }
```

> Le modèle choisit **sur la description** : chaque tool definition part **en tokens** à chaque appel.

- Une mauvaise description = un tool mal utilisé ou ignoré. Quand vous écrivez un serveur MCP ou une skill, soignez la description : c'est un prompt.
- 40 tools MCP branchés = des milliers de tokens de préfixe, à chaque appel. Certains harness chargent désormais les tool definitions à la demande : à vérifier sur son outil.

## Ce que le harness injecte

_Module 2 · slide « Ce que le harness injecte »_

Une session agentique remplit la context window avec bien plus que vos messages :

| Bloc                     | Ce qu'il apporte                                                                               | Réflexe                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **System prompt**        | les règles du harness ouvrent la session                                                       | —                                                                                         |
| **Tool schemas**         | chaque tool et chaque serveur MCP branché prend de la place, même s'il ne sert pas aujourd'hui | couper les MCP inutiles pour la tâche                                                     |
| **Fichiers lus**         | du code brut, pertinent ou non                                                                 | lire en partie                                                                            |
| **Sorties de commandes** | un build, un `npm install` ou une stack trace peuvent dominer la context window                | demander une sortie filtrée (erreurs seules, 20 dernières lignes), ou filtrer par un hook |
| **Logs d'erreur**        | les erreurs répétées deviennent du bruit                                                       | les faire synthétiser                                                                     |
| **Résultats de tests**   | utiles, mais consomment aussi du budget                                                        | —                                                                                         |

> La question n'est pas « l'agent est-il intelligent ? », mais « **ce qu'il a injecté aide-t-il la tâche ?** »

**Avant de brancher un serveur MCP**, trois questions : **qui l'exécute ?** (un processus local ne sort pas de la machine, un serveur distant reçoit ce que le modèle choisit de lui envoyer) ; **qui l'authentifie ?** (quel jeton, quels droits : jamais plus large que la tâche) ; **qui le maintient ?** (éditeur officiel ou fork communautaire). Le trio létal (données privées + contenu non fiable + capacité d'envoyer vers l'extérieur) se réunit souvent par MCP.

## Une primitive par besoin

_Module 2 · slide « Quiz : quelle primitive ? »_

La grille appliquée à des besoins réels :

| Besoin                                          | Primitive           | Pourquoi                                                                   |
| ----------------------------------------------- | ------------------- | -------------------------------------------------------------------------- |
| « Toujours passer par le client HTTP interne »  | instructions projet | vrai à chaque tâche ; on peut le doubler d'une règle de lint, déterministe |
| Interdire `git push --force`, quoi qu'il arrive | hook                | doit arriver à coup sûr                                                    |
| Migrer le schéma, une fois par mois             | skill               | savoir-faire chargé seulement quand la tâche s'y prête                     |
| Explorer 40 fichiers sans polluer la session    | sous-agent          | contexte isolé, ne renvoie que son résultat                                |

> **Tip du module** : ce qui doit toujours arriver est un **hook**, pas une consigne. Une consigne, le modèle peut l'oublier ; un hook, c'est le harness qui l'exécute.

L'exercice 1 met cette règle en pratique : voir « Les exercices ».

## À retenir

1. Un harness s'évalue sur ses **capacités**, pas sur sa marque ; non versionné, il devient de l'**agentic debt**.
2. Une **allowlist** filtre des commandes, une **sandbox** borne les effets : seule l'isolation est un périmètre.
3. Chaque primitive se range par **qui décide** : personne, le modèle, le harness, l'agent, ou toi.
4. Chaque tool branché pèse dans **chaque appel**, et sa description est un prompt.

**Mots-clés** : harness, agentic debt, permissions, sandbox, allowlist, instructions projet, skill, hook, sous-agent, MCP, tool definitions — voir le glossaire.
