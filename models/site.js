'use strict';
module.exports = (sequelize, DataTypes) => {
  var site = sequelize.define('site', {
    name: DataTypes.STRING,
    abbreviation: DataTypes.STRING,
    url: DataTypes.STRING
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.site.hasMany(models.post);
  //     }
  //   }
  });

  site.associate = function (models) {
    models.site.hasMany(models.post);
  };

  return site;
};