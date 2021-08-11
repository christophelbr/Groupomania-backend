'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Like);
      models.User.hasMany(models.Comments);
    }
  };
  User.init({

    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
    bio: DataTypes.STRING(500),
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};