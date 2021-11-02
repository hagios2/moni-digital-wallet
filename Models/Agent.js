import sequelize from '../config/db.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg
import { Wallet } from "./Wallet.js";

class Agent extends Model {}

Agent.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
  sequelize,
  timestamps: true,
  modelName: 'agents'
});

Agent.Walltet = Agent.hasOne(Wallet, {foreignKey: 'agent_id'})

console.log(Agent === sequelize.models.Agent)

export { Agent }
