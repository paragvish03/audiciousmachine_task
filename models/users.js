'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Users.hasMany(models.category,{as:"catgor"})
    }
  }
  Users.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: {type:DataTypes.TEXT, defaultValue:"USER"}
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};