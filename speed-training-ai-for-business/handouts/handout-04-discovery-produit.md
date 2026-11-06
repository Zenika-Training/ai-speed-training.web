---
url: >-
  /ai-speed-training.web/speed-training-ai-for-business/handouts/handout-04-discovery-produit.md
---
# Handout — L'IA dans la discovery produit

**Speed training IA · Zenika · fiche module 4**

Aller plus vite vers la preuve, sans sauter la preuve : où l'IA accélère le travail produit, et ce qui reste humain.

## Mode projet ou mode produit ?

| Mode projet                                              | Mode produit                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| Un comité décide de tout refaire.                        | On mesure 38 % d'abandons au paiement mobile.                      |
| 9 mois de développement : on livre le plan.              | 6 interviews et un prototype en 2 semaines : on teste l'hypothèse. |
| Au lancement, les abandons ne baissent pas.              | Le test montre que le paiement en 1 clic marche.                   |
| On découvre trop tard que le problème était le paiement. | On construit ce qui a fait ses preuves.                            |

L'IA rend le **mode produit** beaucoup moins cher : interviewer, synthétiser, prototyper prend des heures, et non plus des mois.

## Interroger sur des faits, pas des opinions

Les clients prédisent mal leur propre comportement. Posez des questions sur ce qu'ils ont **fait**, pas sur ce qu'ils **pensent** qu'ils feraient.

| À éviter                                                                      | À la place                                                                      |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Opinion** : « Quelles fonctionnalités voudriez-vous ? »                     | **Fait vécu** : « Racontez-moi la dernière fois que vous avez réservé. »        |
| **Hypothèse** : « Utiliseriez-vous ceci si on le construisait ? »             | **Chronologie** : « Reprenez depuis le début : que faisiez-vous juste avant ? » |
| **Question orientée** : « Ce n'est pas frustrant quand le paiement échoue ? » | **Creuser l'histoire** : « Pourquoi avez-vous fait comme ça ? »                 |

## Du terrain au PRD

| Étape              | Ce que c'est                                               | L'IA aide à                                | Reste humain                   |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------ | ------------------------------ |
| **Interviews**     | 5 à 8 utilisateurs racontent des situations réelles        | transcrire, regrouper les thèmes           | parler à de vrais clients      |
| **Experience map** | le parcours de bout en bout : étapes, ressentis, irritants | structurer la carte, repérer les irritants | choisir l'irritant à traiter   |
| **PRD**            | une page : quoi construire, pourquoi, comment mesurer      | rédiger un premier jet                     | arbitrer objectif et périmètre |
| **Prototype**      | une maquette cliquable pour tester avant de développer     | générer une maquette en quelques heures    | observer de vrais utilisateurs |

## Le PRD, c'est quoi ?

Le **PRD** (*Product Requirements Document*) est le contrat de l'équipe produit : **une page**, pas un cahier des charges. Il est écrit par le PO ou le PM avec le designer et le tech lead, après la discovery et avant de construire. Il dit **quoi** construire, **pourquoi**, et comment on mesure le succès ; le *comment* technique reste à l'équipe.

Modèle en 6 rubriques, avec l'exemple du parcours de réservation :

| Rubrique              | Exemple                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------- |
| **Problème**          | 38 % des réservations mobiles abandonnées au paiement.                                       |
| **Objectif**          | Passer de 38 % à 30 % d'abandons en 3 mois.                                                  |
| **User story**        | En tant que client mobile, je veux payer en 1 clic pour finir ma réservation sans ressaisie. |
| **Périmètre**         | Paiement mobile. Hors périmètre : desktop.                                                   |
| **Hypothèse**         | La ressaisie de la carte bloque.                                                             |
| **Critère de succès** | Moins de 30 % d'abandons, 4 semaines de suite.                                               |

L'IA rédige un premier jet à partir des interviews ; l'équipe **arbitre** le problème, l'objectif et le périmètre. Relisez toujours ce qu'elle a inventé : un chiffre qui n'est pas dans vos sources doit être marqué « à mesurer ».

## Prototyper : lo-fi d'abord

La **fidélité** (« fi ») mesure à quel point la maquette ressemble au produit final.

| Niveau     | À quoi ça ressemble                               | Temps                                      | Sert à                       |
| ---------- | ------------------------------------------------- | ------------------------------------------ | ---------------------------- |
| **Lo-fi**  | un croquis, des boîtes grises                     | quelques minutes                           | explorer, aligner l'équipe   |
| **Mid-fi** | la structure et les vrais libellés, sans couleurs | quelques heures                            | valider le parcours          |
| **Hi-fi**  | presque le vrai produit, cliquable                | quelques jours (quelques heures avec l'IA) | tester avec des utilisateurs |

Trop beau trop tôt = changements chers trop tard. Avec l'IA, demandez explicitement une maquette « en niveaux de gris, sans couleurs » pour rester lo-fi au début.

## Un prototype n'est pas un produit

« Il est génial ce prototype… on le met en prod la semaine prochaine ? » Non :

| Prototype                             | Produit                                              |
| ------------------------------------- | ---------------------------------------------------- |
| Données fictives, sans droits d'accès | Données réelles : qui voit quoi, pas de fuite        |
| Une démo, une personne                | Des milliers d'utilisateurs, retour arrière possible |
| En cas d'erreur, on recharge la page  | Accès contrôlés, erreurs détectées et suivies        |
| On régénère                           | Une équipe le fait évoluer dans la durée             |

Avant toute démo, annoncez que c'est une **maquette**.

## Tester, apprendre, recommencer

Le **user testing** consiste à observer de vrais utilisateurs, pas à leur demander ce qu'ils veulent :

* **Avant** : une question à laquelle répondre, 2 à 4 tâches réalistes, les bonnes personnes.
* **Pendant** : observer sans aider ; noter hésitations, clics ratés, abandons.
* **Après** : synthétiser à plusieurs, corriger, retester.

C'est une boucle : prototyper → tester → apprendre → nouvelle question. Exemple : le paiement en 1 clic marche… sauf avec une carte d'entreprise. C'est la **continuous discovery** : la discovery ne s'arrête pas au lancement.

## À retenir

1. Interrogez sur des **faits vécus**, jamais sur des intentions.
2. Le PRD tient en **une page** : problème, objectif mesurable, périmètre, critère de succès.
3. Prototypez **lo-fi** d'abord, et testez avec de vrais utilisateurs.
4. Utilisez l'IA pour aller plus vite vers la preuve, pas pour sauter la preuve.

**Mots-clés** : product discovery, MVP, user interview, experience map, PRD, prototype lo-fi / hi-fi, user testing, continuous discovery — voir le glossaire.
