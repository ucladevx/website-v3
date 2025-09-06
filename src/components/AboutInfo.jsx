import React from "react";
import "../styles/about-info.css";

export default function AboutInfo() {
  return (
    <section className="about-info">
      <div className="info-row">
        <figure className="info-img">
          <img src="/assets/club-fair.png" alt="DevX members tabling" />
        </figure>

        <div className="info-text">
          <h2>About</h2>
          <p>
            Here at DevX, our goal is to help creative thinkers bring their product ideas to life. In addition to fostering the development of products that tackle pressing problems in the UCLA community and beyond, DevX provides a community for students with tech aspirations. Our members are sorted into teams of PMs, EMs, developers, designers, marketers, and more, and are provided access to a number of valuable networking and career-building workshops. Furthermore, DevX provides a great introduction to the product development cycle used in the industry, by giving members experience working on teams with PMs, EMs, developers, designers, marketers, and more. 
          </p>
        </div>
      </div>

      <div className="info-row info-row--reverse">
        <figure className="info-img">
          <img src="/assets/beach-pic.png" alt="DevX beach photo" />
        </figure>

        <div className="info-text">
          <h2>Our Mission</h2>
          <p>
            DevX empowers students to bring bold ideas to life by building products that solve real-world challenges. Through hands-on teamwork, mentorship, and career-building opportunities, we prepare the next generation of innovators to thrive in tech.
          </p>
        </div>
      </div>
    </section>
  );
}
