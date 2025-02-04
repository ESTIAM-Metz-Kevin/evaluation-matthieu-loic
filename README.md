[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/C06pvdaI)
# Projet noté sur Express et React - Kouizz

Kouizz est un jeu de questions-réponses sur le thème des jeux vidéo. Le projet se compose d'une API Express.js et d'une application front-end React avec TypeScript.

## Architecture du projet

Le projet est divisé en deux parties principales :

- Un dossier `api` contenant le projet Express.js
- Un dossier `app` contenant le projet Vite React + TypeScript

## Fonctionnalités à développer

### Page d'accueil

La page d'accueil doit contenir :

- L'historique des parties avec :
  - Le pseudo du joueur
  - Son score (nombre de réponses justes / nombre total de questions)
  - La date et l'heure de finalisation du quizz
- Un formulaire de démarrage avec :
  - Un champ pour saisir le pseudo
  - Un bouton "Jouer" redirigeant vers `/game`

### Page de jeu

La page de jeu (`/game`) doit afficher :

- La progression (ex: Question 1/10, 2/10, etc.)
- La question en cours
- Le niveau de difficulté (facile, moyen, difficile)
- 4 cartes représentant les réponses possibles

Comportement du jeu :

- Au clic sur une réponse :
  - La réponse choisie devient verte si correcte, rouge si incorrecte
  - La bonne réponse est toujours affichée en vert
  - Un bouton "Question suivante" apparaît
- À la fin du quizz :
  - Affichage du score final
  - Un bouton "Rejouer" pour lancer une nouvelle partie
  - Un bouton "Retour à l'accueil"

### API Express

L'API doit :

1. Récupérer les questions depuis l'API externe :
   ```
   https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=jeux_videos
   ```
2. Exposer des endpoints pour l'application REACT :
   - Récupérer les questions
   - Valider les réponses
   - Sauvegarder les résultats des parties

## Conseils techniques

### Composants

Vous devez créer différents composants REACT pour alléger vos fichiers et permettre une meilleure lisibilité, avoir une meilleure structure, permettre de réutiliser les composants et faciliter la maintenabilité.

Voici des suggestions possibles de composants :

- `QuestionCard` : Affichage d'une question et ses réponses
- `ScoreDisplay` : Affichage du score actuel
- `AnswerOption` : Card pour une réponse
- `GameHistory` : Tableau des parties précédentes
- `PlayForm` : Formulaire de démarrage de partie

Voir la documentation pour plus d'informations sur les contextes :
https://fr.react.dev/learn/passing-data-deeply-with-context

### Routes API

Vous devez exposer des endpoints permettant à l'application REACT de communiquer avec votre serveur nodejs.

Voici quelques suggestions de routes possibles :

```
POST /api/quizz - Créé une nouvelle partie, vous récupérez un identifiant de partie. C'est nottament ici que vous allez déjà enregistrer le pseudo du joueur et sa date et heure de partie
GET /api/quizz/:id - Récupère les questions de la partie
POST /api/quizz/:id_quizz/answer - Valide et enregistre une réponse de la partie
GET /api/quizz/history - Récupère l'historique des parties
```

Note : pour POST /api/quizz, c'est là que vous pouvez par exemple utiliser l'API externe pour récupérer les questions et les stocker dans votre base de données. (Qu'elle soit in-memory ou avec SQLite)

## Grille de notation (100 points)

### Application React (40 points)

- Implémentation de la page d'accueil (15 points)
- Implémentation de la page de jeu (25 points)

### API Express (40 points)

- Implémentation des routes API (20 points)
- Intégration avec l'API externe de génération des questions (5 points)
- Persistence des données (10 points)
  - Si utilisation de SQLite (5 points supplémentaires)

### Qualité du code (20 points)

- Bonne utilisation de TypeScript (5 points)
- Architecture et organisation du code (5 points)
  - Bonne séparation des composants REACT
  - Création de hooks personnalisés pour alléger le composant REACT et garder la logique métier dans un hook séparé
  - Côté API, séparation en différentes couches de responsabilité (MVC)
  - Contrôle des données en entrées d'API
- Bon nommage, propreté et lisibilité du code (5 points)
- Commits réguliers et pertinents (5 points)

## Consignes

- Utilisez fetch pour les appels HTTP vers l'API
- Réfléchissez bien à la structure de vos données
  - Quelles sont les structures de données les mieux adaptées à l'utilisation dans REACT
  - Sous quelle forme allez vous stockers les informations en base de données
  - Allez-y étape par étape. N'hésitez pas à réecrire votre code si besoin. Jeter du code n'est pas une mauvaise chose !
- Vous n'êtes pas obligé de faire les fonctionnalités dans l'ordre. A vous de vous organiser et de ne pas essayer de tout faire en même temps.
  - Rien ne vous empêche d'avoir des données d'exemple in-memory pour, par exemple, afficher l'historique des parties, sans avoir pour autant le système de jeu en place.
- N'hésitez pas à faire du pair programming, c'est à dire :
  - Travailler ensemble sur un même PC.
  - Ou avec LiveShare de VSCode.
  - Vous pouvez bien sûr travailler chacun de votre côté, cependant vous êtes plus efficace à deux sur un problème à résoudre que tout seul, très souvent :) Cela dépendra bien sûr de vos affinités à travailler ensemble et à communiquer efficacement
  - Si vous travaillez séparement, ATTENTION avec GIT, travaillez bien sur des éléments différents sinon vous allez avoir des conflits et vous n'êtes pas encore à l'aise avec cela :). Le mieux reste quand même de travailler sur le même code ensemble, physiquement ou avec liveshare.
- Faites des commits réguliers ! Plus vos commits sont petits avec une description compréhensible, plus il est facile de comprendre ce que vous avez fait, et surtout cela vous force à découper vos tâche en plus petites tâches ! Des points bonus sont accordés lorsque vous faites des commits reguliers et compréhensibles.
- Le rendu du projet noté se fait sur le devoir TEAMS. Vous mettez UNIQUEMENT votre lien github.

---

**Note :** Des points malus peuvent être données à plusieurs équipes si votre code se ressemble très sensiblement ! Soyez originaux et travaillez dans votre groupe. Je n'interdit pas les échanges, mais évitez de copier/coller du code d'autres équipes.
Cela compte également pour l'Intelligence Artificielle si elle vous fournit du code très similaire d'une équipe à l'autre ;-)

Des points supplémentaires peuvent être données si vous arrivez à être innovants. Par exemple :

- de la gestion des erreurs
- la gestion des temps de chargements (ajouter un loader lors du chargement du quizz par exemple, etc.)
- Un timer visible pour répondre à une question (10 secondes par exemple)
