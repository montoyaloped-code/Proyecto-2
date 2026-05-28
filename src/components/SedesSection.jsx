import '../App.css';
import { Link } from 'react-router-dom';
import { SedesCard } from './Card';

export default function SedesSection() {
  return (
    <section id="sedes" className="section-padding" style={{ background: 'rgba(240, 244, 239, 0.9)' }}>
      <div className="container">
        <h2 className="section-title">Nuestras Sedes</h2>
        <p className="section-subtitle">11 sedes urbanas y rurales comprometidas con la excelencia educativa.</p>
        <div className="divider"></div>
        <div className="sedes-summary">
          <SedesCard
            icon="🏫"
            title="Sedes Urbanas"
            description="3 sedes que ofrecen preescolar, primaria, secundaria y media académica con infraestructura moderna."
          />
          <SedesCard
            icon="🌾"
            title="Sedes Rurales"
            description="8 centros rurales que fortalecen la educación en el contexto campesino y comunitario."
          />
          <SedesCard
            icon="👥"
            title="Cobertura"
            description="Más de 3.000 estudiantes atendidos en toda la institución."
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/sedes" className="btn-primary">Ver todas las sedes</Link>
        </div>
      </div>
    </section>
  );
}

