import "./styles/globals.css";
import TopSection from "./components/TopSection";
import AboutSection from "./components/AboutSection";
import FacesSection from "./components/FacesSection";

export default function App() {
  return (
    <>
      <TopSection />
      <section className="about-bg">
        <AboutSection />
        <FacesSection />
      </section>
    </>
  );
}
