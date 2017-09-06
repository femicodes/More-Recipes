import db from '../models';

const { Recipe } = db;

// returns all recipes ! 
export function getRecipes(req, res) {
	return Recipe
		.all()
		.then( recipes => res.status(200)
			.send(recipes)
		)
		.catch( err => res.status(404).send(
			err.errors[0].message
		));
}

// create a recipe 
export function createRecipe(req, res) {
	const {userId} = req;
	// console.log(userId);
	return Recipe
		.create({
			userId: userId,
			title: req.body.title,
			description: req.body.description,
			ingredient: req.body.ingredient,
			direction: req.body.direction,
			
		})
		.then(recipe => res.status(201)
			.send(recipe))
		.catch(error => res.status(400).send({error: error.message})
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
				res.status(404).send({message: 'Not authorized to delete this recipe!'});
			}
			return recipe
				.update({
					title: recipe.body.title || recipe.title,
					description: recipe.body.description || recipe.description,
					ingredient: recipe.body.ingredient || recipe.ingredient,
					direction: recipe.body.direction || recipe.direction,
				})
				.then( recipe => res.status(200).send({message: 'updated successfully', recipe}))
				.catch(err => res.status(400).send(err.errors[0].message));
		});
	// .catch(err => res.status(400).send(
	// 	err
	// ));
}

// delete recipe
export function deleteRecipe(req, res) {
	const {userId} = req;
	// console.log(userId);
	return Recipe
		.findById(req.params.recipeId)
		.then( recipe => {
			if (recipe.userId !==  userId) {
				return res.status(404).send({message: 'Not authorized to delete this recipe'});
			}
			return recipe
				.destroy()
				.then( () => res.status(204).send({message: 'Recipe deleted successfully'}))
				.catch(err => res.status(400).send(err));
		})
		.catch(err => res.status(400).send(
			err.errors[0].message
		));
}

