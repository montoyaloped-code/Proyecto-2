import '../App.css';
import { OfertaCard } from './Card';

export default function OfertaSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">Oferta Académica</h2>
        <p className="section-subtitle">Educación integral desde la primera infancia hasta la media académica.</p>
        <div className="divider"></div>
        <div className="oferta-grid">
          <OfertaCard
            icon="🏫"
            title="Preescolar y Primaria"
            description="Formación inicial en sedes urbanas y rurales con modelos Escuela Nueva y tradicional."
          />
          <OfertaCard
            icon="📚"
            title="Básica Secundaria"
            description="Grados 6° a 9° en sede principal y post primaria para las sedes rurales."
          />
          <OfertaCard
            icon="🎓"
            title="Media Académica"
            description="Grados 10° y 11°, con Media Técnica en Administración y Finanzas autorizada desde 2024."
          />
          <OfertaCard
            icon="🌙"
            title="Educación para Adultos"
            description="Jornada nocturna y sabatino (CLEI) para jóvenes y adultos mayores de 14 años."
          />
        </div>
      </div>
    </section>
  );
}
