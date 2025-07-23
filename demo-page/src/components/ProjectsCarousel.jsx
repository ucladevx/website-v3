import { useRef, useState, useLayoutEffect } from "react";
import "../styles/about.css";

const slides = [
  { src: "/assets/project-left.png",   title: "Project Name" },
  { src: "/assets/project-center.png", title: "Project Name" },
  { src: "/assets/project-right.png",  title: "Project Name" },
];

export default function ProjectsCarousel() {
  const [idx, setIdx] = useState(1);           // start on middle
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const vpRef = useRef(null);
  const trackRef = useRef(null);
  const centerRef = useRef(null);
  const startX = useRef(0);
  const baseX = useRef(0);                     // translate needed to center current card

  // recalc translate to perfectly center the "center" card
  const recalcBase = () => {
    if (!vpRef.current || !centerRef.current || !trackRef.current) return;
    const vp = vpRef.current.getBoundingClientRect();
    const card = centerRef.current.getBoundingClientRect();
    const offset = card.left + card.width / 2 - (vp.left + vp.width / 2);
    baseX.current = -offset;
  };

  useLayoutEffect(() => {
    recalcBase();
    // re-center on resize
    const onResize = () => recalcBase();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [idx]);

  const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const down = (e) => { startX.current = getX(e); setDragging(true); };
  const move = (e) => { if (dragging) setDragX(getX(e) - startX.current); };
  const up   = () => {
    if (!dragging) return;
    const delta = dragX;
    setDragging(false);
    setDragX(0);
    const THRESH = 70;
    if (delta > THRESH)  setIdx((i) => (i - 1 + slides.length) % slides.length);
    else if (delta < -THRESH) setIdx((i) => (i + 1) % slides.length);
  };

  // order: left, center, right (always render 3)
  const left  = (idx - 1 + slides.length) % slides.length;
  const right = (idx + 1) % slides.length;

  return (
    <div
      id="projects"
      className="caro-wrap"
      onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}
      onTouchStart={down} onTouchMove={move} onTouchEnd={up}
    >
      <div ref={vpRef} className="caro-viewport">
        <div
          ref={trackRef}
          className={`caro-track${dragging ? " dragging" : ""}`}
          style={{ transform: `translateX(${baseX.current + dragX}px)` }}
        >
          <Card data={slides[left]}  type="side" />
          <Card data={slides[idx]}   type="center" refEl={centerRef} />
          <Card data={slides[right]} type="side" />
        </div>
      </div>

      <a href="#projects-list" className="proj-btn">Projects <span aria-hidden>→</span></a>
    </div>
  );
}

/* --- Card --- */
function Card({ data, type, refEl }) {
  const isCenter = type === "center";
  return (
    <figure ref={refEl} className={`caro-card ${isCenter ? "center" : "side"}`}>
      <div className="thumb">
        <img src={data.src} alt={isCenter ? data.title : ""} />
      </div>
      <figcaption className={`cap ${isCenter ? "" : "side-cap"}`}>{data.title}</figcaption>
    </figure>
  );
}
