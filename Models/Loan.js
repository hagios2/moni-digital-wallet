import sequelize from '../config/db.js'
import pkg from 'sequelize'
const { DataTypes, Model, Sequelize } = pkg

class Loan extends Model {
    
    static PAID_STATUS = 'paid'

    static PENDING_STATUS = 'pending'

    static OVERDUE = 'overdue'

    static DEFAULT_RATE = 0.125 //12.5%
}

Loan.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    generated_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: { //loan amount without interest
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    requestedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paidAt: {
        type: DataTypes.DATE,
    },
    interest_rate: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        defaultValue: 0.125 //12.5%
    },
    reason_for_loan: {
        type: DataTypes.TEXT,
    },
    grand_total: { //amount with interest
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    amount_paid: { //amount with interest
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },

}, {
  sequelize,
  timestamps: true,
  modelName: 'loans'
});

console.log(Loan === sequelize.models.Loan)

export { Loan }
