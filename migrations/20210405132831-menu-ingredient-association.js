'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Menu_Ingredients', {
      fields: ['menu_id'],
      type: 'foreign key',
      name: 'menu_id-menu_ingredient',
      references: { //Required field
        table: 'Menus',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Menu_Ingredients', {
      fields: ['ingredient_id'],
      type: 'foreign key',
      name: 'ingredient_id-menu_ingredient',
      references: { //Required field
        table: 'Ingredients',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Menu_Ingredients', 'menu_id-menu_ingredient')
    await queryInterface.removeConstraint('Menu_Ingredients', 'ingredient_id-menu_ingredient')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
