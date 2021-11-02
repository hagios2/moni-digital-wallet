import sequelize from '../config/db.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg
import { Agent } from "./Agent.js";

class Wallet extends Model {}

Wallet.init({
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
    current_balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    last_updated_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
  sequelize,
  timestamps: true,
  modelName: 'wallets'
  
});

console.log(Wallet === sequelize.models.Wallet)

export { Wallet }
