import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./styles/globals.css";

import Home  from "./pages/Home";
import About from "./pages/About";
import Team   from "./pages/Team"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />}  />
        <Route path="/about" element={<About />} />
        <Route path="/team"   element={<Team />} />
      </Routes>
    </BrowserRouter>
    
  );
}
