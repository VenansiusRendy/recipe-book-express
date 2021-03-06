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
    get subtotal(){
      return this.qty * this.Ingredient.price;
    }
    static associate(models) {
      Menu_Ingredient.belongsTo(models.Menu, {
        foreignKey: 'menu_id'
      })
      Menu_Ingredient.belongsTo(models.Ingredient, {
        foreignKey: 'ingredient_id'
      })
    }
  };
  Menu_Ingredient.init({
    menu_id: DataTypes.INTEGER,
    ingredient_id: {
      type: DataTypes.INTEGER,
      validate: {
        notDefault(value){
          if(value === "Select Ingredient"){
            throw "Must select ingredient"
          }
        }
      }
    },
    qty: {
      type: DataTypes.DECIMAL,
      validate: {
        notZero(value){
          if(value === 0){
            throw "Must put qty"
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Menu_Ingredient',
  });
  return Menu_Ingredient;
};