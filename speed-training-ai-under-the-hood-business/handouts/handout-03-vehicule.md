---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood-business/handouts/handout-03-vehicule.md
---
# Handout — Le véhicule : ce qu'est un agent

**L'IA sous le capot — version métiers · Zenika · fiche partie 3**

Jusqu'ici, le moteur ne faisait qu'écrire. Un agent, c'est ce qui lui permet d'agir : ouvrir des fichiers, chercher, envoyer, vérifier. Cette fiche décrit ses quatre ingrédients, sa boucle, ses outils, sa façon de consulter vos documents, sa « mémoire » et ses façons de dérailler.

## Agent = moteur + outils + boucle + mission

*Partie 3 · slide « Agent = moteur + outils + boucle + mission »*

> **Un agent, c'est un modèle à qui on a donné des mains, et un logiciel qui décide quelles mains il peut utiliser.**

| Ingrédient  | Rôle                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| **Moteur**  | le modèle, qui décide de la prochaine action                                                            |
| **Outils**  | ce que le véhicule sait faire : lire un fichier, chercher sur le web, envoyer un mail, consulter le CRM |
| **Boucle**  | agir, regarder le résultat, recommencer                                                                 |
| **Mission** | un objectif clair, et un critère pour savoir quand c'est fini                                           |

Le modèle n'agit jamais directement : il écrit « je voudrais envoyer ce mail à ce client ». C'est le logiciel autour (le véhicule, le **harness**) qui exécute, qui demande votre accord ou qui refuse. C'est là que se jouent la sécurité et la confiance (partie 5).

Exemples d'agents : Copilot ou ChatGPT en mode agent, les agents de support client, les agents de code utilisés par les développeurs (Claude Code, Codex).

## La boucle du livreur

*Partie 3 · slide « La boucle du livreur »*

> **Un agent tourne en boucle jusqu'à ce qu'il pense avoir fini : d'où l'importance d'une mission claire.**

Les spécialistes décrivent cette boucle en trois temps : collecter le contexte, agir, vérifier le travail. Exemple : « Prépare la synthèse des retours clients de mars. »

1. **Regarder** : l'agent liste les fichiers du dossier « retours ».
2. **Agir** : il ouvre le premier fichier.
3. **Vérifier** : il lit le contenu, décide qu'il en faut d'autres.

Puis on recommence : il ouvre les fichiers suivants, regroupe par thème, rédige, relit. Quand il juge la mission accomplie, il répond.

Chaque tour est un appel au moteur, qui relit tout le plan de travail : le compteur tourne. Une tâche simple, c'est 3 tours ; une tâche mal définie, 50.

## La boîte à outils et le quai de chargement

*Partie 3 · slide « La boîte à outils et le quai de chargement »*

> **MCP est un quai standard, pas un outil : ce qui compte, c'est l'entrepôt derrière le quai, et qui a le droit de s'y garer.**

L'image : chaque service de l'entreprise (Google Drive, Jira, Slack, le CRM) est un entrepôt. Les outils (la boîte à outils de l'agent) servent à agir ; MCP est la norme commune des quais : même hauteur, même porte, même façon d'annoncer ce qu'on peut charger ou déposer.

Avant, chaque assistant devait développer sa propre connexion à chaque outil (Google Drive, Salesforce, Jira, la messagerie…). Le **MCP** (Model Context Protocol), lancé par Anthropic fin 2024 et adopté depuis par OpenAI, Google et Microsoft, est cette norme de quai : un éditeur publie un « serveur MCP » pour son produit (il ouvre son quai), et tous les agents compatibles peuvent s'y garer. Un quai ouvert une fois sert à tous les agents. Anthropic le présente comme « l'USB-C de l'IA » : c'est l'expression qu'on entend en réunion.

Exemple : un agent qui lit vos tickets Jira, consulte une page Notion et écrit dans Slack, via trois quais MCP.

> **Attention** : ouvrir un quai, c'est donner accès à l'entrepôt. Un serveur MCP non maîtrisé peut lire ou envoyer des données. On n'ouvre pas son quai à n'importe quel véhicule, et on ne gare pas son véhicule à un quai inconnu (partie 5).

## L'examen à livre ouvert

*Partie 3 · slide « L'examen à livre ouvert »*

> **Pour qu'une IA réponde sur vos documents, on ne la réentraîne pas : on lui ouvre le bon classeur à la bonne page.**

Le mot technique : le **RAG** (Retrieval-Augmented Generation, « génération augmentée par la recherche »). C'est le principe de la plupart des assistants « sur vos documents » (base de connaissances, intranet, contrats).

1. **Chercher** : on retrouve les passages utiles dans vos documents, grâce au GPS des sens (recherche par le sens).
2. **Poser sur le plan de travail** : on ajoute ces passages à la question.
3. **Répondre** : le modèle s'appuie sur ces passages, et peut les citer.

Pourquoi c'est mieux que de réentraîner le modèle : moins cher, à jour dès qu'un document change, et on peut vérifier la source.

Limite : si la recherche ramène les mauvaises pages, la réponse sera fausse avec assurance. La qualité dépend de la qualité et de l'organisation des documents.

## Post-it, carnet, archives

*Partie 3 · slide « Post-it, carnet, archives »*

> **La « mémoire » d'une IA, c'est toujours du texte qu'on recolle sur le plan de travail.**

| Image            | Ce que c'est                                                                                                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le **post-it**   | la conversation en cours ; effacé à la fin                                                                                                                                                                                                              |
| Le **carnet**    | la fonction « mémoire » de certains assistants (ChatGPT, Claude, Copilot) : quelques faits sur vous (« préfère les réponses courtes », « travaille dans les RH ») recollés au début de chaque conversation ; consultable et effaçable dans les réglages |
| Les **archives** | les documents de l'entreprise, consultés à la demande (l'examen à livre ouvert)                                                                                                                                                                         |

Le moteur lui-même ne retient rien : tout ce qu'on appelle « mémoire » est un carnet tenu par le véhicule.

Conseil : vérifier ce que le carnet contient sur vous, surtout sur un outil personnel utilisé pour le travail.

## Les sorties de route

*Partie 3 · slide « Les sorties de route »*

> **Chaque sortie de route a sa parade, et elle se place dans le véhicule ou l'organisation, pas dans le moteur.**

| Sortie de route              | Ce qui se passe                                                             | Parade                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Il tourne en rond**        | il retente la même chose sans progresser                                    | limiter le nombre de tours, l'arrêter s'il se répète                                               |
| **Il dit « fini » trop tôt** | le « faux succès » : « j'ai traité les 40 fichiers » alors qu'il en a lu 12 | une vérification indépendante, par un humain ou par un autre agent (le contrôle qualité, partie 4) |
| **Le compteur s'emballe**    | un agent laissé seul la nuit peut consommer des centaines d'euros           | un budget par tâche, des alertes                                                                   |
| **Il obéit à un faux ordre** | un document qu'il lit contient une consigne cachée                          | voir la partie 5                                                                                   |

Pour vous : où ce livreur pourrait-il se tromper dans votre métier ?
