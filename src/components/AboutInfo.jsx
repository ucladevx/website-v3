import React from "react";
import "../styles/about-info.css";

export default function AboutInfo() {
  return (
    <section className="about-info">
      <div className="info-row">
        <figure className="info-img">
          <img src="/assets/club-fair.png" alt="DevX members tabling" />
        </figure>

        <div className="info-text">
          <h2>About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          </p>
        </div>
      </div>

      <div className="info-row info-row--reverse">
        <figure className="info-img">
          <img src="/assets/beach-pic.png" alt="DevX beach photo" />
        </figure>

        <div className="info-text">
          <h2>Our Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus.
          </p>
        </div>
      </div>
    </section>
  );
}
