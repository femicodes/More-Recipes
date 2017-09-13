import db from '../models';

const { Recipe, Favorite } = db;


// favourite a recipe
// POST ---> api/recipes/:recipeId/favorite
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
				return favorite
					.destroy()  
					.then(res.status(200).json({success: true, message: 'Recipe have been removed from favorites!'}));
			} 
			return Favorite
				.create({
					userId, 
					recipeId
				})
				.then( () => res.status(200).json({success: true, message: 'Recipe have been added to favorites!'}))
				.catch( () => res.status(500).json({success: false, message: 'An error occured'}));
			
		})
		.catch( () => res.status(500).json({success: false, message: 'An error occured !'}));

};

// get user favourite
// GET ---> api/users/:userId/favourites
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
			if ( favoritesCount == 0 ) {
				return res.status(200).json({
					success: true,
					message: 'User has no recipe in favorites',
				});
			}
			const recipes = favorites.map( fav => fav.Recipe);
			return res.status(200).json({success: true, message: `${favoritesCount} recipes found in favorite`, recipes}); 
		})
		.catch( () => res.status(500).json({success: false, message: 'An error occured! '}));
};