import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';
import '../sedes-style.css';

const INITIAL_SEDES = [
  {
    slug: "liceo-principal",
    name: "Liceo Ignacio Yepes Yepes",
    tipo: "Urbana",
    location: "Zona urbana, Remedios, Antioquia",
    students: 1000,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
    description: [
      "Sede principal de la institución y eje articulador de todo el proyecto educativo. Atiende los niveles de básica secundaria y media, formando jóvenes con sólidos valores académicos, humanos y ciudadanos.",
      "Cuenta con la infraestructura más amplia del municipio, espacios deportivos, laboratorios y una comunidad educativa comprometida con la excelencia."
    ],
    infra: { salones: 28, cancha: true, informatica: true, extras: ["Biblioteca", "Laboratorio de ciencias", "Auditorio"] }
  },
  {
    slug: "eu-remedios",
    name: "E.U. Remedios",
    tipo: "Urbana",
    location: "Casco urbano, Remedios, Antioquia",
    students: 300,
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
    description: [
      "Escuela urbana dedicada a la formación de niños y niñas en preescolar y básica primaria, ubicada estratégicamente en el centro del municipio.",
      "Su enfoque pedagógico promueve la lectura, el juego y el desarrollo de competencias básicas en un ambiente cálido y seguro."
    ],
    infra: { salones: 12, cancha: true, informatica: true, extras: ["Restaurante escolar"] }
  },
  {
    slug: "eu-santa-teresita",
    name: "E.U. Santa Teresita",
    tipo: "Urbana",
    location: "Barrio Santa Teresita, Remedios",
    students: 250,
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80",
    description: [
      "Sede urbana que acompaña la primera infancia y la básica primaria en el barrio Santa Teresita, con una propuesta cercana a las familias.",
      "Trabaja por una educación inclusiva, fortaleciendo los valores, la convivencia y las competencias comunicativas."
    ],
    infra: { salones: 10, cancha: true, informatica: true }
  },
  {
    slug: "cer-la-ceiba",
    name: "C.E.R. La Ceiba",
    tipo: "Rural",
    location: "Vereda La Ceiba, Remedios",
    students: 120,
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    description: [
      "Centro educativo rural ubicado en la vereda La Ceiba, donde se imparte preescolar y básica primaria bajo el modelo de Escuela Nueva.",
      "Su quehacer pedagógico integra el contexto campesino, promoviendo el respeto por la tierra, la familia y el trabajo comunitario."
    ],
    infra: { salones: 4, cancha: true, informatica: false, extras: ["Huerta escolar"] }
  },
  {
    slug: "cer-la-cruz",
    name: "C.E.R. La Cruz",
    tipo: "Rural",
    location: "Vereda La Cruz, Remedios",
    students: 100,
    img: "https://images.unsplash.com/photo-1488190211105-8a0e65b04d4e?w=1200&q=80",
    description: [
      "Sede rural que brinda educación preescolar y primaria a los niños y niñas de la vereda La Cruz y comunidades cercanas.",
      "Promueve la formación en valores, el cuidado del medio ambiente y el arraigo por las tradiciones campesinas."
    ],
    infra: { salones: 3, cancha: true, informatica: false }
  },
  {
    slug: "cer-la-gorgona",
    name: "C.E.R. La Gorgona",
    tipo: "Rural",
    location: "Vereda La Gorgona, Remedios",
    students: 90,
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    description: [
      "Centro educativo rural que atiende a la población infantil de la vereda La Gorgona con metodología flexible adaptada al contexto rural.",
      "Su propuesta combina el aprendizaje académico con proyectos productivos y ambientales propios de la zona."
    ],
    infra: { salones: 3, cancha: true, informatica: true }
  },
  {
    slug: "cer-canaveral",
    name: "C.E.R. Cañaveral",
    tipo: "Rural",
    location: "Vereda Cañaveral, Remedios",
    students: 80,
    img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80",
    description: [
      "Sede rural enclavada en la vereda Cañaveral, comprometida con una educación pertinente y de calidad para la niñez campesina.",
      "Fomenta valores como la solidaridad, el esfuerzo y la responsabilidad, en estrecha relación con las familias del territorio."
    ],
    infra: { salones: 3, cancha: true, informatica: false }
  },
  {
    slug: "cer-el-popero",
    name: "C.E.R. El Popero",
    tipo: "Rural",
    location: "Vereda El Popero, Remedios",
    students: 70,
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    description: [
      "Centro educativo de la vereda El Popero que ofrece formación primaria con un enfoque centrado en el estudiante y su entorno.",
      "Trabaja por el fortalecimiento de la lectura, la escritura y el pensamiento lógico desde los primeros años escolares."
    ],
    infra: { salones: 2, cancha: true, informatica: false }
  },
  {
    slug: "cer-martana",
    name: "C.E.R. Martaná",
    tipo: "Rural",
    location: "Vereda Martaná, Remedios",
    students: 60,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
    description: [
      "Sede rural que acompaña a los niños y niñas de la vereda Martaná en su proceso de formación inicial y básica primaria.",
      "Su propuesta pedagógica resalta el valor de la comunidad, la cultura local y la convivencia pacífica."
    ],
    infra: { salones: 2, cancha: true, informatica: false }
  },
  {
    slug: "cer-paso-de-la-mula",
    name: "C.E.R. Paso de la Mula",
    tipo: "Rural",
    location: "Vereda Paso de la Mula, Remedios",
    students: 65,
    img: "https://images.unsplash.com/photo-1488190211105-8a0e65b04d4e?w=1200&q=80",
    description: [
      "Centro educativo rural de la vereda Paso de la Mula, que ofrece educación preescolar y básica primaria a la población campesina de la zona.",
      "Su propuesta pedagógica fortalece la identidad territorial, el trabajo en equipo y las competencias básicas de los estudiantes rurales."
    ],
    infra: { salones: 2, cancha: true, informatica: false }
  },
  {
    slug: "cer-santa-lucia",
    name: "C.E.R. Santa Lucía",
    tipo: "Rural",
    location: "Vereda Santa Lucía, Remedios",
    students: 70,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
    description: [
      "Sede rural ubicada en la vereda Santa Lucía, comprometida con la formación integral de niños y niñas en preescolar y básica primaria.",
      "Integra el aprendizaje académico con proyectos productivos como la huerta escolar, fomentando el amor por la tierra y el trabajo comunitario."
    ],
    infra: { salones: 2, cancha: true, informatica: false, extras: ["Huerta escolar"] }
  }
];

export default function Sedes() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSede, setSelectedSede] = useState(null);
  const [sedesData, setSedesData] = useState(INITIAL_SEDES);

  useEffect(() => {
    const fetchSedes = async () => {
      const { data, error } = await supabase.from('sedes').select('*');
      if (!error && data && data.length > 0) {
        setSedesData(data);
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
            <img src={currentSede.img} alt={currentSede.name} />
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

        <footer>
          © I.E. Ignacio Yepes Yepes — Remedios, Antioquia
        </footer>
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
                <article key={sede.slug} className="card">
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
                      onClick={() => setSelectedSede(sede.slug)}
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
