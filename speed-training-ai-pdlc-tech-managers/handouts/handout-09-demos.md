---
url: >-
  /ai-speed-training.web/speed-training-ai-pdlc-tech-managers/handouts/handout-09-demos.md
---
# Handout — Les démos

**Le nouveau PDLC IA — ce qui change pour votre équipe · Zenika · démos à rejouer**

Les démos jouées par le formateur pendant la formation, pour les rejouer en solo ou avec votre équipe, que vous ayez assisté à la session ou non. Elles ne demandent qu'un assistant de chat.

## Avec ou sans contexte

*Module 3 · démo « Avec ou sans contexte » · 3 min*

**Ce que ça montre** : la même demande, faite à la même IA, sans puis avec le contexte de l'équipe. Sans contexte, l'IA produit du code propre et plausible, mais elle invente tout ce qui relève de nos décisions. Avec une fiche d'une quinzaine de lignes, elle les reprend. L'IA est bonne en général ; elle ne connaît pas nos décisions.

**Le cas** : chez Vélora, groupe hôtelier fictif, l'équipe qui gère les messages aux clients veut envoyer un rappel la veille du départ.

**À rejouer**

1. Ouvrez une conversation vide et collez la demande seule :

```text
Écris la fonction qui envoie au client un rappel la veille de son départ.
En 25 lignes au plus.
```

2. Ouvrez une deuxième conversation vide. Collez d'abord la fiche de contexte, puis la même demande :

```text
Contexte de l'équipe Notifications, groupe hôtelier Vélora.

Ce qu'on sait
- Les messages clients passent par le service interne VelNotif : notification push dans l'application d'abord, e-mail sinon.
- L'heure qui fait foi est l'heure locale de l'hôtel.
- La langue du message est celle de la réservation.

Ce qu'on veut
- Réduire les départs non annoncés à la réception ; cible fixée par le produit.

Ce qu'on exige
- API VelNotif v2 : POST /messages avec reservationId, templateId, locale.
- Jamais d'envoi entre 21h et 8h, heure locale de l'hôtel.
- Un seul rappel par réservation : clé d'idempotence = reservationId + "rappel-depart".

Ce qu'on fait
- En cas d'échec de VelNotif : deux nouvelles tentatives au plus, puis on journalise.
- Le texte du message est validé par le produit avant mise en ligne ; le code utilise son templateId.
- Un interrupteur (feature flag) coupe l'envoi.
```

3. Comparez les deux réponses sur ces six points :

| Point                                            | Sans contexte | Avec contexte |
| ------------------------------------------------ | ------------- | ------------- |
| Canal et service d'envoi                         |               |               |
| Heure d'envoi                                    |               |               |
| Langue du message                                |               |               |
| Plage « ne pas déranger »                        |               |               |
| Doublons (deux rappels pour la même réservation) |               |               |
| Qui valide le texte du message                   |               |               |

**Ce qu'on observe** : sans contexte, l'IA choisit un prestataire d'envoi connu, l'heure du serveur, une langue au hasard, écrit le texte du message elle-même et ne protège pas contre les doublons. Avec la fiche, elle appelle VelNotif, calcule l'heure locale de l'hôtel, respecte la nuit, utilise la clé d'idempotence et le template validé. Un modèle récent écrit du bon code générique dans les deux cas : tout l'écart vient de nos décisions.

**Pour aller plus loin** : la fiche est déjà rangée en quatre blocs, les quatre registres du Context Nexus (handout « Le Context Nexus »). Retirez un bloc et relancez : ce qui disparaît de la réponse, c'est ce que l'agent ne pouvait pas deviner.
