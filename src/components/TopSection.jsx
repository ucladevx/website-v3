import "../styles/top-section.css";
import NavBar from "../components/NavBar"

export default function TopSection() {
  return (
    <section className="hero-wrap">
      <div className="hero-bg-img" aria-hidden />

      <header className="top-rect">
        <NavBar />
      </header>

      <div className="hero-inner">
        <div className="project-images">
          <img src="/assets/ProjectImages.png" alt="" />
        </div>
        <h1 className="tech-title">Technology.<br />Reimagined.</h1>
        <p className="tagline">Entrepreneurs at UCLA</p>
      </div>
    </section>
  );
}
