import React from "react";
import NavBar from "../components/NavBar";
import FooterSection from "../components/FooterSection";
import ImageCarousel from "./ImageCarousel";
import { blinkImages } from "./BlinkImages";
import "../styles/project-page.css";

export default function Blink() {
  return (
    <>
      <header className="top-rect">
        <NavBar />
      </header>

      <main className="blink-page">
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
      </main>

      <FooterSection />
    </>
  );
}
