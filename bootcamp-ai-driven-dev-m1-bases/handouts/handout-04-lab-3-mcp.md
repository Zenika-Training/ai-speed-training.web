---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m1-bases/handouts/handout-04-lab-3-mcp.md
---
# Handout — Lab 3 · Brancher des outils tiers avec MCP (Playwright & Figma)

**AI-Driven Development · Module 1 · Zenika · support d'exercice**

Faire utiliser à Claude les serveurs MCP Playwright et Figma pour tester l'application brownfield, implémenter un nouveau design, mettre à jour les tests et enrichir le guide utilisateur avec des captures d'écran.

Façon simple d'ajouter un serveur MCP distant à Claude Code : `claude mcp add --transport http <nom> <url>`. Pour les configurations avancées, voir la documentation de Claude Code.

## 1. Tester l'application avec Playwright

1. Ajouter le serveur MCP Playwright :

```text
claude mcp add playwright npx @playwright/mcp@latest
```

2. Vérifier que `brownfield-backend` et `brownfield-frontend` tournent toujours.
3. Dans Claude, demander un **test exploratoire** de `http://localhost:5173/` avec Playwright. Claude ouvre un navigateur et parcourt l'application. **Chrome doit être installé.**
4. Demander ensuite de **générer un script Playwright**, puis le lancer en local :

```text
npx playwright test
```

## 2. Implémenter un design Figma

Le designer a préparé une maquette Figma de PetClinic (aperçu fourni par le formateur). Vous n'avez pas de compte Figma : l'agent lira la maquette via l'API.

### 2.1 Configurer le serveur Framelink pour Figma

1. Ajouter le serveur Framelink MCP for Figma, avec la clé d'API de formation fournie par le formateur :

```text
claude mcp add Framelink_Figma_MCP -- npx -y figma-developer-mcp --figma-api-key=<clé fournie par le formateur> --stdio
```

2. Claude Code a un MCP Figma intégré, plus limité que Framelink sur l'offre gratuite. Pour être sûr d'utiliser Framelink, taper `/mcp` et **désactiver temporairement l'intégration Figma**.

> Ne jamais coder en dur une clé d'API dans un fichier versionné : variables d'environnement ou gestionnaire de secrets.

### 2.2 Créer la skill `frontend-figma`

Créer une skill `frontend-figma` : identique à `frontend`, mais avec tous les tools Figma activés.

### 2.3 Implémenter le nouveau design

1. Le formateur vous donne l'URL du design Figma : vous ne pouvez pas l'ouvrir dans votre navigateur, mais l'agent la lit grâce à la clé d'API.

2. Invoquer la skill `frontend-figma` pour refactorer l'application. Comme toujours, **un plan d'abord**, puis un refactoring **incrémental** :
   * d'abord le **Header** ;
   * puis chaque page, une par une : **Pets**, **Visits**, **Vets**, **Invoices**.

> Le MCP Figma se trompe parfois. Relire attentivement icônes, couleurs, etc., **au moment du plan et à la génération du code**. Avancer lentement et demander à la skill de corriger quand elle se trompe.

Toutes les pages migrées : le nouveau design est implémenté.

## 3. Mettre à jour le script Playwright

Le script Playwright du point 1 a été écrit pour l'ancien design.

1. Le relancer : `npx playwright test`.
2. Si des tests cassent, invoquer la skill Playwright et lui demander de **corriger les tests cassés**.

## 4. Mettre à jour le guide utilisateur

L'interface a beaucoup changé depuis le Lab 2 : on met le guide à jour et on y ajoute des captures d'écran de toutes les pages, prises avec Playwright.

1. Mettre à jour la skill `documentation` pour qu'elle ait accès aux tools du MCP Playwright.
2. Demander à l'agent de mettre à jour la documentation à partir de `http://localhost:5173/`, **avec des captures d'écran** dans le guide.
3. Relire le fichier markdown généré.

Le guide est à jour : le lab est terminé.

## Variante GitHub Copilot

| Étape        | Claude Code                                                                            | GitHub Copilot                                                                                                                                                                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright   | `claude mcp add playwright npx @playwright/mcp@latest`                                 | Ajouter le serveur Playwright dans `.vscode/mcp.json` ; `/create-skill` pour une skill PlayWright qui charge ce serveur ; activer aussi le tool MCP Built-in/browser                                                                                                 |
| Figma        | `claude mcp add Framelink_Figma_MCP -- …` puis `/mcp` pour désactiver le Figma intégré | `.vscode/mcp.json` contient déjà « Framelink MCP for Figma » avec une clé factice : la remplacer par la clé de formation, redémarrer VS Code, vérifier le serveur dans les tools du prompt (ou Command Palette, « MCP: Manage MCP Servers », pour un serveur global) |
| Design       | Skill `frontend-figma`                                                                 | Agent custom « Frontend Figma » : comme Frontend, avec tous les tools Figma                                                                                                                                                                                          |
| Tests cassés | Skill Playwright                                                                       | Revenir sur l'agent Playwright                                                                                                                                                                                                                                       |
| Guide        | Skill `documentation` avec accès à Playwright                                          | Invoquer les skills Playwright et documentation ensemble                                                                                                                                                                                                             |

Configuration Copilot du serveur Figma, dans `.vscode/mcp.json` :

```json
{
  "servers": {
    "Framelink MCP for Figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=<clé fournie par le formateur>", "--stdio"],
      "type": "stdio"
    }
  }
}
```
