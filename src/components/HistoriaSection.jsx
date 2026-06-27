import { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const HITOS_FALLBACK = [
  {
    año: '1939',
    titulo: 'Fundación y Primeros Pasos',
    desc: 'El Pbro. Ignacio María Yepes Yepes funda el colegio "San Nicolás de Tolentino" en la casa cural.'
  },
  {
    año: '1948',
    titulo: 'Escuela de Varones',
    desc: 'Inicia labores la Escuela Urbana de Varones, que más tarde se convertiría en educación mixta.'
  },
  {
    año: '1959',
    titulo: 'Legalización',
    desc: 'Se oficializa la Escuela de Niñas y se asume la dirección por las Hermanas Teresitas.'
  },
  {
    año: '1963',
    titulo: 'La Gran Disputa',
    desc: 'Una división política y religiosa separa el colegio entre el Palacio Municipal y la Casa Cural.'
  },
  {
    año: '1966',
    titulo: 'Alto de las Tapias',
    desc: 'Unificación definitiva y traslado a su sede actual bajo el nombre de Liceo Ignacio Yepes Yepes.'
  },
  {
    año: '1976',
    titulo: 'Primeros Bachilleres',
    desc: 'El 20 de noviembre la institución otorga sus primeros títulos oficiales de bachiller.'
  },
  {
    año: '2003',
    titulo: 'Fusión Definitiva',
    desc: 'Se unifican las escuelas urbanas con el Liceo, consolidando la estructura actual de la Institución Educativa.'
  }
];

export default function HistoriaSection() {
  const [timelineEvents, setTimelineEvents] = useState(HITOS_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase.from('historia').select('*').order('año');
        if (error) throw error;
        if (data && data.length > 0) {
          const merged = new Map();
          HITOS_FALLBACK.forEach(h => merged.set(`${h.año}-${h.titulo}`, h));
          data.forEach(h => merged.set(`${h.año}-${h.titulo}`, h));
          setTimelineEvents(Array.from(merged.values()));
        }
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('No se pudieron cargar los datos históricos.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <section className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <h2 className="section-title">Nuestra Historia</h2>
        <p className="section-subtitle">Más de seis décadas formando a la juventud de Remedios.</p>
        <div className="divider"></div>
        {error && <p style={{ color: 'var(--destructive)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        <div className="timeline">
          {timelineEvents.map((event) => (
            <article key={event.id || `${event.año}-${event.titulo}`} className="timeline-item">
              <span className="timeline-dot"></span>
              <span className="timeline-year">{event.año}</span>
              <h3>{event.titulo}</h3>
              <p>{event.desc}</p>
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
