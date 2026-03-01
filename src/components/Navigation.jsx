import { useState, useEffect } from "react";
import "./Navigation.css";

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container mono">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, "hero")}
        >
          SYS<span>_</span>INIT()
        </a>

        <button
          className={`nav-mobile-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a
            href="#about"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "about")}
          >
            01_ABOUT
          </a>
          <a
            href="#projects"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "projects")}
          >
            02_ARCHITECTURE
          </a>
          <a
            href="#skills"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "skills")}
          >
            03_CORE_STACK
          </a>
          <a
            href="#learning"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "learning")}
          >
            04_RESEARCH
          </a>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            CONNECT_NOW
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
