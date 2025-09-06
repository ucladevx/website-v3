import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/projects-hero.css";

export default function ProjectsHero({ onLearnMore }) {
  return (
    <section className="projects-hero">

      <div className="projects-hero__body">
        <div className="projects-hero__content">
          <div className="projects-hero__text">
            <h1 className="projects-hero__title">
              <span className="projects-hero__title-gradient">
                Our Impactful Projects
              </span>
            </h1>

            <p className="projects-hero__subtitle">
              Explore the various initiatives DevX has embarked on to make a
              difference.
            </p>
          </div>

          <div className="projects-hero__actions">
            <button className="btn btn--outline" type="button" onClick={onLearnMore}>
              Learn More
            </button>
            <button className="btn btn--primary" type="button">
              <a className="interest-form" href="https://tinyurl.com/devxinterestform">Interest Form</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
