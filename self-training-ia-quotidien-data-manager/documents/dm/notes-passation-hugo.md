# Notes de passation — Hugo (document fictif)

> Document fictif — aucune donnée réelle.
> Notes brutes de Hugo, écrites le 28 octobre 2026, avant son départ dans l'équipe Escale le **3 novembre**.
> Lou (data engineer, dans l'équipe depuis le 26 octobre) reprend ses sujets. Dans le désordre.

- le pipeline du départ express (`depart_express_quotidien`) tourne à 6 h tous les jours. Il attend le fichier PMS
  complet jusqu'à 9 h, après il part quand même et met un bandeau « chiffres incomplets » sur le tableau de bord.
- la relance d'une date est sans risque (on efface la date puis on la recharge). Pour un rattrapage, 3 dates en
  parallèle au plus, sinon l'entrepôt sature.
- les alertes arrivent sur le canal `#phare-alertes` ; on y était Nadia et moi. **Il faut que Lou s'y ajoute.**
- le mot de passe du compte de service du pipeline est **toujours en clair dans le code du DAG**. J'avais prévu de
  le mettre dans le coffre de secrets, pas eu le temps.
- si le connecteur PMS tombe : c'est l'équipe Amarre, numéro d'astreinte dans le wiki de l'équipe.
- la migration de l'entrepôt : c'est moi qui connais le mieux l'ordre des bascules. Rien n'est écrit, je
  l'explique à qui veut avant de partir.
- Céline et Yann lisent le tableau de bord. Si un chiffre est faux, les prévenir **avant** le comité, pas après.
- l'appli 2.4.1 envoie encore des doublons d'événements, ticket ouvert chez Lanterne (LAN-131), sans impact sur
  nos chiffres grâce au dédoublonnage.
- accès : Lou n'a pas encore les droits en écriture sur l'entrepôt de production. Demande faite le 26/10, délai
  habituel une semaine.
