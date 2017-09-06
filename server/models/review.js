module.exports = function(sequelize, DataTypes) {
	const Review = sequelize.define('Review', {
		body: {
			type: DataTypes.TEXT,
			allowNull: {
				args: true,
				msg: 'please enter a review'
			}
		}
	});
	
	Review.associate = models => {
		// Associate review with user
		Review.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
		// Associate review with recipe
		Review.belongsTo(models.Recipe, {
			foreignKey: 'recipeId',
			onDelete: 'CASCADE'
		});
	};

	return Review;
};