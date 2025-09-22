import React from "react";
import NavBar from "../components/NavBar";
import FooterSection from "../components/FooterSection";
import ImageCarousel from "./ImageCarousel";
import { digityleImages } from "./DigityleImages";
import "../styles/project-page.css";

export default function Digityle() {
  return (
    <>

      <main className="blink-page">
        <header className="top-rect">
          <NavBar />
        </header>
        <div className="blink-container">
          <div className="blink-header">
            <h1 className="blink-title">Digityle</h1>
            <p className="blink-subtitle">A fashion-tech product that develops personal style without high-end stylists or excessive online shopping. </p>
          </div>

          <div className="blink-content">
            <div className="blink-text">
              <h2>What is Digityle?</h2>
              <p>
                A new way to shop and find clothes that pop—focusing on individuality and unique user experiences Designed to help users feel more confident with clothes they love, Digityle is an e-commerce styling site with a personality based clothing recommendation system.
                <br /><br />
                “Our research-backed quiz creates an individualized shopping experience by establishing a user’s unique fashion aesthetic. From anticipating existing wardrobe items to giving ideas on how to style them, Digityle empowers users to express themselves boldly and confidently.” - Digityle Team
              </p>
            </div>
            <div className="blink-image">
              <img src="/assets/digityle/IMG_7407.png" alt="App preview" />
            </div>
          </div>
        </div>

        {/* carousel right above footer */}
        <ImageCarousel images={digityleImages} />

        {/* Don't have pictures for teams yet */}
        {/* <div className="blink-team">
          <h2 className="blink-team__title">The team behind Digityle</h2>

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
