import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Recibimos las propiedades desde App.jsx desestructurándolas en los parámetros
export default function Header({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // Función para alternar el estado del modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="escudo">
            <img className='logo' src="ESCUDO.png" alt="Escudo I.E. Ignacio Yepes Yepes" />
          </span>
          I.E. Ignacio Yepes Yepes
        </Link>
        
        <nav className="nav-links" aria-label="Navegación principal">
          <Link to="/">Inicio</Link>
          <a href="/#nosotros">Nosotros</a>
          <Link to="/docencia">Docencia</Link>
          <Link to="/sedes">Sedes</Link>
          <Link to="/bienestar">Bienestar</Link>
          <Link to="/portal-academico">Portal Académico</Link>
          <Link to="/atencion-ciudadana">Atención Ciudadana</Link>
          <Link to="/HistoriaSimbolos">Historia</Link>
          <Link to="/horas-constitucionales">Constitución</Link>
          <Link to="/cuadro-de-honor">Honor</Link>
          <Link to="/admin" className="admin-link">Admin</Link>

          {/* BOTÓN MODO OSCURO (ESCRITORIO) */}
          <button 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle"
            type="button"
            aria-label="Cambiar modo de color"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
        
        <button 
          className="hamburger" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-controls="mobile-menu-container"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      <div 
        id="mobile-menu-container"
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
      >
          <Link to="/" onClick={closeMenu}>Inicio</Link>
          <a href="/#nosotros" onClick={closeMenu}>Nosotros</a>
          <Link to="/docencia" onClick={closeMenu}>Docencia</Link>
          <Link to="/sedes" onClick={closeMenu}>Sedes</Link>
          <Link to="/bienestar" onClick={closeMenu}>Bienestar Psicológico</Link>
          <Link to="/portal-academico" onClick={closeMenu}>Portal Académico</Link>
          <Link to="/atencion-ciudadana" onClick={closeMenu}>Atención Ciudadana</Link>
          <Link to="/cuadro-de-honor" onClick={closeMenu}>Cuadro de Honor</Link> {/* Nuevo enlace */}
          <Link to="/horas-constitucionales" onClick={closeMenu}>Horas Constitucionales</Link>
          <Link to="/admin" onClick={closeMenu} className="admin-link">Admin Panel</Link>

          {/* BOTÓN MODO OSCURO (MÓVIL) */}
          <button 
            onClick={() => { toggleDarkMode(); closeMenu(); }} 
            className="dark-mode-toggle-mobile"
            type="button"
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>
    </header>
  );
}