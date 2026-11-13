---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood-business/handouts/handout-02-moteur.md
---
# Handout — Le moteur : comment pense un modèle

**L'IA sous le capot — version métiers · Zenika · fiche partie 2**

On ouvre le capot, sans mathématiques. Chaque section répond à une question qu'on se pose en utilisant un assistant : pourquoi il invente, pourquoi il oublie, pourquoi la facture dépend de la longueur.

## La puissance du moteur : les chevaux

*Partie 2 · slide « La puissance du moteur : les chevaux »*

> **Les paramètres sont les chevaux du moteur : ils disent sa puissance, et aussi ce qu'il consomme.**

La puissance d'un moteur se compte en chevaux. Celle d'un modèle se compte en **paramètres** : des milliards de petits nombres, les réglages internes fixés pendant la fabrication (l'usine à moteurs) et qui ne bougent plus ensuite.

| Plus de chevaux, c'est…  | Concrètement                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| **plus de puissance**    | plus de connaissances, un meilleur raisonnement sur les tâches difficiles                        |
| **plus de consommation** | chaque mot produit fait travailler tous les réglages : plus de calcul, plus cher, plus d'énergie |
| **plus de place**        | des cartes graphiques de datacenter ; un petit moteur tient sur un ordinateur portable           |

Ordres de grandeur : GPT-3 (2020) avait 175 milliards de paramètres ; Llama 3.1 (Meta) existe en 8, 70 et 405 milliards ; Mistral Small en a 24 milliards ; Phi-4 (Microsoft) 14 milliards. OpenAI, Anthropic et Google ne publient plus la taille de leurs plus grands modèles.

> **Limite de l'image** : les chevaux ne font pas tout. Comme une voiture récente bien réglée bat une vieille voiture plus puissante, un petit modèle de 2025 (Phi-4, 14 milliards) fait mieux que GPT-3 et ses 175 milliards sur bien des tests. Le réglage à l'usine compte autant que la cylindrée.

Selon le nombre de chevaux, on n'a pas le même véhicule : c'est la section suivante.

## Citadine ou poids lourd ?

*Partie 2 · slide « Citadine ou poids lourd ? »*

> **On ne prend pas un poids lourd pour aller chercher le pain.**

Le nombre de chevaux (de paramètres) fait la catégorie du véhicule : peu de chevaux, une citadine ; beaucoup, un poids lourd.

| Image              | Mot technique | Taille                                                         | Où il tourne                                                            | Forces et limites                                                                         |
| ------------------ | ------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| La **citadine**    | SLM           | de 1 à une quinzaine de milliards de paramètres                | ordinateur portable, téléphone, serveur de l'entreprise (« au garage ») | rapide, économique, vos données ne sortent pas ; moins brillante sur les tâches complexes |
| Le **poids lourd** | LLM           | des centaines de milliards de paramètres (beaucoup de chevaux) | datacenters du fournisseur (OpenAI, Anthropic, Google, Mistral)         | raisonne mieux, sait tout faire ; plus cher, vos données partent chez le fournisseur      |

Exemples de citadines : Phi (Microsoft), Gemma (Google), Mistral Small, Llama (Meta).

Le bon usage est souvent **hybride**, comme une flotte qui a des citadines et des camions : la citadine fait les tâches simples et répétitives (trier, extraire, classer), le poids lourd les tâches difficiles (raisonner, rédiger un document complexe).

Pour un projet : la tâche est-elle simple et répétitive ? Les données peuvent-elles sortir ? Si la réponse est « oui » puis « non », regarder du côté des petits modèles.

## L'usine à moteurs

*Partie 2 · slide « L'usine à moteurs »*

> **Le moteur sort de l'usine figé : il ne s'améliore pas en roulant, ni en vous parlant.**

| Poste de la chaîne | L'image                                           | Mot technique                            | Ce qui se passe                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ① Fabriquer        | le bloc moteur, à partir d'une montagne de textes | pré-entraînement                         | des milliers de milliards de mots (web, livres, code) pour apprendre à deviner la suite d'un texte ; des mois de calcul sur des milliers de GPU, des dizaines ou centaines de millions d'euros pour les plus gros |
| ② Régler           | en faire un assistant                             | ajustement (fine-tuning)                 | des exemples de bonnes réponses, pour devenir un assistant et pas seulement un « compléteur » de texte ; une entreprise peut aussi faire « tuner » un moteur existant pour son usage                              |
| ③ Banc d'essai     | garder les meilleures réponses                    | apprentissage par retours humains (RLHF) | des testeurs comparent deux réponses et choisissent la meilleure ; le modèle apprend à préférer ce qui est utile, poli, sûr                                                                                       |

Ce qu'il faut en tirer :

* **Peu d'entreprises ont une usine** : OpenAI, Anthropic, Google, Mistral, Meta, quelques autres. Toutes les autres achètent un moteur et l'équipent. Pour un projet, la question n'est pas « fabriquer son modèle », mais « choisir le bon moteur ».
* Le moteur a un **millésime** (la « date de coupure ») : il ne connaît pas l'actualité au-delà, sauf si on lui donne un outil de recherche.
* Il ne change pas pendant votre conversation : ce que vous lui dites ne modifie pas le moteur.
* Le fournisseur peut en revanche utiliser vos conversations pour fabriquer les versions suivantes : à vérifier dans les conditions d'utilisation (question n° 2 de la partie 5).

Limite de l'image : une usine ne « lit » pas ; ici, la matière première est du texte.

## Des briques de Lego, pas des mots

*Partie 2 · slide « Des briques de Lego, pas des mots »*

> **On paie et on est limité en briques, pas en mots.**

Le modèle ne lit pas des mots ni des lettres : il découpe le texte en morceaux appelés **tokens**. Les mots courants font une seule brique, les mots rares en font plusieurs.

| Texte                         | Mots | Briques (tokens)                      |
| ----------------------------- | ---- | ------------------------------------- |
| « Le chat dort »              | 3    | `Le` · ` chat` · ` dort`              |
| « Anticonstitutionnellement » | 1    | `Anti` · `constitution` · `nellement` |

* Ordre de grandeur : une page de texte fait environ 500 à 700 tokens en français. Le français consomme un peu plus de briques que l'anglais, parce que les modèles ont surtout appris sur de l'anglais.
* La facture d'une IA se calcule en tokens (voir « Le taxi au compteur »).
* La taille de la mémoire de travail se mesure en tokens (voir « Le plan de travail »).
* Le modèle voit des briques, pas des lettres : d'où des erreurs surprenantes quand on lui demande de compter les lettres d'un mot.

## Une autocomplétion géante

*Partie 2 · slide « Une autocomplétion géante »*

> **Le modèle ne cherche pas la vérité, il cherche la suite la plus plausible.**

Comme la suggestion de mots du clavier de votre téléphone, en beaucoup plus puissant : à chaque étape, le modèle calcule pour chaque brique possible une probabilité d'être la suivante, en choisit une, l'ajoute au texte et **recommence**.

Après « Le chat dort sur le » (chiffres illustratifs) :

| Suite possible | Probabilité |
| -------------- | ----------- |
| canapé         | 41 %        |
| lit            | 22 %        |
| tapis          | 9 %         |
| clavier        | 4 %         |

Une réponse de 300 mots, c'est environ 400 tours de cette boucle. Ce que ça explique :

* les réponses sont fluides et bien construites, parce que c'est exactement ce que le modèle a appris ;
* la même question peut donner deux réponses différentes (voir « Le curseur de créativité ») ;
* « plausible » n'est pas « vrai » : si la bonne information manque, il produit une suite qui a l'air juste (voir « Le GPS sûr de lui »).

## Le GPS des sens

*Partie 2 · slide « Le GPS des sens »*

> **L'IA range les mots par sens, pas par orthographe : c'est ce qui permet la recherche intelligente.**

Chaque mot a une **adresse** ; les mots de sens proche habitent le **même quartier**. Le mot technique : les **embeddings** (plongements). Chaque brique de texte devient une liste de nombres, qu'on peut voir comme des coordonnées sur une carte : « chat » près de « chien », loin de « table ».

À quoi ça sert :

* **chercher par le sens** : une question sur les « congés » retrouve un règlement qui parle de « vacances » ou d'« absences » ;
* **rapprocher des documents** sans mot commun, par exemple regrouper automatiquement des retours clients par thème ;
* c'est la base de l'« examen à livre ouvert » (partie 3).

Ce n'est pas un dictionnaire, c'est un plan de ville : le modèle ne connaît pas la définition des mots, il connaît leurs voisins.

## Le surligneur : relier les mots entre eux

*Partie 2 · slide « Le surligneur : relier les mots entre eux »*

> **Le modèle comprend un mot grâce aux mots qui l'entourent.**

Dans « Le chat ne traverse pas car il est fatigué », pour comprendre « il », le modèle **surligne** « chat ». Le mot technique : l'**attention**, l'invention de 2017 (article *Attention Is All You Need*) qui a rendu les modèles actuels possibles.

* Le modèle tient compte du contexte : « avocat » ne veut pas dire la même chose dans un contrat et dans une recette.
* Plus le texte est long, plus il y a de mots à relier entre eux : c'est l'une des raisons pour lesquelles les longs documents coûtent plus cher et sont parfois moins bien traités (une information au milieu d'un très long texte peut être « moins surlignée »).

## Le plan de travail : sa seule mémoire

*Partie 2 · slide « Le plan de travail : sa seule mémoire »*

> **Ce qui n'est pas sur le plan de travail n'existe pas pour le modèle.**

Le mot technique : la **context window** (fenêtre de contexte). C'est tout ce que le modèle voit au moment de répondre : les consignes, vos documents, l'historique de la conversation, votre question.

| Propriété                               | Ce que ça veut dire                                                                                                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Une taille limitée**                  | de 100 000 à plus d'un million de tokens selon les modèles, soit de quelques centaines à quelques milliers de pages ; au-delà, les éléments les plus anciens sont résumés ou retirés |
| **Tout est relu à chaque message**      | le modèle ne « se souvient » pas : on lui renvoie toute la conversation à chaque fois ; une longue conversation coûte de plus en plus cher et le modèle peut perdre le fil           |
| **Vidé à chaque nouvelle conversation** | sauf fonction « mémoire » de l'outil, qui recolle des post-it en début de conversation (partie 3)                                                                                    |

Conseil pratique : pour un nouveau sujet, ouvrir une nouvelle conversation. Donner les documents utiles plutôt que d'espérer qu'il « sache ».

## Ce qu'il y a sur le plan de travail

*Partie 2 · slide « Ce qu'il y a sur le plan de travail »*

> **Votre question n'est qu'une toute petite partie de ce que le moteur lit : à chaque message, on lui renvoie tout le plan de travail.**

La **context window** se mesure en **tokens** (les briques de Lego) : ici 200 000, environ 330 pages (une page ≈ 600 tokens). C'est l'ordre de grandeur de Claude ; certains modèles vont jusqu'à 1 million. À chaque message, l'assistant y pose, dans cet ordre :

| Bloc              | Volume typique              | Ce qu'il contient                                                                                                                                      |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Consignes**     | ≈ 5 000 tokens, fixe        | le « prompt système » : les règles de l'outil (ton, limites, sécurité, format), vos instructions personnalisées, la description des outils disponibles |
| **Mémoire**       | ≈ 1 000 tokens, fixe        | les post-it que l'outil recolle en début de conversation : ce qu'il sait de vous (partie 3)                                                            |
| **Documents**     | ≈ 30 000 tokens, ça grossit | pièces jointes, pages web, résultats de recherche ; un PDF de 50 pages fait à lui seul environ 30 000 tokens                                           |
| **Historique**    | ≈ 30 000 tokens, ça grossit | tous vos messages et toutes ses réponses depuis le début ; chaque échange ajoute 1 000 à 2 000 tokens                                                  |
| **Votre message** | ≈ 300 tokens                | la question du moment, souvent le plus petit bloc, alors que c'est le seul que vous voyez écrire                                                       |
| **Place libre**   | le reste, ≈ 130 000 tokens  | la réponse s'écrit aussi sur le plan de travail, brique par brique ; si la place manque, la réponse est coupée                                         |

Le compteur (le taxi) tourne sur toute la barre, pas seulement sur votre message. Les consignes et la mémoire, toujours identiques, sont souvent mises en cache (l'abonnement), ce qui les rend moins chères.

## Quand le plan de travail déborde

*Partie 2 · slide « Quand le plan de travail déborde »*

> **Un plan de travail trop rempli ne bloque pas l'IA : il la rend distraite, oublieuse et chère, sans prévenir.**

Après une longue conversation, l'historique et les documents ont mangé toute la place libre : les 200 000 tokens sont atteints. Ce qui se passe alors :

| Effet                    | Ce qui se passe                                                                                                                                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Il oublie le début**   | pour faire de la place, l'outil coupe les premiers échanges (**troncature**) ou les remplace par un résumé (**compaction**) ; un détail, une consigne ou un chiffre donné au début peut disparaître sans prévenir. Les consignes de l'outil, elles, sont gardées |
| **Il se perd au milieu** | même avant d'être plein, un modèle lit mieux le début et la fin que le milieu (étude « Lost in the middle », Stanford, 2023) ; plus le plan de travail est chargé, plus la qualité baisse (« context rot »)                                                      |
| **Plus lent, plus cher** | tout est relu à chaque message : chaque question d'une conversation de deux heures coûte le prix de toute la conversation (le taxi au compteur)                                                                                                                  |
| **Parfois, il refuse**   | « conversation trop longue », ou une réponse coupée net faute de place                                                                                                                                                                                           |

Les symptômes à reconnaître : il répète une erreur déjà corrigée, il oublie une consigne donnée au début, il mélange deux documents, ses réponses deviennent plus vagues.

> **La parade** : ouvrir une nouvelle conversation, en lui demandant d'abord un résumé de ce qui a été décidé, et en ne redonnant que les documents utiles. Un sujet, une conversation.

## Vrai ou faux ?

*Partie 2 · slide « Vrai ou faux ? »*

| Affirmation                                          | Réponse                           | Pourquoi                                                                                                                                        |
| ---------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| « L'IA se souvient de moi d'une fois sur l'autre. »  | **faux**, sauf fonction mémoire   | le plan de travail est vidé ; c'est l'outil qui se souvient (des post-it recollés), pas le moteur                                               |
| « L'IA cherche la réponse sur Internet. »            | **faux**, sauf outil de recherche | par défaut, il répond avec ce qu'il a appris jusqu'à sa date de coupure ; avec une recherche web, il cherche et cite ses sources                |
| « Plus le document est long, plus ça coûte. »        | **vrai**                          | on paie au nombre de briques envoyées et reçues (le taxi au compteur)                                                                           |
| « Ce que je lui apprends, il le retient pour tous. » | **faux**, le moteur ne change pas | attention : selon les conditions d'utilisation, le fournisseur peut utiliser vos conversations pour entraîner les versions suivantes (partie 5) |

## Le GPS sûr de lui : l'hallucination

*Partie 2 · slide « Le GPS sûr de lui : l'hallucination »*

> **Assuré ne veut pas dire exact.** Le modèle invente avec le même aplomb qu'il dit vrai : vérifiez ce qui compte.

Une **hallucination**, c'est une réponse inventée mais présentée avec assurance : une jurisprudence qui n'existe pas, un chiffre faux, une citation imaginaire. Ce n'est ni un bug ni un mensonge : c'est la conséquence de l'autocomplétion. Quand l'information manque, la suite la plus plausible reste… plausible.

Cas célèbre : en 2023, des avocats américains ont déposé des conclusions citant six jurisprudences inventées par ChatGPT ; ils ont été sanctionnés.

Les trois réflexes :

1. **Lui donner vos documents** : il s'appuie alors sur un texte réel plutôt que sur sa mémoire (examen à livre ouvert, partie 3).
2. **Demander ses sources, et les ouvrir** : une source citée peut elle-même être inventée.
3. **Vérifier chiffres, noms, dates** : tout ce qui engage, tout ce qui part chez un client.

Les modèles récents hallucinent moins, mais jamais zéro. La responsabilité reste humaine.

## Le curseur de créativité

*Partie 2 · slide « Le curseur de créativité »*

> **On peut régler la part de hasard, mais jamais la supprimer.**

Le mot technique : la **température**. À chaque étape, le modèle tire au sort la brique suivante parmi les plus probables ; la température règle ce tirage.

| Curseur  | Comportement | Pour                                                        |
| -------- | ------------ | ----------------------------------------------------------- |
| **Bas**  | régulier     | extraire des données d'une facture, résumer, classer        |
| **Haut** | inventif     | brainstorming, slogans, variantes (plus de risque d'erreur) |

Dans les assistants grand public, ce réglage est souvent caché : on l'influence par la consigne (« sois factuel et concis » ou « propose dix idées originales »). Dans les outils d'entreprise, il est réglable. Deux personnes qui posent la même question n'ont donc pas forcément la même réponse, et c'est normal.

## Le taxi au compteur

*Partie 2 · slide « Le taxi au compteur »*

> **Un agent qui relit 50 documents à chaque étape fait tourner le compteur.**

Les abonnements grand public (une vingtaine d'euros par mois) cachent le compteur. Dès qu'on utilise une IA dans un produit ou à l'échelle de l'entreprise, on paie à la brique (au token) :

* **ce qu'on envoie** : la question, mais aussi les consignes, les documents joints et tout l'historique, renvoyés à chaque message ;
* **ce qu'on reçoit** : la réponse, souvent 3 à 5 fois plus chère par brique que l'entrée.

**Le trajet habituel** (le cache) : quand le début du message est identique d'une fois sur l'autre (mêmes consignes, mêmes documents), le fournisseur fait payer cette partie jusqu'à 90 % moins cher. C'est l'abonnement du trajet quotidien.

Ordres de grandeur : un modèle haut de gamme coûte quelques euros par million de briques en entrée ; un agent peut consommer plusieurs millions de briques sur une tâche longue ; les petits modèles sont 10 à 100 fois moins chers.

Pour un projet, trois questions font le budget : combien de demandes par jour, quelle longueur, quel modèle ?
