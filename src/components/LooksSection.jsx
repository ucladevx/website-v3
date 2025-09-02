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

  const roles = [
    {
      h: "Developer",
      img: "/assets/dev.png", // replace with actual icon
      color: "#60a5fa",
      p: "Developers own the codebase. The code’s architecture, frontend, backend, and deployment are all on them. But they’re not just there to implement specs. They work closely with other team members to refine the scope of the project. If a design is inefficient or a feature is overbuilt, they push back. If a technical constraint changes the scope, they work with the PM and designer to find a workaround that still solves the problem. They care about speed, clarity, and not building things that are going to break in a week."
    },
    {
      h: "Product Manager",
      img: "/assets/pm.png",
      color: "#4ade80",
      p: "The PM sets direction, planning out the idea of the project and coordinating the different roles to work together to achieve it. They keep the team focused on shipping the right thing by making decisions that keep the team moving. They need to have a strong opinion, but they also need to know when to step back and let others lead. If two teammates have different understandings of what to build, the PM clears it up. If something’s dragging, the PM adjusts scope or makes a call."
    },
    {
      h: "Marketer",
      img: "/assets/marketer.png",
      color: "#c084fc",
      p: "The marketer figures out who the product is for, how to talk about it, and how to get it in front of people. They help shape the product’s voice. They write landing pages, promote the project on social media, and conduct surveys to figure out what works and what doesn’t."
    },
    {
      h: "Designer",
      img: "/assets/designer.png",
      color: "#f472b6",
      p: "The designer is responsible for how the product feels. They make sure it’s usable, clear, and aesthetic. They usually start with rough sketches, then work toward high-fidelity designs. Along the way, they work closely with developers to make sure the design actually works in code. They tweak margins, rework layouts, and make micro-decisions that can have all the difference in how the user interacts with the product."
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
          <div className="roles-grid">
            {roles.map((r, i) => (
              <div className="role-card" key={i}>
                <div className="role-pill">
                  <img
                    src={r.img || "/assets/default-role.png"}
                    alt={`${r.h} icon`}
                    className="role-icon-img"
                  />
                  <h4 className="role-pill__h" style={{ color: r.color }}>
                    {r.h}
                  </h4>
                </div>
                <p className="role-card__p">{r.p}</p>
              </div>
            ))}
          </div>

          <div className="impact-apply">
            <a href="#apply" className="apply-now">
              <span>Apply Now</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12h12M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <FooterSection />
    </section>
  );
}
