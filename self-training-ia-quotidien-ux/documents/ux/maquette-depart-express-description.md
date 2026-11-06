# Maquette du départ express — description textuelle (document fictif)

> Document fictif — aucune donnée réelle. Montants fictifs.
> Description écrite de la maquette des quatre écrans (version après revue, textes de la charte éditoriale). Elle ne remplace pas la maquette : elle ne dit rien du rendu réel ni du comportement.
> Couleurs en hexadécimal, tailles en px (px CSS). « Ordre DOM » = ordre de lecture et de focus au clavier.

## Valeurs communes

- Fond d'écran : `#FFFFFF`. Texte courant : `#1F2933`, 16 px. Titre : 24 px gras.
- Texte de détail (secondaire) : `#8A94A0`, 12 px.
- `Bouton` principal : texte `#FFFFFF` sur fond `#1B5E8C`, 48 px de haut, pleine largeur, texte 16 px gras. Anneau de focus : 2 px `#1B5E8C`, à 2 px du bouton.
- `Bouton` secondaire : texte `#1B5E8C` sur fond `#FFFFFF`, bordure 1 px `#1B5E8C`, 36 px de haut, texte 16 px. Focus : non dessiné (`outline: none`, aucun style de remplacement).
- `BandeauStatut` : succès texte `#FFFFFF` sur `#2E7D32` ; erreur texte `#FFFFFF` sur `#C62828` ; alerte texte `#FFFFFF` sur `#F28C28`. Texte 16 px, bandeau annoncé comme un message d'état.
- Recommandation interne Lueur : toute cible tactile fait au moins 44 px × 44 px.

## Écran 1 — Votre note

Ordre DOM : titre, `CarteChambre`, `ListeDemandes`, total, « Continuer », « Contester une ligne ».

- **Titre** « Votre note » : texte stylé en 24 px gras, balise `div` (aucun niveau de titre).
- **`CarteChambre`** : photo de la chambre à gauche, texte « Chambre 312 · 2 nuits · départ avant 11 h ». Texte alternatif de la photo : « IMG_4021.jpg ». La photo est purement décorative.
- **`ListeDemandes`** : une ligne par consommation, libellé en `#1F2933` 16 px et détail en dessous en `#8A94A0` 12 px (par exemple « Petit-déjeuner · 2 personnes · 13 mai »).
  - Nuitées (2 nuits) 198,00 €, Petit-déjeuner 24,00 €, Bar de l'hôtel 11,50 €, Taxe de séjour 3,40 €.
- **Ligne contestée** (état quand le client en a contesté une) : libellé et montant passent de `#1F2933` à `#C62828`. Aucune icône, aucun mot ajouté : c'est la seule différence.
- **Total** : « Total : 236,90 € », 20 px gras, `#1F2933`.
- **« Continuer »** : `Bouton` principal, 48 px de haut, focus visible.
- **« Contester une ligne »** : `Bouton` secondaire, 36 px de haut, sans focus dessiné.

## Écran 2 — Informations de société (facultatif)

Ordre DOM : titre, « Continuer », « Passer cette étape », champ Raison sociale, champ Numéro de TVA, case « Conserver ces informations pour mes prochains séjours ». À l'écran, les deux boutons sont affichés en bas, sous la case : seul l'ordre DOM est différent de l'ordre visuel.

- **Titre** « Informations de société » : texte stylé, aucun niveau de titre.
- **Champs de texte** (provisoires, besoin signalé à Maëlle) : hauteur 44 px, bordure 1 px `#C9D1D9` sur fond `#FFFFFF`, texte saisi `#1F2933` 16 px. Le libellé « Raison sociale » ou « Numéro de TVA » est écrit en `#8A94A0` 16 px **dans le champ**, comme texte indicatif (placeholder) ; il disparaît dès que l'on saisit. Aucun libellé visible en dehors du champ.
- **Erreur de saisie** : si le numéro de TVA est invalide, le texte « Ce numéro de TVA ne semble pas valide. Vérifiez-le et saisissez-le de nouveau. » s'affiche sous le champ en `#C62828` 14 px, et la bordure du champ passe à `#C62828`.
- **Case à cocher** (provisoire) : carré de 20 px × 20 px, bordure 1 px `#C9D1D9`, non cochée par défaut ; le texte à côté est un élément séparé, non relié à la case (le toucher ne coche pas la case).
- **« Continuer »** : `Bouton` principal, 48 px. **« Passer cette étape »** : `Bouton` secondaire, 36 px, sans focus dessiné.

## Écran 3 — Règlement

Ordre DOM : titre, rappel du total, `BandeauStatut` (s'il y en a un), bouton « Régler avec ma pré-autorisation », bouton d'aide.

- **Titre** « Règlement » : texte stylé, aucun niveau de titre.
- **Rappel** « Total à régler : 236,90 € » (20 px gras, `#1F2933`).
- **Bouton d'aide** : icône « ? » seule, 24 px × 24 px, en haut à droite. Aucun texte, aucun nom accessible.
- **« Régler avec ma pré-autorisation »** : `Bouton` principal, 48 px. Texte visible : « Régler avec ma pré-autorisation » ; nom accessible (`aria-label`) : « Payer ».
- **`BandeauStatut` alerte** (montant au-delà de la pré-autorisation de 250,00 € ou pré-autorisation expirée) : « Votre note dépasse votre pré-autorisation. Réglez-la à la réception. », texte `#FFFFFF` sur `#F28C28`. Défaut connu `LAN-108`, correction prévue dans Lueur 3.3.
- **`BandeauStatut` erreur** (règlement non abouti) : « Le règlement n'a pas abouti. Réessayez, ou réglez votre note à la réception. », texte `#FFFFFF` sur `#C62828`.

## Écran 4 — Confirmation

Ordre DOM : `BandeauStatut`, texte de la facture, texte de l'urne, « Terminer ».

- **`BandeauStatut` succès** : coche verte à gauche (texte alternatif vide, la coche est décorative) et « Votre note est réglée. », texte `#FFFFFF` sur `#2E7D32`.
- **Facture** : « Votre facture est envoyée par e-mail. Elle reste disponible dans l'application. » (`#1F2933`, 16 px).
- **Urne** : « Déposez votre carte-clé dans l'urne en sortant. » (`#1F2933`, 16 px).
- **« Terminer »** : `Bouton` principal, 48 px, focus visible.
