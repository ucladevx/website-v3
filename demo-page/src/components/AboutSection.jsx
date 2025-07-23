// src/components/AboutSection.jsx
import "../styles/about.css";
import ProjectsCarousel from "./ProjectsCarousel";

export default function AboutSection() {
  return (
    <section id="about" className="about-wrap">
      <div className="about-graphic">
        <img src="/assets/GradientDesign.png" alt="" aria-hidden="true" />
      </div>

      <div className="about-text">
        <h2 className="about-heading">
          <span className="about-bar" aria-hidden="true" /> What is{" "}
          <span className="about-accent">DevX</span>?
        </h2>

        <p className="about-body">
          DevX is UCLA's premier product development organization. Here at DevX,
          we build real‑world projects that help tackle pressing problems within
          the UCLA community, and beyond. We help students make their ideas come
          to life, and grow their technical skills by pairing them with
          experienced teammates, building a network that lasts beyond UCLA.
        </p>
      </div>

      <ProjectsCarousel />
    </section>
  );
}
