import db from '../models';

const { Recipe, Review, User} = db;

// Get data on a recipe
// GET ---> recipes
export const getRecipe = (req, res) => {
	const recipeId = parseInt(req.params.recipeId);
	return Recipe
		.find({
			where: {id: recipeId}, 
			include: [{ model: Review, as: 'reviews', attributes: ['id', 'body', 'userId'] }],
		})
		.then( recipe => {
			if (recipe)
				res.status(200).json({success: true, recipe});
			else 
				res.status(200).json({success: true, message: 'recipe does not exist'});
		})
		.catch(err => res.status(404).json({
			success: false,
			message: err
		}));
};


// query ---> start=10, end=20; sort=upvotes&order=ascending
export const getRecipes = (req, res) => {
	let {sort, order} = req.query;

	if (sort && order) {

		// if sort and order exist convert them to lowercase ! 
		sort = sort.toLowerCase(); 
		order = order.toLowerCase();
		
		if (sort !== 'upvotes' && sort !== 'downvotes')
			return res.status(400).json({success: false, message: `Cannot sort recipes by ${sort}`});
		

		if (order !== 'ascending' && order !== 'descending')
			return res.status(400).send({success: false, message: 'Invalid order, Please use either ascending or descending'});
		

		
		const orderCriteria = order === 'ascending'? 'ASC' : 'DESC';
		const sortCriteria = sort === 'upvotes'? 'upvoteCount' : 'downvoteCount';

		// else if the order and sort is okay. ! 
		return Recipe
			.findAll({
				// attributes: ['id', 'title', 'description', 'ingredient', 'direction', 'upvoteCount', 'downvoteCount'],
				order: [[sortCriteria, orderCriteria]],
				include: [
					{ model: Review, as: 'reviews', attributes: ['id', 'body', 'userId'] },
					{ model: User, attributes: ['id', 'username', 'fullname'] }
				]
			})
			.then(recipes => {
				const recipeCount = recipes.length;
				if (recipeCount === 0) 
					return res.status(200).send({success: true, message: 'No recipes found'});
				res.status(200).send({ success: true, message: `${recipeCount} recipes found`, recipes});
			})
			.catch( () => res.status(500).send({success: false, message: 'cant get recipes'}));
	}

	// if no query passed, just return all the recipes 
	return Recipe
		.findAll({
			// attributes: ['id', 'userId', 'title', 'description', 'ingredient', 'direction', 'upvoteCount', 'downvoteCount'],
			order: [['upvoteCount', 'DESC']],
			include: [
				{ model: Review, as: 'reviews', attributes: ['id', 'body', 'userId'] },
				{ model: User, attributes: ['id', 'username', 'fullname'] }
			]
		})
		.then(recipes => {
			const recipeCount = recipes.length;
			if (recipeCount === 0) 
				return res.status(200).send({success: true, message: 'No recipes found'});
			res.status(200).send({ success: true, message: `${recipeCount} recipes found`, recipes});	
		})
		.catch( err => res.status(404).json({
			success: false,
			message: err.errors[0].message
		}));
};


// create a recipe 
export const createRecipe = (req, res) => {
	const {userId} = req;
	
	let title = req.body.title? req.body.title.trim() : '';
	let description = req.body.description? req.body.description.trim(): '';
	let ingredient = req.body.ingredient ? req.body.ingredient.trim(): '';
	let direction = req.body.direction? req.body.direction.trim(): '';

	// console.log(userId)
	return Recipe
		.create({
			userId,
			title,
			description,
			ingredient,
			direction,
		})
		.then(recipe => res.status(201)
			.json({success: true, message: 'recipe created successfully', recipe}))
		.catch( (err) => res.status(500).json({success: false, message: err})
		);
};

// modify a recipe
export const modifyRecipe = (req, res) => {
	const { userId } = req;
	const { recipeId } = req.params;
	
	return Recipe
		.findById(recipeId)
		.then( recipe => {
			if (recipe.userId !== userId) {
				return res.status(403).json({success: false, message: 'Not authorized to modify this recipe!'});
			}
			return recipe
				.update({
					title: req.body.title || recipe.title,
					description: req.body.description || recipe.description,
					ingredient: req.body.ingredient || recipe.ingredient,
					direction: req.body.direction || recipe.direction,
				})
				.then( recipe => res.status(200).json({success: true, message: 'recipe updated successfully', recipe}))
				.catch( () => res.status(400).json({success: false, message: 'Error modifying recipe'}));
		})
		.catch( () => res.status(500).json({
			success: false,
			message: 'Error modifying recipe!'
		}));
};
	

export const deleteRecipe = (req, res) => {
	const {userId} = req;
	// console.log(userId);
	Recipe
		.findById(req.params.recipeId)
		.then( recipe => {
			if (recipe.userId !==  userId) {
				return res.status(403).json({success: false, message: 'Not authorized to delete this recipe'});
			}
			recipe
				.destroy()
				.then( () => res.status(200).json({sucess: true, message: 'Recipe deleted successfully'}))
				.catch( () => res.status(400).json({success: false, message: 'Recipe cannot be deleted'}));
		})
		.catch( () => res.status(500).json({
			success: false, 
			message: 'Error deleting recipe!'
		}));
};



