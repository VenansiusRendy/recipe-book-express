'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supplier.hasMany(models.Ingredient, {
        foreignKey: 'supplier_id'
      })
    }
  };
  Supplier.init({
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Address cannot be empty'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Phone Number cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(supplier){
        supplier.name = supplier.name.toUpperCase();
        supplier.address = supplier.address.toUpperCase();
        return supplier
      },
      beforeUpdate(supplier){
        supplier.name = supplier.name.toUpperCase();
        supplier.address = supplier.address.toUpperCase();
        return supplier
      }
    },
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};