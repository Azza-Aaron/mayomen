

//CREATE USE TABLE
const createLoggedInUser = `
    CREATE TABLE IF NOT EXISTS "online_users" (
    "id" serial
        primary key,
    "name" text
    );`

const createBlogPosts = `
CREATE TABLE IF NOT EXISTS "blog_posts" ( 
  id     serial
constraint blog_posts_pk
primary key,
  "header" text,
  "date"   text,
  "body"   text)`

const createUser = `
CREATE TABLE IF NOT EXISTS users
(
  id     serial
constraint users_pk
primary key,
  username text,
  password   text
)`;


const insertBlog = `
INSERT INTO blog_posts (id, header, date, body)
VALUES(DEFAULT,
  'WOHO MAYO',
  '10/02/2023',
  'faithful mayo words'
)`;

const insertUser = `
INSERT INTO users (id, username, password)
VALUES(DEFAULT,
  \'${process.env.MAINUSER}\',
  \'${process.env.PASSWORD}\'
)`

//Failed to prune sessions: operator does not exist: text < timestamp with time zone

const checkLoggedInTable = async (client) => {
  try {
    const createPromises = [createUser, createLoggedInUser, createBlogPosts].map((query) => {
      return client.query(query);
    })
    await Promise.all(createPromises);

    const insertPromises = [insertBlog, insertUser].map((query) => {
      return client.query(query)
    });
    await Promise.all(insertPromises);

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  checkLoggedInTable
}