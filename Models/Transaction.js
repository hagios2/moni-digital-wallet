import sequelize from "../config/db";
import { DataTypes, Model } from 'sequelize'

class Transaction extends Model {}

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
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
  sequelize,
  timestamps: true,
  modelName: 'Transaction'
});


console.log(Transaction === sequelize.models.Transaction)

export { Transaction }
