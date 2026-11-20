---
url: >-
  /ai-speed-training.web/speed-training-ai-dev-advanced/handouts/handout-11-au-dela-du-poste.md
---
# Handout — Au-delà du poste (pour aller plus loin)

**Développeur IA — Avancé · Zenika · fiche de référence**

Ce que change l'agent pour l'entreprise, au-delà du poste du dev : guardrails, AI gateway, budget caché, réversibilité, revue à trois. Ces slides ont quitté le deck de la formation (la gouvernance est traitée côté tech managers, dans la formation « Le nouveau PDLC IA ») ; la fiche reste comme référence, à lire seul.

## Où placer les contrôles

*Slide retirée du deck · pour aller plus loin : « Où placer les contrôles »*

| Garde               | Ce qu'elle contrôle                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Garde d'entrée**  | injection, jailbreak ; données perso, secrets → masquer ; sujets interdits ; taille, débit, budget  |
| **Garde de sortie** | toxicité, hors périmètre ; fuite de données ; ancrage (grounding) ; format / schéma valide          |
| **Garde d'action**  | liste blanche de tools ; sandbox, conteneur, réseau ; droits minimaux (tokens) ; validation humaine |

> Les gardes d'entrée et de sortie **réduisent** le risque. La garde d'action le **borne** : un agent sans réseau ne peut pas exfiltrer.

* Défense en profondeur : aucun étage n'est suffisant seul.
* Les gardes d'entrée et de sortie sont souvent elles-mêmes des modèles (classifieurs, petits modèles), donc faillibles, avec de la latence et du coût. On les place sur les données externes non fiables (prompt injection) et sur les sorties qui partent vers des clients.
* La garde d'action est déterministe : un refus sur `git push` ne se contourne pas par un prompt astucieux. Pour un agent de code, c'est le premier investissement : permissions du harness, sandbox ou conteneur, tokens à portée minimale.
* **Trio létal** : données privées + contenu non fiable + capacité d'envoyer vers l'extérieur. Casser un des trois, c'est le rôle de la garde d'action.

## L'AI gateway : un seul point de passage

*Slide retirée du deck · pour aller plus loin : « L'AI gateway : un seul point de passage »*

Un **proxy entre vos agents et les fournisseurs de modèles** : une seule API côté agents, N fournisseurs derrière, aucune clé de fournisseur sur les postes.

| Fonction          | Ce qu'elle apporte                                           |
| ----------------- | ------------------------------------------------------------ |
| **Routage**       | choix du modèle, **fallback** si un fournisseur tombe        |
| **FinOps**        | quotas et **plafond de dépense** par équipe                  |
| **Observabilité** | tokens, coût et latence par appel (souvent en OpenTelemetry) |
| **Emballement**   | coupe l'agent coincé dans une boucle                         |
| **Guardrails**    | masquage, détection d'injection : appliqués **à tous**       |
| **Traçabilité**   | modèles autorisés, résidence des données, audit              |

* La gouvernance sans modifier les agents : ajouter un masquage ou changer de fournisseur se fait dans la gateway, une fois.
* Le **plafond de dépense** est le garde-fou le plus simple, à poser dans la gateway.
* Attention au **cache sémantique** de certaines gateways : il renvoie une réponse déjà générée pour une question « proche ». Utile pour une FAQ, dangereux pour un agent de code. À ne pas confondre avec le **prompt caching** du fournisseur (module 1), qui ne change pas la réponse.

## Le budget caché : au-delà des tokens

*Slide retirée du deck · pour aller plus loin : « Le budget caché : au-delà des tokens »*

Plus d'agents, c'est plus de PR. Donc plus de **builds**, de **tests**, de **mutation testing** : la facture est **double**, les tokens et les **runners CI**.

| Étape                 | Effet                                |
| --------------------- | ------------------------------------ |
| Adoption des agents   | plus de travail en parallèle         |
| Multiplication des PR | plus de CI, de tests, de mutation    |
| Résultat              | facture tokens **+** facture runners |

> Un budget IA, c'est **tokens + CI + stockage + temps de revue**. Le temps de revue humaine est le poste le plus oublié, et c'est lui qui limite le parallélisme.

## Réversibilité : éviter le vendor lock-in

*Slide retirée du deck · pour aller plus loin : « Réversibilité : éviter le vendor lock-in »*

| Principe                  | Pourquoi                                                                         |
| ------------------------- | -------------------------------------------------------------------------------- |
| **Harness ≠ fournisseur** | l'adhérence est dans le harness ; les modèles changent tous les trimestres       |
| **Modèle via la gateway** | basculer sans réécrire l'outillage                                               |
| **Formats ouverts**       | `AGENTS.md`, `SKILL.md`, MCP survivent à un changement d'outil                   |
| **Résidence des données** | à exiger au contrat : aucune donnée ne sert au réentraînement, hébergement connu |

Modèle via la gateway : les agents appellent un nom interne (ex. `code-standard`), la gateway choisit le modèle réel derrière. Changer de modèle devient un réglage côté gateway, à condition que le harness accepte une adresse d'API personnalisée.

Choisir un harness, un modèle, un fournisseur : trois décisions désormais séparables, selon trois postures.

| Posture                     | Exemples                                                                                            | Ce que ça implique                                                                                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Mono-fournisseur**        | Claude Code                                                                                         | le harness impose la famille de modèles : cohérence maximale, arbitrage impossible ; l'hébergement reste négociable |
| **Catalogue multi-éditeur** | GitHub Copilot                                                                                      | un contrat, plusieurs modèles au choix en session : arbitrage coût / puissance sans changer d'outil                 |
| **Agnostique**              | OpenCode, Pi, Aider ; Codex par configuration (fournisseurs compatibles API OpenAI, modèles locaux) | le fournisseur est un paramètre : liberté totale, intégration (permissions, support) à votre charge                 |

> **Tip du module** : Tracé et portable : un agent qu'on peut **auditer**, et **quitter**. Commits tracés, specs versionnées, appels journalisés par la gateway, formats ouverts.

## Pair-programming à trois

*Slide retirée du deck · pour aller plus loin : « Pair-programming à trois »*

Le dev et un relecteur (deux personnes) + l'agent de revue, **en même temps**.

| Cycle de PR asynchrone                    | 2 personnes + 1 agent, en synchrone                      |
| ----------------------------------------- | -------------------------------------------------------- |
| 1. Le dev soumet la PR                    | 1. L'agent de revue (CI) produit son rapport             |
| 2. Le relecteur commente (24 h d'attente) | 2. Le dev et le relecteur trient les remarques en direct |
| 3. Le dev corrige (12 h d'attente)        | 3. L'agent applique les corrections                      |

> Moins d'attente, des retours plus pertinents, une validation immédiate. Et un moment où la connaissance circule.

## À retenir

1. La **garde d'action** borne le risque, les gardes d'entrée et de sortie le réduisent.
2. La **gateway** route, plafonne, observe et trace, pour toute l'entreprise.
3. Un budget IA compte aussi la **CI** et le **temps de revue**.
4. Un agent tracé et portable : on peut l'**auditer**, et le **quitter**.

**Mots-clés** : guardrails, gateway, prompt injection, trio létal, plafond de dépense, vendor lock-in, human-in-the-loop — voir le glossaire.
