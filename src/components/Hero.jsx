import "../App.css";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <img
        className="hero-bg"
        src="/cancha.webp"
        alt="Fondo de la institución"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Bienvenidos a la I.E. Ignacio Yepes Yepes</h1>
        <p className="font-bold!">Educando con excelencia y valores en Remedios, Antioquia.</p>
        <div className="hero-buttons">
          
          <div className="scroll-indicator">
            <span></span>
          </div>
          <a
            href="#nosotros"
            className="btn-outline"
            
        
          >
            Conocenos
          </a>
        </div>
      </div>
    </section>
  );
}
