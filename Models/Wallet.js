import sequelize from "../config/db";
import { DataTypes, Model } from 'sequelize'

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
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false
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
  modelName: 'Wallet'
});


console.log(Wallet === sequelize.models.Wallet)

export { Wallet }
