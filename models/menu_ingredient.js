'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu_Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu_Ingredient.hasMany(models.Menu, {
        foreignKey: 'menu_id',
        targetKey: 'id'
      })
      Menu_Ingredient.hasMany(models.Ingredient, {
        foreignKey: 'ingredient',
        targetKey: 'id'
      })
    }
  };
  Menu_Ingredient.init({
    menu_id: DataTypes.INTEGER,
    ingredient_id: DataTypes.INTEGER,
    qty: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Menu_Ingredient',
  });
  return Menu_Ingredient;
};