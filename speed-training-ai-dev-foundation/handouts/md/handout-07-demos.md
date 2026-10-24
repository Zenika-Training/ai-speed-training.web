# Handout — Les démos

**Développeur IA — Foundation · Zenika · démos à rejouer**

Les démos jouées par le formateur pendant la formation, pour les rejouer seul, que tu aies été présent ou non. Les deux premières demandent un assistant de chat, la troisième un agent de code et le kit d'exercices (installation dans son `README.md`).

## Le texte découpé en tokens

_Module 1 · slide « Le texte découpé en tokens » · 1 min, optionnelle_

**Ce que ça montre** : le modèle ne lit pas des mots mais des **tokens**. Les mots courants tiennent en un token ; les mots rares et les identifiants sont découpés ; le français consomme plus que l'anglais.

**À rejouer**

1. Ouvre un visualiseur de tokens en ligne (par exemple le _tokenizer_ d'OpenAI).
2. Tape un nom de classe ou de table de ton projet, et regarde en combien de morceaux il est découpé.
3. Tape la même demande en français puis en anglais, puis une ligne de code, et compare les nombres de tokens.

**Ce qu'on observe** : les identifiants et le code sont découpés finement, et l'indentation compte aussi. Un fichier de 2 000 lignes lu par l'agent, ce sont des dizaines de milliers de tokens dans la context window : on facture et on limite en tokens, pas en lignes.

## La souris mange…

_Module 1 · démo « La souris mange… » · 3 min_

**Ce que ça montre** : le modèle choisit la suite **la plus probable**, pas la plus vraie. Relancer change la forme, rarement l'idée ; un seul mot ajouté déplace toute la suite.

**À rejouer**

1. Avant de lancer, devine toi-même la réponse.
2. Dans une conversation vide, colle :

```text
La souris mange …
Complète la phrase en une ligne.
```

3. Relance 2 ou 3 fois (regenerate) : note ce qui change et ce qui reste.
4. Ajoute **un seul mot** et relance : « La souris **d'ordinateur** mange… », puis « La souris **de laboratoire** mange… ».
5. Compare les réponses côte à côte.

**Ce qu'on observe** : la première réponse est celle que presque tout le monde devine, parce que c'est la suite la plus fréquente dans les textes, pas parce qu'elle est vraie (une souris mange surtout des graines). Les relances changent la formulation, pas l'idée. Le mot ajouté change toute la réponse. Même chose pour le code : après `res.status(`, le modèle écrit le code de retour le plus fréquent, pas celui de ton contrat d'API.

**Pour aller plus loin (3 min)** : rendre la variance visible.

1. Demande « Écris une phrase sur une souris. » et relance 3 à 5 fois.
2. Change très peu de mots : ajoute « concise », puis « minimal ».
3. Ajoute un intrus : « Victor Hugo », « Fortnite », un bout de C++.

Le même prompt donne plusieurs trajectoires, et l'intrus contamine la sortie. Dans un dépôt, un nom de fichier, un commentaire obsolète ou une vieille stack trace orientent le code produit de la même façon.

## Une trace d'agent, commentée

_Module 1 · slide « Une trace d'agent, commentée » · 3 min, optionnelle_

**Ce que ça montre** : un agent découvre le code comme nous (il cherche, il lit), demande l'accord avant d'écrire, et ce sont les tests qui le remettent dans le droit chemin. À chaque tour, tout le contexte est renvoyé.

**À rejouer**, sur le kit installé (`npm install`, `npm test` vert), avec l'affichage des appels de tools activé dans ton harness :

```text
Ajoute la pagination par curseur sur GET /bookings, avec ses tests.
```

**Ce qu'on observe**, tour par tour :

- ce que l'agent cherche et lit avant d'écrire la moindre ligne ;
- le moment où le harness demande ton accord pour modifier un fichier ;
- ce qui se passe quand un test échoue ;
- la jauge de contexte, qui grossit à chaque tour.

Compare avec la trace de la slide (7 tours, de 12 k à 21 k tokens) : l'ordre des étapes est souvent proche, les chiffres varient. Pour revenir à l’état initial du kit ensuite, si tu as fait un premier commit : `git restore .` (ou `git stash`).

## Les exercices, montrés en démo

Si le temps manque, le formateur montre un exercice en démo au lieu de le faire faire. Le déroulé est celui de l'exercice, dans le handout « Les exercices » :

- [Exercice 1 — Du ticket au plan](#handout-06-exercices/exercice-1-du-ticket-au-plan) : l'agent en mode plan sur le ticket du kit, et ce que son plan rate ;
- [Exercice 2 — Petits pas, tests, revue](#handout-06-exercices/exercice-2-petits-pas-tests-revue) : une seule étape du plan, ses tests, la relecture du diff, le commit ;
- [Exercice 3 — Ma première skill](#handout-06-exercices/exercice-3-ma-premiere-skill) : la skill « tests-api », et la preuve qu'elle se déclenche en session vierge.
