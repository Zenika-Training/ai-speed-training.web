---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-07-lab-04-phase-de-design.md
---
# Handout — Lab 4.4 à 4.6 · Phase de design (facultatif)

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Labs facultatifs : Spec Kit enchaîne `specify → plan` sans étape de conception ; on en insère une avec une extension, un deuxième exemple après `doc-tracker`. Variante visuelle (wireframe, 4.4 puis 4.5) **ou** variante backend (contrat d'API, 4.6), selon le groupe. Identique pour GitHub Copilot et Claude Code.

## 4.4 · Ajouter une phase de design

**Objectif** : étendre Spec Kit pour intercaler un **wireframe basse fidélité (HTML)** **entre `specify` et `plan`**.

1. Créez un **projet d'extension** Spec Kit :
   * manifeste `extension.yml` + `commands/wireframe.md` → commande **`/speckit.ext.wireframe`** ;
   * la commande **génère un wireframe HTML basse fidélité** à partir de la spec, **avant** le plan.
2. **Installez en local** pour itérer :

```bash
specify extension add --dev ./speckit-wireframe
specify extension list        # vérifier qu'elle est active
```

> On insère une **étape maison** dans le pipeline : la customisation en action.

## 4.5 · Rejouer le Pomodoro, puis comparer

1. **Rejouez** la création du **Pomodoro** en intégrant la nouvelle phase. Le **wireframe** fixe le **résultat attendu** : on contrôle finement le design **avant** l'implémentation.

```text
/speckit.specify → /speckit.ext.wireframe → /speckit.plan → /speckit.tasks → /speckit.implement
```

2. **Comparez** en fin d'implémentation : confrontez le **design réel** de l'app au **wireframe**. Écarts visuels ? Intention respectée ? Faut-il **raffiner la spec** ou **la phase wireframe** ?

> La phase de design devient un **garde-fou réutilisable**, et le wireframe, un critère de recette.

## 4.6 · Variante backend : une phase de design de contrat API

**Objectif** : même mécanique d'extension (insérer une étape de conception avant l'implémentation), sur un terrain **backend** : concevoir le **contrat OpenAPI** d'un nouvel endpoint PetClinic avant de l'implémenter, plutôt qu'un wireframe HTML.

1. Créez un **projet d'extension** Spec Kit :
   * manifeste `extension.yml` + `commands/api-contract.md` → commande **`/speckit.ext.api-contract`** ;
   * la commande **génère ou met à jour un fragment OpenAPI** (`openapi.yaml`) à partir de la spec, **avant** le plan.
2. **Installez en local** pour itérer :

```bash
specify extension add --dev ./speckit-api-contract
specify extension list        # vérifier qu'elle est active
```

3. **Déroulez** sur un nouvel endpoint PetClinic (ex. `GET /owners/{id}/pets/count`). Le **contrat OpenAPI** fixe le **résultat attendu** (chemins, schémas, codes retour) : on contrôle finement l'interface **avant** l'implémentation.

```text
/speckit.specify → /speckit.ext.api-contract → /speckit.plan → /speckit.tasks → /speckit.implement
```

4. **Comparez** en fin d'implémentation : l'API réelle respecte-t-elle le contrat généré ? Écarts de schéma ? Faut-il **raffiner la spec** ou **le contrat** ?

> Même point pédagogique que la variante wireframe : fixer le contrat avant le code donne un critère de recette objectif, adapté à une équipe qui pilote par les contrats plutôt que par le rendu visuel.
