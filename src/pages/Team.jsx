import React from "react";
import "../styles/team-page.css";
import TeamGrid from "../components/TeamGrid";
import NavBar from "../components/NavBar"
import FooterSection from "../components/FooterSection";

export default function Team() {
  return (
    <div className="team-page">
      <header className="team-header">
        <NavBar />
      </header>

      {/* hero heading */}
      <section className="team-hero">
        <h1 className="team-hero__title">Meet&nbsp;Our&nbsp;Team</h1>
        <p className="team-hero__subtitle">The ones behind it all</p>
      </section>
      <TeamGrid />
      {/* ─── social icons strip ─── */}
      <FooterSection />
    </div>
  );
}
