const {Client, Pool} = require("pg")
const {checkLoggedInTable} = require("./init.js")
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session)



const config = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
}

const client = new Client(config)
client.connect();

const pgSes = new pgSession({
  pool: new Pool(config),
  createTableIfMissing: true
})

checkLoggedInTable(client).then(result => {
  if(result){
    console.log('table plated')
  }
})


module.exports = {
  dbClient: client,
  pgSes
}