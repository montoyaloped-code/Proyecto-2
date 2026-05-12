import '../App.css';

export default function HimnoSection() {
  const himnos = [
    {
      label: 'Coro',
      text: '¡Oh, Ignacio Yepes Yepes, gloria y honor! Fuente de saber, templo de amor, en tus aulas forjamos el porvenir, con valores y ciencia para vivir.'
    },
    {
      label: 'Estrofa I',
      text: 'En Remedios, tierra de oro y verdor, se levanta nuestro templo del saber, con esfuerzo, disciplina y valor, construimos un brillante amanecer.'
    },
    {
      label: 'Estrofa II',
      text: 'Juventud que avanza con decisión, por senderos de justicia y de paz, la bandera de nuestra institución es la antorcha que ilumina y nos da más.'
    },
    {
      label: 'Estrofa III',
      text: 'Maestros nobles, guías del caminar, que con amor enseñan a soñar, en tu nombre juramos siempre honrar a Remedios, nuestra tierra sin igual.'
    }
  ];

  return (
    <section className="section-padding himno-section">
      <div className="container himno-content">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎵</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', marginBottom: '1rem' }}>Himno Institucional</h2>
          <div className="divider" style={{ background: 'var(--accent)' }}></div>
        </div>
        <div className="himno-box">
          <div className="himno-columns">
            {himnos.map((stanza, index) => (
              <div key={index} className="himno-stanza">
                <div className="label">{stanza.label}</div>
                <p>{stanza.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
