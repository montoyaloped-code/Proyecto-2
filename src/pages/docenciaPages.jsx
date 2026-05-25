import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../sedes-style.css';
import ModuloInduccion from '../componets/ModuloInduccion';

export default function DocenciaPages() {
  // Estado para controlar qué card de materia está expandida (guarda el índice)
  const [materiaAbierta, setMateriaAbierta] = useState(null);

  // Estado para controlar a qué tarjeta se le está haciendo hover (guarda el índice)
  const [materiaHover, setMateriaHover] = useState(null);

  // Información detallada de cada área académica para el despliegue
  const areasAcademicas = [
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

  // Función para alternar la apertura de una card
  const toggleMateria = (index) => {
    if (materiaAbierta === index) {
      setMateriaAbierta(null); // Si ya estaba abierta, se cierra
    } else {
      setMateriaAbierta(index); // Abre la seleccionada
    }
  };

  return (
    <main>
      <section className="section" style={{ background: '#f8fafc', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Módulo de Inducción */}
          <div style={{ marginBottom: '4rem' }}>
            <ModuloInduccion />
          </div>

          {/* Sección Equipo Docente */}
          <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow">Planta de Personal</span>
            <h2>Equipo Docente</h2>
            <div className='divider'></div>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#475569' }}>
              La I.E. Ignacio Yepes Yepes cuenta con 89 educadores, 3 coordinadores y 1 rector, vinculados al Sistema General de Participaciones de la Nación.
            </p>
          </div>

          {/* Grid de Estadísticas */}
          <div className="grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            marginTop: '2.5rem',
            marginBottom: '4rem'
          }}>
            <div className="card" style={{ textAlign: 'center', background: '#fff' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: '#057a55', margin: 0 }}>89</h3>
                <p style={{ color: '#64748b', fontWeight: '500', margin: '8px 0 0 0' }}>Docentes activos</p>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center', background: '#fff' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: '#057a55', margin: 0 }}>3</h3>
                <p style={{ color: '#64748b', fontWeight: '500', margin: '8px 0 0 0' }}>Coordinadores</p>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center', background: '#fff' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: '#057a55', margin: 0 }}>1</h3>
                <p style={{ color: '#64748b', fontWeight: '500', margin: '8px 0 0 0' }}>Rector</p>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center', background: '#fff' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '2.5rem', color: '#057a55', margin: 0 }}>3.000+</h3>
                <p style={{ color: '#64748b', fontWeight: '500', margin: '8px 0 0 0' }}>Estudiantes atendidos</p>
              </div>
            </div>
          </div>

          {/* Sección Directivos */}
          <div className="section-head" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <h2>Directivos</h2>
            <div className='divider'></div>
          </div>
          <div className="card" style={{ marginTop: '1rem', padding: '32px', background: '#fff', marginBottom: '4rem' }}>
            <div className="card-body">
              <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>Rectoría Histórica</h3>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>
                El cargo de rector ha sido ocupado históricamente por figuras como Jesús Orlando Valencia Díaz. Para conocer el estado del nombramiento actual o decretos vigentes, consultar directamente con la secretaría del plantel.
              </p>
            </div>
          </div>

         {/* Sección Áreas Académicas - Cards con Hover Animado y Despliegue */}
<div className="section-head" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
  <h2>Áreas Académicas</h2>
  <div className='divider'></div>
  <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
    Haz clic sobre cualquier área para desplegar su enfoque educativo.
  </p>
</div>

<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
  gap: '20px',
  marginBottom: '4rem' 
}}>
  {areasAcademicas.map((materia, index) => {
    // Validamos si esta card específica tiene el hover o está expandida
    const esActiva = materiaAbierta === index;
    const tieneHover = materiaHover === index;

    return (
      <div 
        key={index}
        className="card"
        onClick={() => toggleMateria(index)}
        onMouseEnter={() => setMateriaHover(index)}
        onMouseLeave={() => setMateriaHover(null)}
        style={{ 
          background: '#fff', 
          cursor: 'pointer', 
          // LA MAGIA DE LA ANIMACIÓN: Transición suave para el borde, la sombra y el movimiento
          transition: 'all 0.25s ease-in-out',
          
          // Borde elegante: Si tiene hover o está abierta, se ilumina con el verde primary (#057a55)
          border: tieneHover || esActiva ? '1px solid #057a55' : '1px solid #e2e8f0',
          borderLeft: esActiva ? '5px solid #057a55' : tieneHover ? '5px solid #057a55' : '1px solid #e2e8f0',
          
          // Efecto de elevación: Si tiene hover, la tarjeta se levanta sutilmente (-3px) y gana sombra
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
              color: esActiva || tieneHover ? '#057a55' : '#1e293b', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              transition: 'color 0.2s ease'
            }}>
              {materia.nombre}
            </h4>
            <span style={{ 
              fontSize: '1.2rem', 
              color: esActiva || tieneHover ? '#057a55' : '#94a3b8',
              transform: esActiva ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'all 0.2s ease',
              lineHeight: '1'
            }}>
              ▾
            </span>
          </div>

          {/* Bloque desplegable condicional */}
          {esActiva && (
            <div style={{ 
              marginTop: '12px', 
              paddingTop: '12px', 
              borderTop: '1px solid #f1f5f9',
              animation: 'fadeIn 0.3s ease' 
            }}>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                {materia.descripcion}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>
        </div>
      </section>
    </main>
  );
}
