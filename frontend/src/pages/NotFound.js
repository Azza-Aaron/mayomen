import { useNavigate} from "react-router-dom";
import {useEffect} from "react";

function NotFound(){
  const navigate = useNavigate()

  useEffect( () => {
    setTimeout( () => {
      navigate("/")
    }, 2000)
  })
  return<h1 className={"PaleMayo"}>Page Not Found - Check Address</h1>
}
export {NotFound}