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
					.then(res.status(200).json({success: true, message: 'Recipe have been removed from favorites!'}));

				// return res.status(400).send({message: 'Recipe has already been added to favorites!'});
			} else {
				return Favorite
					.create({
						userId, 
						recipeId
					})
					.then( () => res.status(200).json({success: true, message: 'Recipe have been added to favorites!'}))
					.catch( () => res.status(500).json({success: false, message: 'An error occured'}));
			}
		})
		.catch( () => res.status(500).json({success: false, message: 'An error occured !'}));

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
			const favoritesCount =  favorites.length;
			// console.log(favorites);
			if ( favoritesCount == 0 ) {
				return res.status(200).json({
					success:true,
					message: 'User has no recipes in favorites',
				});
			}
			const recipes = favorites.map( fav => fav.Recipe);
			return res.status(200).json({success: true, message: `${favoritesCount} recipes found in favorite`, recipes}); 
		})
		.catch( () => res.status(500).json({success: false, message: 'An error occured! '}));
};