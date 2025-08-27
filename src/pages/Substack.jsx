import React from "react";
import NavBar from "../components/NavBar";
import FooterSection from "../components/FooterSection";
import "../styles/substack-page.css";

export default function Substack() {
  return (
    <div className="substack-page">
      <section className="substack-hero">
        <div className="substack-hero__nav">
          <NavBar />
        </div>
        <div className="substack-hero__titlepack">
          <h1 className="substack-hero__title">
            <span className="substack-hero__title-gradient">Join Our Substack!</span>
          </h1>
          <p className="substack-hero__subtitle">Never miss an update.</p>
        </div>
      </section>

      <section className="substack-split">
        <div className="substack-split__illustration">
          <img src="/assets/substack-image.png" alt="Substack illustration" />
        </div>

        <div className="substack-split__card">
          <div className="substack-card__header">
            <h2 className="substack-card__title">Subscribe to our Substack</h2>
            <p className="substack-card__subtitle">Never miss a beat when you subscribe</p>
          </div>

          <div className="substack-card__form">
            <input className="substack-input" type="email" placeholder="Type your email..." />
            <button className="substack-button">Subscribe</button>
          </div>
        </div>
      </section>

      <section className="substack-grid">
        <div className="substack-grid__top">
          <div className="newsletter-card"><span className="newsletter-card__title">Newsletter Title</span></div>
          <div className="newsletter-card"><span className="newsletter-card__title">Newsletter Title</span></div>
          <div className="newsletter-card"><span className="newsletter-card__title">Newsletter Title</span></div>
        </div>

        <div className="substack-grid__bottom">
          <div className="newsletter-card newsletter-card--wide"><span className="newsletter-card__title">Newsletter Title</span></div>
          <div className="newsletter-card newsletter-card--wide newsletter-card--badge">
            <span className="newsletter-card__title">Newsletter Title</span>
            <img className="newsletter-card__badge" src="/assets/substack-badge.png" alt="Badge" />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
