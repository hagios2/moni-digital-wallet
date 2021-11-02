import sequelize from '../config/db.js'
import pkg from 'sequelize'
const { DataTypes, Model, Sequelize } = pkg

class Transaction extends Model {

    static PENDING_STATUS = 'PENDING'

    static SUCCESS_STATUS = 'SUCCESS'

    static FAILED_STATUS = 'FAILED'

    static TOPUP_TYPE = 'credit'

    static WITHDRAWAL_TYPE = 'debit'

    static LOAN_DEPOSIT_TYPE = 'loan_deposit'

    static LOAN_REPAYMENT_TYPE = 'loan_repayment'
}

Transaction.init({
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
    wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    balance_after_transaction: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
  sequelize,
  timestamps: true,
  modelName: 'transactions'
});


console.log(Transaction === sequelize.models.Transaction)

export { Transaction }
