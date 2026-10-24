# Handout — Spec-driven et qualité

**Développeur IA — Avancé · Zenika · fiche module 4**

Garder le code aligné sur l'intention, et le prouver : cette fiche reprend le module 4, de la spec versionnée aux tests et au drift.

## Ce que l'IA change dans notre façon de travailler

_Module 4 · slide « Ce que l'IA change dans notre façon de travailler »_

L'agent a compressé le temps de **production**, pas celui de **vérification**.

|                     | Hier                            | Avec un agent                           |
| ------------------- | ------------------------------- | --------------------------------------- |
| **Rythme**          | une feature = des jours         | une feature = des heures                |
| **Ce qui garantit** | revues et rituels, a posteriori | contrôles systématiques, à chaque étape |

> Les revues **ne disparaissent pas** : elles ne suffisent plus **seules**. On leur adjoint des **contrôles automatiques**, au rythme de l'agent.

- Nos garanties sont des rendez-vous humains, après coup, à intervalle fixe. Quand le volume produit entre deux rendez-vous est multiplié, le rendez-vous devient un goulot, puis une formalité.
- Le systématique prend ce qui se vérifie mécaniquement (les tests passent-ils ? la spec est-elle à jour ?) ; le temps humain garde l'intention, l'architecture, les arbitrages.

Le **SDD** est une réponse possible : une chaîne d'artefacts relus par un humain, chaque sortie est un fichier versionné.

| Étape           | Produit      | Contenu                            |
| --------------- | ------------ | ---------------------------------- |
| **Spécifier**   | `spec.md`    | le quoi et le pourquoi             |
| **Planifier**   | `plan.md`    | le comment technique               |
| **Découper**    | `tasks.md`   | de petites tâches vérifiables      |
| **Implémenter** | code + tests | un agent, ou des workers par tâche |

Le SDD donne aux agents un objectif écrit et un critère d'arrêt. Outillage, par exemple : Spec Kit, Kiro, OpenSpec, BMAD ; ils fonctionnent au-dessus de n'importe quel harness.

## Trois postures face à la spec

_Module 4 · slide « Trois postures face à la spec »_

**SDD** : la spec versionnée est la source de vérité que l'agent implémente et que les tests vérifient.

| Posture            | La spec                                                       | Le risque                                                                              |
| ------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Spec-first**     | écrite d'abord, comme prompt structuré ; non maintenue        | elle diverge du code                                                                   |
| **Spec-anchored**  | spec et code évoluent ensemble                                | les écarts sont détectés                                                               |
| **Spec-as-source** | seule la spec est éditée ; le code devient un artefact généré | aucun framework ne le fait (encore) : il faudrait rejouer tous les changements de spec |

> Cible réaliste : **spec-anchored**. L'agent sait **formaliser** une spec, pas décider **ce qui doit être vrai**.

- Un curseur de maturité, pas un interrupteur : on démarre en spec-first, on consolide en spec-anchored.
- L'agent formalise volontiers : critères d'acceptation, cas limites (curseur invalide, `limit` négatif, tri instable), dépendances repérées dans le code. Il ne peut pas décider si un curseur invalide doit renvoyer 400 ou la première page : c'est une décision humaine.
- Une spec générée et non relue est une **hypothèse**, pas une source de vérité. Bon usage : demander à l'agent de **lister les questions ouvertes**, plutôt que de les trancher.
- La connaissance se perd à chaque passage de main (intention → ticket → dev → agent → code), et l'agent comble les trous avec du plausible : d'où une intention écrite une fois, versionnée, relue.

```text
Écris une spec de moins de 30 lignes pour ce besoin : contexte,
exigences numérotées, critères d'acceptation, questions ouvertes.
Ne tranche pas les questions ouvertes. Ne code rien.
```

## Spec-centric ou workflow-centric

_Module 4 · slide « Spec-centric ou workflow-centric »_

|                   | Spec-centric             | Workflow-centric                     |
| ----------------- | ------------------------ | ------------------------------------ |
| **Exemples**      | Spec Kit, OpenSpec, BMAD | Superpowers                          |
| **Référence**     | la **spec**, versionnée  | la **discipline**, encodée en skills |
| **Ce qui survit** | un document relisible    | un process reproductible             |
| **Point fort**    | mémoire longue du projet | boucle d'implémentation serrée       |

> Pas un concurrent à départager : les deux se **combinent**. La spec quand elle doit survivre à la session ; le workflow pour une exécution serrée sur une tâche bornée.

La spec n'est qu'une partie de la doc : elle décrit le quoi. Ce qu'on conserve dans le temps, c'est la **documentation**, fonctionnelle (critères d'acceptation) et technique (architecture, invariants, ADR, runbooks), tenue à jour. Le code est un artefact que la doc permet de reprendre.

## Garde-fous : du code au commit

_Module 4 · slide « Garde-fous : du code au commit »_

L'agent génère vite : sans garde-fou, l'écart avec l'intention passe **inaperçu**.

| Garde-fou              | Ce que c'est                                           | Vérifie                              |
| ---------------------- | ------------------------------------------------------ | ------------------------------------ |
| **1. Tests**           | le contrat exécutable                                  | le comportement                      |
| **2. Revue agentique** | par un agent **distinct** de celui qui a écrit le code | le diff, avant d'envoyer             |
| **3. Commit**          | le point de synchronisation entre code, spec et IA     | la doc suit, la part d'IA est tracée |

> **Règle minimale** : aucun code généré ne part en production sans **vérification déterministe** (tests, analyse statique) et **revue par un agent distinct**.

- Les trois niveaux sont complémentaires. Ordre dans un pipeline : le **déterministe** d'abord (lint, types, tests, mutation), l'**agentique** ensuite, l'**humain** en dernier. Un agent de revue doit avoir le droit de ne rien dire sur un diff propre.
- **Traçabilité IA** au commit : le trailer `Co-Authored-By:` est une convention git standard (qui a écrit), que certains harness posent nativement ; un footer comme `AI-Generated: ~80%` est une convention d'équipe, approximative (combien).
- **La spec à jour ?** Un contrôle au commit compare le diff et la spec, et bloque si une mise à jour est attendue : un hook (avant le tool `git commit`), un hook git classique ou un job de CI.

```text
feat(bookings): pagination par curseur

Co-Authored-By: <agent>
AI-Generated: ~80%
```

## Tests générés : deux natures, une mesure

_Module 4 · slide « Tests générés : deux natures, une mesure »_

|                  | Tests de construction                   | Tests fonctionnels                                                       |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| **Servent**      | à l'agent                               | à l'équipe                                                               |
| **Testent**      | l'implémentation, unité par unité       | les effets observables                                                   |
| **Durée de vie** | **jetables**                            | **durables** : la spec exécutable                                        |
| **Exemple**      | « le repository reçoit le bon curseur » | « GET /bookings renvoie un `nextCursor` tant qu'il reste des résultats » |

> En fin de feature, là où les deux se recouvrent, **le test fonctionnel gagne** : on supprime le doublon de construction.

- Le critère n'est pas « unitaire vs intégration », mais **à qui le test rend service**. Un test fonctionnel survit à une réécriture de l'implémentation ; on le relit ligne à ligne.
- Le symptôme d'une suite générée trop couplée : toucher une ligne casse dix tests (mocks partout, une classe = un test). Le coût de production d'un test a chuté, son coût de maintenance n'a pas bougé.
- **Score de mutation** : on modifie le code exprès (`<` devient `<=`), la suite doit **échouer**. Bien plus dur à tricher que la couverture, qu'un agent peut faire monter sans rien vérifier. Outils : Stryker (JS/TS, .NET), PIT (Java), mutmut (Python), cargo-mutants (Rust). Cadence réaliste : nocturne, sur les modules critiques.

## Le drift spec ↔ code : qui le détecte ?

_Module 4 · slide « Le drift spec ↔ code : qui le détecte ? »_

**Drift** : l'écart qui s'installe entre la spec et le code. (On dit « context rot » pour la dégradation d'une session, pour ne pas confondre.)

| Détecteur                    | Ce qu'il voit                                          | Ce qu'il rate                      |
| ---------------------------- | ------------------------------------------------------ | ---------------------------------- |
| **Tests fonctionnels**       | un comportement qui contredit une exigence **encodée** | une exigence nouvelle, sans test   |
| **Revue de spec** dans la PR | un diff qui ne raconte pas la même chose que la spec   | ce que le relecteur n'a pas lu     |
| **Contrôle au commit**       | du code changé sans spec touchée                       | une spec touchée… mais fausse      |
| **Personne**                 | —                                                      | tout : le drift est **silencieux** |

> Quand une exigence change, c'est la **revue de spec** qui le voit d'abord. Aucun détecteur ne suffit seul.

Exemple : l'exigence « curseur invalide → 400 » devient « curseur invalide → première page ». Code changé sans la spec : le test fonctionnel casse (bonne nouvelle). Spec changée sans le test : rien ne casse, seul un relecteur de la spec le voit.

> **Tip du module** : si la spec n'est pas versionnée avec le code, **elle ment déjà**. Spec, tests et commit dans le même dépôt, c'est ce qui rend le drift visible.

L'exercice 2 fait changer une exigence en cours de route : voir « Les exercices ».

## À retenir

1. L'agent compresse la **production**, pas la **vérification** : on ajoute des contrôles au rythme de l'agent.
2. Cible réaliste : **spec-anchored** ; l'agent formalise, l'humain décide ce qui doit être vrai.
3. Garde-fous dans l'ordre : **déterministe**, **agentique**, **humain** ; le commit trace la part d'IA.
4. Les tests fonctionnels durent, les tests de construction se jettent ; le **score de mutation** mesure leur vraie valeur.

**Mots-clés** : SDD, spec-first / spec-anchored / spec-as-source, spec-centric / workflow-centric, drift, tests de construction / tests fonctionnels, mutation testing, guardrails — voir le glossaire.
