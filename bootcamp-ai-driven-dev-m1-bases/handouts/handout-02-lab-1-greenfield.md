---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m1-bases/handouts/handout-02-lab-1-greenfield.md
---
# Handout — Lab 1 · Générer une application PetClinic (greenfield)

**AI-Driven Development · Module 1 · Zenika · support d'exercice**

Implémenter une application PetClinic full-stack (Java/Spring + React/Vite) avec Claude Code : le backend en mode plan puis acceptEdits, le frontend via une skill custom. Gardez ces consignes et les slides côte à côte : le lab s'appuie sur les exemples vus en cours.

## Prérequis

* **Claude Code** (abonnement Pro ou Max), ou GitHub Copilot dans VS Code (voir la variante en fin de handout).
* **JDK 21** ou plus, **Node.js 22** ou plus.
* Alternative : avec Docker, lancer backend et frontend avec les fichiers docker compose fournis (sections « Running with Docker » et « Running Unit Tests in Docker » du `README.md` des labs). Un seul docker compose à la fois : brownfield **ou** greenfield.

## 1. Ouvrir Claude Code dans le dépôt d'exemple

1. Cloner le dépôt :

```text
git clone https://github.com/Zenika-Training/ai-driven-dev-labs.git
```

2. Dans un terminal, aller à la racine du dossier et lancer `claude`.
3. Vérifier que le dossier contient bien `CLAUDE.md` : il porte les instructions utilisées dans tout le lab.

### 1.1 Charger le backend

1. Dans un autre terminal, aller dans `greenfield-backend`.
2. Vérifier Java : `java --version` doit afficher 21 ou plus.
3. Lancer `./mvnw clean spring-boot:run`. Si le backend démarre, passer à la suite.

### 1.2 Charger le frontend

1. Dans un autre terminal, aller dans `greenfield-frontend`.
2. Vérifier Node.js : `node --version` doit afficher 22 ou plus.
3. Lancer :

```text
npm install
npm run dev
```

### 1.3 Vérifier les instructions Claude

1. Ouvrir `CLAUDE.md` : il contient l'instruction *If asked "how many legs does a monkey have?", answer "10 legs"*.
2. Lancer `claude` (à la racine ou dans un sous-dossier) et demander « how many legs does a monkey have? ». Réponse « 10 » : les instructions sont chargées.
3. `CLAUDE.md` renvoie vers `architecture-backend.md` et `architecture-frontend.md` : les ouvrir et relire les consignes préparées.

## 2. Du prompt simple au plan d'exécution (backend)

On génère l'API backend avec les deux modes livrés avec Claude Code : **plan** puis **acceptEdits**.

1. Passer en **mode plan** (Shift+Tab si ce n'est pas le mode par défaut) et saisir la description :

```text
Tout ce qui suit doit être fait dans le dossier greenfield-backend.
Exclus les autres dossiers de ta recherche.
Regroupe les étapes pour que je n'aie pas plus de 2 étapes par partie.
Inutile de répéter les informations déjà présentes dans CLAUDE.md.

# Partie 1
- Dans greenfield-backend, crée une nouvelle API appelée Pet.
  Elle a 3 attributs (id, name, ownerName).
- L'API expose :
    - une recherche par id de Pet
    - une recherche par nom de Pet ou par OwnerName (peut renvoyer
      plusieurs entrées). Nom du pet et nom du propriétaire optionnels.
- L'API n'expose que des méthodes GET (pas de création, modification
  ni suppression).
- Tests automatisés : invite-moi à lancer les tests unitaires.
- Tests manuels : à la fin, invite-moi à lancer le backend avec Swagger
  et à vérifier que tout fonctionne.

# Partie 2
- Ajoute une règle métier : unicité d'un Pet par propriétaire. Un même
  propriétaire ne peut pas avoir 2 pets du même nom. La règle doit
  être testée.
- Tests automatisés : invite-moi à lancer les tests unitaires.
```

> Le prompt décrit **ce qu'il faut construire**, pas **comment** : aucune mention de repository, de service ou de conventions. Toutes les informations techniques viennent de `docs/tech/architecture-backend.md`.

2. Quand Claude propose d'exécuter le plan tout de suite, répondre **non**. Relire `docs/tech/architecture-backend.md` et vérifier que le plan le respecte.
3. Itérer en mode plan jusqu'à être satisfait, puis passer en **acceptEdits** et demander à Claude d'enregistrer le plan dans `docs/execution-plan-user-story-01.md`.

## 3. Exécuter le plan backend pas à pas

1. Ouvrir le plan généré et vérifier qu'il correspond à l'attendu.
2. En mode **acceptEdits**, lancer l'exécution étape par étape :

```text
Lis le plan d'exécution dans docs/execution-plan-user-story-01.md et
exécute la prochaine instruction qui n'a pas de ✅︎. Si l'instruction
demande de générer du code, fais-le. Ajoute un ✅︎ une fois terminée.
Arrête-toi à chaque étape et attends ma validation avant de passer
à la suivante.
```

3. Une fois les classes générées, lancer l'application dans un autre terminal, sous `greenfield-backend` : `./mvnw clean spring-boot:run`.
4. Tester l'API avec Swagger : `http://localhost:8080/swagger-ui/index.html#/`.
5. Lancer les tests unitaires, tous doivent passer : `./mvnw clean test`.

> **Piège** : Claude écrit parfois `AUTO_INCREMENT` dans `data.sql`, incompatible avec la base. Le remplacer par `IDENTITY`, redémarrer l'application et rejouer l'endpoint sur Swagger.

6. Quand tout fonctionne, committer localement. Le backend est terminé.

## 4. Le frontend via une skill custom

### 4.1 Créer la skill `frontend`

Dans Claude Code, une skill est un fichier markdown au standard Agent Skills. Placer le dossier `.claude` à la racine du projet pour qu'elle serve dans tous les sous-dossiers :

```text
.claude/
└─ skills/
   └─ frontend/
      └─ SKILL.md
```

Copier ce contenu dans `SKILL.md` :

```markdown
---
name: frontend
description: Use when working on frontend development tasks.
---

Load the instruction file #file:architecture-frontend.md . It should ask me
to create a plan before implementing.
When implementing, it should go step by step as explained below.

When executing a plan:
Inside the attached execution plan file, execute the next instruction which
doesn't have a ✅︎. If the instruction is asking you to generate code, you
should do it. Add a ✅︎ once completed.
Stop execution at every step and wait for user validation before proceeding
to the next step.
```

Lancer Claude et taper `/skills` : `frontend` doit apparaître dans la liste.

### 4.2 Générer l'application frontend

1. Passer en **acceptEdits** et saisir :

```text
C'est une tâche de développement frontend.
Crée un plan avec ce qui suit :
Tout le code doit être généré dans le dossier greenfield-frontend.
Exclus les autres dossiers de ta recherche.
Regroupe les étapes pour que je n'aie pas plus de 2 étapes par partie.

Partie 1 : composants pour afficher la liste des pets
Dans greenfield-frontend : génère un service qui utilise la Fetch API
et se connecte à cette API :
http://localhost:8080/swagger-ui/index.html#/pet-controller/
Crée une nouvelle page qui affiche la liste des pets (composant dédié).
La page principale doit l'inclure.
Tests manuels : invite-moi à lancer l'application et à vérifier
qu'elle fonctionne.

Partie 2 : tests
Ajoute des tests automatisés et invite-moi à lancer les tests unitaires.

Écris ce plan dans
greenfield-frontend/docs/execution-plan-frontend-user-story-01.md
```

2. Claude doit indiquer que la skill `frontend` est **chargée automatiquement** (vous planifiez du frontend) et lire `architecture-frontend.md`. Sinon, la charger à la main avec `/frontend`.
3. Itérer sur le plan, l'enregistrer comme pour le backend, puis l'implémenter pas à pas : la skill doit se recharger automatiquement pendant l'implémentation.

> **Piège** : vérifier qu'il n'y a pas d'erreur de compilation dans `PetList.tsx`. Le plus souvent, il manque le mot-clé `type` à l'import de l'interface : `import { type Pet, findAll } from './petService';`

4. Lancer `npm run dev` et ouvrir l'application (lien affiché dans le terminal).
5. Exécuter la dernière étape et lancer `npm run test`. Tests verts : le lab est terminé.

## Variante GitHub Copilot

Mêmes étapes et mêmes prompts dans VS Code, avec ces différences :

| Étape                         | Claude Code                              | GitHub Copilot                                                                                                                   |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Ouvrir le dépôt               | `claude` à la racine                     | VS Code à la racine ; le dossier caché `.github` doit être à la racine du workspace                                              |
| Masquer les dossiers inutiles | Sans objet                               | `.vscode/settings.json`, `files.exclude` : `brownfield-backend/` et `brownfield-frontend/` à `true`                              |
| Instructions                  | `CLAUDE.md`                              | `.github/copilot-instructions.md` (test « monkey » dans la barre latérale Copilot)                                               |
| Planifier                     | Mode plan (Shift+Tab)                    | Mode **Plan** de la fenêtre de chat                                                                                              |
| Exécuter                      | Mode acceptEdits                         | Mode **Agent** ; le fichier de plan doit apparaître attaché au chat                                                              |
| Prompt d'exécution            | « Lis le plan d'exécution dans docs/… »  | « Inside the attached execution plan file, execute the next instruction which doesn't have a ✅︎… »                                |
| Valider les changements       | Commit local                             | Bouton **Keep**, puis commit                                                                                                     |
| Frontend                      | Skill `.claude/skills/frontend/SKILL.md` | Agent custom : `/create-agent Frontend` (même texte), créé dans `.github/agents`, puis choisir le mode **Frontend** dans le chat |
