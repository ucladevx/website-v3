import { useRef, useEffect } from "react";
import "../styles/about.css";

const slides = [
  { src: "/assets/project-left.png",   title: "Project Name" },
  { src: "/assets/project-center.png", title: "Project Name" },
  { src: "/assets/project-right.png",  title: "Project Name" },
];

const DUP = 3; // repeat list to fake infinite scroll

export default function ProjectsCarousel() {
  const vpRef = useRef(null);
  const cardW = useRef(0);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  const extSlides = Array.from({ length: DUP }, () => slides).flat();
  const baseLen = slides.length;

  // measure & jump to middle copy
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    const firstCard = vp.querySelector(".caro-card-snap");
    if (!firstCard) return;

    const gap = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--gap")
    ) || 0;

    cardW.current = firstCard.getBoundingClientRect().width + gap;

    vp.style.scrollBehavior = "auto";
    vp.scrollLeft = baseLen * cardW.current;
    vp.style.scrollBehavior = "smooth";
  }, [baseLen]);

  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const down = (e) => {
      drag.current.down = true;
      drag.current.startX = getX(e);
      drag.current.startScroll = vp.scrollLeft;
      vp.style.scrollBehavior = "auto";
    };

    const move = (e) => {
      if (!drag.current.down) return;
      const dx = getX(e) - drag.current.startX;
      vp.scrollLeft = drag.current.startScroll - dx;
      e.preventDefault();
    };

    const up = () => {
      if (!drag.current.down) return;
      drag.current.down = false;
      snap();
    };

    const snap = () => {
      const cards = [...vp.querySelectorAll(".caro-card-snap")];
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
          bestIdx = i;
        }
      });

      const target = cards[bestIdx];
      if (target) {
        vp.style.scrollBehavior = "smooth";
        target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }

      // wrap
      if (bestIdx < baseLen) {
        vp.style.scrollBehavior = "auto";
        vp.scrollLeft += baseLen * cardW.current;
        vp.style.scrollBehavior = "smooth";
      } else if (bestIdx >= baseLen * 2) {
        vp.style.scrollBehavior = "auto";
        vp.scrollLeft -= baseLen * cardW.current;
        vp.style.scrollBehavior = "smooth";
      }
    };

    vp.addEventListener("pointerdown", down);
    vp.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);

    vp.addEventListener("touchstart", down, { passive: true });
    vp.addEventListener("touchmove", move, { passive: false });
    vp.addEventListener("touchend", up);

    return () => {
      vp.removeEventListener("pointerdown", down);
      vp.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      vp.removeEventListener("touchstart", down);
      vp.removeEventListener("touchmove", move);
      vp.removeEventListener("touchend", up);
    };
  }, [baseLen]);

  return (
    <div id="projects" className="caro-wrap">
      <div ref={vpRef} className="caro-viewport-snap">
        <div className="caro-track-snap">
          {extSlides.map((s, i) => (
            <figure key={i} className="caro-card-snap">
              <div className="thumb">
                <img src={s.src} alt={s.title} draggable="false" />
              </div>
              <figcaption className="cap">{s.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <a href="projects" className="proj-btn">
        Projects <span aria-hidden>→</span>
      </a>
    </div>
  );
}
