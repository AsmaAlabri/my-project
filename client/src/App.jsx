import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import BirdList from "./components/BirdList";
import CatList from "./components/CatList";
import DogList from "./components/DogList";
import PersianCat from "./cats/PersianCat";
import DomesticCat from "./cats/DomesticCat"
import SiameseCat from "./cats/SiameseCat";
import FrenchDog from "./dogs/FrenchDog";
import GermenDog from "./dogs/GermenDog";
import GoldenDog from "./dogs/GoldenDog";
import PeacockBird from "./birds/PeacockBird";
import ParrotBird from "./birds/ParrotBird";
import FlamingoBird from "./birds/FlamingoBird";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/CatList" element={<CatList />} />
        <Route path="/DogList" element={<DogList />} />
        <Route path="/BirdList" element={<BirdList />} />
        <Route path="/PersianCat" element={<PersianCat/>} />
        <Route path="/DomesticCat" element={<DomesticCat/>} />
        <Route path="/SiameseCat" element={<SiameseCat/>} />
        <Route path="/FrenchDog" element={<FrenchDog/>}/>
        <Route path="/GermenDog" element={<GermenDog/>}/>
        <Route path="/GoldenDog" element={<GoldenDog/>}/>
        <Route path="/PeacockBird" element={<PeacockBird/>}/>
        <Route path="/ParrotBird" element={<ParrotBird/>}/>
        <Route path="/FlamingoBird" element={<FlamingoBird/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
