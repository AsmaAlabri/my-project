import "bootstrap/dist/css/bootstrap.css";
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
import DomesticCat from "./cats/DomesticCat";
import SiameseCat from "./cats/SiameseCat";

import FrenchDog from "./dogs/FrenchDog";
import GermenDog from "./dogs/GermenDog";
import GoldenDog from "./dogs/GoldenDog";

import PeacockBird from "./birds/PeacockBird";
import ParrotBird from "./birds/ParrotBird";
import FlamingoBird from "./birds/FlamingoBird";

import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />

        {/* LIST PAGES */}
        <Route path="/CatList" element={<CatList />} />
        <Route path="/DogList" element={<DogList />} />
        <Route path="/BirdList" element={<BirdList />} />

        {/* STATIC CAT PAGES */}
        <Route path="/PersianCat" element={<PersianCat />} />
        <Route path="/DomesticCat" element={<DomesticCat />} />
        <Route path="/SiameseCat" element={<SiameseCat />} />

        {/* ✅ DYNAMIC CAT ROUTE FROM MONGODB */}
        <Route path="/cats/:id" element={<PersianCat />} />

        {/* DOG PAGES */}
        <Route path="/dogs/:id" element={<GermenDog />} />

        {/* BIRD PAGES */}
        <Route path="/dogs/:id" element={<FlamingoBird />} />



        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
