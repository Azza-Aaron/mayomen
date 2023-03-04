import {Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/Home";
import {AboutPage} from "./pages/About";
import {NotFound} from "./pages/NotFound";
import {CheckMyMayo} from "./pages/CheckMyMayo";
import {MakeMayo} from "./pages/MakeMayo";
import {Blog} from "./pages/Blog";
import {MainNavbar} from "./components/navbar/navbarBody";
import {LoginPage} from "./pages/Login";

function App() {
  return <div>
    <MainNavbar/>
    <div id='mainBody' className={'container'}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkmayo" element={<CheckMyMayo />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/makemayo" element={<MakeMayo />} />
        <Route path="/blog" element={<Blog />} />
        <Route path={"/loginpage"} element={<LoginPage />} />
      </Routes>
    </div>
  </div>
}

export default App