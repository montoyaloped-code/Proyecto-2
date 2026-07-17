import '../App.css';

export default function HimnoSection() {
  const himnos = [
    {
      label: 'Coro',
      text: 'Ignacistas somos Ignacistas\nSerá siempre nuestra consigna\nDios y amor de Patria\nCon fidelidad mientras se viva. (bis)'
    },
    {
      label: 'Estrofa I',
      text: 'Oh bello claustro educativo\nQue nos enseña con sabiduría\nY nos orientas con la esperanza\nDe que mañana será un nuevo día. (bis)'
    },
    {
      label: 'Coro final',
      text: 'Soy Ignacista, tengo valores\nDe convivencia, paz y ecología\nVoy fomentando con los saberes\nLa equidad, la unión y la alegría. (bis)'
    }
  ];

  return (
    <section className="section-padding himno-section">
      <div className="container himno-content">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', marginBottom: '1rem', color: 'var(--primary-fg)' }}>Himno Institucional</h2>
          <div className="divider" style={{ background: 'var(--accent)' }}></div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '1rem',
              background: 'var(--primary)',
              marginBottom: '1rem',
              fontSize: '3.5rem',
              userSelect: 'none'
            }}
          >
            🎵
          </div>
        </div>
        
        <div className="himno-box">
          <div className="himno-columns">
            {himnos.map((stanza) => (
              <div key={stanza.label} className="himno-stanza">
                <div className="label">{stanza.label}</div>
                <p style={{ whiteSpace: 'pre-line' }}>{stanza.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
