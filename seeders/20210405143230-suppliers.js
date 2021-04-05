'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let suppliers = fs.readFileSync('./databases/suppliers.csv', {encoding: 'utf-8'}).trim();
    suppliers = suppliers.split('\n')
    suppliers = suppliers.map(supplier => {
      let [name, address, phone_number] = supplier.split(',');
        if(name !== 'name'){
          return {
            name,
            address,
            phone_number,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
    })
    suppliers = suppliers.filter((supplier) => {if(supplier) return true})
    await queryInterface.bulkInsert('Suppliers', suppliers, {});
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
    await queryInterface.bulkDelete('Suppliers', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
