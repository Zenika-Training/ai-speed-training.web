---
url: >-
  /ai-speed-training.web/speed-training-ai-for-business/handouts/handout-01-comprendre-la-machine.md
---
# Handout — Comprendre la machine

**Speed training IA · Zenika · fiche module 1**

L'IA ne devine pas : elle prolonge ce qu'on lui donne. Cette fiche explique ce qu'un LLM fait vraiment, et ce qu'il ne sait pas faire.

## Avant tout : sortie subie ou sortie pilotée ?

Une scène classique : on demande « Rédige une user story pour améliorer la réservation », puis on corrige quatre fois (« c'est pour le mobile », « tu as oublié les premium », « plus court »…). Vingt minutes plus tard, le résultat est flou et personne ne sait expliquer ses choix.

Chaque correction révélait une information qu'on pouvait donner **dès le départ** :

| Ce qu'on a dit               | Ce qu'il fallait donner           |
| ---------------------------- | --------------------------------- |
| « rédige une user story »    | un **objectif** explicite         |
| « c'est pour le mobile »     | la **cible** et le **canal**      |
| « tu as oublié les premium » | le **contexte** métier            |
| « plus court »               | le **format** et les **critères** |

Deux façons de travailler avec l'IA, toutes deux utiles :

* **Explorer** (*vibe coding* chez les développeurs) : on tente, on observe, on jette. Idéal pour trouver des idées ou esquisser un brouillon.
* **Livrer** (*AI-driven development*) : on cadre, on contrôle, on capitalise. Indispensable pour un livrable réutilisable et partagé.

**Viber pour explorer, piloter pour livrer.**

## Un LLM prédit la suite

Un **LLM** (*Large Language Model*) est entraîné sur d'énormes volumes de texte. Il produit sa réponse **token après token** : à chaque pas, il choisit un des morceaux les plus probables, avec une part de hasard.

Conséquence : il produit du **plausible**, pas du **vrai**.

Un **token** est un morceau de mot. Les mots courants tiennent en un token, les mots rares sont découpés (« anticonstitutionnellement » = 5 tokens). Le français consomme plus de tokens que l'anglais pour dire la même chose. Plus de tokens, c'est plus cher, plus lent, et plus de place prise dans la mémoire de travail du modèle.

## La réponse varie, et chaque mot compte

* Relancer la même demande donne des réponses **différentes** : une réponse est une **proposition**, pas une vérité.
* Plus la demande est floue, plus les réponses divergent.
* Quelques mots (« mobile », « premium », « critères d'acceptation », « en 5 points ») agissent comme des **signaux** et peuvent changer toute la structure de la réponse.

Quand la sortie bouge beaucoup, la bonne question n'est pas « quel modèle ? » mais « **qu'est-ce que je n'ai pas cadré ?** ».

## Le modèle n'a pas de mémoire

À chaque message, l'assistant **renvoie toute la conversation** au modèle. Ce que vous avez dit plus tôt continue donc de peser sur la suite, et une nouvelle conversation repart de zéro.

## Modèle, assistant, harness, tools

* Le **modèle** (GPT, Claude, Gemini…) est le moteur.
* L'**assistant** (ChatGPT, Copilot, Claude.ai…) est le produit que vous utilisez. Tout le logiciel autour du modèle s'appelle le **harness** : consignes, mémoire, interface.
* Deux assistants sur le même modèle peuvent donner des résultats différents. Les noms changent tous les trimestres ; les notions restent.

Seul, un modèle a des limites : il ignore ce qui s'est passé après son entraînement (**knowledge cutoff**), calcule mal et n'a accès à aucun système de l'entreprise. L'assistant lui branche des **tools** qui compensent : recherche web, calcul, connecteurs **MCP** vers Jira, SharePoint…

## La boucle agentique

Exemple : « Résume les tickets Jira ouverts sur la réservation. »

1. **Demande** : vous écrivez votre demande.
2. **Décision** : le modèle choisit d'appeler un tool.
3. **Exécution** : le harness appelle Jira, avec vos droits d'accès.
4. **Résultat** : les tickets entrent dans le contexte.
5. **Réponse** : le modèle rédige la synthèse.

Les étapes 2 à 4 se répètent tant que le modèle a besoin d'informations. Avoir des tools ne suffit pas : **modèle + tools + boucle + objectif = agent**, et c'est le harness qui fait tourner la boucle.

## Trois raisons de garder la main

| Limite                                                               | Exemple                                                                         | Réflexe                           |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------- |
| **Elle hallucine** : une réponse fausse, assurée et plausible        | des avocats ont cité en justice des jurisprudences inventées par l'IA           | vérifier les faits et les sources |
| **Elle amplifie vos données** : données sales → réponses sales       | un export de réservations sans les annulations donne une analyse trop optimiste | regarder ce qu'on lui donne       |
| **Elle ne remplace pas l'humain** : confiance, négociation, empathie | elle prépare l'argumentaire d'une négociation, elle ne la mène pas              | garder l'humain au contact        |

## À retenir

1. Une réponse est une proposition : **relancez** avant de faire confiance.
2. Quand la sortie varie, cherchez ce que vous n'avez **pas cadré**.
3. Le modèle relit toute la conversation à chaque message : ce qui y traîne compte.
4. Un agent, c'est un modèle qui enchaîne lui-même des tools, en boucle.

**Mots-clés** : LLM, token, knowledge cutoff, assistant, harness, tools, MCP, agent, boucle agentique, hallucination — voir le glossaire.
