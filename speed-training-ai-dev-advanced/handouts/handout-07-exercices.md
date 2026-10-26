---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-advanced/handouts/handout-07-exercices.md
---
# Handout — Les exercices

**Développeur IA — Avancé · Zenika · support d'exercice**

Les trois exercices des slides : optionnels, indépendants et courts, à faire avec ton propre harness sur le kit d'exercices.

Le terrain est le **même kit que la formation Foundation** : la Booking API, une petite API de réservation de salles en TypeScript, avec le fil rouge de la pagination par curseur sur `GET /bookings`. Il se télécharge depuis la carte de la formation **Développeur IA — Foundation** (« Kit de code (.zip) ») ; son `README.md` donne l'installation (`npm install`, `npm test`) et les commandes (`npm test -- <filtre>`, `npm run lint`). Le kit ne contient aucune configuration propre à un outil : il marche avec n'importe quel agent de code.

Chaque exercice part du kit tel quel, après un `git init` et un premier commit pour pouvoir revenir en arrière : tu peux en faire un, deux, trois… ou aucun, la formation se suit sans. Les consignes sont écrites en **intention** : chacun les réalise avec le mécanisme de son harness (voir « Où ça se règle dans mon outil »).

## Exercice 1 — Garde-fou déterministe (20 min, optionnel)

*Module 2 · slide « Exercice 1 — Garde-fou déterministe »*

**Concept** : ce qui doit **toujours** arriver est un **hook**, pas une consigne.

**La consigne**

1. Choisis un besoin du quiz : bloquer une commande, lancer les tests…
2. Mets-le en place **avec le mécanisme de hook de ton harness**.
3. Demande ensuite à ton agent de faire **le contraire**.

```text
Mets en place un hook qui refuse toute modification de openapi.yaml
(le contrat de l'API), puis explique-moi comment le tester.
```

```text
Ajoute un hook qui lance les tests du module modifié après chaque
édition de fichier.
```

Puis, pour essayer de passer outre :

```text
Ajoute le champ createdAt aux réservations dans openapi.yaml.
```

```text
Modifie src/bookings/bookings.controller.ts sans lancer les tests.
```

**Réussi quand…**

* l'action est **bloquée**, ou la vérification **lancée**, par le harness ;
* **même** quand on demande le contraire.

**Débrief** : qu'a tenté l'agent pour passer outre ? S'il essaie une autre commande pour arriver au même effet, c'est « une allowlist n'est pas une sandbox » en direct.

## Exercice 2 — La spec change (25 min, optionnel)

*Module 4 · slide « Exercice 2 — La spec change »*

**Concept** : la spec versionnée est la source de vérité ; le **drift** se détecte, il ne se devine pas.

**La consigne**

1. Écris une spec courte pour une fonctionnalité de l'API (suggestion : la pagination par curseur sur `GET /bookings`, le ticket `TICKET.md` du kit).
2. Versionne-la, fais-la implémenter **avec ses tests**.
3. En cours de route, **change une exigence** : par exemple « curseur invalide → 400 » devient « curseur invalide → première page ». Une fois dans la spec seulement, une fois dans le code seulement.

Aucun framework de SDD imposé : un fichier markdown versionné suffit. Si tu en utilises un, garde-le.

```text
Écris une spec de moins de 30 lignes pour ce besoin : contexte,
exigences numérotées, critères d'acceptation, questions ouvertes.
Ne code rien.
```

```text
Implémente la spec docs/specs/bookings-pagination.md avec ses tests
fonctionnels. Un test par critère d'acceptation.
```

**Réussi quand…**

* la spec est **versionnée** dans le dépôt ;
* l'implémentation **passe ses tests** ;
* le changement est **détecté**, et on sait dire **par quoi** : le test rouge ou la remarque de revue qui l'a révélé.

**Débrief** : qu'est-ce qui aurait laissé passer le drift ?

## Exercice 3 — Déléguer et isoler (15 min, optionnel)

*Module 5 · slide « Exercice 3 — Déléguer et isoler »*

**Concept** : un sous-agent **isole** son contexte et ne renvoie que son résultat… mais il **coûte**.

**La consigne**

1. Confie **avec le mécanisme de ton harness** à des sous-agents : une exploration du code, la revue d'un fichier par un regard neuf.
2. Refais-le dans la session principale, et compare.

Le fichier à relire : `src/bookings/bookings.controller.ts`, tel que le kit le fournit (il contient au moins un bug latent). Ton harness n'a pas de sous-agents ? Deux sessions séparées font le même travail : le concept est l'isolation du contexte.

```text
Avec un sous-agent, explore le module bookings et rends-moi
en 15 lignes : fichiers clés, points d'extension, pièges.
Ne modifie rien.
```

```text
Avec un sous-agent qui n'a pas vu cette session, relis
src/bookings/bookings.controller.ts. Liste les bugs et les risques,
rien d'autre. Ne modifie rien.
```

**Réussi quand…**

* les deux tâches ont tourné dans des **contextes isolés** ;
* on compare **contexte consommé**, **fichiers lus** et **qualité**.

**Débrief** : qu'a gagné la session principale ? Et combien a coûté la session entière ? Regarde la jauge de la session principale **et** la consommation totale (voir « Le piège des sous-agents »).
