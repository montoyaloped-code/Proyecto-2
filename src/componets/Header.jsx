import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ESCUDO from '../componets/ESCUDO.png';


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <span className="escudo">
            <img src={ESCUDO} alt="Escudo I.E. Ignacio Yepes Yepes" />
          </span>
          I.E. Ignacio Yepes Yepes
        </Link>
        <nav className="nav-links">
          <a href="#nosotros">Nosotros</a>
          <Link to="/docencia">Docencia</Link>
          <Link to="/sedes">Sedes</Link>
          <a href="#contacto">Contacto</a>
        </nav>
        <button 
          className="hamburger" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu" id="mobileMenu">
          <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
          <Link to="/docencia" onClick={closeMenu}>Docencia</Link>
          <Link to="/sedes" onClick={closeMenu}>Sedes</Link>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </div>
      )}
    </header>
  );
}
