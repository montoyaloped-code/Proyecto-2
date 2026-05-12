import '../App.css';
import { ContactCard } from './Card';

export default function ContactoSection() {
  return (
    <section id="contacto" className="section-padding" style={{ background: 'rgba(240, 244, 239, 0.9)' }}>
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">Estamos aquí para atenderte.</p>
        <div className="divider"></div>
        <div className="contact-grid">
          <article className="contact-info">
            <h3>Información de contacto</h3>
            <ContactCard
              icon="📍"
              label="Dirección"
              text="Circular 8 N° 15-149, Barrio San Nicolás, Remedios, Antioquia"
            />
            <ContactCard
              icon="📞"
              label="Teléfono"
              text="(605) 830-3314"
            />
            <ContactCard
              icon="📱"
              label="Celular"
              text="311 308 9234"
            />
            <ContactCard
              icon="✉️"
              label="Correo"
              text="inseyepesy@yahoo.es"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
