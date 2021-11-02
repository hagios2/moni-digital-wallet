'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('wallets', [{
        agent_id: 1,
        generated_id: 'UWER2342234',
        current_balance: 3000.00,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
