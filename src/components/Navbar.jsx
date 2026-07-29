import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header" id="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-text">
            GDS JAKARTA
            <span>Gekari Damai Sejahtera</span>
          </div>
        </Link>

        <button
          className="hamburger"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

        <nav>
          <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to="/schedule" onClick={() => setMenuOpen(false)}>
                Pelayanan
              </Link>
            </li>
            <li>
              <Link to="/news" onClick={() => setMenuOpen(false)}>
                Kabar Terbaru
              </Link>
            </li>
            <li>
              <Link to="/sermon" onClick={() => setMenuOpen(false)}>
                Renungan
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Kontak
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-socials">
          <a
            href="https://www.instagram.com/gdsjakarta/"
            target="_blank"
            rel="noopener"
            aria-label="Instagram GDS"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/gdsjakarta"
            target="_blank"
            rel="noopener"
            aria-label="Facebook GDS"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
