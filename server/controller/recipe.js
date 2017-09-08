import db from '../models';

const { Recipe} = db;
// const {Review, User} = db;

// returns all recipes ! 
// GET ---> recipes

export const getRecipe = (req, res) => {
	const recipeId = parseInt(req.params.recipeId);
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
};


// query ---> start=10, end=20; sort=upvotes&order=ascending
export const getRecipes = (req, res) => {
	// console.log(req.query.sort, req.query.order);
	let {sort, order} = req.query;

	if (sort && order) {

		// if sort and order exist convert them to lowercase ! 
		sort = sort.toLowerCase(); 
		order = order.toLowerCase();

		if (order !== 'ascending' && order !== 'descending')
			return res.status(400).send({success: false, message: 'Invalid order, Please use either ascending or descending'});
		
		if (sort !== 'upvotes' && sort !== 'downvotes')
			return res.status(400).json({success: false, message: `Cannot sort by ${sort}`});
		
		
		const orderCriteria = order === 'ascending'? 'ASC' : 'DESC';
		const sortCriteria = sort === 'upvotes'? 'upvoteCount' : 'downvoteCount';

		// else if the order and sort is okay. ! 
		return Recipe
			.findAll({
				attributes: ['id', 'title', 'description', 'ingredient', 'direction', 'upvoteCount', 'downvoteCount'],
				order: [[sortCriteria, orderCriteria]],
				// include: [
				// 	{ model: Review, as: 'reviews', attributes: ['id', 'body'] },
				// 	{ model: User, attributes: ['id', 'username', 'fullname'] }
				// ]
			})
			.then(recipes => res.status(200).send({ success: true, recipes}))
			.catch( () => res.status(500).send({success: false, message: 'cant get recipes'}));
	}

	// if no query at all, just return all the recipes 
	return Recipe
		.findAll({
			attributes: ['id', 'title', 'description', 'ingredient', 'direction', 'upvoteCount', 'downvoteCount'],
			order: [['upvoteCount', 'DESC']],
			// include: [
			// 	{ model: Review, as: 'reviews', attributes: ['id', 'body'] },
			// 	{ model: User, attributes: ['id', 'username', 'fullname'] }
			// ]
		})
		.then(recipes => res.status(200).send({success: true, recipes }))
		.catch( err => res.status(404).json({
			success: false,
			message: err.errors[0].message
		}));
};


// create a recipe 
export const createRecipe = (req, res) => {
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
			.json({message: 'recipe created successfully', recipe}))
		.catch( (err) => res.status(500).json({success: false, message: err.errors[0].message})
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
				res.status(403).json({success: false, message: 'Not authorized to delete this recipe!'});
			}
			return recipe
				.update({
					title: recipe.body.title || recipe.title,
					description: recipe.body.description || recipe.description,
					ingredient: recipe.body.ingredient || recipe.ingredient,
					direction: recipe.body.direction || recipe.direction,
				})
				.then( recipe => res.status(200).json({message: 'recipe updated successfully', recipe}))
				.catch( () => res.status(400).json({success: false, message: 'Error modifying recipe'}));
		})
		.catch( () => res.status(500).json({
			success: false,
			message: 'Error modifying recipe'
		}));
};


// delete recipe
export const deleteRecipe = (req, res) => {
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
				.catch( () => res.status(400).json({success: false, message: 'Recipe cannot be deleted'}));
		})
		.catch(err => res.status(500).json({
			success: false, 
			message: err.errors[0].message
		}));
};



