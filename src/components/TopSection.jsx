import "../styles/top-section.css";

export default function TopSection() {
  return (
    <section className="hero-wrap">
      <div className="hero-bg-img" aria-hidden />

      <header className="top-rect">
        <nav className="nav">
          <ul className="nav-list">
            <li><a className="nav-link" href="#projects">Projects</a></li>
            <li><a className="nav-link" href="/about">About Us</a></li>
            <li><a className="nav-link" href="/team">Team</a></li>
          </ul>
          <a className="nav-cta" href="#join">Join</a>
        </nav>
      </header>

      <div className="hero-inner">
        <div className="showcase">
          <img className="shot shot-left"   src="/assets/PageProduct.png" alt="" />
          <img className="shot shot-center" src="/assets/devx.png"        alt="" />
          <img className="shot shot-right"  src="/assets/vr.png"          alt="" />
        </div>

        <h1 className="tech-title">Technology.<br />Reimagined.</h1>
        <p className="tagline">Entrepreneurs at UCLA</p>
      </div>
    </section>
  );
}
