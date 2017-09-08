module.exports = function(sequelize, DataTypes) {
	const Recipe = sequelize.define('Recipe', {
		title: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Title cannot be empty'
			},
			validate : {
				notEmpty: {
					args: false,
					msg: 'Title cannot be empty'
				}
			}
		}, 
		description: {
			type: DataTypes.STRING,
		},

		ingredient: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Please enter at least one ingredient'
			},
			validate : {
				notEmpty: {
					args: false,
					msg: 'Ingredient cannot be empty'
				}
			},
		},

		direction: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Please enter the recipe directions'
			},
			validate : {
				notEmpty: {
					args: false,
					msg: 'Direction cannot be empty'
				}
			}
		},

		upvoteCount:{
			type: DataTypes.INTEGER,
			default: 0
		},

		downvoteCount:{
			type: DataTypes.INTEGER,
			default: 0
		}

	});
	
	Recipe.associate = models => {
		// Associate recipes with User;
		Recipe.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
		// Associate recipes with votes;
		Recipe.hasMany(models.Vote, {
			foreignKey: 'recipeId',
			as: 'votes'
		});
		// Associate recipe with reviews 
		Recipe.hasMany(models.Review, {
			foreignKey: 'recipeId',
			as: 'reviews'
		});
	};
	
	return Recipe;
};


