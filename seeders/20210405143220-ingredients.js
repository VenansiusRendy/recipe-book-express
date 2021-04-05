'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let ingredients = fs.readFileSync('./databases/ingredients.csv', {encoding: 'utf-8'}).trim();
    ingredients = ingredients.split('\n')
    ingredients = ingredients.map(ingredient => {
      let [name, price, uom] = ingredient.split(',');
        if(name !== 'name'){
          return {
            name: name,
            price: +price,
            uom: uom,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
    })
    ingredients = ingredients.filter((ingredient) => {if(ingredient) return true})
    await queryInterface.bulkInsert('Ingredients', ingredients, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredients', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
