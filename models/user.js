'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid Email'
        }//end of isEmail
      }//end of validate
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Password must be between 6 and 32 characters long'
        } //end of len
      } //end of validate
    }, //end of password
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
        if(pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash; 
        }
      }
    }
    // classMethods: {
    //   associate: function(models) {
    //     // associations can be defined here
    //     models.user.belongsToMany(models.post, {through: "usersPosts"});
    //     models.user.hasMany(models.comment);
    //   }
    // }
  });

  user.associate = function (models) {
    models.user.belongsToMany(models.post, {through: "usersPosts"});
    models.user.hasMany(models.comment);
  };

  user.prototype.isValidPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  }

  user.prototype.toJSON = function() {
    var user = this.get();
    delete user.password;
    return user;
  }

  return user;
};