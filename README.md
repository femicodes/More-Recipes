# More Recipes 
[![Build Status](https://travis-ci.org/tobyleye/More-Recipes.svg?branch=develop)](https://travis-ci.org/tobyleye/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/tobyleye/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/tobyleye/More-Recipes?branch=develop)

A platform for users to share the awesome and exciting recipes ideas they have learnt or invented

### Technologies
-----

 1. Nodejs
 1. Postgresql
 1. Express
 1. Sequelize

**BASE_URL:** `https://more-recipes-007.herokuapp.com/api/v1/`

### RECIPES
- **`POST` /recipes**
  - Creates new recipe
- **`PUT` /recipes/:id**
  - Updates a recipe
- **`DELETE` /recipes/:id**
  - Deletes a recipe
- **`GET` /recipes**
  - Get all recipes
  - **`GET` /recipes/:id**
  - Get a single recipe by its id
- **`POST` /recipes/:id/reviews**
  - Post new review for a recipe
  - **`GET` /recipes/:id/reviews**
  - Get all the reviews for a recipe
- **`POST` /recipes/:id/favorite**
  - Favorite a recipe
- **`POST` /recipes/:id/vote-:voteType**
  - Vote a recipe in `voteType` {up or down}

### USERS

- **`GET` /users/:uid/favorites**
  - Returns all user's favorite recipes
  - **`GET` /users/:uid/recipes**
  - Returns all user's recipes
- **`POST` /users/signin**
  - Creates a new user, returns user token
- **`POST` /users/login**
  - Logs in user, returns user token
