import db from '../models';

const {User, Recipe} = db;


export function checkRecipeExist(req, res, next) {
	Recipe 
		.findOne({
			where: {
				id: req.params.recipeId
			}
		})
		.then( recipe => {
			if (!recipe) res.status(404).send('Recipe does not exist');
			else next();
		});

}

// check if username exist !
export function checkUsernameExist(req, res, next) {
	User
		.findOne({
			where: {
				username: req.body.username
			}
		})
		.then( user => {
			if ( !user ){
				res.status(404).send('User does not exist');
			} else next();
		});
}
	
// check if user id exists 
export function checkUserExist(req, res, next) {
	User 
		.findOne({
			where: {
				id: req.params.userId
			}
		})
		.then( user => {
			if (!user){
				res.status(404).send('User does not exist');
			} else next();
		});
}