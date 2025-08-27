// src/components/LooksSection.jsx
import React from "react";
import "../styles/join-looks.css";
import FooterSection from "./FooterSection";

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
      </section>
      <FooterSection />
    </section>
  );
}
