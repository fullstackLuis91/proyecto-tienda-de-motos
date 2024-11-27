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
    }
  }
  User.init({
    firstName:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"please introduce your first name"
        }
      }
    },
    
    lastName:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"please introduce your last name",
        }
      }
    },
    email:{
     type: DataTypes.STRING,
     allowNull:false,
      validate:{
        notNull:{
          msg:"please introduce your email",
        }
      }
    },
    password: {
      type:DataTypes.STRING,
    allowNull:false,
      validate:{
        notNull:{
          msg:"please introduce your password",
        },
    
    role: DataTypes.STRING,
    birth: DataTypes.DATE,
  }
    }}
  , {
    sequelize,
    modelName: 'User',
  });
  return User;
};