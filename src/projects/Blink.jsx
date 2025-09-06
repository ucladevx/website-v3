import React from "react";
import NavBar from "../components/NavBar";
import FooterSection from "../components/FooterSection";
import ImageCarousel from "./ImageCarousel";
import { blinkImages } from "./BlinkImages";
import "../styles/project-page.css";

export default function Blink() {
  return (
    <>

      <main className="blink-page">
        <header className="top-rect">
          <NavBar />
        </header>
        <div className="blink-container">
          <div className="blink-header">
            <h1 className="blink-title">UCLA BLink</h1>
            <p className="blink-subtitle">The go-to app for discovering every pop‑up and event happening at UCLA</p>
          </div>

          <div className="blink-content">
            <div className="blink-text">
              <h2>What is BLink?</h2>
              <p>
                Founded in 2024, UCLA BLink is a student-run platform that aggregates campus events: pop-ups, student org gatherings, workshops, and more—into one easily accessible spot. Linking you with the best events on campus — BLink and you’ll miss it. 
              </p>
            </div>
            <div className="blink-image">
              <img src="/blink/App_store.png" alt="App preview" />
            </div>
          </div>
        </div>

        {/* carousel right above footer */}
        <ImageCarousel images={blinkImages} />

        {/* Don't have pictures for teams yet */}
        {/* <div className="blink-team">
          <h2 className="blink-team__title">The team behind BLink</h2>

          <div className="blink-team__grid">
            {[...Array(8)].map((_, i) => (
              <div className="team-card" key={i}>
                <div className="team-card__avatar" />
                <div className="team-card__role">Position</div>
                <div className="team-card__name">First Last</div>
              </div>
            ))}
          </div>

          <div className="blink-team__ctas">
            <button className="btn-outline">Other Projects</button>
            <button className="btn-primary">Get Involved</button>
          </div>
        </div> */}

        <FooterSection />
      </main>
    </>
  );
}
