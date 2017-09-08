'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('Recipes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.STRING
			},
			userId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				allowNull: false,
				references: {
					model: 'Users', 
					key: 'id',
					as: 'userId'
				}
			},
			ingredient: {
				type: Sequelize.STRING,
				allowNull: false
			},
			direction: {
				type: Sequelize.STRING,
				allowNull: false
			},
			upvoteCount: {
				type: Sequelize.INTEGER,
				default: 0
			},
			downvoteCount: {
				type: Sequelize.INTEGER,
				default: 0
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('Recipes');
	}
};