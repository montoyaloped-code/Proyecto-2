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
          <aside className="contact-map">
            <h3>Encuéntranos</h3>
            <div className="map-frame">
              <iframe
                title="Mapa I.E. Ignacio Yepes Yepes"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.8141%2C7.1037%2C-74.8041%2C7.1117&layer=mapnik&marker=7.1077%2C-74.8091"
                loading="lazy"
              ></iframe>
            </div>
            <p>Ver en <a href="https://www.openstreetmap.org/?mlat=7.1077&amp;mlon=-74.8091#map=16/7.1077/-74.8091" target="_blank" rel="noreferrer">OpenStreetMap</a>.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
