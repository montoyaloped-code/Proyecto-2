import '../App.css';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Recibimos las propiedades desde App.jsx desestructurándolas en los parámetros
export default function Header({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Función para alternar el estado del modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Cerrar dropdowns si se hace clic fuera
  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdown(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header className="navbar">
      {/* Capa de oscurecimiento cuando hay un dropdown activo */}
      <div 
        className={`nav-overlay ${activeDropdown ? 'is-active' : ''}`} 
        onClick={() => setActiveDropdown(null)}
      ></div>

      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="escudo">
            <img className='logo' src="ESCUDO.png" alt="Escudo I.E. Ignacio Yepes Yepes" />
          </span>
          I.E. Ignacio Yepes Yepes
        </Link>
        
        <nav className="nav-links" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          
          <div className={`nav-dropdown ${activeDropdown === 'institucion' ? 'is-open' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown(e, 'institucion')}>
              Institución <span className="dropdown-arrow">▾</span>
            </span>
            <div className="dropdown-menu">
              <NavLink to="/HistoriaSimbolos" className="dropdown-item" onClick={closeMenu}>Historia y Símbolos</NavLink>
              <NavLink to="/sedes" className="dropdown-item" onClick={closeMenu}>Nuestras Sedes</NavLink>
              <NavLink to="/galeria-completa" className="dropdown-item" onClick={closeMenu}>Galería Institucional</NavLink>
              <a href="/#nosotros" className="dropdown-item" onClick={closeMenu}>Carta de Presentación</a>
            </div>
          </div>

          <div className={`nav-dropdown ${activeDropdown === 'academico' ? 'is-open' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown(e, 'academico')}>
              Académico <span className="dropdown-arrow">▾</span>
            </span>
            <div className="dropdown-menu">
              <NavLink to="/portal-academico" className="dropdown-item" onClick={closeMenu}>Portal Académico</NavLink>
              <NavLink to="/docencia" className="dropdown-item" onClick={closeMenu}>Equipo Docente</NavLink>
              <NavLink to="/cuadro-de-honor" className="dropdown-item" onClick={closeMenu}>Cuadro de Honor</NavLink>
              <NavLink to="/horas-constitucionales" className="dropdown-item" onClick={closeMenu}>Horas Legales</NavLink>
            </div>
          </div>

          <div className={`nav-dropdown ${activeDropdown === 'comunidad' ? 'is-open' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown(e, 'comunidad')}>
              Comunidad <span className="dropdown-arrow">▾</span>
            </span>
            <div className="dropdown-menu">
              <NavLink to="/bienestar" className="dropdown-item" onClick={closeMenu}>Bienestar Estudiantil</NavLink>
              <NavLink to="/atencion-ciudadana" className="dropdown-item" onClick={closeMenu}>Atención Ciudadana</NavLink>
              <a 
                href="https://remedios-antioquia.gov.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dropdown-item" onClick={closeMenu}
              >
                Alcaldía de Remedios ↗
              </a>
            </div>
          </div>

          <NavLink to="/admin" className="admin-link">Admin</NavLink>

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
          <NavLink to="/HistoriaSimbolos" onClick={closeMenu}>Institución (Historia y Símbolos)</NavLink>
          <NavLink to="/sedes" onClick={closeMenu}>Sedes Educativas</NavLink>
          <NavLink to="/galeria-completa" onClick={closeMenu}>Galería Institucional</NavLink>
          <Link to="/docencia" onClick={closeMenu}>Docencia</Link>
          <Link to="/bienestar" onClick={closeMenu}>Bienestar Estudiantil</Link>
          <Link to="/portal-academico" onClick={closeMenu}>Portal Académico</Link>
          <Link to="/atencion-ciudadana" onClick={closeMenu}>Atención Ciudadana</Link>
          <Link to="/cuadro-de-honor" onClick={closeMenu}>Cuadro de Honor</Link>
          <Link to="/horas-constitucionales" onClick={closeMenu}>Horas Constitucionales</Link>
          <Link to="/admin" onClick={closeMenu} className="admin-link-mobile">Acceso Administrativo</Link>

          {/* BOTÓN MODO OSCURO (MÓVIL) */}
          <button 
            onClick={() => { toggleDarkMode(); closeMenu(); }} 
            className="dark-mode-toggle-mobile"
            type="button"
          >
            {darkMode ? '☀️ Cambiar a Modo Claro' : '🌙 Cambiar a Modo Oscuro'}
          </button>
        </div>
    </header>
  );
}