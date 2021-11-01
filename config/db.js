import { Sequelize } from 'sequelize'


const DB = process.env.DATABASE
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
const 

const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {host: HOST, dialect: 'mssql', operatorsAliases: false});


export default sequelize
