import { useState } from 'react';
import '../App.css';

export default function PsicologiaPages() {
  const [activeCard, setActiveCard] = useState(null);

  const temas = [
    {
      id: 1,
      icon: "🧠",
      title: "Manejo del Estrés Escolar",
      short: "Técnicas y organización para momentos de alta carga académica o exámenes.",
      details: "Aprende a priorizar tareas con el método Pomodoro, realiza pausas activas cada 45 minutos y practica la respiración diafragmática. Si sientes que la presión de los periodos finales te supera, recuerda que planificar tu semana con anticipación reduce la ansiedad en un 80%."
    },
    {
      id: 2,
      icon: "🤝",
      title: "Convivencia y Prevención del Bullying",
      short: "Estrategias para construir un entorno seguro, tolerante y lleno de respeto mutuo.",
      details: "El respeto a las diferencias es la base de nuestra comunidad en el Yepes Yepes. Si eres testigo o víctima de una situación de acoso, no te quedes callado. Nuestro canal de orientación garantiza confidencialidad absoluta para mediar conflictos de forma pacífica."
    },
    {
      id: 3,
      icon: "🎯",
      title: "Orientación Vocacional",
      short: "Acompañamiento integral para definir tu futuro académico, técnico o profesional.",
      details: "Diseñado especialmente para los grados 10° y 11°. Te ayudamos a descubrir tus aptitudes e intereses mediante test vocacionales, información sobre universidades, opciones del SENA y el enfoque de nuestra Media Técnica en Administración y Finanzas."
    },
    {
      id: 4,
      icon: "❤️",
      title: "Salud y Gestión Emocional",
      short: "Un espacio seguro para aprender a identificar, validar y expresar lo que sientes.",
      details: "Sentirse triste, frustrado o abrumado es completamente normal. Aquí te brindamos herramientas de inteligencia emocional para procesar los cambios de la juventud. No tienes que llevar todas tus cargas solo; hablar de lo que te pasa es el primer paso."
    }
  ];

  return (
    <main className="container" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Bienestar Estudiantil</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Orientación Escolar</h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
          Tu salud mental y bienestar emocional son fundamentales. Explora nuestros recursos interactivos o solicita apoyo personalizado.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {temas.map((tema) => (
          <article 
            key={tema.id} 
            className="card" 
            style={{ 
              padding: '2rem', 
              cursor: 'pointer',
              border: activeCard === tema.id ? '2px solid var(--accent)' : '1px solid var(--border)',
              transform: activeCard === tema.id ? 'translateY(-4px)' : 'none',
              transition: 'all 0.3s ease',
              boxShadow: activeCard === tema.id ? '0 10px 20px rgba(0,0,0,0.05)' : 'none'
            }}
            onClick={() => setActiveCard(activeCard === tema.id ? null : tema.id)}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{tema.icon}</div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>{tema.title}</h3>
            <p style={{ color: 'var(--muted-fg)', fontSize: '0.95rem' }}>{tema.short}</p>
            
            <div style={{ 
              maxHeight: activeCard === tema.id ? '300px' : '0', 
              overflow: 'hidden', 
              transition: 'all 0.4s ease-in-out',
              marginTop: activeCard === tema.id ? '1rem' : '0',
              opacity: activeCard === tema.id ? 1 : 0
            }}>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', color: 'var(--muted-text)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {tema.details}
              </div>
            </div>
            <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {activeCard === tema.id ? "👇 Hacer clic para cerrar detalle" : "👉 Hacer clic para ver consejos"}
            </div>
          </article>
        ))}
      </div>

      <div className="card" style={{ marginTop: '4rem', padding: '3rem 2rem', background: 'var(--primary)', color: 'var(--primary-fg)', textAlign: 'center', borderRadius: 'var(--radius)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '1rem' }}>¿Necesitas hablar con alguien de forma privada?</h3>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', opacity: '0.9' }}>
          La psicóloga orientadora de la institución está disponible para escucharte y brindarte un espacio 100% confidencial y seguro.
        </p>
        <a 
          href="https://wa.me/573113089234" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn"
          style={{ background: 'var(--accent)', color: 'var(--foreground)', fontWeight: 'bold', display: 'inline-block', padding: '0.8rem 2rem' }}
        >
          💬 Contactar a Orientación por WhatsApp
        </a>
      </div>
    </main>
  );
}