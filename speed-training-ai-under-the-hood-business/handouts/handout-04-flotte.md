---
url: >-
  /ai-speed-training.web/speed-training-ai-under-the-hood-business/handouts/handout-04-flotte.md
---
# Handout — La flotte : faire travailler plusieurs agents

**L'IA sous le capot — version métiers · Zenika · fiche partie 4**

Un véhicule ne suffit plus : comment on l'équipe, comment on répartit le travail entre plusieurs, comment on décrit ce qu'on veut. Trois images : l'équipement, le dispatch et le dispatch par bons de commande.

## L'équipement fait le véhicule

*Partie 4 · slide « L'équipement fait le véhicule »*

> **Deux produits construits sur le même modèle peuvent donner des résultats très différents : c'est l'équipement qui fait la différence.**

Le mot technique : le **harness**, tout ce qui n'est pas le modèle dans un agent. Même moteur, véhicules différents : grand coffre, caisson frigo ou hayon, selon le métier.

| Équipement              | Ce que c'est                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------- |
| **Ses outils**          | ce qu'il peut faire : lire, écrire, chercher, envoyer                               |
| **Ses autorisations**   | ce qu'il a le droit de faire seul, ce qui demande votre accord, ce qui est interdit |
| **Ses consignes**       | les instructions permanentes : ton, règles métier, documents de référence           |
| **Son journal de bord** | la trace de ce qu'il a fait, pour vérifier et pour comprendre une erreur            |

Exemple : le même modèle GPT équipe ChatGPT, Copilot dans Word et des dizaines d'outils métiers. Ce qui change entre eux, c'est l'équipement.

Question à poser à un éditeur : « quel modèle utilisez-vous, et qu'est-ce que votre produit ajoute autour ? »

## Le dispatch

*Partie 4 · slide « Le dispatch »*

> **Quand une tâche est trop grosse pour un seul agent, on la découpe et on la répartit.**

Le mot technique : l'**orchestrateur**. Comme une répartitrice devant sa carte, il envoie les véhicules vers leurs tournées : il découpe une mission en tâches, les confie à plusieurs agents (souvent spécialisés), attend leurs résultats et les assemble. Il décide qui fait quoi, dans quel ordre, et que faire si un véhicule tombe en panne.

Pourquoi plusieurs agents plutôt qu'un seul :

* chacun a un plan de travail plus petit et plus clair ;
* ils peuvent travailler en même temps ;
* on peut les spécialiser (un agent juridique, un agent financier).

Exemples d'outils : LangGraph, CrewAI, les outils d'automatisation comme n8n ; et de plus en plus, les assistants eux-mêmes savent lancer des « sous-agents ».

Le prix : plus d'agents, plus d'appels au moteur, donc un compteur qui tourne plus vite. On n'orchestre que si ça vaut le coup.

## Cinq façons d'organiser le travail

*Partie 4 · complément de la slide « Le dispatch »*

> **On organise des agents comme on organise une équipe.**

| Image                    | Mot technique          | Comment ça marche                                                        | Exemple                                                                                                               |
| ------------------------ | ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| La **chaîne de montage** | chaîne                 | chaque étape prend le résultat de la précédente                          | rédiger un brief, puis un plan, puis le document                                                                      |
| L'**aiguillage**         | routeur                | un premier agent trie et envoie chaque demande au bon spécialiste        | un petit modèle trie les mails entrants : cas simples vers un agent économique, cas complexes vers un modèle puissant |
| **En parallèle**         | parallélisation        | plusieurs agents travaillent en même temps sur des morceaux indépendants | analyser 30 contrats, un agent par contrat                                                                            |
| Le **chef de chantier**  | orchestrateur-workers  | un agent principal découpe la mission lui-même et délègue                | « fais une étude de marché » : il décide des sous-recherches                                                          |
| Le **contrôle qualité**  | évaluateur, agent juge | un second agent relit, vérifie et renvoie si ce n'est pas bon            | un agent rédige une offre, un autre la vérifie contre la grille de conformité                                         |

Le contrôle qualité est la parade au « faux succès » vu en partie 3. Ces cinq façons viennent de l'article de référence d'Anthropic (*Building effective agents*, 2024). D'autres existent (débat entre deux agents, passage de relais), mais ce sont des variantes.

### À vous : de quoi avez-vous besoin ?

*Partie 4 · slide « À vous : de quoi avez-vous besoin ? »*

| Cas                                                                | Il faut                                                                   | Pourquoi                                                                                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Reformuler un mail délicat à un client                             | **un chatbot** (ChatGPT, Copilot Chat, Le Chat)                           | une question, une réponse ; vous relisez et vous envoyez                                                                    |
| Chaque lundi, résumer les tickets de la semaine pour l'équipe      | **un workflow** (n8n, Make, Power Automate)                               | le trajet est toujours le même : récupérer, résumer, envoyer                                                                |
| Répondre à un client sur sa commande, en consultant le CRM         | **un agent**                                                              | il choisit ses outils selon la question ; il lit seul, il ne rembourse pas sans validation                                  |
| Préparer une réponse à appel d'offres : juridique, technique, prix | **un orchestrateur et plusieurs agents** (LangGraph, CrewAI, sous-agents) | un agent par domaine, une synthèse, un contrôle qualité ; un bon de commande relu au départ, une signature humaine à la fin |

Prenez l'outil le plus simple qui fait le travail : vouloir un agent, voire une flotte, là où un workflow suffit coûte plus cher et rend le résultat moins prévisible. Et dans votre service, quel cas mettriez-vous dans chaque case ?

## Le dispatch par bons de commande

*Partie 4 · slide « Le dispatch par bons de commande »*

> **Avec le SDD, ce sont les bons de commande qui pilotent les agents : rien ne part sans bon signé, et chaque bon devient une tournée.**

Le mot technique : le **SDD** (Spec-Driven Development, « développement piloté par les spécifications »). Ce n'est pas qu'un document : c'est une façon d'orchestrer le travail des agents à partir de la spécification. Né chez les développeurs, le principe vaut pour tout travail confié à des agents.

1. **Signer le bon de commande** : le quoi et le pourquoi (la spec), relu et validé par un humain (c'est là que le métier est indispensable).
2. **Le découper en bons de tournée** : le comment (le plan), puis de petites tâches vérifiables.
3. **Dispatcher et vérifier** : chaque tâche part vers un agent, qui la livre ; on vérifie chaque livraison contre son bon, puis l'ensemble contre le bon de commande.

Le lien avec le dispatch : un orchestrateur répartit le travail ; avec le SDD, il le répartit à partir de bons écrits et validés, pas d'une consigne orale.

Pourquoi ça marche : les agents ont un objectif écrit et un critère d'arrêt, ce qui limite les sorties de route (il tourne en rond, il dit « fini » trop tôt).

Outils : GitHub Spec Kit, Kiro (AWS), BMAD : ils font écrire la spec, la découpent et font exécuter les tâches par les agents. Pour un profil métier, le message est simple : **votre rôle, c'est d'écrire et de valider le bon de commande, puis de vérifier la livraison.**
