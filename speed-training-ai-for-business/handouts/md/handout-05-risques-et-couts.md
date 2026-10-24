# Handout — Risques, gouvernance et coûts

**Speed training IA · Zenika · fiche module 5**

Ce qui peut mal tourner, les deux règles qui couvrent l'essentiel, et ce qui fait monter la facture.

## 5 risques, 5 garde-fous

| Risque               | En une phrase                                                 | Exemple                                                            | Garde-fou                                  |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| **Hallucination**    | une réponse fausse mais convaincante                          | des avocats sanctionnés pour avoir cité une jurisprudence inventée | relecture, grounding (sources vérifiables) |
| **Prompt injection** | un contenu piégé (document, email, page web) détourne l'agent | des données exfiltrées via un document partagé                     | accès de l'agent limités                   |
| **Fuite de données** | des informations sensibles sortent de l'entreprise            | des secrets industriels collés dans un chatbot grand public        | versions entreprise des assistants         |
| **Biais**            | des stéréotypes reproduits, parfois amplifiés                 | des biais régionaux mesurés dans les réponses de LLM testés        | relire ce qui est sensible                 |
| **Coûts**            | une consommation qui s'emballe                                | des clés d'accès volées, des factures à 5 chiffres                 | plafonds de dépense, suivi                 |

## 2 règles d'or

**1. Données sensibles : uniquement dans les versions entreprise.** Rien de confidentiel dans un assistant grand public : clients, contrats, données personnelles, code. Les versions entreprise s'engagent par contrat à ne pas entraîner les modèles sur vos données. Les données personnelles restent soumises au RGPD : base légale, information des personnes, avis du DPO.
_Le test : l'enverriez-vous par email à un inconnu ?_

**2. Un humain valide avant d'agir.** Obligatoire pour ce qui est irréversible, réglementé ou visible par un client. Cette validation est prévue dans le process, pas optionnelle, et faite par quelqu'un qui connaît le métier.
_Le test : qui signe si c'est faux ?_

Ces deux règles traitent la **fuite** d'un côté et l'**erreur** de l'autre. La seconde s'appelle le **human-in-the-loop**. Plus vous branchez de documents et de tools sur un assistant, plus elles comptent : un agent agit avec vos droits.

Côté réglementation, l'AI Act européen impose depuis février 2025 que les personnes qui utilisent l'IA dans l'entreprise y soient formées (article 4), et le RGPD s'applique à toute donnée personnelle confiée à un assistant.

## Coûts : le token se paie

- Les modèles se paient au **token**, en entrée comme en sortie.
- L'historique est **renvoyé à chaque message** : une longue conversation coûte de plus en plus cher.
- En abonnement, la limite prend la forme de quotas ; à l'usage (API, agents), elle prend la forme d'une facture. Dans les deux cas, une consommation élevée traduit souvent un **usage non optimisé**.

5 réflexes pour consommer moins :

1. **1 tâche = 1 session** : moins d'historique renvoyé.
2. **Être précis** : une demande vague déclenche des recherches inutiles.
3. **Couper les connecteurs (MCP) inutiles** : chacun pèse dans le contexte.
4. **Garder le même modèle** pendant une session : sinon le **cache** (le début du contexte déjà traité) est perdu.
5. **Demander des réponses concises** : moins de tokens en sortie.

## À retenir

1. Rien de confidentiel hors des **versions entreprise**.
2. Un **humain qualifié valide** ce qui est irréversible, réglementé ou visible par un client.
3. Les sources se **vérifient** ; les accès des agents se **limitent**.
4. Sessions courtes et demandes précises : c'est meilleur pour la qualité **et** pour la facture.

**Mots-clés** : hallucination, prompt injection, fuite de données, biais, grounding, human-in-the-loop, token, cache — voir le glossaire.
