import React from "react";
import "../styles/companies-section.css";

export default function CompaniesSection() {
  return (
    <section className="companies-sec">
      <div className="companies-sec__heading">
        <h2>DevX&nbsp;In&nbsp;Companies</h2>
        <p>Where can you find DevX?</p>
      </div>

      <ul className="logo-bar">
        <li><img src="/assets/coinbase-logo.png"  alt="Coinbase"             /></li>
        <li><img src="/assets/meta-logo.png"      alt="Meta"                 /></li>
        <li><img src="/assets/google-logo.png"    alt="Google"    className="logo-lg" /></li>
        <li><img src="/assets/roblox-logo.png"    alt="Roblox"    className="logo-lg" /></li>
        <li><img src="/assets/microsoft-logo.png" alt="Microsoft" className="logo-lg" /></li>
      </ul>

    </section>
  );
}
