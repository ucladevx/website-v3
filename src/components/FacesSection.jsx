import "../styles/about.css";

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

      <div className="faces-row faces-nowrap">
        <figure className="faces-card faces-left">
          <img
            src="/assets/faces-sunset-beach-group.png"
            alt="Sunset Beach Hangout"
            draggable="false"
          />
        </figure>

        <figure className="faces-card faces-mid">
          <img
            src="/assets/faces-core-team-steps.png"
            alt="DevX Core Team on the Steps"
            draggable="false"
          />
        </figure>

        <figure className="faces-card faces-right">
          <img
            src="/assets/faces-bonfire-beach-night.png"
            alt="Bonfire Night at the Beach"
            draggable="false"
          />
        </figure>
      </div>

      <div className="faces-dots" aria-hidden="true">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      <a href="team" className="faces-cta">
        Learn More <span aria-hidden>→</span>
      </a>

    </section>
  );
}
