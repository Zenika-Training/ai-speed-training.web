---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-10-lab-07-terminal-first.md
---
# Handout — Lab 7 · Poste terminal-first (facultatif)

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Lab facultatif : mettre en place et utiliser un espace de travail terminal-first (agent, navigateur de fichiers, client git) pour développer une feature de la PetClinic.

## 1. Installer les outils

* tmux : https://github.com/tmux/tmux
* yazi : https://github.com/sxyazi/yazi
* lazygit : https://github.com/jesseduffield/lazygit

```bash
brew install tmux yazi lazygit
brew install ffmpegthumbnailer fd ripgrep fzf zoxide  # prévisualisation yazi
```

## 2. Prendre ses repères dans le CLI

### GitHub Copilot CLI

Tapez `/` pour lister les commandes disponibles, puis :

```text
/model      # choisir le modèle : arbitrage coût / puissance
/context    # état de la context window
/diff       # ce que l'agent a modifié depuis le début de la session
```

### Claude Code

Configurez Claude Code au terminal : une ligne d'état qui affiche le contexte utile, puis les réglages.

```text
/statusline Display current directory and/or username@hostname, the Active Claude model, the context window usage and the git branch/status
/config
```

## 3. Monter le poste et développer

1. **Créez une session tmux** avec 3 panneaux (agent / yazi / lazygit) :
   * panneau principal : lancez `copilot` ou `claude` sur la PetClinic ;
   * panneau yazi : naviguez dans `src/main/java/` ;
   * panneau lazygit : surveillez les changements git en temps réel.
2. **Demandez à l'agent** d'implémenter une petite feature (par exemple : ajouter un champ `phone` à `Owner`), en observant les trois panneaux.
3. **Relisez dans lazygit** avant de committer.

> Le workflow complet : agent génère → yazi confirme → lazygit valide → commit.

> Piège classique : tmux qui ne se découpe pas parce que le préfixe a été personnalisé. Ayez un `tmux.conf` minimal de référence sous la main. Équipé d'un autre CLI (`gemini`…) ? Lancez simplement le vôtre dans le panneau agent : le reste du poste est identique.
