import {CheckMayoInput} from "../components/body/checkMayo";
import {MainNavbar} from "../components/navbar/navbarBody";
import React from "react";

function CheckMyMayo() {
  return(
    <div className="PaleMayo">
      <div className="row">
        <div className="col align-self-start">
        </div>
        <div className="col-9 align-self-center mt-3">
          <CheckMayoInput />
        </div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

export {CheckMyMayo}