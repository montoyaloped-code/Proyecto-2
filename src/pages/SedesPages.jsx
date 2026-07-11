import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';
import '../sedes-style.css';

export default function Sedes() {
  useEffect(() => { document.title = 'Nuestras Sedes | I.E. Ignacio Yepes Yepes'; }, []);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSede, setSelectedSede] = useState(null);
  const [sedesData, setSedesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const { data, error } = await supabase.from('sedes').select('*');
        if (error) throw error;
        setSedesData(data || []);
      } catch (err) {
        console.error('Error fetching sedes:', err);
        setError('No se pudieron cargar las sedes.');
      } finally {
        setLoading(false);
      }
    };
    fetchSedes();
  }, []);

  const filteredSedes = activeFilter === 'all'
    ? sedesData
    : sedesData.filter(s => s.tipo === activeFilter);

  const currentSede = selectedSede ? sedesData.find(s => s.slug === selectedSede) : null;

  if (currentSede) {
    return (
      <div> 
        <main>
          <section className="hero">
            <img src={currentSede.img} alt={currentSede.name} loading="lazy" />
            <div className="container">
              <button className="back-link" onClick={() => setSelectedSede(null)}>
                ← Volver a sedes
              </button>
              <div className="sede-header-meta">
                <span className={`badge ${currentSede.tipo.toLowerCase()}`}>
                  Sede {currentSede.tipo}
                </span>
              </div>
              <h1>{currentSede.name}</h1>
            </div>
          </section>

          <section className="section">
            <div className="container detail-grid">
              <div>
                <h2>Sobre la sede</h2>
                <div>
                  {currentSede.description.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                <h2 style={{ marginTop: '32px' }}>Infraestructura</h2>
                <div className="infra">
                  <div className="infra-item">
                    <div className="lbl">🏫 Salones</div>
                    <div className="val ok">✓ {currentSede.infra.salones} aulas</div>
                  </div>
                  <div className="infra-item">
                    <div className="lbl">🏆 Cancha deportiva</div>
                    <div className={`val ${currentSede.infra.cancha ? 'ok' : ''}`}>
                      {currentSede.infra.cancha ? '✓ Disponible' : '✕ No disponible'}
                    </div>
                  </div>
                  <div className="infra-item">
                    <div className="lbl">💻 Sala de informática</div>
                    <div className={`val ${currentSede.infra.informatica ? 'ok' : ''}`}>
                      {currentSede.infra.informatica ? '✓ Disponible' : '✕ No disponible'}
                    </div>
                  </div>
                </div>

                {currentSede.infra.extras && currentSede.infra.extras.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.05rem', marginTop: '24px', marginBottom: '10px', color: 'var(--primary)' }}>
                      Espacios adicionales
                    </h3>
                    <div className="extras">
                      {currentSede.infra.extras.map((e, i) => <span key={i}>{e}</span>)}
                    </div>
                  </div>
                )}
              </div>

              <aside className="side">
                <div className="row">
                  <div className="k">Tipo</div>
                  <div className="v">{currentSede.tipo}</div>
                </div>
                <div className="row">
                  <div className="k">📍 Ubicación</div>
                  <div className="v">{currentSede.location}</div>
                </div>
                <div className="row">
                  <div className="k">👥 Estudiantes</div>
                  <div className="v">~{currentSede.students}</div>
                </div>
              </aside>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <main id="view-list">
        <section className="section" id="sedes">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Nuestras sedes</span>
              <h2>11 sedes al servicio de Colombia</h2>
              <div className='divider'></div>
              <p>
                Una red educativa urbana y rural comprometida con la formación
                integral de niños, niñas y jóvenes del municipio.
              </p>
            </div>

            {error && <p style={{ color: 'var(--destructive)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

            <div className="filters" role="tablist">
              <button
                className={`chip ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Todas
              </button>
              <button
                className={`chip ${activeFilter === 'Urbana' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Urbana')}
              >
                Urbanas
              </button>
              <button
                className={`chip ${activeFilter === 'Rural' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Rural')}
              >
                Rurales
              </button>
            </div>

            <div className="grid">
              {filteredSedes.map(sede => (
                <article key={sede.slug} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelectedSede(sede.slug)}>
                  <div className="thumb">
                    <span className={`badge ${sede.tipo.toLowerCase()}`}>{sede.tipo}</span>
                    <img src={sede.img} alt={sede.name} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{sede.name}</h3>
                    <div className="meta">
                      <div>📍 {sede.location}</div>
                      <div>👥 ~{sede.students} estudiantes</div>
                    </div>
                    <button
                      className="btn"
                    >
                      Ver sede →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
