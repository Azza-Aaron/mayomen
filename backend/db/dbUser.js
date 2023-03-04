const {dbClient} = require('./index.js')
const client = dbClient;
//const app = express()
//const sessionPool = require('pg').Pool
//app.use(express.json())

// const sessionDBaccess = new sessionPool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "password",
//   port: 5432,
// })

//GENERATE NEW SESSION ID
const getSessionId = async (username) => {
  return await client.query(
    {
      text: `INSERT INTO public.online_users (name)
        VALUES ($1)
        RETURNING: id`,
      values: [username],
    }
  )
};

const getPassword = async (user) => {
  return await client.query(
    {
      text: `SELECT password, id FROM public.users WHERE mayo_username = $1`,
      values: [user]
    }
  )
}

module.exports = {
  getSessionId,
  getPassword
}