import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header style={{ padding: "20px", background: "green", color: "white" }}>
      <a href="#hero" className="logo">
        GDS | GEKARI DAMAI SEJAHTERA JAKARTA
      </a>
      <nav>
        <Link to="/" className="nav-link">
          Beranda
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/schedule" className="nav-link">
          Schedule
        </Link>
        <Link to="/sermon" className="nav-link">
          Sermon
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
