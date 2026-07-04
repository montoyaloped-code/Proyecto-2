import '../App.css';
import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);
  const location = useLocation();

  const sectionRoutes = {
    institucion: ['/HistoriaSimbolos', '/sedes', '/galeria-completa'],
    academico: ['/portal-academico', '/docencia', '/cuadro-de-honor', '/horas-constitucionales'],
    comunidad: ['/bienestar', '/atencion-ciudadana'],
  };

  const isSectionActive = (section) =>
    sectionRoutes[section]?.some((route) => location.pathname === route);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
    if (mobileMenuOpen) setMobileSection(null);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileSection(null);
  };

  const toggleDropdown = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const toggleMobileSection = (name) => {
    setMobileSection(prev => prev === name ? null : name);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdown(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header className="navbar">
      <div
        className={`nav-overlay ${activeDropdown ? 'is-active' : ''}`}
        onClick={() => setActiveDropdown(null)}
      />

      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="escudo">
            <img className="logo" src="/ESCUDO.webp" alt="Escudo I.E. Ignacio Yepes Yepes" />
          </span>
          <span className="brand-text">I.E. Ignacio Yepes Yepes</span>
        </Link>

        <nav className="nav-links" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>

          <div className={`nav-dropdown ${activeDropdown === 'institucion' ? 'is-open' : ''} ${isSectionActive('institucion') ? 'active-section' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown(e, 'institucion')}>
              Institución <ChevronDown size={14} className="dropdown-arrow" />
            </span>
            <div className="dropdown-menu">
              <NavLink to="/HistoriaSimbolos" className="dropdown-item" onClick={closeMenu}>Historia y Símbolos</NavLink>
              <NavLink to="/sedes" className="dropdown-item" onClick={closeMenu}>Nuestras Sedes</NavLink>
              <NavLink to="/galeria-completa" className="dropdown-item" onClick={closeMenu}>Galería Institucional</NavLink>
              <a href="/#nosotros" className="dropdown-item" onClick={closeMenu}>Carta de Presentación</a>
            </div>
          </div>

          <div className={`nav-dropdown ${activeDropdown === 'academico' ? 'is-open' : ''} ${isSectionActive('academico') ? 'active-section' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown(e, 'academico')}>
              Académico <ChevronDown size={14} className="dropdown-arrow" />
            </span>
            <div className="dropdown-menu">
              <NavLink to="/portal-academico" className="dropdown-item" onClick={closeMenu}>Portal Académico</NavLink>
              <NavLink to="/docencia" className="dropdown-item" onClick={closeMenu}>Equipo Docente</NavLink>
              <NavLink to="/cuadro-de-honor" className="dropdown-item" onClick={closeMenu}>Cuadro de Honor</NavLink>
              <NavLink to="/horas-constitucionales" className="dropdown-item" onClick={closeMenu}>Horas Legales</NavLink>
            </div>
          </div>

          <div className={`nav-dropdown ${activeDropdown === 'comunidad' ? 'is-open' : ''} ${isSectionActive('comunidad') ? 'active-section' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown(e, 'comunidad')}>
              Comunidad <ChevronDown size={14} className="dropdown-arrow" />
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

          <Link to="/admin" className="admin-link" onClick={closeMenu}>
            Panel Admin
          </Link>

          <button
            onClick={toggleDarkMode}
            className="dark-mode-toggle"
            type="button"
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            onClick={toggleDarkMode}
            className="dark-mode-toggle-mobile-btn"
            type="button"
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="hamburger"
            type="button"
            onClick={toggleMenu}
            aria-label="Abrir menú"
            aria-controls="mobile-menu-container"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu-container"
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
      >
        <div className="mobile-menu-header">
          <button onClick={toggleDarkMode} className="mobile-dark-toggle" type="button">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>

        <div className="mobile-menu-body">
          <Link to="/" onClick={closeMenu} className="mobile-link">Inicio</Link>

          <div className={`mobile-section ${mobileSection === 'institucion' ? 'is-open' : ''}`}>
            <button className="mobile-section-trigger" onClick={() => toggleMobileSection('institucion')} type="button">
              Institución <ChevronDown size={16} className="mobile-section-arrow" />
            </button>
            <div className="mobile-section-content">
              <NavLink to="/HistoriaSimbolos" onClick={closeMenu}>Historia y Símbolos</NavLink>
              <NavLink to="/sedes" onClick={closeMenu}>Nuestras Sedes</NavLink>
              <NavLink to="/galeria-completa" onClick={closeMenu}>Galería</NavLink>
              <a href="/#nosotros" onClick={closeMenu}>Carta de Presentación</a>
            </div>
          </div>

          <div className={`mobile-section ${mobileSection === 'academico' ? 'is-open' : ''}`}>
            <button className="mobile-section-trigger" onClick={() => toggleMobileSection('academico')} type="button">
              Académico <ChevronDown size={16} className="mobile-section-arrow" />
            </button>
            <div className="mobile-section-content">
              <NavLink to="/portal-academico" onClick={closeMenu}>Portal Académico</NavLink>
              <NavLink to="/docencia" onClick={closeMenu}>Equipo Docente</NavLink>
              <NavLink to="/cuadro-de-honor" onClick={closeMenu}>Cuadro de Honor</NavLink>
              <NavLink to="/horas-constitucionales" onClick={closeMenu}>Horas Legales</NavLink>
            </div>
          </div>

          <div className={`mobile-section ${mobileSection === 'comunidad' ? 'is-open' : ''}`}>
            <button className="mobile-section-trigger" onClick={() => toggleMobileSection('comunidad')} type="button">
              Comunidad <ChevronDown size={16} className="mobile-section-arrow" />
            </button>
            <div className="mobile-section-content">
              <NavLink to="/bienestar" onClick={closeMenu}>Bienestar Estudiantil</NavLink>
              <NavLink to="/atencion-ciudadana" onClick={closeMenu}>Atención Ciudadana</NavLink>
              <a href="https://remedios-antioquia.gov.co" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Alcaldía de Remedios ↗</a>
            </div>
          </div>

          <Link to="/admin" onClick={closeMenu} className="mobile-admin-link">Panel de Administración</Link>
        </div>
      </div>
    </header>
  );
}
