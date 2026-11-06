---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-03-lab-01-boite-a-outils.md
---
# Handout — Lab 1 · Boîte à outils agents personnels

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Repartir avec un écosystème agent personnel opérationnel : outils branchés et bornés (1.1), garde-fous déterministes (1.2), codebase indexée (1.3). Chaque étape a sa déclinaison GitHub Copilot et Claude Code.

## Avant de commencer

### La codebase fil rouge

Les labs de ce chapitre, puis les labs 7 et 8, travaillent sur la **PetClinic**. Trois options :

1. **Votre propre PetClinic**, si vous en avez déjà une : c'est le chemin le plus court.
2. **La PetClinic Java officielle** : https://github.com/spring-projects/spring-petclinic (Spring Boot, Maven). C'est la référence, la mieux maintenue et la plus documentée.
3. **Une PetClinic Python**, si Java n'est pas votre monde : https://github.com/antonarhipov/django-petclinic (Django, SQLite, mêmes entités `owners` / `pets` / `vets` / `visits`).

> Les labs **2.2**, **7** et **8** vous font **modifier** la codebase (nouvelle entité `Clinic`, champ `phone` sur `Owner`, deux features en parallèle). **Forkez** donc le dépôt choisi dans votre espace personnel (en dépôt **privé** si vous préférez) plutôt que de travailler sur un clone que vous ne pourrez pas pousser. Le lab 8 (worktrees) et le lab 9 (PR sur un dépôt partagé) supposent que vous avez les droits d'écriture.

> Sur l'alternative Python : l'écosystème est mince, aucun portage n'a de communauté réelle et **aucun des candidats n'a de licence explicite**, à garder en tête avant de forker dans un contexte client. `antonarhipov/django-petclinic` est retenu parce qu'il est le plus récent, qu'il utilise **SQLite** (aucune base à installer) et que son découpage en applications Django reproduit fidèlement le domaine, ce qui compte pour les requêtes de graphe du lab 1.3. À défaut, **n'importe quel projet que vous connaissez déjà** fonctionne pour les labs 1.1 à 1.3 : ils n'ont besoin que de code et d'un dépôt git.

### Passer l'assistant en mode autonome

À partir d'ici, on ne valide plus chaque action une par une : c'est tout l'objet du module.

|                     | GitHub Copilot                                                    | Claude Code                                                                         |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| En cours de session | `Shift + Tab` bascule le mode de pilotage (jusqu'à **Autopilot**) | `Shift + Tab` fait défiler les modes de permission (jusqu'à **bypass permissions**) |
| Dès le lancement    | `copilot --yolo`                                                  | `claude --dangerously-skip-permissions`                                             |

> Vous faites ça **sur un dépôt jetable, dans le cadre du lab** : ce n'est pas la configuration à emporter chez un client. Le chapitre 1 des slides explique quels droits vous ouvrez et où ils se déclarent, et le lab 1.2 repose un garde-fou par-dessus.

* **Copilot** : par défaut, il demande une confirmation à chaque appel d'outil et refuse l'action si vous ne répondez pas. Beaucoup de gens répondent alors « oui » machinalement, exactement le comportement qu'on veut éviter : choisissez votre mode consciemment. Créez-vous un alias si vous répétez la même commande.
* **Claude Code** : les règles `deny` de `.claude/settings.json` s'appliquent **même** en mode bypass ; c'est ce que vous exploiterez au lab 1.2.

## 1.1 · Outils MCP

**Objectif** : comprendre ce que l'agent sait déjà faire, ouvrir les droits au strict nécessaire, brancher un serveur, **en pilotant l'assistant plutôt qu'en éditant les fichiers à la main**.

**Le parti pris** : configurer un serveur MCP est typiquement la tâche ingrate pour laquelle on passe vingt minutes à chercher la bonne clé dans la bonne doc. C'est aussi exactement ce qu'un assistant fait bien. On s'en sert donc autrement que pour écrire du code, et vous verrez au passage où il écrit, ce qu'il écrit, et ce qu'il vous fait ouvrir comme droits.

### GitHub Copilot : élargir GitHub, brancher un tiers

1. **Constater ce qui est déjà branché**, dans une session `copilot` à la racine de votre codebase :

```text
/mcp show github-mcp-server
```

Repérez `list_issues`, `search_code`, `get_file_contents`. Cherchez `create_issue` et `create_pull_request` : ils sont **absents**, l'écriture n'est pas activée par défaut.

2. **Mesurer le coût du branchement** avant d'ajouter quoi que ce soit : `/context`, et notez la ligne **MCP Tools**. C'est ce que vous payez à **chaque** requête, avant même d'avoir écrit un prompt.
3. **Tester les outils en lecture** : *« Liste les 5 dernières issues ouvertes »*, *« Quelles branches ont eu des commits cette semaine ? »*
4. **Faire ouvrir l'écriture par l'agent, au strict nécessaire.** Demandez-lui, en langage naturel, d'activer **uniquement** le toolset dont vous avez besoin pour créer des issues, et de vous expliquer ce que ça ouvre exactement. Puis demandez-lui ce que coûterait le fait de **tout** activer, et pourquoi ce n'est pas souhaitable. *À observer* : propose-t-il la bonne granularité, ou part-il directement sur l'option qui ouvre tout ? Vous restez le garant du périmètre.
5. **Faire brancher un serveur tiers par l'agent.** Choisissez un serveur qui vous servirait vraiment (`context7` pour la documentation, votre outil de ticketing, un moteur de recherche…) et demandez à l'agent de le configurer **dans le projet**, avec la clé d'API en **variable d'environnement** et non en clair. Exigez trois choses dans votre demande : qu'il vous dise **dans quel fichier** il écrit, qu'il ne mette **aucun secret** dans un fichier versionné, et qu'il vous explique comment vérifier que ça marche.
6. **Relire ce qu'il a produit.** Ouvrez le fichier de configuration, comprenez sa structure, et vérifiez qu'aucune clé n'y traîne. C'est l'étape qui compte : on délègue le geste, pas la responsabilité.
7. **Provoquer et diagnostiquer une panne.** Invalidez la variable d'environnement, relancez la session : le serveur **apparaît toujours dans la liste** mais les appels échouent. Faites diagnostiquer l'erreur par l'agent, puis rétablissez.

**Critère de réussite** : le serveur tiers répond, aucun secret n'est écrit en clair, vous savez **dans quel fichier** la configuration vit, et vous pouvez chiffrer ce que vos serveurs MCP coûtent en contexte.

> Emplacements de configuration MCP côté Copilot, pour **contrôler** l'agent (pas pour le remplacer) : `~/.copilot/mcp-config.json` (utilisateur, écrit aussi par `copilot mcp add` ou `/mcp add`), `./copilot/mcp-config.json` (projet, versionné, prioritaire), et `--additional-mcp-config` pour charger un fichier à la volée. Piège de copier-coller : VS Code utilise `.vscode/mcp.json` avec la clé `servers` au lieu de `mcpServers`. Pour élargir les droits GitHub en ligne de commande : `copilot --add-github-mcp-toolset <toolset>` (ciblé) et `copilot --enable-all-github-mcp-tools` (tout, **à ne pas garder**).

### Claude Code (facultatif) : brancher le MCP GitHub

Lab facultatif : si vous avez déjà branché le MCP GitHub et que le paramétrage est encore en place, ce qui suit est un **rappel**. Si le temps manque, passez directement au 1.2.

1. **Partir de l'état des lieux** : `/mcp` dans la session pour voir ce qui est branché. Contrairement à Copilot, **rien n'est pré-installé** côté Claude Code : c'est vous qui décidez de tout.
2. **Mesurer le coût du branchement** avant d'ajouter quoi que ce soit : `/context`, et notez la ligne des outils MCP. C'est ce que vous paierez à **chaque** requête.
3. **Faire brancher le serveur GitHub par l'agent.** Demandez-lui, en langage naturel, de configurer le serveur MCP GitHub **pour ce projet**, avec un jeton en **variable d'environnement** et non en clair. Exigez les trois mêmes choses : le fichier où il écrit, aucun secret dans un fichier versionné, comment vérifier que ça marche.
4. **Relire ce qu'il a produit.** Ouvrez le fichier de configuration, comprenez sa structure, vérifiez qu'aucun jeton n'y traîne.
5. **Interroger le périmètre.** Demandez à l'agent quels droits porte le jeton qu'il vous a fait créer, et ce qu'il pourrait faire sur vos dépôts avec. Réduisez si c'est trop large : c'est le réflexe **scope minimal** du chapitre 1.
6. **Tester en lecture** : *« Liste les 5 dernières issues ouvertes »*, *« Quelles branches ont eu des commits cette semaine ? »*
7. **Provoquer et diagnostiquer une panne.** Invalidez le jeton, relancez : le serveur **apparaît toujours** dans `/mcp` mais les appels échouent. Faites diagnostiquer l'erreur par l'agent, puis rétablissez. Relancez `/context` : un serveur **non fonctionnel** coûte quand même ses tokens de déclaration.

**Critère de réussite** : l'agent interroge GitHub via MCP, aucun secret n'est écrit en clair, vous savez **dans quel fichier** la configuration vit et **quels droits** porte votre jeton, et vous savez diagnostiquer un jeton manquant ou invalide.

> Pour contrôler l'agent : la configuration projet vit dans un `.mcp.json` à la racine (versionné, partagé par l'équipe) ; `claude mcp add` écrit la même chose depuis la ligne de commande.

### Ce qui ne bouge pas d'un harness à l'autre

> **L'asymétrie vaut d'être notée** : côté Copilot, GitHub est déjà branché en lecture seule et l'exercice consiste à **restreindre** ce qui est ouvert ; côté Claude Code, rien n'est là et l'exercice consiste à **n'ouvrir que le nécessaire**. Même règle, gestes opposés. Le geste à retenir n'est pas « brancher un MCP » mais **« ouvrir le minimum nécessaire »** : un serveur en écriture totale, c'est un agent qui peut créer des PR sur vos dépôts sans que vous l'ayez demandé.

Pourquoi on ne fait plus ce lab à la main : les chemins de configuration et les noms d'options bougent d'une version à l'autre, et les recopier depuis une fiche apprend surtout à copier. Ce qui reste vrai six mois plus tard, c'est le **réflexe** : demander, relire, vérifier le périmètre.

## 1.2 · Activer un hook local

**Objectif** : poser un hook dans le projet, le voir agir dans la session, puis le faire **refuser** une commande : la démonstration que « la policy vit dans le runtime, pas dans le prompt ».

### GitHub Copilot

1. **Déclarer un hook** dans `.github/hooks/lab-hooks.json` à la racine du projet (fichier **versionné**) :

```json
{
  "hooks": {
    "sessionStart": [
      {
        "type": "command",
        "bash": "cat > /dev/null; echo '{\"additionalContext\":\"Message de la formation AIDD : le mot de passe du lab est BANANE42.\"}'",
        "timeoutSec": 10
      }
    ]
  }
}
```

Ce hook **n'affiche rien** : la sortie brute d'un hook est ignorée par la CLI. Son seul canal est `additionalContext`, qui injecte du texte dans le contexte du modèle : on ne verra pas le message, on verra son **effet**. Le `cat > /dev/null` consomme l'événement que Copilot passe en JSON sur stdin ; un script qui ne le lit pas peut bloquer. (Le « mot de passe » est une valeur fictive du lab.)

2. **Recharger** : quittez la session et relancez `copilot`. Les hooks sont lus **au démarrage**, il n'y a pas de rechargement à chaud.
3. **Le voir se déclencher** : demandez *« quel est le mot de passe du lab ? »*. L'agent répond **BANANE42**, une information qui n'est ni dans le dépôt, ni dans votre prompt : elle ne peut venir que du hook.
4. **Passer de l'injection de contexte au blocage.** Créez `.github/hooks/no-rm.sh`, puis `chmod +x .github/hooks/no-rm.sh` :

```bash
#!/usr/bin/env bash
# Copilot passe l'appel d'outil en JSON sur stdin :
# {"sessionId":…,"toolName":"bash","toolArgs":"{\"command\":\"rm -f …\"}"}
payload=$(cat)
if echo "$payload" | grep -qE '\brm\b'; then
  echo '{"permissionDecision":"deny","permissionDecisionReason":"Interdit pendant le lab : suppression de fichiers via rm."}'
fi
exit 0    # ne rien émettre = laisser passer
```

Ajoutez-le au même fichier de configuration, à côté du `sessionStart` :

```json
"preToolUse": [
  { "type": "command", "matcher": "bash",
    "bash": "$COPILOT_PROJECT_DIR/.github/hooks/no-rm.sh", "timeoutSec": 10 }
]
```

`$COPILOT_PROJECT_DIR` pointe la racine du projet : **jamais de chemin absolu en dur** dans un fichier versionné, il ne fonctionnerait que sur votre machine. Le `matcher` est une regex sur le **nom de l'outil** (`bash`, `view`, `glob`, `edit`…), compilée en `^(?:…)$` ; sans `matcher`, le hook se déclenche sur tous les appels.

5. **Vérifier le refus** : relancez la session, créez un fichier jetable (`touch /tmp/lab-hook.txt`) et demandez *« supprime le fichier /tmp/lab-hook.txt avec rm »*. La CLI affiche le refus sous l'appel d'outil, et l'agent l'annonce dans sa réponse :

```text
✗ Remove lab-hook.txt file (shell)
  │ rm -f /tmp/lab-hook.txt && echo done
  └ Denied by preToolUse hook: Interdit pendant le lab : suppression de fichiers via rm.
```

Vérifiez que le fichier est **toujours là**, et refusez les contournements que l'agent proposera spontanément.

**Critère de réussite** : l'agent restitue le mot de passe injecté par le `sessionStart`, et le `rm` est refusé sans que le modèle ait son mot à dire.

> **Les hooks de dépôt ne se déclenchent pas en mode non interactif** (`copilot -p "…"`), comportement constaté sur les versions de CLI de mi-2026, à revérifier le jour J. Ce lab se fait donc en session interactive. Pour un hook scripté en CI, posez-le en portée utilisateur (`~/.copilot/hooks/`), qui reste actif en `-p`.

> Emplacements : `.github/hooks/*.json` (dépôt, versionné, **également lu par l'agent cloud**) et `~/.copilot/hooks/` (utilisateur, `%USERPROFILE%\.copilot\hooks` sous Windows). Alternative à `$COPILOT_PROJECT_DIR` : le champ `cwd` de l'entrée, résolu depuis la racine du dépôt (`"cwd": ".github/hooks", "bash": "./no-rm.sh"`). Trois types de hooks : `command` (champs `bash` / `powershell` / `command` selon la plateforme), `http` (POST vers un endpoint, pratique pour la télémétrie d'entreprise) et `prompt` (soumet automatiquement un texte, **uniquement** sur `sessionStart`). Les 14 événements sont listés dans `docs.github.com/copilot/reference/hooks-reference`.

> Règles de sortie d'un hook `command` : le stdout n'est jamais montré à l'utilisateur, seul le **dernier objet JSON** est interprété (deux objets JSON se concatènent en JSON invalide et sont ignorés en silence). Côté `preToolUse`, `permissionDecision` vaut `allow` / `deny` / `ask` (`permissionDecisionReason` obligatoire pour `deny`), et un **code de sortie non nul refuse aussi l'appel** (fail-closed), mais sans message maîtrisé. Un timeout, à l'inverse, laisse passer (fail-open).

### Claude Code

1. **Déclarer un hook** dans `.claude/settings.json` (à la racine du projet) :

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "echo '{\"systemMessage\": \"Bienvenue dans cette formation\"}'" }] }
    ]
  }
}
```

Sans le JSON `systemMessage`, aucun message n'apparaît : **les sorties standard ne sont jamais affichées par Claude**, sauf en mode debug.

2. **Recharger** : quittez la session et relancez `claude`. Les hooks sont capturés **au démarrage** : éditer `settings.json` en cours de session ne suffit pas. Vérifiez avec `/hooks` que les entrées sont bien enregistrées.
3. **Le voir se déclencher** : au lancement, vous devez voir le message `SessionStart:startup says: Bienvenue dans cette formation`.
4. **Passer de l'observation au blocage.** Créez `.claude/hooks/no-rm.sh`, puis `chmod +x .claude/hooks/no-rm.sh` :

```bash
#!/usr/bin/env bash
# Claude Code passe l'appel d'outil en JSON sur stdin
payload=$(cat)
if echo "$payload" | grep -qE '"command"[[:space:]]*:[[:space:]]*"[^"]*\brm\b'; then
  echo "Interdit pendant le lab : suppression de fichiers via rm." >&2
  exit 2    # 2 = refuser l'appel ; stderr est renvoyé au modèle
fi
exit 0
```

Branchez-le sur `Bash`, à côté du `echo` existant :

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [{ "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/no-rm.sh" }] }
    ]
  }
}
```

5. **Vérifier le refus** : relancez la session, créez un fichier jetable (`touch /tmp/lab-hook.txt`) et demandez *« supprime le fichier /tmp/lab-hook.txt »*. L'agent tente le `rm`, le hook le refuse, et **l'agent annonce le refus** avec la raison renvoyée par le script, souvent en proposant un contournement, qu'il faut refuser aussi.

**Critère de réussite** : les deux hooks apparaissent dans `/hooks`, leur sortie est visible dans la transcription, et le `rm` est refusé sans que le modèle ait son mot à dire.

> Emplacements : `.claude/settings.json` (projet, versionné, celui du lab), `.claude/settings.local.json` (projet, non versionné) et `~/.claude/settings.json` (utilisateur). C'est le **code de sortie** qui porte la décision d'un `PreToolUse` : `0` laisse passer, `2` refuse l'appel et renvoie stderr au modèle, tout autre code signale une erreur sans bloquer. Pour un contrôle plus fin, le hook peut écrire du JSON sur stdout (`hookSpecificOutput.permissionDecision` à `allow` / `deny` / `ask`).

### Dernière étape, commune : la même règle en langage naturel

Écrivez *« ne supprime jamais de fichier avec rm »* dans `AGENTS.md` (Copilot) ou `CLAUDE.md` (Claude Code), retirez le hook, redemandez la suppression. Une consigne est une **suggestion** ; un hook est une **garantie**.

> Équipe mixte ? Copilot accepte **aussi la syntaxe Claude Code** dans ses propres fichiers (`"PreToolUse"` avec un tableau d'entrées `matcher` + `hooks`) et il lit les hooks déclarés dans `.claude/settings.json`. L'inverse n'est pas vrai : Claude Code ne lit pas `.github/hooks/`. Une équipe qui mélange les deux harness a donc intérêt à écrire ses hooks partagés au format Claude Code, et à réserver `.github/hooks/` à ce qui doit tourner côté agent cloud.

## 1.3 · Indexer sa codebase

**Objectif** : Graphify installé, knowledge graph de la PetClinic construit, requêtes sémantiques fonctionnelles.

1. **Installer et lancer Graphify** sur le projet, en **nommant la plateforme** :

| GitHub Copilot                                                            | Claude Code                                                                 |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `uv tool install graphifyy` (ou `pip install graphifyy`)                  | `uv tool install graphifyy` (ou `pip install graphifyy`)                    |
| `graphify install --platform copilot` : dépose le `SKILL.md` pour Copilot | `graphify install --platform claude` : enregistre le skill dans Claude Code |
| `graphify .` : construit `graphify-out/`                                  | dans Claude Code : `/graphify`                                              |

Résultat : `graphify-out/graph.html`, `GRAPH_REPORT.md`, `graph.json`.

> **`--platform` n'est pas optionnel dans la vraie vie.** Sans lui, Graphify **détecte** les agents installés sur votre machine et choisit tout seul : sur un poste où plusieurs assistants cohabitent, le skill peut atterrir chez le mauvais (par exemple dans `.claude/skills/` alors que vous travaillez sous Copilot), et l'agent ne le trouvera jamais. C'est le piège le plus fréquent de ce lab, dans les deux sens.

2. **Copilot : vérifier où le skill a été écrit**, et le déplacer si nécessaire. Copilot lit les trois emplacements ; un skill est un **simple dossier** contenant un `SKILL.md`, le déplacer d'un agent à l'autre est un `mv`.

```bash
ls .github/skills/ .claude/skills/ .agents/skills/ 2>/dev/null
# si le skill est ailleurs, il suffit de déplacer son dossier :
# mv <dossier-du-skill> .github/skills/
```

3. **Faire en sorte que le graphe reste à jour**, sinon il périme dès le premier commit. C'est de l'analyse **AST pure** : aucun appel de modèle, donc **aucun coût en tokens**, juste du CPU.

```bash
graphify hook install     # hooks git post-commit + post-checkout : rebuild automatique
graphify . --update       # rafraîchissement manuel : ne réextrait que les fichiers modifiés
```

4. **Prendre un tour d'horizon** : demandez à l'agent de lire `graphify-out/GRAPH_REPORT.md` et de résumer l'architecture de la PetClinic.
5. **Tester les requêtes**, rien d'autre à lancer, le skill suffit :

| GitHub Copilot (langage naturel)                                                   | Claude Code                                                        |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| *« Quelles classes implémentent OwnerRepository ? »*                               | `/graphify query "quelles classes implémentent OwnerRepository ?"` |
| *« Quel est le chemin de dépendances entre OwnerController et VisitRepository ? »* | `/graphify path "OwnerController" "VisitRepository"`               |
| *« Liste les classes sans tests dans `src/main/java/` »*                           | même question en langage naturel, sans nommer le skill             |

Observez dans les appels d'outils que l'agent exécute `graphify query …` / `graphify path …` plutôt que d'ouvrir les fichiers un par un.

6. **Copilot : chiffrer le gain.** Lancez `/context` avant puis après une série de questions sur l'architecture : une fois en laissant l'agent utiliser le graphe, une fois (`/clear`) en lui demandant explicitement de répondre **en lisant les fichiers**. Comparez la ligne **Messages**.

**Critère de réussite** : l'agent répond aux questions de relations **en interrogeant le graphe** (commandes `graphify query` / `graphify path` dans les appels d'outils), et, côté Copilot, le poste **Messages** de `/context` est nettement plus bas qu'avec des lectures fichier par fichier.

> Les exemples sont ceux de la PetClinic Java (`src/main/java/`, `OwnerRepository`, `OwnerController`…). Sur la variante Python ou sur votre propre projet, transposez : les questions de relations (« qui appelle quoi ? », « quelles implémentations de telle interface ? », « quels modules sans tests ? ») se posent à l'identique quel que soit le langage.

> **Aucun serveur MCP n'est nécessaire ici.** Graphify s'utilise comme un skill : le `SKILL.md` déposé par `graphify install` décrit à l'agent les commandes à lancer (`graphify query`, `graphify path`, `graphify explain`), et l'agent les exécute lui-même via le shell. Un serveur MCP Graphify existe, mais il ne sert qu'à exposer ces capacités à un outil qui ne saurait pas lire un skill.

**Bouclage avec le lab 1.2** : sans incitation, l'agent retombe volontiers dans ses habitudes de lecture directe, et vous ne verrez jamais `graphify` dans les appels d'outils.

* **Copilot** : ajoutez vous-même un hook `preToolUse` dans `.github/hooks/` sur le matcher `view|glob`, qui lui rappelle que `graphify query` existe. Ce n'est pas optionnel.
* **Claude Code** : `graphify install` configure automatiquement un hook `PreToolUse` qui pousse l'agent vers le graphe avant chaque lecture de fichier. Ouvrez `.claude/settings.json` et comparez-le avec les hooks que vous avez écrits à la main.

> Deux notions de « hook » se croisent dans ce lab : `graphify hook install` pose des hooks **git** (post-commit / post-checkout) qui reconstruisent le graphe quand le code change ; le `preToolUse` est un hook **d'agent**, qui s'exécute quand l'assistant s'apprête à lire un fichier. Même mot, deux mécanismes sans rapport.

> **Inutile de committer `graphify-out/`.** C'est un artefact dérivé du code, comme un dossier de build : il se régénère en quelques secondes, un graphe périmé fait raisonner l'agent sur un état qui n'existe plus, et il produit des conflits garantis dès qu'on travaille sur plusieurs branches. Le partage en équipe passe par le hook git que chacun installe. Ajoutez `graphify-out/` à votre `.gitignore`.

## Labs inline des slides (Ch. 2)

### Mesurer sa context window

Mesurez deux fois, à froid puis après 20 minutes de travail : `/context` (Copilot CLI, Claude Code), `/status` (Codex, plus l'indicateur de remplissage en %). Quel poste a bougé ? Lequel était déjà lourd avant la première question (instructions custom, outils MCP) ?

### Vérifier sa mémoire

1. **Vérifier** qu'elle est activée, pour pouvoir relire après les deux jours ce que l'agent a retenu, et ce qu'il a mal retenu.
2. **Localiser** : `/memory` (Claude Code comme Copilot CLI). Vous pouvez aussi demander à Copilot si sa mémoire est activée et où il la stocke, puis aller consulter.
3. **Écrire** : donnez-lui un fait à retenir (une préférence de style, un surnom).
4. **Vérifier** : nouvelle session, redemandez-le sans le rappeler. S'il répond, la mémoire a traversé la session.
