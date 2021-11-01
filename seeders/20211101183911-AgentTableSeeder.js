'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('agents', [{
        name: 'Emmanuel Oteng Wilson',
        email: 'hagioswilson@gmail.com',
        password: '1234567',
        dob: '1990-05-05'
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
