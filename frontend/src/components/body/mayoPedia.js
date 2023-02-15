import {useEffect, useState} from "react";
import React from "react";


function MayoPedia({searchTerm = 'mayonnaise'}) {
  const [description, setDescription] = useState("")
  useEffect(() => {
    async function fetchWiki() {
      setDescription(null);
      const getData = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&exintro=&titles=${searchTerm}`)
      const data = await getData.json()
      //console.log(data)

      const descriptionValues = Object.values(data?.query?.pages || {}) // []

      const description = descriptionValues.map((page) => {
        return (
          <li className="text-center PaleMayo" key={page.pageid}>
            <h1 style={{"marginTop": "50px"}}>What's the Mayo Mate?</h1>
            <div className="text-center PaleMayo" style={{"fontSize": "24px"}} dangerouslySetInnerHTML={ {__html: page.extract}}></div>
          </li>
        )
      })

      if(!ignore) {
        setDescription(description)
      }
    }
    let ignore = false;
    fetchWiki()
    return () => {
      ignore = true
    }
  },[])

  return (
    <div className="PaleMayo">
      <div className="row">
        <div className="col align-self-start">
        </div>
        <div className="col-9 align-self-center mt-3">
          <ul className={"list-unstyled"}>{ description }</ul>
        </div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export {MayoPedia}