'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.createTable('agents', { 
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      dob: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
      type: Sequelize.DataTypes.DATE,
    }
  });
   
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.dropTable('agents');
     
  }
};
