'use strict';
module.exports = (sequelize, DataTypes) => {
  var usersPosts = sequelize.define('usersPosts', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersPosts;
};