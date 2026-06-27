import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';
import ModuloInduccion from '../components/ModuloInduccion';

export default function DocenciaPages() {
  const [materiaAbierta, setMateriaAbierta] = useState(null);
  const [materiaHover, setMateriaHover] = useState(null);
  const [docentes, setDocentes] = useState([]);
  const [directivos, setDirectivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: docentesData, error: dError } = await supabase.from('docentes').select('*').order('nombre');
        if (dError) throw dError;
        setDocentes(docentesData || []);

        const { data: directivosData, error: dirError } = await supabase.from('directivos').select('*');
        if (dirError) throw dirError;
        setDirectivos(directivosData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('No se pudieron cargar algunos datos.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const AREAS_INICIALES = [
    {
      nombre: "Ciencias Naturales",
      descripcion: "Exploración del entorno vivo, físico y químico. Enfoque en la preservación ambiental, la biodiversidad del territorio de Remedios y el desarrollo del pensamiento científico básico."
    },
    {
      nombre: "Ciencias Sociales",
      descripcion: "Comprensión de los procesos históricos, geográficos y ciudadanos. Análisis de la constitución política, los derechos humanos y la identidad comunitaria local y nacional."
    },
    {
      nombre: "Educación Artística",
      descripcion: "Espacio para el desarrollo de la creatividad, la expresión cultural, las artes plásticas y visuales, promoviendo el talento y la sensibilidad estética de los estudiantes."
    },
    {
      nombre: "Educación Ética",
      descripcion: "Formación en valores, moralidad, toma de decisiones responsables y la construcción de un proyecto de vida sólido fundamentado en el respeto mutuo."
    },
    {
      nombre: "Educación Física",
      descripcion: "Desarrollo motor, hábitos de vida saludable, fundamentación deportiva y fomento del trabajo en equipo a través de la recreación y la actividad física."
    },
    {
      nombre: "Humanidades (Español e Inglés)",
      descripcion: "Fortalecimiento de las competencias comunicativas, la comprensión lectora, la expresión escrita y el aprendizaje del inglés como segunda lengua indispensable para el mundo global."
    },
    {
      nombre: "Matemáticas",
      descripcion: "Desarrollo del razonamiento lógico, el pensamiento espacial, métrico y analítico, aplicado a la resolución de problemas cuantitativos y situaciones de la vida cotidiana."
    },
    {
      nombre: "Tecnología e Informática",
      descripcion: "Apropiación de herramientas digitales, lógica de programación básica, hardware, software y uso responsable y crítico de las tecnologías de la información."
    },
    {
      nombre: "Religión",
      descripcion: "Estudio y reflexión sobre las dimensiones espirituales, el hecho religioso, la tolerancia cultural y los principios éticos compartidos por la sociedad."
    }
  ];

  const totalDocentes = docentes.length > 0 ? docentes.length : 89;
  const totalCoordinadores = directivos.filter(d => d.cargo.toLowerCase().includes('coordinador')).length || 3;
  const totalRectores = directivos.filter(d => d.cargo.toLowerCase() === 'rector').length || 1;

  const toggleMateria = (index) => {
    if (materiaAbierta === index) {
      setMateriaAbierta(null);
    } else {
      setMateriaAbierta(index);
    }
  };

  return (
    <main>
      <section className="section" style={{ background: 'var(--background)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '4rem' }}>
            <ModuloInduccion />
          </div>

          <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow">Planta de Personal</span>
            <h2>Equipo Docente</h2>
            <div className='divider'></div>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--muted-text)' }}>
              La I.E. Ignacio Yepes Yepes cuenta con 89 educadores, 3 coordinadores y 1 rector, vinculados al Sistema General de Participaciones de la Nación.
            </p>
          </div>

          {error && <p style={{ color: 'var(--destructive)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

          <div className="grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            marginTop: '2.5rem',
            marginBottom: '4rem'
          }}>
            <div className="card" style={{ textAlign: 'center', background: 'var(--card)' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>{totalDocentes}</h3>
                <p style={{ color: 'var(--muted-text)', fontWeight: '500', margin: '8px 0 0 0' }}>Docentes activos</p>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center', background: 'var(--card)' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>{totalCoordinadores}</h3>
                <p style={{ color: 'var(--muted-text)', fontWeight: '500', margin: '8px 0 0 0' }}>Coordinadores</p>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center', background: 'var(--card)' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>{totalRectores}</h3>
                <p style={{ color: 'var(--muted-text)', fontWeight: '500', margin: '8px 0 0 0' }}>Rector</p>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center', background: 'var(--card)' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>3.000+</h3>
                <p style={{ color: 'var(--muted-text)', fontWeight: '500', margin: '8px 0 0 0' }}>Estudiantes atendidos</p>
              </div>
            </div>
          </div>

          <div className="section-head" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <h2>Directivos</h2>
            <div className='divider'></div>
          </div>
        
        {directivos.length > 0 ? (
          <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '4rem' }}>
            {directivos.map((dir) => (
              <div key={dir.id || dir.nombre} className="card" style={{ padding: '24px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{dir.nombre}</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.9rem' }}>{dir.cargo}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ marginTop: '1rem', padding: '32px', background: 'var(--card)', marginBottom: '4rem' }}>
            <div className="card-body">
              <h3 style={{ color: 'var(--foreground)', marginBottom: '0.5rem' }}>Equipo Directivo</h3>
              <p style={{ color: 'var(--muted-text)', lineHeight: '1.6' }}>
                Consulta directamente con la secretaría del plantel para conocer el equipo directivo vigente y los decretos de nombramiento.
              </p>
            </div>
          </div>
        )}

<div className="section-head" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
  <h2>Áreas Académicas</h2>
  <div className='divider'></div>
  <p style={{ color: 'var(--muted-text)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
    Haz clic sobre cualquier área para desplegar su enfoque educativo.
  </p>
</div>

<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
  gap: '20px',
  marginBottom: '4rem' 
}}>
  {AREAS_INICIALES.map((materia, index) => {
    const esActiva = materiaAbierta === index;
    const tieneHover = materiaHover === index;

    return (
      <div 
        key={materia.nombre}
        className="card"
        onClick={() => toggleMateria(index)}
        onMouseEnter={() => setMateriaHover(index)}
        onMouseLeave={() => setMateriaHover(null)}
        style={{ 
          background: 'var(--card)', 
          cursor: 'pointer', 
          transition: 'all 0.25s ease-in-out',
          border: tieneHover || esActiva ? '1px solid var(--primary)' : '1px solid var(--border)',
          borderLeft: esActiva ? '5px solid var(--primary)' : tieneHover ? '5px solid var(--primary)' : '1px solid var(--border)',
          transform: tieneHover ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: tieneHover || esActiva 
            ? '0 10px 20px rgba(5, 122, 85, 0.08)' 
            : '0 2px 4px rgba(0,0,0,0.02)',
          borderRadius: '12px'
        }}
      >
        <div className="card-body" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ 
              margin: 0, 
              color: esActiva || tieneHover ? 'var(--primary)' : 'var(--foreground)', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              transition: 'color 0.2s ease'
            }}>
              {materia.nombre}
            </h4>
            <span style={{ 
              fontSize: '1.2rem', 
              color: esActiva || tieneHover ? 'var(--primary)' : 'var(--muted-text)',
              transform: esActiva ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'all 0.2s ease',
              lineHeight: '1'
            }}>
              ▾
            </span>
          </div>

          {esActiva && (
            <div style={{ 
              marginTop: '12px', 
              paddingTop: '12px', 
              borderTop: '1px solid var(--border)',
              animation: 'fadeIn 0.3s ease' 
            }}>
              <p style={{ color: 'var(--muted-text)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                {materia.descripcion}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>

        {docentes.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <div className="section-head" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2>Listado de Docentes</h2>
              <div className='divider'></div>
            </div>
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {docentes.map((d) => (
                <div key={d.id || d.nombre} className="card" style={{ padding: '20px', textAlign: 'center' }}>
                  {d.foto && (
                    <img 
                      src={d.foto} 
                      alt={d.nombre} 
                      loading="lazy"
                      style={{ 
                        width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.25rem', border: '4px solid var(--primary)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
                      }} 
                    />
                  )}
                  <h4 style={{ color: 'var(--primary)', marginBottom: '5px' }}>{d.nombre}</h4>
                  <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase' }}>{d.area}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>{d.cargo}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </section>
    </main>
  );
}
