'use strict';
module.exports = (sequelize, DataTypes) => {
  var postsTopics = sequelize.define('postsTopics', {
    postId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return postsTopics;
};