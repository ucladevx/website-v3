// src/components/LooksSection.jsx
import React from "react";
import "../styles/join-looks.css";

export default function LooksSection({
  title = "What Being in DevX Looks Like",
  subtitle = "We bring together designers, developers, and entrepreneurs to build impactful projects — and have fun doing it.",
  images = ["/assets/left.jpg", "/assets/center.jpg", "/assets/right.jpg"],
  alts = ["Event", "Event", "Event"],
  className = "",
}) {
  const [left, center, right] = images;
  const [altL, altC, altR] = alts;

  const teams = [
    {
      h: "Marketing Team",
      p: "We tell the world what we’re building. Join if you love storytelling, social media, branding, or just have good meme instincts.",
    },
    {
      h: "Design Team",
      p: "From user flows to UI polish, this team makes DevX projects not only usable — but beautiful. Great for creatives who think in pixels and prototypes.",
    },
    {
      h: "Tech Team",
      p: "Bring ideas to life with code. Whether you’re into frontend, backend, or full-stack, this team turns wireframes into real, working products.",
    },
    {
      h: "Product Team",
      p: "Love solving problems? Product leads keep projects on track, define what to build, and make sure we’re always designing with users in mind.",
    },
    {
      h: "Growth & Outreach Team",
      p: "Help DevX grow. You’ll work on recruiting new members, building community, and forming partnerships inside and outside UCLA.",
    },
    {
      h: "Events Team",
      p: "Plan and run our hackathons, speaker events, and workshops. If you’re organized, creative, and love bringing people together — this is your spot.",
    },
  ];

  return (
    <section className={`looks-sec ${className}`}>
      <div className="looks-head">
        <h2 className="looks-title">{title}</h2>
        <p className="looks-sub">{subtitle}</p>
      </div>

      <div className="looks-row">
        <figure className="looks-side">
          <img src={left} alt={altL} />
        </figure>

        <figure className="looks-center">
          <img src={center} alt={altC} />
        </figure>

        <figure className="looks-side">
          <img src={right} alt={altR} />
        </figure>
      </div>

      <ul className="looks-dots" aria-label="gallery position">
        <li className="dot active" />
        <li className="dot" />
        <li className="dot" />
        <li className="dot" />
        <li className="dot" />
      </ul>

      <section className="impact-sec">
        <h3 className="impact-title">Where Will You Make Your Impact?</h3>
        <div className="impact-inner">
            <div className="impact-grid">
            {teams.map((t, i) => (
                <div className="team-card" key={i}>
                <h4 className="team-card__h">{t.h}</h4>
                <p className="team-card__p">{t.p}</p>
                </div>
            ))}
            </div>
            <div className="impact-apply">
                <a href="#apply" className="apply-now">
                    <span>Apply Now</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>

        <div className="social-bar">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H7.9v-2.9h2.4V9.85c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22v7.03c4.78-.79 8.44-4.93 8.44-9.93z"/>
                </svg>
            </a>

            <a href="https://x.com" aria-label="X" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
                <path d="M18.9 3H22l-6.51 7.44L22.39 21H16.6l-4.7-6.17L6.45 21H2l7.03-8.05L1.8 3h5.9l4.22 5.56L18.9 3zm-2.1 15.6h1.22L7.35 4.32H6.02l10.78 14.28z"/>
                </svg>
            </a>

            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 5.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
                </svg>
            </a>
        </div>
      </section>
    </section>
  );
}
