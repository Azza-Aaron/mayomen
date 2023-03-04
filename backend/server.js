const {grabRecipes} = require("./recipes.js")
const express = require('express')
const app = express()
const mayoInfoRouter = require('./routes/api/apiBlogposts')
const usersRouter = require('./routes/api/users')

app.use(express.json())


//router for /api
//move the pages into there own router

app.use('/api/blogposts', mayoInfoRouter)
app.use('/api/users', usersRouter)


// RECIPE PAGE
app.get('/api/recipe', async (req, res) => {
  const collectedRecipes = await grabRecipes()
  res.json({"recipes": collectedRecipes})
})


const PORT = process.env.PORT || 5000
app.listen(PORT, 'localhost', () => {
  console.log(`Server Started at Port ${PORT}`)
});
