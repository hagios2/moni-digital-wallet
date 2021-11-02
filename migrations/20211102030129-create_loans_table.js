'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('loans', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    agent_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    generated_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    requestedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    paidAt: {
        type: Sequelize.DataTypes.DATE,
    },
    interest_rate: {
        type: Sequelize.DataTypes.DECIMAL(4, 2),
        allowNull: false,
        defaultValue: 12.5
    },
    reason_for_loan: {
        type: Sequelize.DataTypes.TEXT,
    },
    grand_total: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },  
    amount_paid: { //amount with interest
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },  
    createdAt: {
        type: Sequelize.DataTypes.DATE
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
    }
    
  })
     
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.dropTable('loans');
  }
};
