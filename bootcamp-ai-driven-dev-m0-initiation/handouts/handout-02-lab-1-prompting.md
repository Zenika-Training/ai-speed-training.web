---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m0-initiation/handouts/handout-02-lab-1-prompting.md
---
# Handout — Lab 1 : prompting professionnel

**Bootcamp AI-Driven Development · Module 0 · Zenika · support d'exercice**

Deux temps : créer votre premier Project Claude sur vos propres documents, puis passer de la question jetée au chat à un prompt structuré, répétable et transférable, sur un use case de support e-commerce.

## Partie A : Mon premier Project Claude

**Objectif** : produire un livrable métier concret (synthèse, mail, note de cadrage) à partir de vos propres documents, rangé dans un Project réutilisable.

1. **Créer un Project dédié** à un sujet précis, avec un nom clair.
2. **Ajouter 3 à 5 documents** personnels (notes, mails, slides, charte…), *pas de données strictement confidentielles*.
3. **Renseigner les instructions** du Project : rôle de Claude, ton, tabous, citations attendues.
4. **Poser trois questions** et demander un livrable concret.
5. **Itérer** : demander les passages cités, corriger, ajuster le rôle.

> Pièges fréquents : documents trop volumineux, données confidentielles, hallucinations (toujours redemander les citations).

## Partie B : Prompting professionnel (~60 min)

**Objectif** : passer de la question jetée au chat à un prompt **structuré, répétable et transférable**, qu'on pourrait donner à un collègue.

1. **Rôles (Persona)** : « Tu es un… » avec expertise et posture.
2. **Contraintes** : format de sortie, longueur, style, interdits.
3. **Few-shot prompting** : coller 2-3 exemples de la bonne réponse. Ce qui fait passer de « correct » à « on dirait nous ».
4. **Chain-of-Thought** : raisonner étape par étape avant de conclure. Utile pour l'analyse et le code, inutile sur les tâches simples.
5. **Gérer la context compression** : redonner les règles clés, fournir un résumé, repartir d'un prompt propre plutôt qu'empiler.
6. **Tester, critiquer, itérer** : un bon prompt est un artefact qu'on maintient.

> **Règle d'or** : le prompt final est un livrable réutilisable, rangez-le dans un Project ou une Skill.

### Use case : support e-commerce

Fournir un prompt générique et fiable pour le support d'une entreprise e-commerce répondant à un client insatisfait.

**Message client :**

> « Franchement très déçu. Livraison en retard de 5 jours, produit abîmé à l'arrivée, et aucune réponse du support. Je veux un remboursement immédiat. »

**Contexte entreprise :**

* Marque premium mais accessible.
* Ton : professionnel, empathique, jamais familier.
* Politique : remboursement ou renvoi sous 48 h.
* Objectif : fidéliser malgré l'incident.

### La trame du prompt

Les quatre éléments vus en séance, chacun dans sa balise XML (Claude abuse du gras et des listes : les balises isolent proprement les blocs).

| Élément      | À renseigner                                |
| ------------ | ------------------------------------------- |
| **Persona**  | le rôle et la posture de Claude             |
| **Tâche**    | ce qu'il doit produire                      |
| **Format**   | forme, longueur, ton, interdits             |
| **Contexte** | le message client, la politique, l'objectif |

```text
<persona>…</persona>
<tache>…</tache>
<format>…</format>
<contexte>…</contexte>
<exemple>…</exemple>
```

## Exemple de la démo : le discours des 60 ans

Le prompt structuré montré en démo, à reprendre comme modèle.

```text
<persona>
Tu es un proche qui prend la parole en public, sur un ton chaleureux,
un brin humoristique mais jamais moqueur. Tu doses l'émotion sans tomber
dans le pathos.
</persona>

<tache>
Rédige-moi un discours de 3 minutes pour les 60 ans de mon père,
à lire devant la famille et une quinzaine d'amis proches lors du dîner.
</tache>

<format>
Une intro qui pose la soirée, deux anecdotes marquantes, un mot sincère,
une chute qui lance le toast.
Phrases courtes, pensées pour être lues à voix haute.
</format>

<contexte>
  <anecdotes>
    1. Apprentissage du vélo : été 1998, la côte derrière la maison ;
       il a couru à côté sans jamais lâcher le vélo avant que je le lui dise.
    2. Pompiers volontaires pendant 12 ans : deux interventions marquantes,
       dont un feu de grange le soir de Noël.
    3. Voyage aux Lofoten : tente sous -5 °C, il a fait rire toute la troupe
       pendant une semaine.
    4. [anecdote 4]
    5. [anecdote 5]
  </anecdotes>
  <caractere>
    Bricoleur, pudique sur ses émotions, fidèle en amitié,
    taquin avec ses petits-enfants.
  </caractere>
  <passions>
    La voile, le jardinage, les polars scandinaves, le rugby.
  </passions>
  <tonalite_soiree>
    Dîner décontracté à la maison, une quinzaine de personnes,
    ambiance familiale. Pas de discours solennel : on veut de la chaleur
    et des rires.
  </tonalite_soiree>
</contexte>
```

> Pour les usages récurrents, un **Project Claude** capitalise sur son style et son contexte sans les réécrire.
