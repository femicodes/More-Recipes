module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Username cannot be empty'
			},
			unique: {
				args: true,
				msg: 'Username is already taken, please enter another'
			},
			validate: {
				len: {
					args: [3,15],
					msg: 'Please choose a username with length between the length 3 and 15'
				}
			}
		},
		fullname: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Email cannot be empty'
			},
			unique: {
				args: true,
				msg: 'Email is already taken, please enter another'
			},
			validate: {
				isEmail: {
					args: true,
					msg: 'Please enter a valid email'
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Password cannot be empty'
			},
			validate: {
				min: {
					args: 4,
					msg: 'Password too short'
				}
			}
		}	
	
	});

	User.associate = models => {
		// Associate User with Recipe
		User.hasMany(models.Recipe, {
			foreignKey: 'userId'
			// as: 'userRecipe'
		});
		// Associate User with Favoritie
		User.hasMany(models.Favorite, {
			foreignKey: 'userId',
			// as: 'userFavorite'
		});
		// Associate User with Review 
		User.hasMany(models.Review, {
			foreignKey: 'userId',
			// as: 'userReviews'
		});
		// Associate User with Vote 
		User.hasMany(models.Vote, {
			foreignKey: 'userId'
			// as: 'userVotes'
		})
	};

	return User;
};

// Things to buy for my folks !!!!!!!!!!!!!!
// Splenda !! 
// Tumeric Pounder !! 