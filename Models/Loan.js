import sequelize from '../config/db.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

class Loan extends Model {
    
    static PAID_STATUS = 'paid'

    static PENDING_STATUS = 'pending'

    static OVERDUE = 'overdue'
}

Loan.init({
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

}, {
  sequelize,
  timestamps: true,
  modelName: 'loans'
});

console.log(Loan === sequelize.models.Loan)

export { Loan }
