import React from "react";
import ProjectsHero from "../components/ProjectsHero";
import ProjectsGrid from "../components/ProjectsGrid";
import FooterSection from "../components/FooterSection";

export default function Projects() {
  return (
    <div className="projects-page">
      <ProjectsHero onLearnMore={() => window.scrollTo({ top: 520, behavior: "smooth" })} />
      <ProjectsGrid />
      <FooterSection />
    </div>
  );
}
