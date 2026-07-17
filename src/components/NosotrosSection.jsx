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
            <p>La Institución Educativa Ignacio Yepes Yepes, ubicada en el municipio de Remedios, Nordeste Antioqueño, nació en 1939 por iniciativa del Presbítero Ignacio María Yepes Yepes con el propósito de llevar educación a una región marcada por la minería y el abandono estatal.</p>
            <p>Desde entonces, nuestra institución ha sido faro de conocimiento y esperanza, formando generaciones de niños, niñas y jóvenes con un enfoque integral que combina la excelencia académica con la formación en valores. Creemos firmemente en una educación que transforma vidas, que abre puertas y que construye un mejor futuro para nuestra comunidad.</p>
            <p>En la I.E. Ignacio Yepes Yepes trabajamos cada día por ofrecer una formación de calidad que responda a las necesidades de nuestra región, formando ciudadanos competentes, críticos y comprometidos con el desarrollo social, cultural y económico de Remedios y del Nordeste Antioqueño.</p>
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
