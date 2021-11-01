import {mysql} from 'mysql'
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env'})

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
  });
  
  connection.connect((err) =>{
    if (err) throw err;
    console.log("Connected!");
  });

const url = process.env.DB_URL

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true})

const connection = mongoose.connection

connection.once('open', () => {
    console.log('connection with monogo established succussfully')
})

export default connection
