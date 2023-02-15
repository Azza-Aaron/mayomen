import {PaleMayo} from "../styles/index.css"
import {WhyMayo} from "../components/body/whyMayo";
import {ABigDeal} from "../components/body/aBigDeal";
import {WhoDied} from "../components/body/whoDied";
import mayoBowlPic from "../images/mayo bowl.png";
import ancientMayoPic from "../images/ancient mayo.jpeg";
import michelleLescoPic from "../images/michelle-lesco-mayonnaise_tcm25-588139.jpg";

function HomePage() {
  return(
    <>
      <div className="row">
        <div className="col align-self-start">
          <div id='ancientMayo'>
            <img src={ancientMayoPic} className="img-fluid mt-5 float-left d-none d-lg-block d-xl-block" style={{"maxWidth": "130%"}} alt="ancient mayo" />
          </div>
        </div>
        <div className="col-9 align-self-center mt-3">
          <h1 className='PaleMayo p-3'>MayoMen since 1756</h1>
          <WhyMayo/>
          <ABigDeal/>
          <WhoDied/>
          <div id='guinessHolder'>
            <img src={michelleLescoPic} className={"img-fluid"} style={{"maxWidth": "100%"}} alt='guiness record holder'/>
          </div>
        </div>
        <div className="col">
          <div id='mayoBowl'>
            <img src={mayoBowlPic} className="img-fluid mt-5 float-right d-none d-lg-block d-xl-block" style={{"maxWidth": "150%"}} alt='mayo bowl'/>
          </div>
        </div>
      </div>
    </>
  )
}


export{HomePage}