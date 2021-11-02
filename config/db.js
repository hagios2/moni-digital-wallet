import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env'})


const DB = process.env.DATABASE
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST

console.log(DB, USERNAME, PASSWORD, HOST)

const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {host: HOST, dialect: 'postgres', operatorsAliases: false});


export default sequelize
