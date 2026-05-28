import { useState } from 'react';
import '../App.css';

export default function PortalAcademicoPages() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      q: "¿Qué hago si mi usuario aparece bloqueado o arroja datos inválidos?",
      a: "Si el sistema no reconoce tu documento o indica bloqueo, debes acercarte directamente a la ventanilla de secretaría académica en la sede principal con tu documento de identidad en físico para realizar el restablecimiento en el SIMAT."
    },
    {
      id: 2,
      q: "¿Cuándo se habilitan las notas para su consulta en línea?",
      a: "Las calificaciones se cargan al finalizar de manera oficial cada uno de los periodos académicos institucionales. Las fechas de apertura y cierre de la plataforma se rigen de acuerdo con el cronograma del calendario escolar anual establecido por la rectoría."
    },
    {
      id: 3,
      q: "¿Los padres de familia o acudientes entran con el mismo usuario?",
      a: "Sí, el sistema unifica la ficha del estudiante. Tanto el alumno como su acudiente ingresan utilizando el número de documento de identidad del estudiante registrado al momento de efectuar la matrícula."
    }
  ];

  return (
    <main className="container" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Plataforma Oficial</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Consulta de Calificaciones</h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
          Accede al sistema del PC Académico oficial para verificar boletines periódicos, hojas de vida estudiantiles e historiales de asistencia.
        </p>
        <a 
          href="http://162.216.241.106/server7/wc.dll?seguridad~login" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn"
          style={{ background: 'var(--primary)', color: 'var(--primary-fg)', fontSize: '1.1rem', padding: '1rem 2.5rem', boxShadow: '0 4px 12px rgba(0, 100, 0, 0.2)' }}
        >
          Plataforma PC Académico Oficial ↗
        </a>
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--primary)' }}>
        Guía de ingreso paso a paso
      </h3>

      <div className="timeline" style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
        <article className="timeline-item">
          <span className="timeline-dot" style={{ background: 'var(--primary)' }}></span>
          <span className="timeline-year" style={{ background: 'rgba(0,100,0,0.1)', color: 'var(--primary)' }}>01</span>
          <h3>Preparar tus Datos Básicos</h3>
          <p style={{ color: 'var(--muted-fg)' }}>
            Tu código de usuario de ingreso corresponde de manera exacta al número del documento de identidad del estudiante (Tarjeta de Identidad, Registro Civil o Cédula) registrado activamente en el sistema oficial del SIMAT.
          </p>
        </article>

        <article className="timeline-item">
          <span className="timeline-dot" style={{ background: 'var(--accent)' }}></span>
          <span className="timeline-year" style={{ background: 'rgba(201,149,43,0.1)', color: 'var(--accent)' }}>02</span>
          <h3>Contraseña por Defecto</h3>
          <div style={{ background: 'var(--muted)', borderLeft: '4px solid var(--accent)', padding: '1.25rem', borderRadius: '0 0.5rem 0.5rem 0', margin: '0.5rem 0' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--foreground)' }}>
              ⚠️ ATENCIÓN: La clave inicial obligatoria para todos los alumnos en la plataforma es estrictamente la palabra <span style={{ color: 'var(--primary)', fontSize: '1.15rem', background: 'var(--card)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}>yepes</span> (en minúsculas y sin espacios).
            </p>
          </div>
        </article>

        <article className="timeline-item">
          <span className="timeline-dot" style={{ background: 'var(--primary)' }}></span>
          <span className="timeline-year" style={{ background: 'rgba(0,100,0,0.1)', color: 'var(--primary)' }}>03</span>
          <h3>Descargar tus Boletines</h3>
          <p style={{ color: 'var(--muted-fg)' }}>
            Una vez accedas de forma exitosa, selecciona el rol correspondiente, navega hacia el módulo lateral de 'Informes o Calificaciones', selecciona el periodo lectivo en curso y genera tu reporte en formato PDF para impresión.
          </p>
        </article>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)', textCenter: 'center' }}>
          Preguntas frecuentes del portal
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq) => (
            <div key={faq.id} className="card" style={{ padding: '0.25rem 1.5rem' }}>
              <button 
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--foreground)' }}
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                <span>{faq.q}</span>
                <span style={{ color: 'var(--accent)' }}>{openFaq === faq.id ? "▲" : "▼"}</span>
              </button>
              <div style={{ maxHeight: openFaq === faq.id ? '200px' : '0', overflow: 'hidden', transition: 'all 0.3s ease-out', color: 'var(--muted-fg)', pb: openFaq === faq.id ? '1.25rem' : '0' }}>
                <p style={{ paddingBottom: '1.25rem', fontSize: '0.95rem', lineHeight: '1.5', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}