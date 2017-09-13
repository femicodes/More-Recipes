import express from 'express';

// middleware imports 
import { checkUsernameExist, checkRecipeExist, checkUserExist} from '../middleware/validate';

//controllers! 
import { createUser, loginUser, getUserRecipes} from '../controller/user';
import {createRecipe, getRecipes, getRecipe, deleteRecipe, modifyRecipe} from '../controller/recipe';
import { postReview, getReviews } from '../controller/review';
import { voteRecipe, countVote } from '../controller/votes';
import { favoriteRecipe, getUserFavorites } from '../controller/favorite';
import { verifyUserSession } from '../middleware/authorize';	


// instantiate router.
const router = express.Router();


router.get('/', (req, res) => {
	res.status(200).json({success: true, message: 'Welcome to More Recipes'});
});

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
// can also do something like GET /recipes?sort=upvotes&order=ascending
router.get('/recipes', verifyUserSession, getRecipes);

// get single recipe
router.get('/recipes/:recipeId', verifyUserSession, checkRecipeExist, getRecipe);

// post review for a recipe 
router.post('/recipes/:recipeId/review', verifyUserSession, checkRecipeExist, postReview);

// get reviews of a recipe;
router.get('/recipes/:recipeId/reviews', verifyUserSession, checkRecipeExist, getReviews);

// get all favourites
router.get('/users/:userId/favorites', verifyUserSession, checkUserExist, getUserFavorites);

// get all recipes posted by a user
router.get('/users/:userId/recipes', verifyUserSession, checkUserExist, getUserRecipes);

// add a recipe to favorite list
router.post('/recipes/:recipeId/favorite', verifyUserSession, checkRecipeExist, favoriteRecipe);

// upvote or downvote 
router.post('/recipes/:recipeId/vote-:voteType', verifyUserSession, checkRecipeExist, voteRecipe, countVote );


export default router; 