---
url: >-
  /ai-speed-training.web/bootcamp-ai-driven-dev-m1-bases/handouts/handout-03-lab-2-brownfield.md
---
# Handout — Lab 2 · Refactorer PetClinic (brownfield)

**AI-Driven Development · Module 1 · Zenika · support d'exercice**

Faire évoluer une version plus riche de PetClinic (Vets, Visits, Invoices) : un refactoring backend, une évolution frontend, puis un guide utilisateur généré par une skill. Le code est plus gros et plus complexe qu'en greenfield : Claude et le modèle ont besoin de plus de guidage.

## 1. Mettre en place l'application brownfield

1. Ouvrir les projets `brownfield-backend` et `brownfield-frontend` et parcourir le code.
2. Lancer le backend : `./mvnw clean spring-boot:run` dans `brownfield-backend`.
3. Lancer le frontend dans un autre terminal, dans `brownfield-frontend` :

```text
npm install
npm run dev
```

4. Une fois les deux applications lancées, explorer les nouvelles fonctionnalités dans le navigateur.

## 2. Créer une skill `backend`

Au Lab 1, vous avez créé la skill `frontend`. Créez maintenant une skill `backend` :

1. Elle se comporte comme `frontend` (plan d'abord, exécution pas à pas avec validation) et utilise le fichier de contexte `docs/tech/architecture-backend.md`.
2. La placer, elle aussi, dans le dossier `.claude/skills/` à la racine.
3. Lancer `claude` dans `brownfield-backend` et vérifier (`/skills`) que `frontend` **et** `backend` sont disponibles.

## 3. Nouvelle feature backend : Owner devient une entité

Aujourd'hui, `owner` est un champ de `Pet.java`. En faire une entité à part entière touche de nombreux fichiers.

1. Saisir la demande :

```text
C'est une tâche de développement backend.
Crée un plan pour ce qui suit :
Dans le projet brownfield-backend, je veux refactorer le code pour que
Owner soit une entité séparée au lieu d'un champ de l'entité Pet.
Owner a un id, un name et une address.
L'API reste exposée via Pet et Visit. Pas besoin d'une API séparée
pour Owner.
```

2. Vérifier que le plan **inclut le refactoring des tests unitaires** : l'IA l'oublie souvent sur du brownfield.
3. Vérifier que la skill `backend` est chargée automatiquement, sinon l'invoquer à la main (`/backend`).
4. Enregistrer le plan et demander à Claude de l'implémenter.
5. À la fin, tous les tests doivent passer. Lancer le backend et le tester sur Swagger : `http://localhost:8080/swagger-ui/index.html#/`.

## 4. Nouvelle feature frontend : détail d'un pet

1. Créer un plan pour l'évolution frontend : depuis la liste des pets, **cliquer sur un pet affiche ses détails et ceux de son propriétaire**.
2. Relire le plan et l'implémenter comme précédemment.
3. Passer à la suite quand la page affiche les informations du propriétaire dans le navigateur.

## 5. Générer un guide utilisateur

Le guide utilisateur de PetClinic est un fichier markdown. Il n'a pas encore de captures d'écran : elles seront ajoutées au Lab 3, avec Playwright.

1. Ouvrir `docs/user-guide` : il contient un fichier vide, `user-guide.md`. Une skill va le remplir.
2. Créer une skill `documentation`. À vous de décider comment le guide doit être rédigé, avec deux consignes :
   * le guide reste **concis**, pour ne pas perdre les utilisateurs dans les détails ;
   * la skill **ne lit pas le code** : elle **parcourt l'application** qui tourne et décrit comment l'utiliser.
3. Invoquer la skill sur l'URL du frontend (par exemple `http://localhost:5173/`) pour remplir `user-guide.md`.
4. Relire le guide. Si le résultat ne convient pas, modifier les consignes de la skill et régénérer.

Le guide est rempli et relu : le lab est terminé.

## Variante GitHub Copilot

| Étape                  | Claude Code                                  | GitHub Copilot                                                                                                                                                                                                                       |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Afficher le brownfield | Ouvrir les dossiers                          | `.vscode/settings.json`, `files.exclude` : greenfield à `true`, brownfield à `false` ; arrêter les applications greenfield et passer dans `../brownfield-backend` et `../brownfield-frontend`                                        |
| Instructions           | `CLAUDE.md`                                  | On n'utilise plus les agents par défaut Plan et Agent : chaque agent custom pointe vers son fichier d'architecture, on peut vider `.github/copilot-instructions.md`                                                                  |
| Backend                | Skill `backend`                              | Agent custom : `/create-agent` pour créer un agent Backend, comme Frontend, avec `docs/tech/architecture-backend.md` ; sélectionner l'agent Backend dans le chat                                                                     |
| Frontend               | Skill `frontend`                             | Repasser sur l'agent Frontend                                                                                                                                                                                                        |
| Guide utilisateur      | Skill `documentation` dans `.claude/skills/` | `/create-skill`, choisir « Workspace scoped » : la skill va dans `.github/skills/<nom>/SKILL.md` ; l'invoquer à la main (`/<nom>`) ou par la demande (« Generate documentation… ») ; aperçu markdown avec Ctrl+Shift+V (Cmd+Shift+V) |

> Une skill peut servir à n'importe quel agent, et s'invoquer à la main ou automatiquement quand la demande correspond à sa description.
