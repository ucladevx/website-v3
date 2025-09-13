// src/components/TimelineSection.jsx
import React from "react";
import "../styles/timeline.css";

export default function TimelineSection() {
  const events = [
    {
      title: "Application Opens",
      desc: "Our application will open in late September. This is your chance to become part of the team that makes up DevX.",
      date: "09/23",
    },
    {
      title: "Info Sessions",
      desc: "Come to our info session to learn about our various roles, project teams and application process. End the session with networking time with both current and potential future DevX members!",
      date: "10/7",
    },
    {
      title: "Application Due",
      desc: "Tell us about your interests and how you think you can contribute to DevX. We will be looking at your resume and portfolio (if applicable).",
      date: "10/8",
    },
    {
      title: "Coffee Chats",
      desc: "Let us get to know you better. If your resume is a good match, we will invite you to tell us a little bit about yourself in person.",
      date: "10/14",
    },
    {
      title: "Final Interviews",
      desc: "If your skills are a good match for any of our teams, you will be invited to individual final round interviews with the Product Managers of this year's teams.",
      date: "10/16 - 10/18",
    },
  ];

  return (
    <section className="timeline-sec">
      <h3 className="timeline-title">Application Timeline</h3>

      {/* Large screens - alternating vertical timeline */}
      <div className="timeline-large">
        <div className="timeline-line" />
        {events.map((e, i) => (
          <div className="timeline-container">
            <div className="timeline-circle" />
            <div
              className={`timeline-entry ${i % 2 === 0 ? "left" : "right"}`}
              key={i}
            >
              <div className="timeline-content">
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
                <span className="timeline-date">{e.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Small screens - simple vertical */}
      <div className="timeline-small">
        <div className="timeline-line" />
        {events.map((e, i) => (
          <div className="timeline-entry" key={i}>
            <div className="timeline-circle" />
            <div className="timeline-content">
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
              <span className="timeline-date">{e.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
