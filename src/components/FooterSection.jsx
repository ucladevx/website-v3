import "../styles/footer-section.css";

export default function FooterSection() {
  return (
    <div className="social-bar-container">
      <div className="social-bar-icons">
        <a href="https://www.facebook.com/ucladevx" aria-label="Facebook" target="_blank" rel="noreferrer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H7.9v-2.9h2.4V9.85c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22v7.03c4.78-.79 8.44-4.93 8.44-9.93z"/>
          </svg>
        </a>

        {/* add linkedin, substack */}

        <a href="https://www.instagram.com/ucladevx" aria-label="Instagram" target="_blank" rel="noreferrer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 5.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
