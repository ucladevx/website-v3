import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/about-page.css";
import "../styles/globals.css";

export default function NavBar() {
  return (
    <ul className="nav-list">
      <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
      <li><NavLink to="/projects" className="nav-link">Projects</NavLink></li>
      <li><NavLink to="/about"className="nav-link">About Us</NavLink></li>
      {/*<li><NavLink to="/substack" className="nav-link">Substack</NavLink></li>*/}
      <li><NavLink to="/team" className="nav-link">Team</NavLink></li>
      <NavLink to="/join" className="about-cta">Join</NavLink>
    </ul>
  )
}