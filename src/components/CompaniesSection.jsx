import React from "react";
import "../styles/companies-section.css";
import FooterSection from "./FooterSection";

const logos = [
  { src: "/assets/coinbase-logo.png", alt: "Coinbase" },
  { src: "/assets/meta-logo.png", alt: "Meta" },
  { src: "/assets/google-logo.png", alt: "Google", className: "logo-lg" },
  { src: "/assets/roblox-logo.png", alt: "Roblox", className: "logo-lg" },
  { src: "/assets/microsoft-logo.png", alt: "Microsoft", className: "logo-lg" }
];

export default function CompaniesSection() {
  return (
    <section className="companies-sec">
      <div className="companies-sec__heading">
        <h2>DevX&nbsp;In&nbsp;Companies</h2>
        <p>Where can you find DevX?</p>
      </div>

      <div className="logo-marquee">
        <div className="logo-track">
          <ul className="logo-seq">
            {logos.map((l) => (
              <li key={`a-${l.alt}`}>
                <img src={l.src} alt={l.alt} className={l.className || ""} />
              </li>
            ))}
          </ul>
          <ul className="logo-seq" aria-hidden="true">
            {logos.map((l) => (
              <li key={`b-${l.alt}`}>
                <img src={l.src} alt={l.alt} className={l.className || ""} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FooterSection />
    </section>
  );
}
