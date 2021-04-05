'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsTo(models.Menu_Ingredient)
      Ingredient.belongsTo(models.Supplier)
    }
  };
  Ingredient.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    uom: DataTypes.STRING,
    supplier_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};