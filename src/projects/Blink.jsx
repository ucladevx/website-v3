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
            <p className="blink-subtitle">one line description of BLink</p>
          </div>

          <div className="blink-content">
            <div className="blink-text">
              <h2>What is BLink?</h2>
              <p>
                Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus.
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
