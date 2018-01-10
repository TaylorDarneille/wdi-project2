'use strict';
module.exports = (sequelize, DataTypes) => {
  var topic = sequelize.define('topic', {
    name: DataTypes.STRING
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.topic.belongsToMany(models.post, {through: "postsTopics"});
  //     }
  //   }
  });

  topic.associate = function (models) {
    models.topic.belongsToMany(models.post, {through: "postsTopics"});
  };

  return topic;
};