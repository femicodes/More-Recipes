import db from '../models';

const { Recipe } = db;

// returns all recipes ! 
// GET ---> recipes
// query ---> start=10, end=20; sort=upvotes&order=ascending

export function getRecipe(req, res) {
	const {recipeId} = req.params;
	// console.log(recipeId);
	return Recipe
		.findById(recipeId)
		.then( recipe => {
			if (recipe)
				res.status(200).json(recipe);
			else 
				res.status(200).json({success: true, message: 'recipe does not exist'});
		})
		.catch(err => res.status(404).json({
			success: false,
			message: err.errors[0].message
		}));
}

export function getRecipes(req, res) {
	// console.log(req.query.sort, req.query.order);
	const {sort, order} = req.query;
	if (sort && order) {
		if (order !== 'ascending' && order!== 'descending')
			return res.status(400).send({success: false, message: 'Invalid order, Please use either ascending or descending'});
		
		// if it's in the right order 1
		return Recipe.findAll(
			// some expressions here
		);
	}

	// if no query, just return all the recipes 
	return Recipe
		.all()
		.then( recipes => res.status(200)
			.json(recipes)
		)
		.catch( err => res.status(404).json({
			success: false,
			message: err.errors[0].message
		}));
}

// create a recipe 
export function createRecipe(req, res) {
	const {userId} = req;
	const {title, description, ingredient, direction} = req.body;
	// console.log(userId);
	return Recipe
		.create({
			userId,
			title,
			description,
			ingredient,
			direction,
		})
		.then(recipe => res.status(201)
			.json(recipe))
		.catch( (err) => res.status(503).json({success: false, message: err.errors[0].message})
		);
}

// modify a recipe
export function modifyRecipe(req, res) {
	const { userId } = req;
	const { recipeId } = req.params;
	
	return Recipe
		.findById(recipeId)
		.then( recipe => {
			if (recipe.userId !== userId) {
				res.status(403).json({success: false, message: 'Not authorized to delete this recipe!'});
			}
			return recipe
				.update({
					title: recipe.body.title || recipe.title,
					description: recipe.body.description || recipe.description,
					ingredient: recipe.body.ingredient || recipe.ingredient,
					direction: recipe.body.direction || recipe.direction,
				})
				.then( recipe => res.status(200).json({success: true, message: 'updated successfully', recipe}))
				.catch(err => res.status(400).json({success: false, message: err.errors[0].message}));
		})
		.catch( () => res.status(503).json({
			success: false,
			message: 'Error modifying recipe'
		}));
}


// delete recipe
export function deleteRecipe(req, res) {
	const {userId} = req;
	// console.log(userId);
	return Recipe
		.findById(req.params.recipeId)
		.then( recipe => {
			if (recipe.userId !==  userId) {
				return res.status(404).json({success: false, message: 'Not authorized to delete this recipe'});
			}
			return recipe
				.destroy()
				.then( () => res.status(204).json({sucess: true, message: 'Recipe deleted successfully'}))
				.catch(err => res.status(400).json({success: false, message: err.errors[0].message}));
		})
		.catch(err => res.status(503).json({
			success: false, 
			message: err.errors[0].message
		}));
}



