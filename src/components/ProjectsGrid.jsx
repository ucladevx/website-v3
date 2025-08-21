import React from "react";
import "../styles/projects-grid.css";

const topRow = [
  { title: "UCLA BLink", img: "/blink/PNG image.png" },
  { title: "Digityle", img: "/digityle/IMG_7407.png" },
  { title: "TransitTrack", img: "/assets/PageProduct.png" }
];

const bottomRow = [
  { title: "NeuVoice", img: "/assets/NeuVoice.png" },
  { title: "Study Spot", img: "/assets/project-left.png" },
  { title: "Course Planner", img: "/assets/project-center.png" }
];

function ProjectCard({ title, img }) {
  return (
    <div className="project-card">
      <div className="project-card__image">
        <img className="project-card__img" src={img} alt={title} />
        <button className="project-card__cta">Learn More</button>
      </div>
      <div className="project-card__name">{title}</div>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <section className="projects-grid">
      <div className="projects-grid__row">
        {topRow.map((p) => (
          <ProjectCard key={p.title} title={p.title} img={p.img} />
        ))}
      </div>

      <div className="projects-grid__row projects-grid__row--bottom">
        {bottomRow.map((p) => (
          <ProjectCard key={p.title} title={p.title} img={p.img} />
        ))}
      </div>

      <div className="projects-reviews">
        <div className="reviews-left">
          <h2 className="reviews-title">What Our Community Says</h2>
          <p className="reviews-subtitle">Feedback from bruin community</p>
          <button className="reviews-cta">See More Reviews</button>
        </div>

        <div className="reviews-right">
          <div className="review-card">
            <div className="review-card__header">
              <div className="review-card__avatar" />
              <span className="review-card__name">UCLA Student</span>
              <span className="review-card__stars">★★★★★</span>
            </div>
            <div className="review-card__body">I love the new BLink feature</div>
          </div>

          <div className="review-card">
            <div className="review-card__header">
              <div className="review-card__avatar" />
              <span className="review-card__name">UCLA Student</span>
              <span className="review-card__stars">★★★★★</span>
            </div>
            <div className="review-card__body">Digityle was great with...</div>
          </div>
        </div>
      </div>
    </section>
  );
}
