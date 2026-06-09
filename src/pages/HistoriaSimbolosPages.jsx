import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

export default function HistoriaSimbolosPages() {
  const [tabActiva, setTabActiva] = useState('historia');

  const HITOS_ESTATICOS = [
    {
      año: "1939",
      titulo: "Fundación y Primeros Pasos",
      desc: "El Presbítero Ignacio María Yepes Yepes, junto al querido médico local Israel Londoño, funda un colegio con recursos propios en la casa cural bajo el nombre de 'San Nicolás de Tolentino'. En sus inicios peregrinó por múltiples locales del municipio, incluyendo la plazoleta de Santa Bárbara (antiguo local de 'El Neucido') y la plaza principal."
    },
    {
      año: "1948",
      titulo: "Nace la Escuela de Varones",
      desc: "El 20 de enero inicia labores la Escuela Urbana de Varones bajo la dirección de Gabriel Valencia. En 1959, mediante la ordenanza 021, se autoriza su funcionamiento mixto bajo el nombre de 'Escuela Urbana Integrada Remedios', siendo impulsada en infraestructura por el destacado director Jairo Cadavid."
    },
    {
      año: "1959",
      titulo: "Legalización y Raíces Femeninas",
      desc: "Se oficializa la 'Escuela de Niñas del Municipio de Remedios' mediante la Ordenanza Nº 21. Paralelamente, la Escuela Santa Teresita (cuyas escrituras datan de 1911 y 1897 en terrenos cedidos para niñas) es asumida y dirigida por la congregación de las Hermanas Teresitas del Niño Jesús."
    },
    {
      año: "1963",
      titulo: "La Gran Disputa y División",
      desc: "El plantel resurge en el palacio municipal como 'Colegio de Francisco Martínez de Ospina'. Sin embargo, una fuerte disputa personal entre el alcalde de turno y el párroco Pbro. Ovidio Castro divide el colegio en dos facciones: una permanece en el palacio y la otra se traslada a la Casa Cural bajo la figura de 'Colegio Parroquial'."
    },
    {
      año: "1966",
      titulo: "Llegada al Alto de las Tapias",
      desc: "La representación política y social unifica las fuerzas de la comunidad. Mediante el Acuerdo Nº 11 del Concejo Municipal, se ordena la edificación definitiva del plantel en el icónico Alto de las Tapias. Allí abre sus puertas con el nombre de 'Liceo Ignacio Yepes Yepes', rindiendo tributo eterno a su fundador."
    },
    {
      año: "1976",
      titulo: "Primera Promoción de Bachilleres",
      desc: "Tras intensas visitas de inspección nacional que avalaron los estudios de primero a sexto de bachillerato, el 20 de noviembre de 1976 la institución otorga sus primeros títulos de bachiller, bajo la rectoría del señor Hugo de Jesús Castaño Hernández."
    },
    {
      año: "2003",
      titulo: "Fusión Definitiva: Nace la I.E.",
      desc: "El 6 de febrero de 2003 se firma la histórica Resolución Departamental Nº 0815. Las escuelas urbanas integradas (Santa Teresita y Remedios) se unifican de forma definitiva con el Liceo, consolidando la estructura actual de la Institución Educativa Ignacio Yepes Yepes."
    }
  ];

  // Estado para la historia dinámica
  const [hitosHistoria, setHitosHistoria] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('listaHistoria');
    if (stored) {
      const data = JSON.parse(stored);
      if (data.length > 0) {
        setHitosHistoria(data);
        return;
      }
    }
    setHitosHistoria(HITOS_ESTATICOS);
  }, []);

  const simbolos = [
    { icon: "⭕", nombre: "Círculo", desc: "Representa la integración institucional, la cohesión comunitaria y la unidad de los diferentes estamentos educativos." },
    { icon: "🕊️", nombre: "Paloma", desc: "El gran emblema de la paz y la libertad que se siembra y se vive activamente dentro del ambiente de nuestra comunidad educativa." },
    { icon: "⚖️", nombre: "Balanza", desc: "Símbolo de la equidad o igualdad con que se debe tratar y valorar a cada uno de sus individuos." },
    { icon: "連結", nombre: "Aros", desc: "Evocan la fraternidad, el trabajo en equipo y la indestructible unión con la que toda la comunidad labora." },
    { icon: "✝️", nombre: "Cruz", desc: "La fe inquebrantable en un Dios vivo, que alimenta las bases de los principios éticos, morales y religiosos de cara a un mejor futuro." },
    { icon: "📖", nombre: "Libro", desc: "La fuente viva de la sabiduría, el conocimiento científico, el esfuerzo académico y la virtud." }
  ];

  return (
    <main style={{ backgroundColor: 'var(--background)', padding: '4rem 1rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', backgroundColor: 'var(--muted)', padding: '6px 16px', borderRadius: '9999px' }}>
            Identidad Institucional
          </span>
          <h1 style={{ marginTop: '1.5rem', fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>
            Historia y Símbolos
          </h1>
          <div className='divider'></div>
          <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: 'var(--muted-text)', maxWidth: '700px', margin: '1rem auto 0' }}>
            Conoce las raíces, las transformaciones históricas y los emblemas oficiales que forjan el espíritu de la I.E. Ignacio Yepes Yepes.
          </p>
        </div>

        {/* Menú de pestañas */}
        <div role="tablist" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', borderBottom: '2px solid #e2e8f0', marginBottom: '3rem' }}>
          <button
            onClick={() => setTabActiva('historia')}
            role="tab"
            aria-selected={tabActiva === 'historia'}
            aria-controls="panel-historia"
            style={{
              paddingBottom: '1rem',
              paddingHorizontal: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              color: tabActiva === 'historia' ? 'var(--primary)' : 'var(--muted-text)',
              borderBottom: tabActiva === 'historia' ? '4px solid var(--primary)' : '4px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            📜 Reseña Histórica
          </button>
          <button
            onClick={() => setTabActiva('simbolos')}
            role="tab"
            aria-selected={tabActiva === 'simbolos'}
            aria-controls="panel-simbolos"
            style={{
              paddingBottom: '1rem',
              paddingHorizontal: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              color: tabActiva === 'simbolos' ? 'var(--primary)' : 'var(--muted-text)',
              borderBottom: tabActiva === 'simbolos' ? '4px solid var(--primary)' : '4px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            🛡️ Símbolos Institucionales
          </button>
        </div>

        {/* CONTENIDO 1: RESEÑA HISTÓRICA (Línea de tiempo usando tus tarjetas) */}
        {tabActiva === 'historia' && (
          <div id="panel-historia" role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <img src="Fundador.jpeg" alt="Fundador del yepes" style={{ width: '50%', maxWidth: '180px', height: 'auto', display: 'block', margin: '0 auto', border: "150px"}} />
            <div className="card" style={{ padding: '24px' }}>
              <p style={{ color: 'var(--muted-text)', lineHeight: '1.7', margin: 0 }}>
                El desarrollo de nuestro pueblo está basado profundamente en la educación, de ahí tantas luchas y batallas para que en nuestro municipio existiera un lugar digno en donde albergar a una población deseosa de adquirir conocimiento.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {hitosHistoria.map((hito, idx) => (
                <div key={idx} className="card" style={{ padding: '24px', borderLeft: '5px solid var(--primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--foreground)', fontSize: '1.3rem' }}>{hito.titulo}</h3>
                    <span style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-fg)', padding: '4px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {hito.año}
                    </span>
                  </div>
                  <p style={{ color: 'var(--muted-text)', lineHeight: '1.6', margin: 0, fontSize: '1rem' }}>
                    {hito.desc}
                  </p>
                </div>
              ))}
            </div>            <div className="card featured-card" style={{ padding: '32px', textAlign: 'center', marginTop: '1rem' }}>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>La Institución Hoy</h3>
              <p style={{ color: '#e6f4ea', lineHeight: '1.6', margin: 0 }}>
                Hoy la Institución Educativa Ignacio Yepes Yepes es uno de los lugares más importantes para nuestro municipio. Cuenta con la mayor población estudiantil y desarrolla múltiples procesos sociales, culturales, deportivos y formativos en una hermosa infraestructura rodeada de zonas verdes.
              </p>
            </div>
          </div>
        )}

        {/* CONTENIDO 2: SÍMBOLOS INSTITUCIONALES */}
        {tabActiva === 'simbolos' && (
          <div id="panel-simbolos" role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <img src="ESCUDO.png" alt="Escudo de la institución" style={{ width: '50%', maxWidth: '180px', height: 'auto', display: 'block', margin: '0 auto', border: "150px" }} />
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.05em' }}>Identidad Visual</span>
                <h2 style={{ color: 'var(--foreground)', marginTop: '0.25rem', marginBottom: '1rem' }}>El Escudo Institucional</h2>
              </div>
              <p style={{ color: 'var(--muted-text)', lineHeight: '1.6', textAlign: 'center', marginBottom: '2rem' }}>
                DISEÑADO POR: **Diego Juan Herrera**, estudiante del grado undécimo (11°). Está constituido por un sinnúmero de símbolos que esbozan principios y valores de quienes conforman la comunidad.
              </p>
              
              {/* Cuadrícula de elementos del escudo */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {simbolos.map((sym, idx) => (
                  <div key={idx} className="card" style={{ padding: '20px', backgroundColor: 'var(--card)' }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{sym.icon}</div>
                    <h4 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '700' }}>{sym.nombre}</h4>
                    <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>{sym.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <img src="Bandera.jpeg" alt="Bandera de la institución" style={{ width: '50%', maxWidth: '180px', height: 'auto', display: 'block', margin: '0 auto', border: "150px" }} />
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ color: 'var(--foreground)', marginTop: 0, marginBottom: '0.5rem', textAlign: 'center' }}>La Bandera</h2>
              <p style={{ textTransform: 'none', textAlign: 'center', fontSize: '0.95rem', color: 'var(--muted-text)' }}>
                DISEÑADA POR: Licenciado Juan Fernando Álvarez A., educador de la institución.
              </p>
              <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '1rem', margin: '1.5rem 0', backgroundColor: 'var(--card)', padding: '12px', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--foreground)', fontStyle: 'italic', margin: 0, lineHeight: '1.6' }}>
                  "Está conformada por un solo fondo de color verde, con el escudo de la institución en el centro. Simboliza el color de la esperanza de todos sus miembros en un futuro lleno de sabiduría, y convoca al amor y respeto a la patria, la constitución y las leyes."
                </p>
              </div>
            </div>

            {/* El Lema */}
            <div className="card featured-card" style={{ padding: '32px', textAlign: 'center' }}>
              <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>LEMA INSTITUTIONAL</span>
              <p style={{ fontSize: '1.75rem', fontStyle: 'italic', fontWeight: '700', margin: '0.75rem 0' }}>
                "Dios y amor de Patria. Con fidelidad mientras se viva."
              </p>
              <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', margin: 0 }}>
                ¡Ignacistas somos Ignacistas! Será siempre nuestra consigna.
              </p>
            </div>

          </div>
        )}

        {/* Botón de regreso */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/" className="btn">Volver al inicio</Link>
        </div>

      </div>
    </main>
  );
}