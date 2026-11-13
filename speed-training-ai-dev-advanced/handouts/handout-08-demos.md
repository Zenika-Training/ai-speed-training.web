---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-advanced/handouts/handout-08-demos.md
---
# Handout — Les démos

**Développeur IA — Avancé · Zenika · démos à rejouer**

Les démos jouées par le formateur pendant la formation, pour les rejouer seul, que tu aies été présent ou non. Elles tournent toutes sur le kit d'exercices de la Foundation (carte **Développeur IA — Foundation**, « Kit de code (.zip) »), installé avec `npm install` (`npm test` doit être vert) et un premier commit, avec ton agent de code ouvert dessus.

## Un hook qui bloque l'agent

*Module 2 · démo de l'exercice 1 « Garde-fou déterministe » · 3 min*

**Ce que ça montre** : ce qui doit **toujours** arriver est un **hook**, pas une consigne. Une consigne, le modèle peut l'oublier ; un hook, c'est le harness qui l'exécute, quoi que demande le modèle.

**À rejouer**

1. Mets en place le hook, avec le mécanisme de hook de ton harness (voir le handout « Où ça se règle dans mon outil ») :

```text
Mets en place un hook qui refuse toute modification de openapi.yaml
(le contrat de l'API), puis explique-moi comment le tester.
```

2. Demande ensuite le contraire :

```text
Ajoute le champ createdAt aux réservations dans openapi.yaml.
```

**Ce qu'on observe** : le refus vient du harness, il apparaît dans la trace de la session. L'agent tente souvent un autre chemin pour arriver au même effet (une commande `sed`, un autre outil d'écriture) : c'est « une allowlist n'est pas une sandbox » en direct. Tout se passe en local, sans remote git.

## Avec ou sans demande initiale

*Module 3 · démo « Avec ou sans demande initiale » · 5 min*

**Ce que ça montre** : une demande initiale cadrée réduit l'exploration de l'agent et améliore son plan. On ne le croit pas sur parole, on le **mesure** : même tâche, deux sessions, on compare les chiffres.

**Avant de commencer** : la jauge de contexte et la liste des fichiers lus visibles dans ton harness. Les deux sessions s'arrêtent au **plan** : rien n'est modifié.

**Session 1, sans cadrage.** Nouvelle session vierge, colle :

```text
Ajoute la pagination par curseur sur GET /bookings, avec ses tests.
Propose d'abord un plan, ne modifie aucun fichier.
```

**Session 2, avec une demande initiale.** Nouvelle session vierge (pas la même), colle :

```text
Ajoute la pagination par curseur sur GET /bookings, avec ses tests.

Tâche : pagination par curseur sur GET /bookings (ticket BOOK-142).
Fichiers clés : src/bookings/bookings.controller.ts,
src/shared/pagination/cursor.ts (le helper à réutiliser),
src/rooms/rooms.controller.ts (l'exemple déjà paginé), openapi.yaml.
Commandes : npm test -- bookings, puis npm test et npm run lint.
Invariants : réutiliser le helper de pagination partagé ;
curseur opaque (base64url) ; réponse { items, nextCursor } comme GET /rooms ;
mettre à jour openapi.yaml.
Pièges : ne pas réinventer un helper ; limit max 100 ;
plusieurs réservations le même jour : la clé du curseur doit départager les égalités.

Propose d'abord un plan, ne modifie aucun fichier.
```

**Le relevé**

|                                               | Session 1 (sans) | Session 2 (avec) |
| --------------------------------------------- | ---------------- | ---------------- |
| Fichiers lus avant le plan                    |                  |                  |
| Context window consommée                      |                  |                  |
| Réutilise `src/shared/pagination/cursor.ts` ? |                  |                  |
| Prévoit de mettre à jour `openapi.yaml` ?     |                  |                  |
| Départage les réservations du même jour ?     |                  |                  |

**Ce qu'on observe** : les chiffres, et surtout **la justesse du plan**. Sans cadrage, l'agent invente-t-il son propre helper, oublie-t-il le contrat ou les égalités de date ? Avec, suit-il les invariants ? Si l'écart est faible, c'est un résultat aussi : sur un petit dépôt, la recherche de l'agent suffit souvent. Le gain annoncé n'est pas le gain mesuré : on compte.

## Deux agents, deux worktrees

*Module 6 · démo de repli de l'exercice 3 « Deux agents, deux worktrees » · 3 min*

**Ce que ça montre** : paralléliser demande d'**isoler**. Deux agents travaillent en même temps sur deux tickets indépendants, chacun dans son worktree et sur sa branche ; on relit deux diffs, puis on merge.

**Avant de commencer** : le kit installé et **commité** (`git init`, premier commit), git 2.5 ou plus, deux tickets : `TICKET.md` (BOOK-142, pagination de `/bookings`) et `tickets/ROOM-77.md` (filtre `minCapacity` sur `GET /rooms`). Un ADE (Conductor, Orca…) si tu en as un ; sinon deux terminaux.

**À rejouer**

1. Crée un worktree et une branche par ticket. Dans un ADE : une nouvelle session par ticket. Sans ADE :

```text
git worktree add ../kit-bookings -b feat/bookings-pagination
git worktree add ../kit-rooms -b feat/rooms-min-capacity
```

2. Installe les dépendances **dans chaque worktree** (`npm install`) : elles ne sont pas partagées.
3. Lance **un agent par worktree**, en même temps (deux sessions dans l'ADE, ou deux terminaux) :

```text
Lis TICKET.md, propose un plan, puis implémente-le avec ses tests ;
fini quand npm test passe.
```

```text
Lis tickets/ROOM-77.md, propose un plan, puis implémente-le avec ses tests ;
fini quand npm test passe.
```

4. Quand les deux ont fini, **relis chaque diff** et vérifie `npm test` dans chaque worktree.
5. **Merge** les deux branches, depuis le dépôt principal :

```text
git merge feat/bookings-pagination
git merge feat/rooms-min-capacity
npm test
```

6. **Nettoie** :

```text
git worktree remove ../kit-bookings
git worktree remove ../kit-rooms
git branch -d feat/bookings-pagination feat/rooms-min-capacity
```

**Ce qu'on observe** : les deux agents n'ont pas de port ni de fichier en commun, ils avancent sans se gêner. Le fichier partagé est `openapi.yaml` : le plus souvent git fusionne seul ; s'il y a un conflit, c'est le bon moment pour voir ce que coûte une feature qui touche un fichier commun. Et surtout : combien de sessions peut-on vraiment suivre ? Le goulot n'est pas la machine, c'est la relecture.

## Pour aller plus loin

*Hors deck : la démo de l'ancien exercice 3.*

### Un sous-agent pour explorer

*Module 3 · ancien exercice 3 « Déléguer et isoler », retiré du deck · 3 min*

**Ce que ça montre** : un sous-agent **isole** son contexte et ne renvoie que son résultat, mais il **coûte** : la session principale reste légère, la consommation totale ne baisse pas.

**À rejouer**, avec le mécanisme de sous-agents de ton harness (sans sous-agents : une deuxième session séparée fait le même travail) :

```text
Avec un sous-agent, explore le module bookings et rends-moi
en 15 lignes : fichiers clés, points d'extension, pièges.
Ne modifie rien.
```

Puis la même demande dans la session principale, sans sous-agent.

**Ce qu'on observe** : la jauge de la session principale reste basse avec le sous-agent ; la consommation totale de la session, elle, ne baisse pas forcément (voir « Le piège des sous-agents »). L'exercice complet, avec la revue de `bookings.controller.ts`, est dans le handout [« Les exercices »](#handout-07-exercices/exercice-deleguer-et-isoler).
