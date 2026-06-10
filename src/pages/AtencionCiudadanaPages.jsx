import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

export default function AtencionCiudadanaPages() {
  const [formState, setFormState] = useState({
    nombre: '',
    correo: '',
    tipo: 'Sugerencia',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { nombre, correo, tipo, mensaje } = formState;
    
    const recipientEmail = 'MontoyaLoped@gmail.com';
    const subject = `PQRS - ${tipo} de ${nombre}`;
    const bodyText = `Nombre: ${nombre}\nCorreo: ${correo}\nTipo: ${tipo}\n\nMensaje:\n${mensaje}`;

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    try {
      window.location.href = mailtoUrl;
      
      // Feedback más claro
      setTimeout(() => {
        alert('✅ Se ha abierto tu cliente de correo con la información prellenada.\n\nPor favor, revisa los datos y haz clic en "Enviar".');
      }, 300);

    } catch (error) {
      alert('No se pudo abrir el cliente de correo. Por favor envía tu mensaje manualmente a: MontoyaLoped@gmail.com');
    }

    // Feedback visual
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ nombre: '', correo: '', tipo: 'Sugerencia', mensaje: '' });

    setTimeout(() => setSubmitted(false), 6000);
  };

  const DOCUMENTOS_ESTATICOS = [
    { name: "Directorio Institucional de Funcionarios 2026", size: "142 KB" },
    { name: "Presupuesto General de Rentas y Gastos Autorizado", size: "310 KB" },
    { name: "Resoluciones del Rector e Informes de Gestión Directiva", size: "1.2 MB" },
    { name: "Rendición de Cuentas Anual y Ejecución Presupuestal", size: "845 KB" }
  ];

  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchTransparencia = async () => {
      const { data, error } = await supabase.from('transparencia').select('*');
      if (!error && data && data.length > 0) {
        setDocumentos(data);
      } else {
        setDocumentos(DOCUMENTOS_ESTATICOS);
      }
    };
    fetchTransparencia();
  }, []);

  return (
    <main className="container" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Canales de Atención</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Atención Ciudadana</h2>
        <div className='divider'></div>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
          Cumplimos con la normatividad de transparencia ciudadana de Colombia. Envía tus solicitudes o descarga documentación legal oficial.
        </p>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* LADO A: BUZÓN */}
        <section className="card" style={{ padding: '2.5rem 2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
            Buzón Virtual de PQRS
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-fg)', marginBottom: '1.5rem' }}>
            Envía tus Peticiones, Quejas, Reclamos o Sugerencias directamente a la mesa administrativa.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* ... (mantengo tus campos iguales) */}
            <div>
              <label htmlFor="nombre-pqrs" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--foreground)' }}>Nombre completo</label>
              <input type="text" id="nombre-pqrs" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={formState.nombre} onChange={e => setFormState({...formState, nombre: e.target.value})} />
            </div>

            <div>
              <label htmlFor="correo-pqrs" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--foreground)' }}>Correo electrónico</label>
              <input type="email" id="correo-pqrs" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={formState.correo} onChange={e => setFormState({...formState, correo: e.target.value})} />
            </div>

            <div>
              <label htmlFor="tipo-pqrs" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--foreground)' }}>Tipo de radicación</label>
              <select id="tipo-pqrs" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={formState.tipo} onChange={e => setFormState({...formState, tipo: e.target.value})}>
                <option value="Sugerencia">💡 Sugerencia</option>
                <option value="Petición">📝 Petición (Derecho de Petición)</option>
                <option value="Queja">⚠️ Queja institucional</option>
                <option value="Reclamo">📋 Reclamo académico</option>
              </select>
            </div>

            <div>
              <label htmlFor="mensaje-pqrs" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--foreground)' }}>Mensaje o descripción</label>
              <textarea rows="4" id="mensaje-pqrs" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem', resize: 'vertical' }} value={formState.mensaje} onChange={e => setFormState({...formState, mensaje: e.target.value})}></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn" style={{ width: '100%', padding: '0.85rem', background: 'var(--primary)', color: 'var(--primary-fg)', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              {isSubmitting ? "Preparando mensaje..." : "Enviar Solicitud Institucional"}
            </button>

            {submitted && (
              <div role="alert" style={{ background: '#e6f4ea', border: '1px solid #137333', color: '#137333', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', textAlign: 'center', marginTop: '0.5rem', fontWeight: 'bold' }}>
                ✓ ¡Solicitud preparada! Revisa tu cliente de correo y envíala.
              </div>
            )}
          </form>
        </section>

        {/* LADO B: TRANSPARENCIA */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
              Sección de Transparencia (Ley 1712)
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-fg)', lineHeight: '1.5' }}>
              Dando cumplimiento a la normatividad nacional de Gobierno Digital y Acceso a la Información Pública, ponemos a disposición los archivos de rendición legal de cuentas vigentes de la institución.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {documentos.map((doc, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}
              >
                <div>
                  <h4 style={{ fontSize: '0.98rem', margin: 0, color: 'var(--foreground)' }}>{doc.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>Formato: PDF · Tamaño: {doc.size}</span>
                </div>
                {doc.url ? (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(201,149,43,0.1)', color: 'var(--accent)', textDecoration: 'none', padding: '0.6rem 0.8rem', borderRadius: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center' }}>
                    📥 Descargar
                  </a>
                ) : (
                  <button 
                    onClick={() => alert(`Archivo no disponible para descarga inmediata.`)}
                    style={{ background: 'rgba(201,149,43,0.1)', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '0.6rem 0.8rem', borderRadius: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem' }}
                  >
                    📥 Descargar
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}