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
      Ingredient.hasMany(models.Menu_Ingredient, {foreignKey: 'ingredient_id'})
      Ingredient.belongsTo(models.Supplier, {foreignKey: 'supplier_id'})
    }
  };
  Ingredient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Price cannot be empty'
        },
        cannotBeZero(value){
          if(value === 0){
            throw 'Price cannot be zero'
          }
        }
      }
    },
    uom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Uom cannot be empty'
        }
      }
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Name cannot be empty'
        },
        cannotBeEmpty(value){
          if(value === "Select Supplier"){
            throw 'Must select supplier'
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(ingredient){
        ingredient.name = ingredient.name.toUpperCase();
        ingredient.uom = ingredient.uom.toUpperCase();
        return ingredient;
      },
      beforeUpdate(ingredient){
        ingredient.name = ingredient.name.toUpperCase();
        ingredient.uom = ingredient.uom.toUpperCase();
        return ingredient;
      }
    },
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};