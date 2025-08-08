import React from "react";
import { ThumbsUp, Calendar, Award } from "lucide-react";
import "../styles/numbers-section.css";

export default function NumbersSection() {
  return (
    <section className="numbers-sec">
      <h2 className="numbers-sec__title">DevX&nbsp;In&nbsp;Numbers</h2>

      <div className="numbers-grid">
        <div className="num-card">
          <div className="num-card__icon">
            <ThumbsUp size={154} strokeWidth={3.5} color="#1185ff" />
          </div>
          <div className="column">
            <div className="num-card__value">82</div>
            <div className="num-card__label">Members</div>
          </div>
          
        </div>

        <div className="num-card">
          <div className="num-card__icon">
            <Calendar size={154} strokeWidth={3.5} color="#1185ff" />
          </div>
          <div className="column">
            <div className="num-card__value">7</div>
            <div className="num-card__label">
              Active<br />Projects
            </div>
          </div>
          
        </div>

        <div className="num-card">
          <div className="num-card__icon">
            <Award size={154} strokeWidth={3.5} color="#1185ff" />
          </div>
          <div className="column">
            <div className="num-card__value">3</div>
            <div className="num-card__label">Workshops</div>
          </div>
        </div>
      </div>
    </section>
  );
}
