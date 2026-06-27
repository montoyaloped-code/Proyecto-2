import '../App.css';
import { ValueCard } from './Card';
import { SedesCard } from './Card';


export default function NosotrosSection() {
  return (
    <section id="nosotros" className="section-padding">
      <div className="container">
        <h2 className="section-title">Carta de Presentación</h2>
        <div className="divider"></div>
        <div className="about-grid">
          <img src="/cancha.webp" alt="Cancha" />
          <div className="about-text">
            <p>Población estudiantil: más de 3.000 estudiantes.</p>
            <p>Planta docente: 89 educadores, 3 coordinadores y 1 rector.</p>
            <p>Jornadas: mañana, tarde, noche (CLEI) y sabatino.</p>
            <p>Oferta académica: preescolar, primaria, secundaria, media académica y Media Técnica en Administración y Finanzas.</p>
            <p>Modelos educativos: tradicional, Escuela Nueva, post primaria, aceleración del aprendizaje y CLEI.</p>
          </div>
          
        </div>

        <div className="values-grid sedes-summary" style={{ marginTop: '3rem' }}>
          <SedesCard
            icon="📚"
            title="Misión"
            description="Formar integralmente a niños, niñas y jóvenes, promoviendo conocimiento, valores y sentido de pertenencia."
          />
          <SedesCard
            icon="👁️"
            title="Visión"
            description="Ser una institución líder en la región del Nordeste Antioqueño, reconocida por calidad académica y compromiso social."
          />
          <SedesCard
            icon="❤️"
            title="Valores"
            description="Respeto, responsabilidad, solidaridad, honestidad, tolerancia y amor por el aprendizaje."
          />
        </div>
      </div>
    </section>
  );
}
