import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

export default function AtencionCiudadanaPages() {
  useEffect(() => { document.title = 'Atención Ciudadana | I.E. Ignacio Yepes Yepes'; }, []);
  const [formState, setFormState] = useState({
    nombre: '',
    correo: '',
    tipo: 'Sugerencia',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const { nombre, correo, tipo, mensaje } = formState;

    try {
      const { error } = await supabase.from('pqrs').insert([
        { nombre: nombre.trim(), correo: correo.trim(), tipo, mensaje: mensaje.trim() }
      ]);

      if (error) throw error;

      setSubmitted(true);
      setFormState({ nombre: '', correo: '', tipo: 'Sugerencia', mensaje: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error('Error al enviar PQRS:', err);
      setSubmitError('Error al enviar la solicitud. Intenta de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransparencia = async () => {
      try {
        const { data } = await supabase.from('transparencia').select('*');
        setDocumentos(data || []);
      } catch (err) {
        console.error('Error fetching documentos:', err);
      } finally {
        setLoading(false);
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

        <section className="card" style={{ padding: '2.5rem 2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
            Buzón Virtual de PQRS
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-fg)', marginBottom: '1.5rem' }}>
            Envía tus Peticiones, Quejas, Reclamos o Sugerencias directamente a la mesa administrativa.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
              {isSubmitting ? "Enviando solicitud..." : "Enviar Solicitud Institucional"}
            </button>

            {submitted && (
              <div role="alert" style={{ background: '#e6f4ea', border: '1px solid #137333', color: '#137333', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
                ✓ ¡Solicitud enviada correctamente! La institución dará respuesta a la mayor brevedad.
              </div>
            )}

            {submitError && (
              <div role="alert" style={{ background: '#fce8e6', border: '1px solid #d93025', color: '#d93025', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                {submitError}
              </div>
            )}
          </form>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
              Sección de Transparencia (Ley 1712)
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-fg)', lineHeight: '1.5' }}>
              Dando cumplimiento a la normatividad nacional de Gobierno Digital y Acceso a la Información Pública, ponemos a disposición los archivos de rendición legal de cuentas vigentes de la institución.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="spinner" style={{ width: '2rem', height: '2rem', margin: '0 auto', borderWidth: '3px' }}></div>
            </div>
          ) : documentos.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted-fg)', padding: '2rem' }}>
              No hay documentos de transparencia disponibles por el momento.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="card"
                  style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.98rem', margin: 0, color: 'var(--foreground)' }}>{doc.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>Formato: PDF · Tamaño: {doc.size}</span>
                  </div>
                  {doc.url ? (
                    <a href={doc.url} download style={{ background: 'rgba(201,149,43,0.1)', color: 'var(--accent)', textDecoration: 'none', padding: '0.6rem 0.8rem', borderRadius: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center' }}>
                      📥 Descargar
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>Próximamente</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
