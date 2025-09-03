import "../styles/about.css";
import { useState } from "react";

export default function FacesSection() {
  const images = [
    "/assets/faces-sunset-beach-group.png",
    "/assets/faces-core-team-steps.png",
    "/assets/faces-bonfire-beach-night.png",
    "/assets/club-fair.png",
    "/blink/IMG_0290.png",
    "/assets/what-devx-1.jpg",
    "/assets/what-devx-2.jpg"
  ];

  const [index, setIndex] = useState(0);
  const len = images.length;

  const nextSlide = () => {
    if (index < len - 1) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  const leftIdx = index % len;
  const midIdx = (index + 1) % len;
  const rightIdx = (index + 2) % len;

  return (
    <section className="faces-wrap" id="faces">
      <h2 className="faces-title">
        <span className="faces-accent">The Faces Behind It All</span>
      </h2>

      <p className="faces-sub">
        While we take pride in our projects at DevX, what truly sets us apart is
        the close-knit community behind them.
      </p>

      <div className="faces-carousel">
        <div className="faces-row faces-nowrap">
          <figure className="faces-card faces-left">
            <img src={images[leftIdx]} alt="" draggable="false" />
          </figure>

          <figure className="faces-card faces-mid">
            <img src={images[midIdx]} alt="" draggable="false" />
          </figure>

          <figure className="faces-card faces-right">
            <img src={images[rightIdx]} alt="" draggable="false" />
          </figure>
        </div>

        {/* Left arrow */}
        {index > 0 && (
          <button
            className="faces-btn prev"
            onClick={prevSlide}
            aria-label="Previous"
            type="button"
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

        {/* Right arrow */}
        {index < len - 1 && (
          <button
            className="faces-btn next"
            onClick={nextSlide}
            aria-label="Next"
            type="button"
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
        {images.map((_, idx) => (
          <span key={idx} className={`dot ${idx === index ? "active" : ""}`} />
        ))}
      </div>

      <a href="team" className="faces-cta">
        Learn More <span aria-hidden>→</span>
      </a>
    </section>
  );
}
