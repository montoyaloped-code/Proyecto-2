import '../App.css';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>I.E. Ignacio Yepes Yepes</h4>
          <p>Educación pública para el desarrollo de niños, niñas y jóvenes de Remedios, Antioquia.</p>
        </div>
        <div>
          <h4>Enlaces</h4>
          <div className="footer-links">
            <a href="/">Inicio</a>
            <a href="#docencia">Docencia</a>
            <a href="#sedes">Sedes</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2026 I.E. Ignacio Yepes Yepes — Remedios, Antioquia</div>
      <div className="footer-bottom">Desarrollado por Sergio Andres Montoya Lopez-Desarrollador de Software</div>
    </footer>
  );
}
