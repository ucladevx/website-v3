import React from "react";
import "../styles/team-grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const members = [
  {
    id: 1,
    role: "Co-President",
    name: "Andrew Cruz",
    photo: "/assets/team/alice.png",
    linkedin: "https://www.linkedin.com/in/alicejohnson"
  },
  {
    id: 2,
    role: "Co-President",
    name: "Arushi Gupta",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 3,
    role: "Internal Vice President",
    name: "Alex Hu",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 4,
    role: "External Vice President",
    name: "Conor Parman",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 5,
    role: "Alumni Relations",
    name: "Anusha Singhai",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 6,
    role: "Finance",
    name: "Amanda Lee",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 7,
    role: "Engineering",
    name: "Bob Smith",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 8,
    role: "Design",
    name: "Bob Smith",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 9,
    role: "Marketing",
    name: "Bob Smith",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
  {
    id: 10,
    role: "Marketing",
    name: "Bob Smith",
    photo: "/assets/team/bob.png",
    linkedin: "https://www.linkedin.com/in/bobsmith"
  },
];

export default function TeamGrid() {
  return (
    <section className="team-grid">
      <div className="team-grid__inner">
        {members.map((m) => (
          <figure key={m.id} className="member-card">
            <div className="member-avatar">
              <img src={m.photo} alt={`${m.name} profile`} />
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} LinkedIn`}
                  className="member-linkedin"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              )}
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