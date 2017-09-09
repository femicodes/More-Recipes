module.exports = function(sequelize, DataTypes) {
	const Recipe = sequelize.define('Recipe', {
		title: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Title is required'
			},
			validate : {
				notEmpty: {
					args: false,
					msg: 'Title is required'
				}
			}
		}, 
		description: {
			type: DataTypes.STRING,
		},

		img_url: {
			type: DataTypes.STRING,
			defaultValue: 'no-img'

		},

		ingredient: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Ingredient is required'
			},
			validate : {
				notEmpty: {
					args: false,
					msg: 'Ingredient is required'
				}
			},
		},

		direction: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'direction is required'
			},
			validate : {
				notEmpty: {
					args: false,
					msg: 'direction is required'
				}
			}
		},

		upvoteCount:{
			type: DataTypes.INTEGER,
			defaultValue: 0
		},

		downvoteCount:{
			type: DataTypes.INTEGER,
			defaultValue: 0
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


