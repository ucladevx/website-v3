// src/pages/Home.jsx
import TopSection   from "../components/TopSection";
import AboutSection from "../components/AboutSection";
import FacesSection from "../components/FacesSection";
import FooterSection from "../components/FooterSection";

export default function Home() {
  return (
    <>
      <TopSection />
      <section className="about-bg">
        <AboutSection />
        <FacesSection />
      </section>
      <FooterSection />
    </>
  );
}
