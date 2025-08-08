import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/about-page.css";
import AboutInfo from "../components/AboutInfo";
import NumbersSection from "../components/NumbersSection";
import CompaniesSection from "../components/CompaniesSection";

export default function About() {
  return (
    <div className="about-page">
      <header className="about-header">
        <nav className="about-nav">
          <ul className="about-nav__list">
            <li><NavLink to="/"          end className="about-nav__link">Home</NavLink></li>
            <li><NavLink to="/#projects" className="about-nav__link">Projects</NavLink></li>
            <li><NavLink to="/about"     className="about-nav__link">About Us</NavLink></li>
            <li><NavLink to="/team"     className="about-nav__link">Team</NavLink></li>
            <NavLink to="/#join" className="about-cta">Join</NavLink>
          </ul>

        </nav>
      </header>

      <section className="about-hero">
        <div className="about-hero__overlay" aria-hidden/>
        <div className="about-hero__content">
          <h1 className="about-hero__title">About&nbsp;Us</h1>
          <p  className="about-hero__subtitle">
            Fueling Innovation, One Project at a Time.
          </p>
        </div>
      </section>
      <AboutInfo />
      <NumbersSection />
      <CompaniesSection />
    </div>

  );
}
