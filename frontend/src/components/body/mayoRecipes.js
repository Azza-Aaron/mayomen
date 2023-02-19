import React, {useEffect, useState} from "react";

function PassRecipes() {
  const [result, setResult] = useState(null)
  useEffect( () => {
    async function getRecipes() {
      setResult(null);
      const data = await fetch("/api/recipe");
      const myData = await data.json()
      if(!ignore) {
        const dataValues = Object.values(myData || {})
        const recipeElements = dataValues.map((recipe) => {
          return(
            <li className="text-center PaleMayo p-3" key={recipe.title}>
              <h1>Recipe of the day!</h1>
              <div className={"card text-white bg-dark mb-3 PaleMayo p-3 darker"}>
                <div className={"card-header PaleMayo p-3 darker"}>
                  <h2>{recipe.title}</h2>
                  <h4 >Ready in {recipe.readyInMinutes} Serves {recipe.servings}</h4>
                  <div className={"card-header PaleMayo p-3 darker"}>
                    <h3>Summary</h3>
                  </div>
                  <div className={"card-body PaleMayo p-3 darker"}>
                    <div dangerouslySetInnerHTML={ {__html: recipe.summary} }></div>
                </div>
                <div className={"card-header PaleMayo p-3 darker"}>
                  <h3>Let's get to it!</h3>
                </div>
                <div className={"card-body PaleMayo p-3 darker"}>
                  <div className={"text-center PaleMayo largerText"} dangerouslySetInnerHTML={ {__html: recipe.instructions}}></div>
                  <img src={recipe.image} className="img-fluid"/>
                  <p>Credit to { recipe.creditsText }</p>
                </div>
                </div>
              </div>
            </li>
          )
        })
        setResult(recipeElements)

      }
    }
    let ignore = false;
    getRecipes();
    return () => {
      ignore = true;
    }
  },[])

  if(!result) {
    return (<h1>loading....</h1>)
  }
  console.log(result)
  return(
    <div className="PaleMayo">
      <div className="row">
        <div className="col align-self-start">
        </div>
        <div className="col-9 align-self-center mt-3">
          <ul className={"list-unstyled"}> { result } </ul>
        </div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export {
  PassRecipes
}