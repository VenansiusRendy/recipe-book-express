'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.hasMany(models.Menu_Ingredient, {foreignKey: 'menu_id'})
    }
  };
  Menu.init({
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Category cannot be empty'
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
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Instruction cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(menu){
        menu.name = menu.name.toUpperCase();
        menu.category = menu.category.toUpperCase();
        menu.uom = menu.uom.toUpperCase();
        menu.instructions = menu.instructions.toUpperCase();
        return menu;
      }
    },
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};