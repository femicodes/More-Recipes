import express from 'express';

import {createUser, loginUser} from '../controller/user';
import {createRecipe, getRecipes, deleteRecipe, modifyRecipe} from '../controller/recipe';
import { checkUsernameExist, checkRecipeExist} from '../middleware/validate';
import {verifyUserSession } from '../middleware/authorize';

const router = express.Router();

// -----------------------------------------------------
router.get('/', (req, res) => {
	res.status(200).send({message: 'Welcome to More Recipes'});
});

// -------------------------------------------------------

// signup
router.post('/users/signup', createUser);

// signin
router.post('/users/signin', checkUsernameExist, loginUser);

// create recipes
router.post('/recipes', verifyUserSession, createRecipe);

// modify recipes 
router.put('/recipes/:recipeId', verifyUserSession, checkRecipeExist, modifyRecipe);

//delete recipes
router.delete('/recipes/:recipeId', verifyUserSession, checkRecipeExist, deleteRecipe);

// get recipes
router.get('/recipes', verifyUserSession, checkRecipeExist, getRecipes);



// post review for a recipe 
router.post('/recipes/:recipeId/reviews', verifyUserSession);

// get reviews of a recipe;
router.get('/recipes/:recipeId/reviews', verifyUserSession);

// get all favourites
router.get('/api/users/:userId/recipes', verifyUserSession);

// favourite a recipe
router.post('/api/users/:userId/recipes', verifyUserSession);


// upvote a recipe;
router.post('/api/users/upvote/:recipeId', verifyUserSession);

// downvote a recipe
router.post('/api/users/upvote/:recipeId', verifyUserSession);

// get recipes with the most upvotes 
router.get('/api/recipes?sort=upvotes&order=ascending', verifyUserSession);


export default router; 