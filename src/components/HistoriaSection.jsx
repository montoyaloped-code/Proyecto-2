import '../App.css';
import { Link } from 'react-router-dom';

export default function HistoriaSection() {
  const timelineEvents = [
    {
      year: '1939',
      title: 'Fundación y Primeros Pasos',
      description: 'El Pbro. Ignacio María Yepes Yepes funda el colegio "San Nicolás de Tolentino" en la casa cural.'
    },
    {
      year: '1948',
      title: 'Escuela de Varones',
      description: 'Inicia labores la Escuela Urbana de Varones, que más tarde se convertiría en educación mixta.'
    },
    {
      year: '1959',
      title: 'Legalización',
      description: 'Se oficializa la Escuela de Niñas y se asume la dirección por las Hermanas Teresitas.'
    },
    {
      year: '1963',
      title: 'La Gran Disputa',
      description: 'Una división política y religiosa separa el colegio entre el Palacio Municipal y la Casa Cural.'
    },
    {
      year: '1966',
      title: 'Alto de las Tapias',
      description: 'Unificación definitiva y traslado a su sede actual bajo el nombre de Liceo Ignacio Yepes Yepes.'
    },
    {
      year: '1976',
      title: 'Primeros Bachilleres',
      description: 'El 20 de noviembre la institución otorga sus primeros títulos oficiales de bachiller.'
    },
    {
      year: '2003',
      title: 'Fusión Definitiva',
      description: 'Se unifican las escuelas urbanas con el Liceo, consolidando la estructura actual de la Institución Educativa.'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--background)' }}>
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
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/HistoriaSimbolos" className="btn-primary">Ver mas detalles</Link>
        </div>
        </div>
      </div>
    </section>
  );
}
