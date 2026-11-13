---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood-business/handouts/handout-01-carte.md
---
# Handout — La carte : qui est qui

**L'IA sous le capot — version métiers · Zenika · fiche partie 1**

Six mots qu'on entend partout en réunion, une image pour chacun : une entreprise de livraison, ses moteurs, ses véhicules, son dispatch. Cette fiche pose le décor de toute la session et le vocabulaire commun.

> **Le fil rouge** : suivre une demande, de la question posée à l'assistant jusqu'au travail livré. Chaque partie ajoute une pièce au décor routier : le moteur (partie 2), le véhicule (3), la flotte (4), le code de la route (5).

## Le trajet d'une demande

*Ouverture · slide « À la fin de la session, vous saurez… »*

Une demande part de votre ordinateur, monte dans un **véhicule** (l'assistant), passe par le **boîtier de la flotte** (le contrôle de l'entreprise), atteint le **moteur** (le modèle), prend des **outils** et arrive validée. À la fin de la session, vous saurez expliquer à un collègue ce qui se passe quand on pose une question à un assistant IA, et quelles questions poser avant d'adopter un outil.

| Partie | Vous saurez                       | Image                       |
| ------ | --------------------------------- | --------------------------- |
| 1      | **Situer** : qui est qui          | la carte                    |
| 2      | **Comprendre** le modèle          | le moteur                   |
| 3      | **Reconnaître** un agent          | le véhicule                 |
| 4      | **Organiser** une flotte d'agents | l'équipement, le dispatch   |
| 5      | **Questionner** sécurité et coûts | le boîtier et ses contrôles |

Le mot technique n'est donné qu'une fois, sous l'image, pour que vous le reconnaissiez ensuite en réunion.

## Une entreprise de livraison

*Partie 1 · slide « Une entreprise de livraison »*

> **Le moteur ne livre rien tout seul.** Pour livrer, il faut un véhicule, un chauffeur, de l'équipement, un dispatch et des bons de commande.

| Mot technique     | L'image                              | En clair                                                                                                                                            |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LLM**           | le **moteur**                        | le grand modèle de langage : puissant, mais il ne fait que tourner (ChatGPT, Claude, Gemini, Mistral sont bâtis autour d'un moteur de ce type)      |
| **SLM**           | le petit moteur, la **citadine**     | un petit modèle : moins puissant, moins cher, il peut rester « au garage », c'est-à-dire tourner sur vos machines sans envoyer vos données ailleurs |
| **Agent**         | le **véhicule** en mission           | un moteur, un chauffeur, des outils et une destination : il décide lui-même de sa route                                                             |
| **Harness**       | l'**équipement** du véhicule         | grand coffre pour les meubles, caisson frigo pour le frais : même moteur, véhicules très différents                                                 |
| **Orchestrateur** | le **dispatch**                      | il répartit les tournées entre plusieurs véhicules                                                                                                  |
| **SDD**           | le **dispatch par bons de commande** | rien ne part sans bon signé, et chaque bon devient une tournée confiée à un agent                                                                   |

Ce qui distingue deux produits construits sur le même modèle, c'est l'équipement, pas le moteur. Le boîtier de la flotte (gateway) et ses contrôles (guardrails) complètent le décor en partie 5.

> **Limite de l'image** : un vrai moteur ne décide rien ; un modèle d'IA, lui, choisit la prochaine action d'un agent.

## Pas à pas, bus ou taxi ?

*Partie 1 · complément de la slide « Une entreprise de livraison »*

> **Plus l'IA décide du trajet, plus c'est souple, et moins c'est prévisible.**

| Image                   | Mot technique | Qui décide ?     | Exemple                                                                                                                                   |
| ----------------------- | ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| La **course pas à pas** | chatbot       | **vous**         | ChatGPT, Le Chat, Copilot dans Teams en simple conversation : vous passez chaque commande, il fait la course, vous décidez de la suivante |
| La **ligne de bus**     | workflow      | **le programme** | un mail arrive, l'IA le classe, l'IA le résume, on l'envoie au bon service                                                                |
| Le **taxi**             | agent         | **l'IA**         | « prépare la synthèse des retours clients du mois » : il choisit ses fichiers, ses outils, son arrêt                                      |

* Le **bus** est prévisible, peu cher, facile à vérifier.
* Le **taxi** est souple, mais on ne sait pas à l'avance combien de détours il fera, ni combien ça coûtera.
* Le conseil des spécialistes (Anthropic, *Building effective agents*, 2024) : prendre la solution la plus simple qui marche. Si le trajet est connu, un bus suffit.

Pour vous : dans votre métier, quelle tâche relève du bus, laquelle du taxi ?

## Qui parle à qui

*Partie 1 · slide « Qui parle à qui »*

> **Le moteur propose, le véhicule agit.**

1. **Vous** formulez une demande dans un outil (un assistant, un agent).
2. **Le véhicule** (le logiciel autour du modèle) prépare le message : votre demande, les documents utiles, les consignes.
3. **Le boîtier de la flotte** (la gateway), dans une entreprise outillée, posé entre le véhicule et le moteur : il vérifie, il compte, il masque les données sensibles.
4. **Le moteur** (le modèle) répond. Souvent, par une demande d'action : « ouvre tel fichier », « envoie tel mail ».
5. **Le véhicule** décide d'exécuter ou non cette action, puis renvoie le résultat au moteur. Et ainsi de suite.

Le modèle ne fait qu'écrire : il ne clique sur rien, il n'envoie rien. C'est le logiciel autour qui agit, et c'est donc là qu'on place les autorisations et les garde-fous (partie 5).

Pour un usage individuel (ChatGPT sur son téléphone), il n'y a souvent pas de boîtier d'entreprise : vos données vont directement chez le fournisseur.

## Quiz : qui est qui ?

*Partie 1 · slide « Quiz : qui est qui ? »*

On classe des **rôles**, pas des marques : un même produit peut jouer plusieurs rôles.

| Produit                      | Rôle                             | Image                                  | Pourquoi                                                                                                                   |
| ---------------------------- | -------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ChatGPT                      | **assistant : harness + outils** | le véhicule à qui vous passez commande | plus qu'un chatbot : recherche web, fichiers, mémoire, mode agent autour d'un moteur ; vous êtes le commanditaire          |
| GPT-5, Claude, Mistral Large | **LLM**                          | le moteur                              | les modèles eux-mêmes ; un même moteur équipe plusieurs produits                                                           |
| Mistral Small sur Ollama     | **SLM en local**                 | la citadine                            | un petit modèle qui tourne sur un poste ; Ollama est le logiciel qui le fait tourner                                       |
| Copilot agent                | **agent**                        | le véhicule                            | il agit dans vos outils Microsoft 365                                                                                      |
| Power Automate + IA          | **workflow**                     | la ligne de bus                        | les étapes sont fixées par la personne qui a conçu le flux                                                                 |
| NotebookLM                   | **assistant sur vos sources**    | il travaille à livre ouvert            | un produit, pas une technique : il répond à partir des sources que vous lui donnez ; le RAG est une des façons de le faire |
| MCP                          | **protocole d'outils**           | le quai de chargement standard         | ni un agent ni un outil : la norme commune des quais, chaque service ouvre le sien                                         |
| Claude Code                  | **harness + agent**              | l'équipement                           | l'équipement autour du modèle Claude, surtout pour les développeurs                                                        |
| LangGraph                    | **orchestrateur**                | le dispatch                            | il fait travailler plusieurs agents                                                                                        |
| GitHub Spec Kit              | **SDD**                          | le dispatch par bons de commande       | il fait écrire la spécification, la découpe en tâches et pilote les agents tâche par tâche                                 |
| Llama Guard                  | **guardrail**                    | un contrôle du boîtier                 | un petit modèle qui filtre ce qui entre dans le moteur et ce qui en sort                                                   |
| LiteLLM                      | **gateway**                      | le boîtier                             | le point de passage unique vers les modèles                                                                                |
