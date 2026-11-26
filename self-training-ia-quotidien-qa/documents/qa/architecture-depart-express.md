# Architecture du départ express — vue d'ensemble (document fictif)

> Document fictif — aucune donnée réelle. Tous les chiffres sont fictifs.
> Rédigé par Théo pour l'équipe Lanterne, avant le sprint 16. Il sert à bâtir la stratégie de test de `LAN-111`.

## Composants

| Composant | Rôle dans le départ express | Équipe |
|---|---|---|
| Application Lanterne (mobile) | Parcours du client : note, informations de société, règlement, confirmation | Lanterne |
| Vue réception | Les agents voient les départs, reprennent la main en cas de contestation | Lanterne |
| Service Lanterne (`lanterne-sejour-api`) | Orchestre le parcours ; appelle les autres composants | Lanterne |
| Connecteur PMS v2 | Lit les lignes de la note, l'heure de départ ; passe la chambre « libérée » | Amarre |
| Service Paiement | Encaisse avec la pré-autorisation ; appelle le prestataire de paiement | Gouvernail |
| Prestataire de paiement | Service externe : pré-autorisation, encaissement, page de règlement | Externe |
| Application Étages | Informée des chambres libérées ; les étages y consignent le contrôle du minibar | Direction des opérations |
| Stockage des documents clients | Conserve les factures, accès authentifié | Escale |
| Service Notifications | Envoie les messages et les e-mails au client | Lanterne |

## Flux nominal

1. Le client ouvre le départ express (DE-1) : le Service Lanterne lit la note et l'heure de départ dans le Connecteur PMS v2.
2. Le client confirme le montant (DE-2), saisit ses informations de société si besoin (DE-5).
3. Le Service Lanterne demande l'encaissement au Service Paiement, qui interroge le prestataire de paiement (DE-3).
4. À la confirmation, le Service Lanterne passe la chambre « libérée » dans le PMS (DE-7) ; l'application Étages est prévenue.
5. La facture est stockée (DE-9) ; le Service Notifications envoie l'e-mail.

## Points techniques utiles au test

- **Aucune donnée de carte ne passe par Lanterne** : seuls un identifiant de pré-autorisation et un montant circulent.
- Le Service Lanterne attend le Service Paiement **10 secondes au plus**. Au-delà, il refait **une** tentative automatique. L'encaissement n'a **pas de clé d'idempotence** : point connu de l'équipe Gouvernail.
- Le Connecteur PMS v2 passe par une file de messages, qui sature aux heures de pointe du matin (6 h à 10 h).
- L'application Étages n'est pas encore accessible depuis Lanterne (accès en attente).
- Les incidents « facture non reçue » (`LAN-119`) sont suivis à part : ils ne figurent pas dans `incidents-production-paiement.csv`.
- Environnements : préproduction (`recette`) et production. En recette, uniquement les cartes de test du prestataire de paiement fictif.
- Le départ express n'appelle ni le programme de fidélité ni un système de caisse : aucune synchronisation avec eux.

## Échelle de gravité des incidents

| Gravité | Sens |
|---|---|
| Haute | Un client est débité à tort, ou ne peut pas régler |
| Moyenne | Le parcours continue mais une information est fausse ou tardive |
| Basse | Gêne de confort, sans conséquence sur la note ni le départ |

`incidents-production-paiement.csv` couvre les 90 jours qui précèdent le sprint 16 (`J-90` à `J-1`).
