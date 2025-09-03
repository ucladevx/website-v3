import React from "react";
import Navbar from "../components/NavBar";
import "../styles/join.css";
import LooksSection from "../components/LooksSection";

export default function Join() {
  return (
    <div className="join-page">
      <section className="join-hero">
        <div className="join-hero__nav">
          <Navbar />
        </div>

        <div className="join-hero__frame">
          <div className="join-copy">
            <h1 className="join-title">Join the Team!</h1>
            <p className="join-sub">Ready to build, design, and innovate with us?</p>
          </div>

          <a href="#apply" className="join-btn">Apply Now</a>
        </div>
      </section>
      <LooksSection
        images={[
          "/assets/what-devx-3.png",
          "/digityle/IMG_4537.png",
          "/digityle/IMG_4820.png",
          "/assets/faces-bonfire-beach-night.png",
          "/digityle/IMG_4823.png",
          "/digityle/IMG_4633.png",
        ]}
        alts={["Workshop", "General meeting", "Lecture room"]}
      />
    </div>
  );
}
