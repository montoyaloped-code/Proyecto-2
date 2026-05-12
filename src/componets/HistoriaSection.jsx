import '../App.css';

export default function HistoriaSection() {
  const timelineEvents = [
    {
      year: '1960',
      title: 'Fundación',
      description: 'Se funda la escuela primaria en el municipio de Remedios, Antioquia, como respuesta a la necesidad educativa de la comunidad.'
    },
    {
      year: '1975',
      title: 'Crecimiento',
      description: 'Se amplía la cobertura con la apertura de la básica secundaria y más espacios de formación.'
    },
    {
      year: '1990',
      title: 'Institución Educativa',
      description: 'Se consolida como Institución Educativa integrada en varias sedes rurales y urbanas.'
    },
    {
      year: '2024',
      title: 'Hacia el Futuro',
      description: 'La institución continúa transformando vidas con formación de calidad y cobertura social.'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'rgba(240, 244, 239, 0.9)' }}>
      <div className="container">
        <h2 className="section-title">Nuestra Historia</h2>
        <p className="section-subtitle">Más de seis décadas formando a la juventud de Remedios.</p>
        <div className="divider"></div>
        <div className="timeline">
          {timelineEvents.map((event, index) => (
            <article key={index} className="timeline-item">
              <span className="timeline-dot"></span>
              <span className="timeline-year">{event.year}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
