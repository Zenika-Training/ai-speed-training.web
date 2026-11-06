---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-12-lab-09-skill-equipe.md
---
# Handout — Lab 9 · Skill d'équipe

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Produire un skill de qualité publication, le tester en session fraîche, puis le partager dans un registre simulé.

1. **Choisissez une expertise** encodable en skill : `reviewing-prs`, `generating-specs`, `analysing-e2e-failures`, `documenting-api-endpoints`.
2. **Écrivez le skill** en appliquant les bonnes pratiques :
   * frontmatter YAML : `name` (gérondif), `description` (troisième personne, **ce que ça fait** et **quand l'utiliser**) ;
   * corps : 500 lignes au plus, le contexte que l'agent ne peut pas déduire seul.
3. **Copilot : explorez ce qui existe déjà** avant de réinventer :

```bash
gh skill search "code review"
gh skill install github/awesome-copilot                       # explorer le dépôt
gh skill install github/awesome-copilot documentation-writer  # un skill précis
```

Un skill installé, c'est **du prompt exécuté chez vous** (et parfois des scripts) : relisez-le comme n'importe quelle dépendance tierce.

4. **Testez en session fraîche** :
   * ouvrez une **nouvelle session** (`copilot`, ou une nouvelle instance Claude, « Claude B »), sans contexte du skill ;
   * demandez la tâche couverte par le skill, **sans le nommer** ;
   * résultat attendu : le skill se déclenche automatiquement et correctement.
5. **Proposez-le en PR** sur le dépôt partagé du groupe :
   * créez `.github/skills/<nom-du-skill>/SKILL.md` (Copilot) ou `.claude/skills/<nom-du-skill>/SKILL.md` (Claude Code) dans un dépôt de démo ;
   * Copilot : ajoutez un `CODEOWNERS` et un tag de version (`v1.0.0`), c'est ce qui rend l'installation **reproductible** via `gh skill install <repo> <skill>@v1.0.0` ;
   * rédigez une description claire dans le message de PR.
6. **Revue croisée** : chaque participant relit le skill d'un autre. La `description` est-elle suffisamment précise ? Le corps, trop bavard ?

> Un skill est prêt quand une **session fraîche** l'utilise **sans coaching**, pas avant.

> Groupe mixte en outillage : faites tester le skill par un participant équipé d'un **autre agent** (Claude Code, Cursor…). Le format `SKILL.md` étant commun et Copilot lisant aussi `.claude/skills/`, ça fonctionne, et ça démontre la portabilité mieux qu'un slide.
