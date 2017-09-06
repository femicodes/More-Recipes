module.exports = function(sequelize, DataTypes) {
	const Recipe = sequelize.define('Recipe', {
		title: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'please enter a title'
			}
		}, 
		description: {
			type: DataTypes.STRING,
		},
		ingredient: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'please enter at least one ingredient'
			}
		},
		direction: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'please enter the recipe directions'
			}
		},
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


