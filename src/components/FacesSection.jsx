import "../styles/about.css";
import ImageCarousel from "../projects/ImageCarousel";

const facesImages = [
  { src: "/assets/faces-sunset-beach-group.png", title: "Sunset Beach Hangout" },
  { src: "/assets/faces-core-team-steps.png", title: "DevX Core Team on the Steps" },
  { src: "/assets/faces-bonfire-beach-night.png", title: "Bonfire Night at the Beac"}
];

export default function FacesSection() {
  return (
    <section className="faces-wrap" id="faces">
      <h2 className="faces-title">
        <span className="faces-accent">The Faces Behind It All</span>
      </h2>

      <p className="faces-sub">
        While we take pride in our projects at DevX, what truly sets us apart is
        the close-knit community behind them.
      </p>

      <ImageCarousel images={facesImages} />

      <a href="team" className="faces-cta">
        Learn More <span aria-hidden>→</span>
      </a>

    </section>
  );
}
