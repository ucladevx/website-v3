import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/about-page.css";
import AboutInfo from "../components/AboutInfo";
import NumbersSection from "../components/NumbersSection";
import CompaniesSection from "../components/CompaniesSection";
import NavBar from "../components/NavBar"

export default function About() {
  return (
    <div className="about-page">
      <header className="about-header">
        <NavBar />
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
