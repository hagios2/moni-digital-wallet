import sequelize from '../config/db.js'
import pkg from 'sequelize'
const { DataTypes, Model, Sequelize } = pkg

class RefreshToken extends Model {

    createToken(data) {
        return this.create(data)
    }
}

RefreshToken.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  sequelize,
  timestamps: true,
  modelName: 'RefreshToken'
});


// console.log(RefreshToken === sequelize.models.RefreshToken)

export { RefreshToken }
