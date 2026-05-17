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


import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/Adminlogin";

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


        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
