import {useEffect, useState} from "react";
import React from "react";
import {AddPost} from "../../blog_reactive_functions/addEditDelete";
import {EditModal} from "../../blog_reactive_functions/modal";


function MayoPedia({searchTerm = 'mayonnaise'}) {
  const [data, setData] = useState("")

  const fetchWiki = async () => {
    const getData = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&exintro=&titles=${searchTerm}`)
    const data = await getData.json()
    console.log(data)
    if(data){
      setData(data)
    }
  }

  useEffect(() => {
    let ignore = false;
    const runOnce = () => {
      if(!ignore){
        fetchWiki()
      }
    }
    runOnce()
    return () => {
      ignore = true;
    }
  },[])

  if (!data) {
    return (
      <h3>Loading...</h3>
    )
  }
  const descriptionValues = Object.values(data?.query?.pages || {}) // []
  const showDescription = descriptionValues.map((page) => {
    return (
      <ul className={"list-unstyled"} key="description">
        <li className="text-center PaleMayo" key={page.pageid}>
          <div className={"card text-white bg-dark mb-3 PaleMayo p-3"}>
            <div className={"card-body PaleMayo p-3 darker"}>
              <div className="text-center PaleMayo" style={{"fontSize": "24px"}}
                   dangerouslySetInnerHTML={{__html: page.extract}}></div>
              </div>
            </div>
        </li>
      </ul>
    )
  })
  return(
    <div className="PaleMayo">
      <div className="row">
        <div className="col align-self-start">
        </div>
        <div className="col-9 align-self-center mt-3">
          <h1>What's the Mayo Mate?</h1>
          { showDescription }
        </div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export {MayoPedia}