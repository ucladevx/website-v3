import React from "react";
import "../styles/team-grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const members = [
  { id: 1, role: "Co-President", name: "Andrew Cruz",  photo: "../../board/AndrewCruz.png",  linkedin: "https://www.linkedin.com/in/andrewcruz3/" },
  { id: 2, role: "Co-President", name: "Arushi Gupta", photo: "../../board/ArushiGupta.jpg", linkedin: "https://www.linkedin.com/in/1arushigupta/" },
  { id: 3, role: "Internal Vice President", name: "Alex Hu", photo: "../../board/AlexHu.jpeg", linkedin: "https://www.linkedin.com/in/alex-hu374/" },
  { id: 4, role: "External Vice President", name: "Conor Parman", photo: "../../board/ConorParman.jpeg", linkedin: "https://www.linkedin.com/in/conor-parman" },
  { id: 5, role: "Alumni Relations", name: "Anusha Singhai", photo: "../../board/AnushaSinghai.png", linkedin: "https://www.linkedin.com/in/anusha-singhai/" },
  { id: 6, role: "Finance", name: "Amanda Lee", photo: "../../board/AmandaLee.jpeg", linkedin: "http://linkedin.com/in/amandal35" },
  { id: 7, role: "Tech", name: "Ishan Royyuru", photo: "../../board/IshanRoyyuru.jpg", linkedin: "https://www.linkedin.com/in/ishan-royyuru" },
  { id: 8, role: "Design", name: "Nancy Rios", photo: "../../board/NancyRios.png", linkedin: "https://www.linkedin.com/in/nancyvrios" },
  { id: 9, role: "Marketing", name: "Natalie Tan", photo: "../../board/NatalieTan.jpg", linkedin: "https://www.linkedin.com/in/nataliegracetan/" },
  { id: 10, role: "Marketing", name: "Lily Tran", photo: "../../board/LilyTran.jpeg", linkedin: "https://www.linkedin.com/in/lilymtran?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
];

export default function TeamGrid() {
  const leaders = members.filter(m => m.role === "Co-President");
  const rest = members.filter(m => m.role !== "Co-President");

  const Card = (m) => (
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
  );

  return (
    <section className="team-grid">
      <div className="team-grid__leaders">
        {leaders.map(Card)}
      </div>
      <div className="team-grid__rest">
        {rest.map(Card)}
      </div>
    </section>
  );
}
