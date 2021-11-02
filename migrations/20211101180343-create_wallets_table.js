'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.createTable('wallets', { 
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      generated_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      current_balance: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false
      },
      agent_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          unique: true
      },
      last_updated_date: {
          type: Sequelize.DataTypes.DATE,
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
 
    await queryInterface.dropTable('wallets');
     
  }
};
