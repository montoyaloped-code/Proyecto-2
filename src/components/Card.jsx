import '../App.css';

export function ValueCard({ icon, title, description }) {
  return (
    <article className="card value-card">
      <div className="value-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export function SedesCard({ icon, title, description }) {
  return (
    <article className="card sedes-card">
      <div className="sedes-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export function OfertaCard({ icon, title, description }) {
  return (
    <article className="card oferta-card">
      <div className="oferta-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export function ContactCard({ icon, label, text }) {
  return (
    <div className="contact-item">
      <div className="contact-icon">{icon}</div>
      <div>
        <div className="label">{label}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
}
