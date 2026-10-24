# Handout — Les démos

**Speed training IA · Zenika · démos à rejouer**

Les démos jouées par le formateur pendant la formation, pour les rejouer seul dans votre assistant, que vous ayez été présent ou non. Chaque démo dure quelques minutes et ne demande qu'un assistant de chat.

## Le texte découpé en tokens

_Module 1 · slide « Le texte découpé en tokens » · 1 min, optionnelle_

**Ce que ça montre** : le modèle ne lit pas des mots mais des **tokens**. Les mots courants tiennent en un token, les mots rares sont découpés, et le français consomme plus de tokens que l'anglais.

**À rejouer**

1. Ouvrez un visualiseur de tokens en ligne (par exemple le _tokenizer_ d'OpenAI).
2. Tapez un mot de votre métier, un nom de produit interne par exemple, et regardez en combien de morceaux il est découpé.
3. Tapez la même phrase en français puis en anglais, et comparez le nombre de tokens.

**Ce qu'on observe** : un mot rare ou un nom interne est découpé en plusieurs morceaux, et la phrase française compte plus de tokens que l'anglaise. Plus de tokens, c'est plus cher, plus lent, et plus de place prise dans la context window.

## La souris mange…

_Module 1 · démo « La souris mange… » · 3 min_

**Ce que ça montre** : le modèle choisit la suite **la plus probable**, pas la plus vraie. Relancer change la forme, rarement l'idée ; un seul mot ajouté déplace toute la suite.

**À rejouer**

1. Avant de lancer, devinez vous-même la réponse.
2. Dans une conversation vide, collez :

```text
La souris mange …
Complète la phrase en une ligne.
```

3. Relancez 2 ou 3 fois (bouton « regénérer ») : notez ce qui change et ce qui reste.
4. Ajoutez **un seul mot** et relancez : « La souris **d'ordinateur** mange… », puis « La souris **de laboratoire** mange… ».
5. Comparez les réponses côte à côte.

**Ce qu'on observe** : la première réponse est celle que presque tout le monde devine, parce que c'est la suite la plus fréquente dans les textes, pas parce qu'elle est vraie (une souris mange surtout des graines). Les relances changent la formulation, pas l'idée. Le mot ajouté, lui, change toute la réponse : chaque mot de votre demande pèse.

## Clarifier avant de produire

_Module 2 · slide « Clarifier avant de produire » · 2 min, optionnelle_

**Ce que ça montre** : on demande d'abord une **structure** (le brief), on la corrige, _puis_ le livrable. Le brief validé devient le contexte de l'étape suivante.

**À rejouer**

1. Demandez un brief plutôt que le livrable :

```text
On veut réduire les abandons de réservation sur mobile.
Propose-moi d'abord un brief : objectif, cible, contraintes,
format attendu, points de vigilance. Ne rédige pas encore
la user story.
```

2. Comparez avec ce brief de référence, puis corrigez le vôtre :

```text
objectif: réduire les abandons sur mobile
public_cible: clients qui réservent depuis leur téléphone
contrainte: amélioration visible avant la prochaine release
format_attendu: user story avec critères d'acceptation
points_de_vigilance:
  - ne pas inventer de dépendance technique
  - rester compréhensible par l'équipe produit
```

3. Une fois le brief corrigé, demandez le livrable : « Brief validé. Rédige maintenant la user story avec 3 critères d'acceptation. »

**Ce qu'on observe** : le brief fait apparaître ce que l'IA aurait inventé (une cible, un délai, une contrainte technique). Le livrable produit à partir du brief corrigé est plus juste que celui produit directement depuis le besoin flou.
