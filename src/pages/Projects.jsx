import React from "react";
import ProjectsHero from "../components/ProjectsHero";
import ProjectsGrid from "../components/ProjectsGrid";
import NavBar from "../components/NavBar";

export default function Projects() {
  return (
    <div className="projects-page">
      <header className="project-header">
        <NavBar />
      </header>
      <ProjectsHero onLearnMore={() => window.scrollTo({ top: 520, behavior: "smooth" })} />
      <ProjectsGrid />
    </div>
  );
}
