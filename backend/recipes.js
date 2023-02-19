require('dotenv').config()
const apiKey = process.env.RECIPE_KEY;

async function grabRecipes() {
  const randomNumber = Math.floor(Math.random() * 99)
  const getData = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=mayonnaise&number=100`);
  const data =  await getData.json();
  const {id} = data[randomNumber]
  const getDataAgain = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
  return await getDataAgain.json()
}

module.exports = {
  grabRecipes
}

