import db from '../models';

const { Recipe } = db;

// Functions returns the top recipes to the screen ! 
export function getTopRecipes(req, res) {
	res.status(200).send({
		message: "Hey These are the top recipes"
	})
};


export function createRecipe(req, res) {
	const title = req.body.title
	const ingredients = req.body.ingredients
	const description = req.body.description;
	const directions = req.body.directions;

	if ( !req.session.user ) {
		res.status(400).status({message: "kindly login in to create recipes"})
	} else {
	const user_id= req.session.user.id;
	console.log(user_id)
	
	return Recipe
		.create({
		title: req.body.title,
		description: req.body.description,
		ingredient: req.body.ingredient,
		direction: req.body.direction,
		owner: user_id
		})
		.then(recipe => res.status(201)
		.send(recipe))
		.catch(error => res.status(400).send({error: error.message}))
	}
}