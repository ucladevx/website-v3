import "./styles/globals.css";
import TopSection from "./components/TopSection";
import AboutSection from "./components/AboutSection";

export default function App() {
  return (
    <>
      <TopSection />      
      <div className="page">
        <AboutSection/>
      </div>
    </>
  );
}
