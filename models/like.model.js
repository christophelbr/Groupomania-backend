'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Like.belongsTo(models.User, 
        { foreignKey: {
          allowNull: false
         
        }, onDelete:'CASCADE',
      }),
        models.Like.belongsTo(models.Post, 
          { foreignKey: {
            allowNull: false,
               
          }, onDelete:'CASCADE',
        })
    
    }
  };
  Like.init({
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    userUsername: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'username'
      }
    },
  },
    {
      sequelize,
      modelName: 'Like',
    });
  return Like;
};