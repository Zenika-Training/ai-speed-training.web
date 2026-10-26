---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m2-equipe/handouts/handout-04-lab-02-user-stories.md
---
# Handout — Lab 2 · User stories

**Bootcamp AI-Driven Development · Module 2 · Zenika · support d'exercice**

Deux temps sur la PetClinic : brainstormer votre définition d'une bonne spec et l'encoder en skill (2.1), puis vous en servir pour générer une user story (2.2).

## 2.1 · Votre définition d'une bonne spec

**Objectif** : ne pas *recevoir* un guide tout fait, mais **brainstormer le vôtre, puis l'encoder en skill**. Concentrez-vous sur le **fond** plus que sur la forme.

1. **Brainstorm d'équipe** : *« c'est quoi une bonne spec pour nous ? »*
   * quel **gabarit** (story, critères d'acceptation, screenshots, **Definition of Done**) ?
   * quelle **syntaxe** (*As a… I want… so that…*), quel niveau de **détail** ?
   * **où vit-elle ?** (`docs/stories`, PRD, ticket Jira…) Quelle **source de vérité** unique ?
2. **Encoder** le consensus dans un skill **`story-writing`** (`SKILL.md` + gabarit), **versionné** dans le dépôt : `.github/skills/story-writing/` côté Copilot, `.claude/skills/story-writing/` côté Claude Code.
3. **Vérifier qu'il se déclenche** : demandez *« écris-moi une user story pour … »* dans une session neuve, sans nommer le skill. S'il ne s'active pas, c'est la `description` qu'il faut retravailler, pas le corps.

**Plusieurs manières d'écrire le skill**, comparez-les si vous avez le temps :

| Manière            | GitHub Copilot                                                                                                                                                                                                                                                                 | Claude Code                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| À la main          | vous créez le dossier et le `SKILL.md` vous-même                                                                                                                                                                                                                               | idem                                                                                                                        |
| En pilotant le CLI | vous demandez à `copilot` de créer le skill à partir du consensus de l'étape 1                                                                                                                                                                                                 | vous demandez à l'agent de le créer : il connaît le format, renseigne le frontmatter et vérifie que le skill est bien formé |
| Assistant guidé    | VS Code : la palette de commandes propose une **création de skill/agent** qui vous questionne au fur et à mesure (nom, description, contexte, outils autorisés) et vérifie le format. **Absent du CLI** : l'un des écarts les plus visibles entre les deux surfaces de Copilot | —                                                                                                                           |

> Vous redevenez **garants** de ce que « bonne spec » veut dire, au lieu de copier-coller un prompt.

> L'assistant guidé (ou l'agent) est utile pour un **premier** skill : il évite les oublis de frontmatter et pose les bonnes questions. Une fois le format acquis, écrire le fichier directement va plus vite.

> Sur Copilot, un skill n'est **pas** une commande : il est chargé par le modèle quand sa `description` correspond à la tâche. C'est donc la ligne la plus importante du fichier. Pour un déclenchement **explicite** par l'utilisateur, créez plutôt un prompt file (`.github/prompts/<nom>.prompt.md`, invoqué par `/<nom>` dans l'IDE) ou un agent custom appelé par `/agent`.

## 2.2 · Rédiger une user story

**Objectif** : générer une user story en suivant **le guide que vous venez d'écrire**, sur la PetClinic.

1. Pointez l'IA vers **votre skill `story-writing`** (ou `docs/product-management/writing-guides/story-writing-guides.md`) ; relisez-le une dernière fois.
2. Demandez à l'IA de **suivre ce guide** pour écrire la story d'une nouvelle page **« All Clinics »** :
   * **Clinic** devient une **entité** (aujourd'hui un champ de **Visit**), en **lecture seule** ;
   * relation **ManyToOne** Visit → Clinic ; `Clinic { id, address, director }` ;
   * **director est un Vet** → relation **OneToOne** Clinic → Director ;
   * pas de migration de base (pas encore en prod).
3. Générez la story dans un fichier `.md`, relisez-la et enregistrez-la dans **`docs/stories`**.

> Une story cadrée par *votre* guide est **concise, dans votre syntaxe, avec une Definition of Done**. Elle resservira au lab 8 (Feature A, page « All Clinics »).
