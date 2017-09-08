import express from 'express';

import { createUser, loginUser } from '../controller/user';
import {createRecipe, getRecipes, getRecipe, deleteRecipe, modifyRecipe} from '../controller/recipe';
import { postReview, getReviews } from '../controller/review';
import { voteRecipe, countVote } from '../controller/votes';
import { favoriteRecipe, getUserFavorites } from '../controller/favorite';
import { checkUsernameExist, checkRecipeExist, checkUserExist} from '../middleware/validate';
import { verifyUserSession } from '../middleware/authorize';

const router = express.Router();

router.get('/', (req, res) => {
	// console.log(req.query.token);
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
router.get('/recipes', verifyUserSession, getRecipes);

// get single recipe
router.get('/recipes/:recipeId', verifyUserSession, checkRecipeExist, getRecipe);

// post review for a recipe 
router.post('/recipes/:recipeId/review', verifyUserSession, checkRecipeExist, postReview);

// get reviews of a recipe;
router.get('/recipes/:recipeId/reviews', verifyUserSession, checkRecipeExist, getReviews);

// get all favourites
router.get('/users/:userId/recipes', verifyUserSession, checkUserExist, getUserFavorites);

// favourite a recipe
router.post('/users/:recipeId/favourite', verifyUserSession, checkRecipeExist, favoriteRecipe);

// upvote a recipe;
// router.post('/users/upvote/:recipeId', verifyUserSession, checkRecipeExist, upvoteRecipe);

// downvote a recipe
// router.post('/users/downvote/:recipeId', verifyUserSession, checkRecipeExist, downvoteRecipe);


// upvote or downvote 
router.post('/users/:recipeId/vote-:voteType', verifyUserSession, checkRecipeExist, voteRecipe, countVote );

// get recipes with the most upvotes 
router.get('/recipes?sort=upvotes&order=ascending', verifyUserSession);


export default router; 