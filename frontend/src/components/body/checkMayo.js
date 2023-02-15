import React, {useState} from "react";

const nopeArray = [`That ain't mayo'`, `Smells wrong`, `Almost mayo IS NOT mayo!`, `Put that away, ick`]

function CheckMayoInput(){
  const [allInfo, setAllInfo] = React.useState("")
  const [nopeMayo, setNopeMayo] = React.useState("")
  const [input, setInput] = useState("")

  const productInformation = async() => {
    const randomNumber = Math.floor(Math.random() * nopeArray.length)
    const nopeMayo = nopeArray[randomNumber]
    console.log(randomNumber)
    setNopeMayo(nopeMayo)
    const getInfo = await fetch(`https://world.openfoodfacts.org/api/v0/product/${input}.json`)
    const data = await getInfo.json()
    const allInfo = data
    setAllInfo(allInfo)
    console.log(data)
  }
  const {product_name, brands, countries, stores, compared_to_category, allergens} = allInfo.product || {}


  return(
    <div>
      <h1 >Enter your mayo barcode for some details!</h1>
      <h4 >(We have thousands on file (OMG!))</h4>

      <input id="check-input-el" value={input} onChange={e => setInput(e.target.value)}/>
      <button className={"btn btn-dark"} onClick={productInformation}>Lookup Barcode!</button>

      <IsMayoCat
        cat ={compared_to_category}
        brands ={brands}
        nopeMayo ={nopeMayo}
        product_name ={product_name}
      />
      <h3 id="productInformation">{product_name ? `${product_name}` : "Ready set Mayo!"}</h3>

      {
        countries ? <>
                        <h2>Where can I get it?</h2>
                        <h3>{ countries }</h3>
                    </> : null
      }
      {
        stores ? <>
                    <h2>From what shops?</h2>
                    <h3>{ stores }</h3>
                </> : null
      }
      {
        compared_to_category ? <>
                                  <h2>Is it Mayo? Lets check the category...</h2>
                                  <h3>{ compared_to_category }</h3>
                              </> : null
      }
      {
        allergens ? <>
                      <h2>Allergen advice!</h2>
                      <h3>{ allergens }</h3>
                    </> : null
      }
    </div>
  )
}

function IsMayoCat({cat, brands, nopeMayo, product_name}) {
  let isItMayo = '';
  if(cat){
    if([...cat, ...product_name].includes("mayo" || "Mayo")) {
      isItMayo = `Your ${brands} Mayo is...`
    }else{
      isItMayo = `This is ${brands} but... ${nopeMayo}`
    }
  } else if (brands){
    isItMayo =`Oh look, ${brands} brand`
  }

  return <h2>{ isItMayo }</h2>
}

export {CheckMayoInput}


//`https://world.openfoodfacts.org/api/v0/product/${}.json`
//9300657021450