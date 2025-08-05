import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/team-page.css";

export default function Team() {
  return (
    <div className="team-page">
      <header className="team-header">
        <nav className="team-nav">
          <ul className="team-nav__list">
            <li><NavLink to="/"        end   className="team-nav__link">Home</NavLink></li>
            <li><NavLink to="/#projects"      className="team-nav__link">Projects</NavLink></li>
            <li><NavLink to="/about"          className="team-nav__link">About Us</NavLink></li>
            <NavLink to="/#join" className="team-cta">Join</NavLink>
          </ul>
        </nav>
      </header>

      {/* hero heading */}
      <section className="team-hero">
        <h1 className="team-hero__title">Meet&nbsp;Our&nbsp;Team</h1>
        <p  className="team-hero__subtitle">The ones behind it all</p>
      </section>

      {/* grid placeholder */}
      <section className="team-grid">
        {/* we’ll render member cards here later */}
        <p style={{color:"#8ca0c7", textAlign:"center"}}>Team grid coming next…</p>
      </section>
    </div>
  );
}
