---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m0-initiation/handouts/handout-01-memo.md
---
# Handout — Mémo du module 0

**Bootcamp AI-Driven Development · Module 0 · Zenika · fiche mémo**

Les notions du module, dans l'ordre du deck : la mécanique d'un LLM, le contexte, les embeddings et le RAG, le prompt structuré, puis les outils Claude et leurs règles d'usage.

> **Takeaway** : un contexte clair + des instructions précises + des données fiables = une IA utile et de confiance.

## Objectifs du bootcamp

1. **Comprendre la mécanique d'un LLM** (tokens, probabilités, attention, context window) pour prompter plus finement et diagnostiquer les erreurs.
2. **Utiliser Claude au quotidien** dans ses versions chat, Projects et Cowork, en choisissant la bonne selon le besoin.
3. **Identifier les limites et poser les rails** : hallucinations, coût des tokens, données sensibles, Shadow AI, Zero-Data Retention, RAG, validation DSI.
4. **Manipuler, pas seulement écouter**, à travers plusieurs labs : Project, tâche récurrente, Cowork.

## 1. Un domaine en plein essor

### Les domaines de l'IA

| Domaine                     | En une phrase                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| Intelligence Artificielle   | Automatisation informatisée de tâches habituellement réalisées par des humains                 |
| Machine Learning            | Un algorithme « apprend » à partir de données (Markov, régressions, classification de contenu) |
| Deep Learning               | Apprentissage par réseaux de neurones, volumineux et coûteux                                   |
| GenAI, LLM                  | Inclus dans le Deep Learning : les LLM sont une forme de GenAI                                 |
| Natural Language Processing | Reconnaissance du langage naturel, recoupe ces domaines                                        |

### Mécanique des LLM : tokens, probabilités, température

* Un LLM découpe le texte en **tokens** (~0,75 mot en français, unité de mémoire et de facturation) et prédit, à chaque étape, le token suivant le plus **probable**.
* La **température** règle le degré d'aléa de ce choix : basse pour le code, haute pour la créativité. Le **top-p** restreint le choix aux p % de masse de probabilité.
* Le LLM ne comprend pas au sens humain : il prédit le prochain token.

> **Conséquence pratique** : deux prompts identiques peuvent donner deux réponses différentes. C'est une fonctionnalité, pas un bug.

### La mémoire des LLM

La « mémoire » d'un assistant est une **répétition dans le prompt** : les préférences sont stockées puis réinjectées au début de chaque requête par un prompt système invisible. Les poids et l'architecture du LLM restent strictement identiques.

### Mémoire de travail : contexte, compression et lost-in-the-middle

| Notion                  | Ce qu'il faut savoir                                                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Context Window**      | Quantité de tokens vue en une requête : prompt + historique + pièces jointes + réponse. Claude Sonnet 4.6 va jusqu'à 1M tokens, mais précision et coût se dégradent bien avant ce plafond. |
| **Context Compression** | Quand la fenêtre sature (longue session Claude Code, Cowork…), les anciens échanges sont résumés automatiquement. On garde l'essentiel, on perd les détails.                               |
| **Lost in the middle**  | L'attention n'est pas uniforme : le modèle retient mieux le début et la fin (courbe en U).                                                                                                 |

Bonnes pratiques :

* Instructions critiques **au début ET rappelées à la fin** du prompt.
* Documents : les plus importants en premier.
* Découper les longues missions en étapes courtes.
* Sur un travail long : « résume ce qu'on a fait, et continue ».

### Agentique

L'outil (le programme autour du LLM) reçoit la requête, signale au LLM les agents disponibles (recherche…), exécute les appels demandés et renvoie les résultats au LLM : **plusieurs requêtes successives** pour une seule question. Trois familles d'accès : RAG et données locales, outils via **MCP**, réalisation d'actions.

### Embeddings et RAG

* **Embeddings** : un texte est projeté en **vecteur numérique** dans un espace à plusieurs centaines de dimensions. Deux textes proches par le sens se retrouvent proches dans l'espace, même sans mots communs : « bug en prod » ≈ « incident critique » ≈ « panne système ».
* **RAG** (Retrieval-Augmented Generation) : répondre à partir de **vos documents** sans les avoir appris.

| Étape           | Ce qui se passe                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------- |
| 1. Indexation   | Les documents sont découpés en chunks, transformés en embeddings, rangés dans une base vectorielle |
| 2. Retrieval    | Pour une question, on récupère les chunks les plus proches sémantiquement                          |
| 3. Augmentation | Les chunks retrouvés sont injectés dans le prompt comme contexte                                   |

> C'est la parade n°1 contre les **hallucinations**. Claude : les Projects font du RAG léger automatiquement ; au-delà (10k+ docs), un connecteur MCP vers une vector DB.

### L'écosystème et les règles d'utilisation

* **Assistants bureautique** (intégrés aux applications), **assistants de dév** (Dev / Sec / Ops), **modèles et Cloud** (on-prem ou via des providers).
* Toujours utiliser une IA générative **contractualisée** par votre entreprise : pas de réutilisation des données pour l'entraînement (**Zero-Data Retention**) et confidentialité garantie. Pour tout autre outil : demander à la **DSI**.
* **Shadow AI** : un outil non contractualisé expose vos données à leur réutilisation.
* **Nos postures comptent** : individu → équipe → entreprise ; l'humain reste au centre ; une utilisation à bon escient, pas masquée, critique.

## 2. L'art du prompt avec Claude

### Les réglages de Claude

* **Choisir le modèle** (menu en haut du chat) : Opus pour raisonner, Sonnet par défaut, Haiku pour aller vite.
* **Activer des capacités** : recherche web, exécution de code, lecture de fichiers joints (PDF, xlsx, images), connecteurs MCP (Drive, Slack, Asana…), génération d'Artifacts.
* **Ranger les conversations par Projects** : un historique + des fichiers + une instruction persistante.
* Garder en tête le **coût** et la **sobriété**.

### Le prompt structuré

| Élément      | Exemple                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Persona**  | « Tu es un expert commercial en IT… »                                                     |
| **Tâche**    | « Tu dois produire une trame de réponse pour cet appel d'offre… »                         |
| **Format**   | « …au format Markdown, ton professionnel, sans réexpliquer les mots de l'appel d'offre… » |
| **Contexte** | le client, l'évènement, le mail contenant…                                                |

> **Style** : Claude abuse du gras et des listes. Utiliser des **balises XML** (`<contexte>`, `<tache>`, `<exemple>`) pour isoler proprement les blocs du prompt.

### Styles et Projects

* **Styles** : ajuster le ton et le format (concis, formel, explicatif…), présets ou personnalisés.
* **Projects** : un espace de travail persistant (documents de référence, instructions, historique), partageable au sein d'une **Team Anthropic**.

## 3. Outils, usages et mise en pratique

| Outil                       | Ce qu'il fait                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Artefacts**               | Un livrable (document, tableau, page HTML, mini-app) ouvert dans un panneau à droite : édition itérative, export Word / Excel / PDF / code, persistance |
| **Claude Opus 4.7**         | Le raisonneur profond : tâches complexes, analyses longues. Plus lent, plus cher                                                                        |
| **Claude Sonnet 4.6**       | Le couteau suisse, par défaut : 90 % des usages                                                                                                         |
| **Claude Haiku 4.5**        | Le rapide : tâches simples et volumineuses. Quasi-instantané, très bon marché                                                                           |
| **Connecteurs MCP**         | Protocole standard pour lire / écrire dans un outil externe (Drive, Slack, Asana, Jira, GitHub…)                                                        |
| **Claude in Chrome** (beta) | Pilote vos onglets : formulaire, extraction, navigation                                                                                                 |
| **Claude in Excel** (beta)  | Agent tableur : nettoyer, formules, rapport                                                                                                             |
| **Cowork**                  | Agent de bureau avec accès contrôlé à un dossier local et au navigateur, pour les profils non techniques                                                |
| **Claude Code**             | Agent dans le terminal qui pilote un dépôt comme un développeur, pour les profils tech                                                                  |

* **Pensée adaptative** : sur Opus et Sonnet, un toggle laisse Claude « réfléchir avant de répondre ».
* **Skill** : un dossier qui emballe un savoir-faire reproductible, un `SKILL.md` (mode d'emploi) + des fichiers de support, chargé **automatiquement** quand il correspond à la demande. Structure minimale : un nom + une description (quand l'activer), un `SKILL.md` (étapes, règles, pièges), en option des templates / checklists.
* **Project vs Skill** : un Project porte un **contexte** (« tout sur le client X »), une Skill porte une **compétence** (« comment rédiger un CR chez nous »). Les deux se combinent.
* **Cowork vs chat** : Cowork a les mains dans vos fichiers et vos applis ; le chat se limite aux pièces jointes uploadées.
* **Claude Code** : naviguer dans un dépôt, écrire du code sur plusieurs fichiers, lancer les tests, interagir avec Git, ouvrir une PR, appeler des MCP, charger des Skills, travailler en **mode plan** ou en exécution directe.

> Chaque intégration doit être validée par la **DSI** : pas de données client sans feu vert.

## 4. Synthèse : les 4 rails d'une IA utile

| Rail                   | Ce qu'on fait                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Contexte**           | Projects pour persister, pièces jointes pour ponctuel, RAG pour la masse                                              |
| **Instructions**       | Persona, Tâche, Format, Contexte. Balises XML pour structurer. Critiques en haut et en bas du prompt                  |
| **Modèle et réglages** | Haiku pour la vitesse, Sonnet par défaut, Opus pour raisonner. Température basse pour le code, haute pour la créa     |
| **Vérification**       | Citations (RAG), relire le diff (Claude Code), ne jamais oublier l'hallucination. Règle DSI sur les données sensibles |

> L'écosystème change constamment : le plus important est de **continuer à pratiquer**.
