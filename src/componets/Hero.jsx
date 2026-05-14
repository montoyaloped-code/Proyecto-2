
import '../App.css';


export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <img className="hero-bg" src="/cancha.jpg" alt="Fondo de la institución" />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Bienvenidos a la I.E. Ignacio Yepes Yepes</h1>
        <p>Educando con excelencia y valores en Remedios, Antioquia.</p>
        <div className="hero-buttons">
          <a href="#nosotros" className="btn-primary">Conócenos</a>
          <a
            href="http://162.216.241.106/server20/wc.dll?seguridad~login"
            className="btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            Plataforma
          </a>
        </div>
      <div className="scroll-indicator"><span></span></div>
      </div>
    </section>
  );
}
