import React, { useEffect } from 'react';
import '../App.css';

export default function HorasConstitucionalesPages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const linkCuestionario = "https://docs.google.com/document/d/1GSEw_Ux95-nIH1HiC6cpgiilCefcE_op7sCAzC0pjIs/edit?usp=sharing";

  return (
    <main className="container" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      {/* Encabezado de la página */}
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Requisitos de Grado</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Horas Legales y Sociales</h2>
        <div className="divider"></div>
        <p style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
          Información sobre el cumplimiento de los requisitos de ley para optar al título de bachiller en la I.E. Ignacio Yepes Yepes.
        </p>
      </div>

      {/* SECCIÓN 1: SERVICIO SOCIAL (NUEVA) */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--accent)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>1</div>
          <h2 style={{ margin: 0, fontSize: '1.75rem' }}>Servicio Social Estudiantil (80 Horas)</h2>
        </div>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <article className="card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>📋 Marco Legal</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted-fg)' }}>
              Dando cumplimiento a la <strong>Ley 115 de 1994</strong> y el <strong>Decreto 1860 de 1994</strong>, los estudiantes de grados 10° y 11° deben realizar un servicio social obligatorio de 80 horas.
            </p>
          </article>
          
          <article className="card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>🌱 Áreas de Acción</h3>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.95rem', color: 'var(--muted-fg)' }}>
              <li>Alfabetización y apoyo académico.</li>
              <li>Protección del medio ambiente (Vigías ambientales).</li>
              <li>Apoyo en bibliotecas y entes municipales.</li>
              <li>Prevención de desastres y recreación.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* SECCIÓN 2: CONSTITUCIÓN */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>2</div>
          <h2 style={{ margin: 0, fontSize: '1.75rem' }}>Estudios Constitucionales (50 Horas)</h2>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* Objetivos */}
        <section className="card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🎯 Objetivos del Proyecto
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)' }}>•</span>
              <span>Dar cumplimiento a la <strong>Ley 107 de 1994</strong> en su artículo primero.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)' }}>•</span>
              <span>Afianzar los conocimientos sobre el funcionamiento del Estado Colombiano y la protección de derechos.</span>
            </li>
          </ul>
        </section>

        {/* Justificación */}
        <section className="card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚖️ Justificación Legal
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--muted-fg)' }}>
            Según lo predispuesto en la ley, todo estudiante deberá haber cursado 
            <strong> cincuenta horas de Estudios Constitucionales</strong> para obtener el título de Bachiller.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--muted-fg)', marginTop: '1rem' }}>
            La Dirección Académica solicita a los estudiantes de 11° responder el cuestionario, participar en el concurso de conocimientos y asistir a las conferencias programadas.
          </p>
        </section>
      </div>

      {/* Sección del Cuestionario */}
      <section className="card" style={{ 
        padding: '3rem 2rem', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, var(--primary) 0%, #004d00 100%)', 
        color: 'white',
        borderRadius: 'var(--radius)',
        boxShadow: '0 15px 30px rgba(0, 100, 0, 0.2)'
      }}>
        <h3 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '1rem' }}>Cuestionario sobre la Constitución Política</h3>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', opacity: '0.9' }}>
          Este documento de 200 preguntas es la base para la evaluación y socialización en las clases de sociales. Es indispensable para certificar tus horas.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <a 
            href={linkCuestionario} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn"
            style={{ 
              background: 'var(--accent)', 
              color: 'var(--foreground)', 
              padding: '1rem 2.5rem', 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            📝 Abrir Cuestionario (Google Docs)
          </a>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            (Dar doble clic para ingresar si estás en un editor)
          </span>
        </div>
      </section>
      </section>

      <div style={{ marginTop: '3rem', padding: '1.5rem', borderLeft: '4px solid var(--accent)', background: 'var(--card)', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
          <strong>Nota:</strong> Este cuestionario será revisado, socializado y valorado en clase de sociales con el objetivo de verificar su realización y debatir la aplicabilidad de los artículos constitucionales.
        </p>
      </div>
    </main>
  );
}