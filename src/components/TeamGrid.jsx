import React from "react";
import "../styles/team-grid.css";

const members = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  role: "Position",
  name: "First Last",
  photo: "/assets/team/default.png"   // Placeholder image, replace with actual images
}));

export default function TeamGrid() {
  return (
    <section className="team-grid">
      <div className="team-grid__inner">
        {members.map(m => (
          <figure key={m.id} className="member-card">
            <div className="member-avatar">
              <img src={m.photo} alt="" />
            </div>
            <figcaption>
              <div className="member-role">{m.role}</div>
              <div className="member-name">{m.name}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
