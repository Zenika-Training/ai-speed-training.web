# Handout — Les exercices

**Développeur IA — Foundation · Zenika · support d'exercice**

Les trois exercices des slides : optionnels, indépendants et courts, à faire avec ton propre harness sur le kit d'exercices.

Le kit se télécharge depuis la page de la formation (« Kit de code (.zip) »). Chaque exercice part du kit tel quel : tu peux en faire un, deux, trois… ou aucun, la formation se suit sans. Les consignes sont écrites en **intention** : chacun les réalise avec le mécanisme de son harness (voir « Où ça se règle dans mon outil »).

## Exercice 1 — Du ticket au plan (15 min, optionnel)

_Module 2 · slide « Exercice 1 — Du ticket au plan »_

**Concept** : cadrer avant de coder.

**Demande à ton agent…**

1. **sans rien modifier**, de proposer la **demande initiale** et un **plan** pour `TICKET.md` ;
2. … puis **corrige-les**.

```text
Lis TICKET.md. Sans rien modifier, propose la demande initiale
(fichiers clés, commandes, invariants, pièges) et un plan
en étapes vérifiables.
```

**Réussi quand…**

- **aucun fichier** n'a été modifié ;
- au moins **une correction** vient de toi.

## Exercice 2 — Petits pas, tests, revue (20 min, optionnel)

_Module 3 · slide « Exercice 2 — Petits pas, tests, revue »_

**Concept** : produire et vérifier.

**Demande à ton agent…**

1. d'implémenter **une étape** du plan, **avec ses tests** ;
2. … puis **relis le diff** avec la grille « Relire le code généré », et fais-le relire par l'agent.

Pas de plan ? Pars de `docs/plan-de-secours.md`.

```text
Fais uniquement l'étape 1 du plan, avec ses tests.
```

**Réussi quand…**

- les **tests passent** ;
- tu as repéré **un défaut** de l'agent.

## Exercice 3 — Ma première skill (10 min, optionnel)

_Module 4 · slide « Exercice 3 — Ma première skill »_

**Concept** : capitaliser.

**Demande à ton agent…**

1. d'écrire en **`SKILL.md`** une consigne que tu répètes ;
2. … puis teste-la en **session vierge**.

Pas d'idée ? « Nos tests utilisent `tests/factories`, sans mock. » Modèle : la skill « tests-api » du handout « Étendre l'agent ».

```text
Écris en SKILL.md cette consigne : [la consigne].
Nom, description (quand l'utiliser), consignes.
```

**Réussi quand…**

- la skill **se déclenche** en session vierge.
