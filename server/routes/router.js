import express from 'express';

import { getTopRecipes } from '../controller/recipe';
import {createUser, loginUser, getAllUser, logoutUser} from '../controller/user';
import {createRecipe} from '../controller/recipe';


const router = express.Router();


// G E T    R E Q U E S T S 

router.get('/', (req, res) => {
	res.status(200).send({message: "Welcome to More Recipes"})
});

router.get('/api/recipes', getTopRecipes)

router.get('/api/users/', getAllUser)

router.get('/api/users/:userId/recipes', )



// P O S T    R E Q U E S T S 

router.post('/api/users/signup', createUser)

router.post('/api/users/signin', loginUser)

router.get('/api/users/logout', logoutUser)

router.post('/api/recipes/create', createRecipe);

router.post('/api/recipes/:recipeId', (req, res) => {});

router.post('/api/recipes/:recipeId/reviews', (req, res) => {

});


// P U T    R E Q U E S T S

router.put('/api/users/:userId/books', (req, res) => {});

router.put('/api/books/:bookId', (req, res) => {});



export default router; 