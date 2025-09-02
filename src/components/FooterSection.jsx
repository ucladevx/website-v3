import "../styles/footer-section.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function FooterSection() {
  return (
    <div className="social-bar-container">
      <div className="social-bar-icons">
        <a href="https://www.instagram.com/ucladevx" target="_blank" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.linkedin.com/company/ucla-devx" target="_blank" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://www.facebook.com/ucladevx/" target="_blank" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://substack.com/@ucladevx" target="_blank" aria-label="Substack">
          <img src="assets/substack.png" alt="Substack" />
        </a>
        <a href="https://linktr.ee/ucladevx" target="_blank" aria-label="Linktree">
          <img src="assets/linktree.png" alt="Linktree" />
        </a>
      </div>
    </div>
  );
}
