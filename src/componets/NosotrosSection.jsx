import '../App.css';
import { ValueCard } from './Card';
import cancha from "/componets/cancha.jpg";

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="section-padding">
      <div className="container">
        <h2 className="section-title">Carta de Presentación</h2>
        <div className="divider"></div>
        <div className="about-grid">
          <div className="about-text">
            <p>Población estudiantil: más de 3.000 estudiantes.</p>
            <p>Planta docente: 89 educadores, 3 coordinadores y 1 rector.</p>
            <p>Jornadas: mañana, tarde, noche (CLEI) y sabatino.</p>
            <p>Oferta académica: preescolar, primaria, secundaria, media académica y Media Técnica en Administración y Finanzas.</p>
            <p>Modelos educativos: tradicional, Escuela Nueva, post primaria, aceleración del aprendizaje y CLEI.</p>
          </div>
          <img src={cancha} alt="Campus principal" />
        </div>

        <div className="values-grid">
          <ValueCard
            icon="📚"
            title="Misión"
            description="Formar integralmente a niños, niñas y jóvenes, promoviendo conocimiento, valores y sentido de pertenencia."
          />
          <ValueCard
            icon="👁️"
            title="Visión"
            description="Ser una institución líder en la región del Nordeste Antioqueño, reconocida por calidad académica y compromiso social."
          />
          <ValueCard
            icon="❤️"
            title="Valores"
            description="Respeto, responsabilidad, solidaridad, honestidad, tolerancia y amor por el aprendizaje."
          />
        </div>
      </div>
    </section>
  );
}
