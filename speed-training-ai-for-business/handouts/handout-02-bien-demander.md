---
url: >-
  /ai-speed-training.web/speed-training-ai-for-business/handouts/handout-02-bien-demander.md
---
# Handout — Bien demander

**Speed training IA · Zenika · fiche module 2**

D'une demande floue à une sortie exploitable : quoi donner à l'IA, dans quel ordre, et comment réutiliser ce qui marche.

## Les 4 ingrédients d'une bonne demande

| Ingrédient          | La question                                               | Exemple                                          |
| ------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| **Rôle / contexte** | Quel rôle l'IA doit jouer, sur quel sujet se concentrer ? | « Tu es PO d'un site de réservation hôtelière. » |
| **Sortie attendue** | Quel format, quelle structure, quelle longueur ?          | « Une user story + 3 critères d'acceptation. »   |
| **Règles**          | Qu'est-ce qui est précis, mesurable, non négociable ?     | « Cible : clients sur mobile. »                  |
| **À éviter**        | Qu'est-ce qu'elle ne doit pas faire ou inclure ?          | « N'invente pas de chiffres. »                   |

**Montrer un exemple** du format attendu vaut mieux qu'une longue description : c'est le **few-shot**.

Modèle à copier :

```text
Tu es [rôle], tu travailles sur [sujet].
Produis [livrable], au format [structure, longueur].
Règles : [cible, contraintes, éléments obligatoires].
À éviter : [ce qu'il ne faut pas inventer ou inclure].
Exemple du format attendu : [un exemple court].
```

## Clarifier avant de produire

1. **Besoin flou** : le besoin tel qu'on l'exprime à l'oral (« améliorer la réservation »).
2. **Brief structuré** : l'IA propose une structure (objectif, cible, contraintes, format), **vous la corrigez et la validez**.
3. **Livrable** : produit à partir du brief validé, pas du besoin flou.

La sortie d'une étape devient le **contexte** de la suivante. On ne demande pas tout d'un coup : on demande d'abord une structure vérifiable.

```text
On veut réduire les abandons de réservation sur mobile.
Propose-moi d'abord un brief : objectif, cible, contraintes,
format attendu. Ne rédige pas encore la user story.
```

## Rewind plutôt qu'empiler

Quand une réponse part mal, la tentation est d'enchaîner les corrections (« non, pas comme ça… »). Chaque correction reste dans la conversation et le contexte devient de plus en plus confus.

Le bon réflexe : **revenir à la demande de départ** (bouton « Modifier » de votre message), la corriger, et relancer. Une mauvaise sortie est une **information sur l'entrée**, pas un texte à corriger.

## Un bon brief devient un actif

Un brief qui marche sur **deux sujets différents** est réutilisable. Trois façons de le capitaliser :

1. **Instructions personnalisées** : toujours chargées (ton, langue, profil).
2. **Assistant personnalisé** : un espace dédié (GPT, Projet Claude, agent Copilot).
3. **Skill** : chargé **à la demande**, quand la tâche correspond (consignes, modèles, exemples).

Exemple d'assistant « User stories » :

```text
Tu es PO de l'équipe Réservation.
Pour chaque besoin que je te donne :
1. Propose d'abord un brief : objectif, cible, contraintes, format.
2. Attends ma validation.
3. Rédige la user story + 3 critères d'acceptation.
Ton clair, sans jargon. N'invente ni chiffres ni dépendances.
```

Attention au vocabulaire : les éditeurs appellent souvent ces assistants personnalisés des « agents ». Au sens strict, un agent est un modèle qui enchaîne lui-même des tools en boucle (voir la fiche 1).

## À retenir

1. Écrivez votre demande avec les **4 ingrédients**, et montrez un exemple.
2. Demandez une **structure**, validez-la, puis demandez le livrable.
3. Une réponse ratée : **rewind**, pas une correction de plus.
4. Ce qui marche deux fois devient un **assistant** ou un **skill** d'équipe.

**Mots-clés** : prompt, brief structuré, few-shot, rewind, instructions personnalisées, assistant personnalisé, skill — voir le glossaire.
