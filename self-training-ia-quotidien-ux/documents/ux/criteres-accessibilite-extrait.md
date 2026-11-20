# Critères d'accessibilité utiles ici — extrait des WCAG 2.1 (document fictif)

> Document fictif — aucune donnée réelle (le contexte d'usage est fictif ; les critères eux-mêmes sont ceux des WCAG 2.1 du W3C).
> Résumé de travail, en français, des critères pertinents pour la maquette du départ express. Le texte officiel des WCAG 2.1 fait foi.
> Lueur 3.2 vise le **niveau AA** : il faut satisfaire les critères de niveau A et de niveau AA. Le niveau AAA n'est pas exigé.

| Critère | Intitulé | Niveau | Ce que le critère demande (résumé) |
|---|---|---|---|
| 1.1.1 | Contenu non textuel (Non-text Content) | A | Tout contenu non textuel porteur d'information a une alternative textuelle ; un contenu purement décoratif est ignoré par les lecteurs d'écran (alternative vide). |
| 1.3.1 | Information et relations (Info and Relationships) | A | La structure et les relations visibles (titres, listes, libellés d'un champ) existent aussi dans le code, pour les technologies d'assistance. |
| 1.3.2 | Ordre séquentiel logique (Meaningful Sequence) | A | Quand l'ordre de lecture change le sens, il est programmé dans un ordre logique. |
| 1.4.1 | Utilisation de la couleur (Use of Color) | A | La couleur n'est pas le seul moyen de transmettre une information, d'indiquer une action ou de distinguer un élément. |
| 1.4.3 | Contraste (minimum) (Contrast Minimum) | AA | Texte : contraste d'au moins 4,5:1 avec son fond. Grand texte (24 px et plus, ou 18,66 px et plus en gras) : 3:1. |
| 1.4.11 | Contraste des éléments non textuels (Non-text Contrast) | AA | Les composants d'interface (comme la bordure d'un champ, quand elle sert à l'identifier) et les éléments graphiques nécessaires à la compréhension ont un contraste d'au moins 3:1 avec leur voisinage. |
| 2.4.3 | Parcours du focus (Focus Order) | A | L'ordre dans lequel le focus passe d'un élément à l'autre conserve le sens et l'utilisation. |
| 2.4.7 | Focus visible (Focus Visible) | AA | Tout élément utilisable au clavier a un indicateur de focus visible. |
| 2.5.3 | Étiquette dans le nom (Label in Name) | A | Le nom accessible d'un composant contient le texte visible de son libellé. |
| 2.5.5 | Taille de la cible (Target Size) | **AAA** | Cibles tactiles d'au moins 44 × 44 px CSS (avec exceptions). Ce critère est de niveau AAA en WCAG 2.1 : il n'est pas exigé par le niveau AA. La règle de 44 px de Lueur est une règle interne, plus stricte que le niveau AA. |
| 3.3.1 | Identification des erreurs (Error Identification) | A | Une erreur de saisie détectée est identifiée et décrite à l'utilisateur en texte. |
| 3.3.2 | Étiquettes ou instructions (Labels or Instructions) | A | Des libellés ou des instructions sont fournis quand un contenu demande une saisie. |
| 4.1.2 | Nom, rôle et valeur (Name, Role, Value) | A | Chaque composant d'interface a un nom, un rôle et un état exposés aux technologies d'assistance. |

## Notes

- WCAG 2.2 (octobre 2023) ajoute le critère 2.5.8 « Taille de la cible (minimum) », de niveau AA, à 24 × 24 px. Lueur 3.2 suit les WCAG 2.1 : ce critère ne s'applique pas ici.
- Ratio de contraste : (L1 + 0,05) / (L2 + 0,05), où L1 est la luminance relative, selon la définition des WCAG, de la couleur la plus claire et L2 de la plus sombre.
- Une description écrite permet de vérifier des couleurs, des tailles, un ordre déclaré, des textes alternatifs. Elle ne permet pas de vérifier le rendu réel, la navigation au clavier ni la lecture par un lecteur d'écran.
