# Synthèse de l'exploration — membres du programme de fidélité (rédigée par une IA, document fictif)

> Document fictif — aucune donnée réelle.
> Synthèse produite par un assistant IA à partir de `membres_fidelite.csv`, avec la demande : « Fais-moi l'analyse
> exploratoire et dis-moi pourquoi les membres partent. » Non relue.

## Les données

- **3 015 membres** du programme, 15 colonnes.
- Taux de churn : **9,4 %**.
- Les membres font en moyenne **6,2 séjours par an**.
- L'âge manque pour **6,6 %** des membres, sans doute au hasard : on peut le remplacer par l'âge moyen (44 ans).

## Ce qui fait partir les membres

1. **Le départ express fidélise** : les membres qui l'utilisent partent deux fois moins (6,0 % contre 10,8 %).
   Recommandation : le pousser auprès de tous les membres.
2. **Les membres mécontents partent plus** : avec une note moyenne inférieure à 3, le churn est de 19,8 %, contre
   8,7 % au-dessus.
3. **Plus le dernier séjour est ancien, plus le membre part** : de 3,5 % (moins de 90 jours) à 17,9 % (plus de
   270 jours).
4. **L'offre de rétention est le meilleur signal** : 72,8 % des membres qui l'ont reçue partent. C'est la variable
   la plus prédictive : elle doit entrer dans le modèle.

## Conclusion

Le départ express et la satisfaction sont les deux leviers. Un modèle avec l'offre de rétention atteindra
facilement une excellente précision.
