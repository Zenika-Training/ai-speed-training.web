---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-foundation/handouts/handout-05-garder-la-main.md
---
# Handout — Garder la main

**Développeur IA — Foundation · Zenika · fiche module 5**

Ce qui peut mal tourner avec un agent de code, dans l'ordre des slides du module 5 : une context window polluée, des coûts qui s'emballent, des données qui fuient.

## Plus n'est pas mieux

*Module 5 · slide « Plus n'est pas mieux »*

Quatre états de la context window :

| Situation                                               | État         | Pourquoi                                      |
| ------------------------------------------------------- | ------------ | --------------------------------------------- |
| « Explique-moi cette regex », dans un chat neuf         | **simple**   | attention concentrée                          |
| L'agent a lu 14 fichiers et lancé 3 fois les tests      | **chargée**  | les tools dominent la demande                 |
| Tour 40, objectif changé deux fois, log de 3 000 lignes | **polluée**  | crédible mais faux : c'est le **context rot** |
| Session neuve, demande cadrée, plan validé              | **préparée** | moins d'exploration à l'aveugle               |

* **Lost in the middle** : début et fin sont mieux lus que le milieu. L'essentiel en tête (objectif, invariants, instructions projet).
* **Compaction** : quand l'espace libre se réduit, le harness résume la session, et on ne choisit pas ce qui est gardé.
* **Session polluée** : corriger par-dessus aggrave. On extrait ce qui a de la valeur (une note de reprise), on ouvre une session neuve, on recharge la demande initiale et la note.
* **Ouvrir la context window** : regarder l'occupation du contexte et les tool calls ; demander « Quels fichiers as-tu lus ? Sur quelle hypothèse pars-tu ? » ; élaguer ce qui ne sert plus.

> La bonne question : **tout ce qui reste ici aide-t-il encore la tâche du jour ?** Sinon, une **session neuve**.

## Coûts : le token se paie

*Module 5 · slide « Coûts : le token se paie »*

À chaque tour, le harness renvoie tout le contexte : dans la trace du module 1, 7 tours de 12 k à 21 k tokens, soit **118 k tokens d'entrée cumulés** pour une tâche simple (chiffres illustratifs). Le **cache** du fournisseur sert le début inchangé du contexte à moindre coût ; changer de modèle ou de MCP en cours de route l'invalide.

**5 réflexes**

1. **1 tâche = 1 session** : moins d'historique renvoyé.
2. **Être précis** : une demande cadrée, moins d'exploration.
3. **Couper les MCP inutiles** : chacun pèse dans le contexte.
4. **Garder le même modèle** : sinon le **cache** est perdu.
5. **Demander du concis** : moins de tokens en sortie.

> Le token se paie, en **entrée** comme en **sortie** : le préfixe déjà vu est **renvoyé à chaque tour**.

## 5 risques, 5 garde-fous

*Module 5 · slide « 5 risques, 5 garde-fous »*

| Risque                  | Ce qui arrive                                      | Exemple réel                                            | Garde-fou                     |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| **Hallucination**       | une API ou un paquet inventés, mais plausibles     | un paquet inventé par l'IA, publié ensuite par un tiers | tests, typage, relecture      |
| **Prompt injection**    | un contenu piégé détourne l'agent                  | une issue publique qui fait fuiter un dépôt privé       | accès de l'agent limités      |
| **Fuite de données**    | code, secrets ou données sortent de l'entreprise   | du code propriétaire collé dans un chatbot              | outils validés, pas de secret |
| **Action destructrice** | l'agent supprime ou écrase ce qu'il ne fallait pas | une base de production effacée par un agent             | sandbox, humain qui valide    |
| **Coûts**               | une consommation qui s'emballe                     | des clés volées, des factures à 5 chiffres              | plafonds, suivi               |

* **Prompt injection** : pour le modèle, tout est du texte, donnée et consigne se confondent. L'instruction peut être cachée dans un README, une issue, une page web, une réponse MCP. Aucun garde-fou ne bloque 100 % des injections : l'architecture (permissions, isolation) borne le risque.
* **Faux succès** : « tous les tests passent »… après avoir supprimé le test. On relit le diff et les tests.
* **Secrets** : jamais de `.env`, de jeton ou de mot de passe dans le contexte. Ce qui entre dans la context window part chez le fournisseur du modèle.
* **Dépendances** : vérifier qu'un paquet existe **et** qu'il est le bon.

## Le trio létal

*Module 5 · slide « 5 risques, 5 garde-fous » (encadré)*

**Données privées** + **contenu non fiable** + **sortie vers l'extérieur** = exfiltration possible. L'issue piégée coche les trois cases : un agent qui lit les issues publiques, accède au dépôt privé et peut commenter.

> **Casser au moins une branche** : pas d'accès au privé, ou pas de droit d'écrire vers l'extérieur.

Une consigne « ne lance jamais de commande destructrice » dans les instructions projet n'est qu'une suggestion : la règle vit dans le **harness** (permissions, isolation), pas dans le prompt.

## 2 règles d'or

*Module 5 · slide « 2 règles d'or »*

| Règle                                             | Ce qu'elle couvre                                                                                                                   | Le test                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **1. Code et données sensibles : outils validés** | Rien de confidentiel hors des harness et modèles validés par l'entreprise : code client, données de prod, secrets (`.env`, jetons). | L'enverriez-vous par email à un inconnu ? |
| **2. Un humain valide avant le merge**            | Obligatoire pour ce qui est irréversible : merge, déploiement, migration, push forcé. Le code généré est le vôtre.                  | Qui signe si c'est faux ?                 |

* **Shadow AI** : un abonnement personnel n'a pas les garanties d'un compte entreprise (rétention, entraînement sur les données, localisation).
* En mission chez un client, ce sont **les règles du client** qui s'appliquent : vérifier avant la première session.
* La mention « co-écrit avec l'IA » dans un commit ne transfère aucune responsabilité.

> Ces deux règles couvrent l'essentiel des risques : la **fuite** d'un côté, l'**erreur** de l'autre. C'est le **human-in-the-loop**.

## À retenir

1. **Une tâche, une session.** Jamais de secret dans le contexte.
2. Plus n'est pas mieux : **ouvrir la context window**, élaguer.
3. Trio létal : **casser une branche**.
4. Le token se paie ; les règles de l'entreprise s'appliquent.

**Mots-clés** : context rot, lost in the middle, compaction, cache, plafond de dépense, prompt injection, fuite de données, trio létal, shadow AI, human-in-the-loop — voir le glossaire.
