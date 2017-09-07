'use strict';
module.exports = function(sequelize, DataTypes) {
	const Favorite = sequelize.define('Favorite', {
	});
	
	Favorite.associate = models => {
		// associate favorite with recipe
		Favorite.belongsTo(models.Recipe, {
			foreignKey: 'recipeId',
			onDelete: 'CASCADE',
		});
		
		// associate favorite with user
		Favorite.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
	};
	
	return Favorite;
};
