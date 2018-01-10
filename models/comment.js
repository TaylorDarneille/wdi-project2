'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.comment.belongsTo(models.user);
  //       models.comment.belongsTo(models.post);
  //     }
  //   }
  });
  
  comment.associate = function (models) {
    models.comment.belongsTo(models.user);
    models.comment.belongsTo(models.post);
  };

  return comment;
};