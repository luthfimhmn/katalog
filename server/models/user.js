'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/password-helper');
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
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email is required'
        },
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [6],
          msg: 'Password Length minimal 6 char'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      // Enkripsi password User ketika awal pembuatan akun (sign up)
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};