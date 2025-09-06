import { useState } from "react";
import "../styles/about.css";

const slides = [
  { src: "/assets/project-left.png",   title: "Project Name" },
  { src: "/assets/project-center.png", title: "Project Name" },
  { src: "/blink/App_store.png",  title: "Project Name" },
  { src: "/digityle/IMG_7407.png",  title: "Project Name" },
  { src: "/assets/NeuVoice.png",  title: "Project Name" },
];

export default function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const len = slides.length;

  const next = () => {
    if (index < len - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const leftIdx = index % len;
  const midIdx = (index + 1) % len;
  const rightIdx = (index + 2) % len;

  return (
    <section id="projects" className="faces-wrap">
      <h2 className="faces-title">
        <span className="faces-accent">Ongoing Projects</span>
      </h2>

      <p className="faces-sub">
        Check out some of the current projects DevX members are actively working on!
      </p>

      <div className="faces-carousel">
        <div className="faces-row faces-nowrap">
          <figure className="faces-card faces-left">
            <img src={slides[leftIdx].src} alt={slides[leftIdx].title} draggable="false" />
          </figure>

          <figure className="faces-card faces-mid">
            <img src={slides[midIdx].src} alt={slides[midIdx].title} draggable="false" />
          </figure>

          <figure className="faces-card faces-right">
            <img src={slides[rightIdx].src} alt={slides[rightIdx].title} draggable="false" />
          </figure>
        </div>

        {index > 0 && (
          <button
            className="faces-btn prev"
            aria-label="Previous"
            type="button"
            onClick={prev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="8,5 19,12 8,19 8,5" />
            </svg>
          </button>
        )}

        {index < len - 1 && (
          <button
            className="faces-btn next"
            aria-label="Next"
            type="button"
            onClick={next}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="8,5 19,12 8,19 8,5" />
            </svg>
          </button>
        )}
      </div>

      <div className="faces-dots" aria-hidden="true">
        {slides.map((_, idx) => (
          <span key={idx} className={`dot ${idx === index ? "active" : ""}`} />
        ))}
      </div>

      <a href="projects" className="proj-btn">
        Projects <span aria-hidden>→</span>
      </a>
    </section>
  );
}
