'use strict';


// Models are defined with sequalize.define('name', {attriutes}, {options});

export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 

    ingredient: {
      type: DataTypes.STRING,
    },

    direction: {
      type: DataTypes.STRING
    }


  }, 

  {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });

  // Returning Recipe object.

  return Recipe;

};

