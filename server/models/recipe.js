'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
    },


    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    direction: {
      type: DataTypes.STRING,
      allowNull: false
    },

    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, 

  {
    classMethods: {
      associate: function(models) {
        Recipe.belongsTo(models.User, {
          foreignKey: 'owner',
          onDelete: 'CASCADE',
        });
      }
    } 
  });

  return Recipe;
};
 
