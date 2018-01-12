'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    subject: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    siteId: DataTypes.INTEGER
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.post.belongsToMany(models.user, {through: "usersPosts"});
  //       models.post.hasMany(models.comment);
  //       models.post.belongsTo(models.site);
  //       models.post.belongsToMany(models.topic, {through: "postsTopics"});
  //     }
  //   }
  });

  post.associate = function (models) {
    models.post.belongsToMany(models.user, {through: "usersPosts"});
    models.post.hasMany(models.comment);
    models.post.belongsTo(models.site);
    models.post.belongsToMany(models.topic, {through: "postsTopics"});
  };

  return post;
};