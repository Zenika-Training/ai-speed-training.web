---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-foundation/handouts/handout-03-produire-et-verifier.md
---
# Handout — Produire et vérifier

**Développeur IA — Foundation · Zenika · fiche module 3**

Avancer par petits pas sans perdre la maîtrise du code : la boucle de production, la relecture et les tests.

## Feature par feature : la boucle

*Module 3 · slide « Feature par feature : la boucle »*

| Préparer                    | Livrer, puis feature suivante                                      |
| --------------------------- | ------------------------------------------------------------------ |
| 1. Lire le ticket           | 4. Implémenter une étape                                           |
| 2. Faire comprendre le code | 5. Tester et relire                                                |
| 3. Demande et plan validés  | 6. Commit : une étape = un commit (vert et relu, sinon retour à 4) |
|                             | 7. Étape suivante du plan                                          |
|                             | 8. Mettre à jour la doc projet                                     |

* **Une étape = un commit** : chaque commit est un point de retour propre. Si une étape tourne mal, on revient au commit précédent au lieu de corriger par-dessus.
* **Étape 8** : ce qu'on a appris (un piège, une commande) remonte dans les instructions projet ou dans une skill.

## Rewind plutôt qu'empiler

*Module 3 · slide « Rewind plutôt qu'empiler »*

| Empiler                                        | Rewind                                    |
| ---------------------------------------------- | ----------------------------------------- |
| Prompt flou                                    | Prompt flou                               |
| Code faux                                      | Code faux                                 |
| « Non, pas comme ça… » : on corrige par-dessus | On édite l'entrée : on revient en arrière |
| Context window plus sale                       | Nouvelle trajectoire propre               |

Empiler, c'est garder la réponse fausse **et** la correction dans tous les envois suivants. En pratique : éditer son message et relancer, ou revenir à un point antérieur de la session (certains harness restaurent aussi les fichiers). Sinon : revenir au dernier commit et ouvrir une nouvelle session avec le prompt corrigé.

> Traitez une mauvaise sortie comme un **message du compilateur** : on corrige l'entrée, on relance.

## Relire le code généré

*Module 3 · slide « Relire le code généré »*

Le code de l'agent se relit comme celui d'un **contributeur inconnu**. La grille, à cocher sur chaque diff :

|     | Axe             | La question                                          |
| --- | --------------- | ---------------------------------------------------- |
| ☐   | **Correction**  | Résout-il vraiment le problème du ticket ?           |
| ☐   | **Cas limites** | Liste vide, `null`, dernière page, grandes valeurs ? |
| ☐   | **Sécurité**    | Entrées validées, autorisations correctes ?          |
| ☐   | **Performance** | Requêtes N+1, boucles, fuites mémoire ?              |
| ☐   | **Lisibilité**  | Compréhensible dans 6 mois, sans sur-ingénierie ?    |
| ☐   | **Dépendances** | Les imports et les API **existent-ils vraiment** ?   |

Faites aussi relire l'agent par lui-même, de préférence dans une session neuve :

```text
Relis le diff que tu viens de produire :
cas limites, sécurité, perf.
```

> Le vrai danger : l'**incompétence cachée**, du code qui a l'air bon. L'agent peut se relire, mais c'est **vous** qui décidez.

## Deux natures de tests, deux publics

*Module 3 · slide « Deux natures de tests, deux publics »*

|                       | **Tests de construction**                           | **Tests fonctionnels**                             |
| --------------------- | --------------------------------------------------- | -------------------------------------------------- |
| **À qui ils servent** | à **l'agent**, pour se contrôler pendant qu'il code | à **l'équipe**, pour savoir ce que fait le produit |
| **Ce qu'ils testent** | l'implémentation, unité par unité                   | le **comportement observable** de l'API            |
| **Durée de vie**      | jetables                                            | durables : ils *sont* la spec exécutable           |

* Un test fonctionnel est un contrat : « GET /bookings renvoie un nextCursor tant qu'il reste des résultats ». C'est celui-là qu'on relit ligne à ligne.
* **Faux succès** : un agent peut affaiblir ou supprimer un test pour le faire passer. On relit les tests comme le code.
* Le coût de production d'un test a chuté, le coût de maintenance n'a pas bougé.

> **En fin de feature**, là où les deux se recouvrent, **le test fonctionnel gagne** : on supprime le doublon.

## Brownfield : comprendre et figer avant de modifier

*Module 3 · slide « Brownfield : comprendre et figer avant de modifier »*

**Pas tout le code d'un coup** : 500 000 lignes ≈ des millions de tokens, ça ne rentre pas. L'agent **navigue** (recherche, lecture ciblée) ; on attaque **par morceaux** : un module, un endpoint.

**Faire comprendre** : demander à l'agent d'expliquer le flux de GET /bookings, de la route à la base, avant de le modifier. Si l'explication est fausse, le code le serait aussi.

**Figer le comportement actuel** avec des tests de caractérisation :

```text
Avant de toucher à BookingsController,
écris des tests qui capturent le
comportement ACTUEL de GET /bookings,
même s'il est faux.
```

Ces tests détectent le **changement**, pas la correction : forme de la réponse, tri, filtres. Si la pagination casse le tri, un test le dit. Un test de caractérisation qui fige un bug est signalé comme tel.

> **Faire comprendre avant de faire modifier** : une explication relue vaut mieux qu'un diff incompris.

## Revue IA : donner le contexte du diff

*Module 3 · slide « Revue IA : donner le contexte du diff »*

| Donner à l'agent relecteur                   | Pourquoi                                   |
| -------------------------------------------- | ------------------------------------------ |
| **Le diff complet**, avec du contexte autour | voir la fonction entière, pas trois lignes |
| **Le ticket**, la demande initiale, le plan  | juger le code sur l'intention              |
| **Les conventions** (instructions projet)    | relever les écarts propres à l'équipe      |
| **La grille** « Relire le code généré »      | chercher les défauts, pas complimenter     |

* Plus de lignes de contexte autour du changement réduit les faux positifs : par exemple `git diff -U10` au lieu des 3 lignes par défaut.
* Une **session neuve** fait un meilleur relecteur que celle qui a écrit le code : elle n'a pas son historique de décisions.

> La revue IA **aide** l'humain, elle ne **décide** pas : c'est un humain qui valide avant le merge.

## À retenir

1. Petits pas, **un commit par étape**.
2. **Rewind** plutôt qu'empiler.
3. Des **tests** comme filet et comme spec, relus comme le code.
4. Une **relecture humaine** avant le merge.

**Mots-clés** : rewind, autorégression, brownfield / greenfield, tests de caractérisation, revue IA, hallucination, human-in-the-loop — voir le glossaire.
