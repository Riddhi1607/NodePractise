const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const mongoose = require('mongoose')

const app = require('./app')

// console.log(app.get('env'))
// console.log(process.env)

//console.log(process.env)

const db_conn_string = process.env.DB_CONN_STRING

console.log(db_conn_string)

mongoose.connect(db_conn_string).then(()=> console.log("DB connection successful"))
.catch((ex)=>{console.log(ex)});

const port = 3000;
app.listen(port, () => {
    console.log('app is listening on port 3000')
})