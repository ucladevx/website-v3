import { useRef, useEffect, useState } from "react";
import "../styles/carousel.css";

export default function ImageCarousel({ images = [] }) {
  const vpRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const DUP = 3;
  const extSlides = Array.from({ length: DUP }, () => images).flat();
  const baseLen = images.length;

  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    // Center to middle set
    const firstCard = vp.querySelector(".caro-card");
    if (!firstCard) return;

    const gap = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--gap") || 16
    );
    const cardW = firstCard.getBoundingClientRect().width + gap;

    vp.style.scrollBehavior = "auto";
    vp.scrollLeft = baseLen * cardW;
    vp.style.scrollBehavior = "smooth";
  }, [baseLen]);

  // update active index on scroll
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    const handleScroll = () => {
      const cards = [...vp.querySelectorAll(".caro-card")];
      const vpCenter = vp.scrollLeft + vp.offsetWidth / 2;

      let bestIdx = 0;
      let bestDist = Infinity;

      cards.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const elCenter =
          rect.left + rect.width / 2 + vp.scrollLeft - vp.getBoundingClientRect().left;
        const d = Math.abs(elCenter - vpCenter);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i % baseLen; // normalize to original set
        }
      });

      setActiveIdx(bestIdx);
    };

    vp.addEventListener("scroll", handleScroll, { passive: true });
    return () => vp.removeEventListener("scroll", handleScroll);
  }, [baseLen]);

  return (
    <div className="caro-wrapper">
      <div ref={vpRef} className="caro-viewport">
        <div className="caro-track">
          {extSlides.map((s, i) => (
            <div
              key={i}
              className={`caro-card ${
                activeIdx === i % baseLen ? "active" : ""
              }`}
            >
              <img src={s.src} alt={s.title || `slide-${i}`} draggable="false" />
            </div>
          ))}
        </div>
      </div>

      {/* pagination dots */}
      <div className="caro-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === activeIdx ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
