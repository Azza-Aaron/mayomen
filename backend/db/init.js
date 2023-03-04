

//CREATE USE TABLE
const createLoggedInUser = `
    CREATE TABLE IF NOT EXISTS "online_users" (
    "id" serial
        primary key,
    "name" text
    );`

//Failed to prune sessions: operator does not exist: text < timestamp with time zone

const checkLoggedInTable = async (client) => {
  try {
    await client.query(createLoggedInUser)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  checkLoggedInTable
}