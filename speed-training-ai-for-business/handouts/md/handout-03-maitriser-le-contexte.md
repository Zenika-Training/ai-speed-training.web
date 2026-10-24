# Handout — Maîtriser le contexte

**Speed training IA · Zenika · fiche module 3**

Ce que le modèle « voit » au moment de répondre, comment garder une session propre, et comment lui apporter le contexte de l'entreprise.

## La context window

La **context window**, c'est **tout** ce que le modèle voit quand il répond :

- les **consignes** de l'assistant ;
- la **mémoire** (ce que l'assistant sait de vous) ;
- les **pièces jointes** ;
- la **conversation** : vos messages, ses réponses, vos corrections ;
- les **résultats des tools** (recherche web, fichiers lus, données d'un connecteur) ;
- l'**espace libre** restant. Quand il rétrécit, les réponses se dégradent et le coût monte.

## La mémoire des assistants

Le modèle ne retient rien… mais l'**assistant** peut recopier des informations sur vous dans **chaque** conversation. Exemple : « Je suis PO, je travaille sur le parcours de réservation », dit une fois, est relu à chaque conversation.

- Elle influence les réponses **sans qu'on la voie** : une information périmée continue de peser.
- Deux collègues, même prompt, mémoires différentes : réponses différentes.
- Consultez-la, corrigez-la ou désactivez-la dans les **réglages** de votre assistant.

## Plus n'est pas mieux

| Session      | Ce qu'elle contient                           | Effet                           |
| ------------ | --------------------------------------------- | ------------------------------- |
| **Simple**   | objectif, contraintes, un exemple             | réponse ciblée                  |
| **Chargée**  | historique long, documents, essais successifs | dérive douce                    |
| **Polluée**  | infos périmées, erreurs, contradictions       | réponses crédibles mais fausses |
| **Préparée** | repères choisis, demande claire               | moins d'exploration inutile     |

La bonne question : **tout ce qui reste ici aide-t-il encore la tâche du jour ?**

## Garder une session propre

1. **Avant : cadrer.** Une courte note de cadrage : objectif, documents utiles, règles, points de contrôle. L'IA peut la proposer ; vous arbitrez.
2. **Pendant : redémarrer.** Une tâche = une session. Si ça dérive, on ne corrige pas par-dessus : on repart avec la note de cadrage.
3. **Après : extraire.** Avant de fermer, on garde ce qui a de la valeur.

La règle : réponse ratée dès le début → **rewind** ; session longue qui dérive → **nouvelle session** + note de cadrage.

## Capitaliser : de la session aux artefacts

Un **artefact** est un livrable qui vit **en dehors de la conversation** : on le relit, on le partage, on le réinjecte. Plutôt que « résume cette session », demandez une **extraction ciblée** :

| Fichier            | Contenu                              |
| ------------------ | ------------------------------------ |
| `decisions.md`     | arbitrages pris, sujets tranchés     |
| `risques.md`       | zones sensibles, dépendances         |
| `actions.md`       | prochaines étapes, responsables      |
| `brief-suivant.md` | ce qu'on réinjecte la prochaine fois |

```text
Extrais de cette conversation, en 3 listes courtes :
- les décisions prises,
- les risques identifiés,
- les prochaines actions (qui, quoi).
N'invente rien : si une liste est vide, dis-le.
```

Une extraction **non relue** n'est jamais une source d'autorité.

## Apporter le contexte de l'entreprise

Le modèle ne connaît pas votre entreprise : ni vos CGV, ni vos process, ni vos données. Deux façons de le lui apporter :

**RAG : vos documents.** Le RAG (_Retrieval-Augmented Generation_) ancre les réponses dans vos sources ; on parle de **grounding**. Exemple : « Quelles sont les conditions d'annulation du tarif Flex ? »

1. **Préparer** : les documents internes sont indexés à l'avance, avec leurs droits d'accès.
2. **Chercher** : un tool trouve les passages pertinents (par le sens, pas seulement les mots).
3. **Ajouter** : ces passages, et eux seuls, entrent dans la context window.
4. **Répondre** : le modèle répond à partir des passages et cite ses sources.

Vigilance : des documents périmés donnent des réponses périmées… mais sourcées, donc convaincantes.

**Tools / MCP : vos applications.** Ils apportent des données fraîches et des actions (lire, créer, envoyer). Exemple : « Liste les réservations annulées hier et ouvre un ticket Jira. » Vigilance : l'agent agit avec **vos** accès.

Dans les deux cas, l'IA ne **sait** rien de plus : on lui **donne** le bon contexte, au bon moment.

## À retenir

1. Le modèle ne voit que sa context window : choisissez ce qui y entre.
2. Une tâche = une session ; si ça dérive, repartez avec une note de cadrage.
3. Avant de fermer, extrayez décisions, risques et actions, et relisez-les.
4. Avec un RAG, demandez toujours les sources et vérifiez-les.

**Mots-clés** : context window, mémoire, session, note de cadrage, artefact, RAG, grounding, MCP — voir le glossaire.
