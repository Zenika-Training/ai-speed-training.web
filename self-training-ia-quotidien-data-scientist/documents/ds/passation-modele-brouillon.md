# Passation du modèle de churn à l'équipe Phare — brouillon (rédigé par une IA, document fictif)

> Document fictif — aucune donnée réelle.
> Brouillon produit par un assistant IA pour Lou (data engineer, équipe Phare), qui exploite le modèle A depuis
> janvier 2026, à partir du notebook et du suivi mensuel joint. Non relu.

## Le modèle

- Régression logistique, entraînée sur l'export du 1er octobre 2025 (9 variables, dont le niveau du membre).
- Chaque mois, il note tous les membres ; la relation client appelle les 100 membres au score le plus élevé.

## Surveillance

- **Le modèle est stable** : son AUC reste de 0,78 depuis janvier.
- Le score moyen a baissé en septembre (0,071 au lieu de 0,095) : **les membres partent moins**, c'est une bonne
  nouvelle pour le programme.

## Ré-entraînement

- Une fois par an, en octobre.

## Contact

- L'équipe data science.
