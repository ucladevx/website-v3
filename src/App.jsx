import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./styles/globals.css";

import Home  from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />}  />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
