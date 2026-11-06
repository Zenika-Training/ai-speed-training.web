---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-08-lab-05-pilotage-tests.md
---
# Handout — Lab 5 · Pilotage des tests en Spec-Driven Development

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Construire, en Spec-Driven Development, une application qui pilote des tests E2E dans un navigateur (5.2) ou, en variante backend, des tests de contrat d'API (5.3), et repartir avec un produit utilisable. Lab long : l'objectif n'est pas de « finir ». Identique pour GitHub Copilot et Claude Code.

## 5.1 · Le parti pris du TP

* **Dev totalement automatisé** : le **code est un asset régénérable**, on ne s'en préoccupe pas **tant que la spécification est respectée**.
* **Qualité et maintenabilité** doivent être **au rendez-vous** : c'est tout l'objet du framework.
* **Sécurité dès le départ** : vous pouvez imposer l'**authentification de tous les points d'accès**, les secrets hors du code…
* **Architecture minimale** à ce stade : un projet **Docker / docker-compose**, une base **type SQLite**… et on **pilote les décisions** (exécution des requêtes, **navigateur headless**…).
* **Clé d'API LLM nécessaire** : c'est l'**application que vous construisez** qui appelle un modèle, pas votre agent. **Votre propre clé d'API** si vous en avez une (l'option la plus réaliste) ; sinon **Google AI Studio (Gemini)**, le chemin le plus court, ou un compte **OpenRouter** (détail dans le handout « Prérequis des labs »). Sur les modèles gratuits, les données partent souvent hors UE : aucune donnée sensible.
* **`doc-tracker` branché dès le départ** : l'extension construite au lab 4 est **installée sur ce projet** ; chaque commit vérifiera que la doc est à jour et tracera la part d'IA.

> On code l'**intention**, pas les lignes : le **moteur s'occupe du reste**.

> « Pourquoi une clé d'API alors qu'on a une licence Copilot ou un abonnement Claude ? » Parce que ce sont deux choses différentes : la licence sert à **développer**, la clé d'API sert au **produit livré**, qui doit interroger un modèle en autonomie pour diagnostiquer un échec de test.

|               | Tests E2E (5.2)                                              | Tests de contrat d'API (5.3)                  |
| ------------- | ------------------------------------------------------------ | --------------------------------------------- |
| Générer       | un script de navigation (Playwright), depuis une description | un test de contrat, depuis la spec OpenAPI    |
| Exécuter      | captures d'écran, traces                                     | requêtes / réponses tracées, écarts de schéma |
| Diagnostiquer | vraie régression, ou évolution d'UI ?                        | régression de contrat, ou évolution assumée ? |
| Moteur        | Playwright                                                   | Schemathesis, Pact                            |

**Point de départ** : la branche **`tp_e2e_speckit`** du dépôt de TP, initialisée avec Spec Kit, avec un `SPEC.md` rétro-généré depuis le code et deux extensions installées (`agent-context`, `documentation`) ; `speckit-doc-tracker` devient la troisième. L'autre branche, `tp_e2e_framework`, repose sur OpenSpec, dont le mécanisme de personnalisation (schemas) diffère : l'extension `doc-tracker` est propre à Spec Kit et n'y est pas installable telle quelle.

## 5.2 · Specs du framework (tests E2E)

1. **Décrire** un nouveau test E2E en **langage naturel** → l'IA **génère le script** Playwright correspondant.
2. **Bouton « Exécuter »** dans l'interface → lance le test et **affiche les captures d'écran** prouvant le **succès ou l'échec**.
3. **Historique des runs** : liste des derniers passages avec leur **statut**, pour le **suivi**.

**Maquette de l'écran principal** (« Pilote E2E : tests ») : à gauche, la liste des **tests** (Connexion, Ajouter un vétérinaire, Réserver une visite, Paiement) et un bouton « + Nouveau test » ; au centre, pour le test sélectionné, la **description en langage naturel**, le **script généré (Playwright)** et le bouton **« Exécuter »** ; en dessous, les **dernières captures** ; à droite, l'**historique des runs** (#13 · 14:02, #12 · 11:30, #11 · hier…).

4. **Consulter le rapport** :
   * **succès** → afficher les **statistiques** (durée, étapes, captures) ;
   * **échec** → **outil d'analyse de cause** assisté par IA :
     * **vraie régression** (la page ne respecte plus l'intention) → **remonter le bug** ;
     * **simple évolution d'UI** (le front a changé, l'intention tient) → l'IA **met à jour le script automatiquement**.

**Maquette du rapport** (« Rapport : Run #13 », statut **ÉCHEC**) : les **captures** côte à côte, « attendu » et « obtenu » ; un encart **« Analyse de cause (IA) »** avec la cause probable (par exemple « évolution d'UI : libellé du bouton modifié ») et deux issues, **Régression réelle** (la page ne respecte plus l'intention → ouvrir un bug) ou **Évolution d'UI** (l'intention tient → mise à jour du script), avec un bouton **« Réparer (auto) »**. Si succès : statistiques (durée, étapes, captures).

5. **Pas de CI ici**, mais notez que ce run pourrait être **planifié en CI** (à chaque PR, la nuit).

**Pendant la génération, vérifiez commit par commit** via l'extension `doc-tracker` (labs 4.1 à 4.3) :

1. **Doc à jour** : les endpoints du serveur E2E sont-ils couverts dans `SPEC.md` (§5 Functional Behavior) ?
2. **Logs lisibles** : le serveur émet-il des logs structurés (niveau, message, contexte) sur les actions clés (démarrage d'un run, échec, réparation) ?
3. **Traçabilité IA** : chaque commit indique-t-il la part de code générée automatiquement ?

> La description (l'intention) est la **source** ; le script n'est qu'un **artefact généré**. Le test redevient un **actif vivant** ; le commit, un **point de contrôle de la qualité documentaire et applicative**.

> Sur un TP long comme celui-ci, pensez à `/context` régulièrement, et à `/compact focus on <sujet>` plutôt qu'à un `/compact` sec : le résumé conserve alors ce qui compte pour la suite. Côté Copilot, `/session checkpoints` permet de relire ce que l'agent a retenu après une compaction, au lieu de le supposer.

## 5.3 · Variante backend : pilotage de tests de contrat

**Objectif** : même apprentissage, sur un terrain **backend** : piloter des **tests de contrat API** (OpenAPI) décrits en langage naturel, plutôt qu'un navigateur automatisé. À proposer au choix (front ou backend) selon la composition du groupe, pas en remplacement systématique.

1. **Récupérer ou générer la spec OpenAPI** du serveur PetClinic (`openapi.yaml`) ; si elle n'existe pas encore, demandez à l'agent de la générer depuis le code des contrôleurs REST.
2. **Construire une interface de pilotage** des tests de contrat, équivalent de l'interface web du TP front (bouton « Exécuter », historique, rapport) : **TUI** (terminal interactif, par exemple Rich/Textual en Python ou Ink en Node) ou **GUI** (petite appli web), au choix. L'important est de piloter les runs et d'en consulter le rapport sans repasser par la ligne de commande à chaque fois.
3. **Décrire** en langage naturel le comportement attendu d'un endpoint → l'agent **génère un test de contrat** depuis le schéma OpenAPI, exécutable depuis l'interface. Alternative consumer-driven : Pact, l'agent génère le pacte consumer / provider.

```bash
pip install schemathesis
st run openapi.yaml --base-url http://localhost:8080 --checks all
```

4. **Exécuter** depuis l'interface et observer : requêtes / réponses tracées dans le rapport Schemathesis, écarts de schéma mis en évidence.
5. **Historique des runs** : liste des derniers passages avec leur statut, affichée dans l'interface.
6. **Consulter le rapport** :
   * **succès** → statistiques (nombre de cas générés, endpoints couverts) ;
   * **échec** → outil d'analyse de cause assisté par IA :
     * **vraie régression de contrat** (un champ disparaît du schéma sans bump de version) → remonter le bug ;
     * **évolution intentionnelle de l'API** (nouvel endpoint versionné, par exemple `/v2/...`) → l'IA **met à jour le test de contrat automatiquement**.
7. **Pas de CI ici**, mais ce run pourrait être **planifié en CI** (à chaque PR, la nuit), comme pour la variante front.

**Pendant la génération, vérifiez commit par commit** via `doc-tracker`, à l'identique de la variante front :

1. **Doc à jour** : les endpoints testés sont-ils couverts dans `SPEC.md` (§5 Functional Behavior) ?
2. **Logs lisibles** : le serveur émet-il des logs structurés sur les actions clés (requête reçue, validation de schéma échouée) ?
3. **Traçabilité IA** : chaque commit indique-t-il la part de code générée automatiquement ?

> Même structure, même durée, même fil rouge `doc-tracker` : le **terrain d'exemple** change, pas l'apprentissage.
