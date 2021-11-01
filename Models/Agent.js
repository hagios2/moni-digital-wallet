import sequelize from "../config/db";
import { DataTypes, Model } from 'sequelize'

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
  modelName: 'Agent'
});


console.log(Agent === sequelize.models.Agent)

export { Agent }
