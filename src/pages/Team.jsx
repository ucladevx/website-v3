import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/team-page.css";
import TeamGrid from "../components/TeamGrid";

export default function Team() {
  return (
    <div className="team-page">
      <header className="team-header">
        <nav className="team-nav">
          <ul className="team-nav__list">
            <li>
              <NavLink to="/" end className="team-nav__link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/#projects" className="team-nav__link">
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="team-nav__link">
                About&nbsp;Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/team"
                end
                className="team-nav__link"
              >
                Team
              </NavLink>
            </li>

            <li>
              <NavLink to="/#join" className="team-cta">
                Join
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* hero heading */}
      <section className="team-hero">
        <h1 className="team-hero__title">Meet&nbsp;Our&nbsp;Team</h1>
        <p className="team-hero__subtitle">The ones behind it all</p>
      </section>
      <TeamGrid />
      {/* ─── social icons strip ─── */}
      <div className="team-social">
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H7.9v-2.9h2.4V9.85c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22v7.03c4.78-.79 8.44-4.93 8.44-9.93z"/>
          </svg>
        </a>

        <a href="https://x.com" aria-label="X" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M18.9 3H22l-6.51 7.44L22.39 21H16.6l-4.7-6.17L6.45 21H2l7.03-8.05L1.8 3h5.9l4.22 5.56L18.9 3zm-2.1 15.6h1.22L7.35 4.32H6.02l10.78 14.28z"/>
          </svg>
        </a>

        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 5.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
