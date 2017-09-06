'use strict';
module.exports = function(sequelize, DataTypes) {
	const Vote = sequelize.define('Vote', {
		voteType: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	
	Vote.associate = models => {
		// associate vote to a recipe
		Vote.belongsTo(models.Recipe, {
			foreignKey: 'recipeId',
			onDelete: 'CASCADE',
		});
		// associate vote to a user
		Vote.belongsTo(models.User, {
			foreignKey: 'userId', 
			onDelete: 'CASCADE',
		});
	};

	return Vote;
};