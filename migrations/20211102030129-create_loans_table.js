'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('loans', { 
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    generated_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    requestedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    interest_rate: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    reason_for_loan: {
        type: DataTypes.TEXT,
    },
    grand_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
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
