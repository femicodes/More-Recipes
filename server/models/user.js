'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    fullname: {
      type: DataTypes.STRING
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
      }
    }, 

    {
      classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};