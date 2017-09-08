import db from '../models';

const { Recipe, Favorite } = db;


// favourite a recipe
// POST ---> api/users/:userId/recipes/:recipeId 
export const favoriteRecipe = (req, res) => {
	const { recipeId } = req.params;
	const { userId } = req;

	Favorite
		.findOne({
			where: {
				recipeId, userId
			}
		})
		.then( favorite => {
			if (favorite) {
				// console.log(favorite);
				return favorite
					.destroy()  
					.then(res.status(400).json({success: true, message: 'Recipe have been removed from favorites!'}));

				// return res.status(400).send({message: 'Recipe has already been added to favorites!'});
			} else {
				return Favorite
					.create({
						userId, 
						recipeId
					})
					.then( () => res.status(200).json({success: false, message: 'Recipe have been added to favorites !'}))
					.catch(err => res.status(500).json({success: false, message: err}));
			}
		})
		.catch(err => res.status(500).json({success: false, message: err}));

};

// get user favourite
// GET ---> api/users/:userId/recipes
export const getUserFavorites = (req, res) => {

	const { userId } = req.params;

	Favorite 
		.findAll({
			where: {
				userId
			},
			include: [{
				model: Recipe
			}]
		})
		.then( favorites => {
			if (!favorites) {
				return res.status(200).send({
					success:true,
					message: 'No favorites found',
				});
			}
			const userFavorites = favorites.map( fav => fav.Recipe);
			return res.status(200).send(userFavorites); 
		})
		.catch(err => res.status(500).send(err));
};