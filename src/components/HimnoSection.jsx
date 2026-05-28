import '../App.css';
import { useState } from 'react';

export default function HimnoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

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

  const playAudio = () => {
    setIsPlaying(!isPlaying);
    // TODO: Reemplazar con el URL del audio real
    const audioUrl = 'PLACEHOLDER_AUDIO_URL';
    console.log('Reproduciendo:', audioUrl);
  };

  return (
    <section className="section-padding himno-section">
      <div className="container himno-content">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', marginBottom: '1rem', color: 'var(--primary-fg)' }}>Himno Institucional</h2>
          <div className="divider" style={{ background: 'var(--accent)' }}></div>
          
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '1rem',
              background: 'var(--primary)',
              cursor: 'pointer',
              marginBottom: '1rem',
              transition: 'all 0.3s ease',
              fontSize: '4rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--muted-fg)';
              e.currentTarget.style.color = 'var(--primary-fg)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
              e.currentTarget.style.color = 'inherit';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={{ fontSize: '3.5rem' }}>🎵</div>
            <button
              onClick={playAudio}
              aria-label={isPlaying ? 'Pausar himno' : 'Reproducir himno'}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'var(--accent)',
                color: 'green',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
              className="play-button-himno"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>
        
        <div className="himno-box">
          <div className="himno-columns">
            {himnos.map((stanza, index) => (
              <div key={index} className="himno-stanza">
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
