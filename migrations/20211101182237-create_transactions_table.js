'use strict';;

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.createTable('transactions', { 

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
      wallet_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
      },
      status: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: 'pending'
      },
      type: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      amount: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false
      },
      transaction_date: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.NOW
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
   
    await queryInterface.dropTable('transactions');

  }
};
