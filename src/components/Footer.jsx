
import '../App.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        
        <div>
          <h4>I.E. Ignacio Yepes Yepes</h4>
          <p>Educación pública para el desarrollo de niños, niñas y jóvenes de Remedios, Antioquia.</p>
        </div>

        <div>
          <h4>Enlaces del Sitio</h4>
          <div className="footer-links">
            <Link to="/">Inicio</Link>
            <Link to="/docencia">Docencia</Link>
            <Link to="/sedes">Sedes</Link>
            <Link to="/bienestar">Bienestar Emocional</Link>
            <Link to="/portal-academico">Portal Académico</Link>
            <Link to="/atencion-ciudadana">Atención y Transparencia</Link>
            <Link to="/horas-constitucionales">Horas Constitucionales</Link>
          </div>
        </div>

        {/* Nueva columna: Alcaldía */}
        <div>
          <h4>Alcaldía de Remedios</h4>
          <p style={{ marginBottom: '1rem' }}>
            En alianza con la Alcaldía Municipal de Remedios para el fortalecimiento educativo.
          </p>
          <a 
            href="https://remedios-antioquia.gov.co" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            🌐 Visitar Sitio Oficial de la Alcaldía →
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 I.E. Ignacio Yepes Yepes — Remedios, Antioquia
        
        <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', opacity: 0.9 }}>
          Desarrollado por <strong>Sergio Andres Montoya Lopez</strong> — Desarrollador de Software
        </div>

        
         <div className="social-floating-container">
          
          {/* BOTÓN DE FACEBOOK (Cambia el '#' por el link real de la página del colegio) */}
          <a 
            href="https://www.facebook.com/p/IE-Ignacio-Yepes-Yepes-100029264331780/?locale=es_LA" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-floating-btn facebook"
            aria-label="Seguir en Facebook"
          >
            {/* SVG del logo oficial de Facebook */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8H7v3h2v9h3v-9h2.725l.415-3H12V6.625c0-.854.184-1.395 1.4-1.395H15V2h-2.814C9.776 2 9 3.538 9 5.762V8z"/>
            </svg>
          </a>

          {/* Siguiente red social (Por si en el futuro quieres meter más, solo descomentas abajo) */}
          {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-floating-btn instagram">
            ... SVG de Instagram ...
          </a> 
          */}

        </div>
      </div>
    </footer>
  );
}