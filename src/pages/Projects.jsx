import React from "react";
import FooterSection from "../components/FooterSection";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Projects() {
  return (
    <div>
      <header className="top-rect">
        <NavBar />
      </header>
      <h1>Projects</h1>

      <ul>
        {/* full absolute path since it’s not nested */}
        <li><NavLink to="/projects/blink">Temporary Link to Blink Project</NavLink></li>
      </ul>
      <FooterSection />
    </div>
  );
}
