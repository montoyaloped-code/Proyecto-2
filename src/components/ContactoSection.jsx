import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';
import { ContactCard } from './Card';

export default function ContactoSection() {
  const [contacto, setContacto] = useState(null);

  useEffect(() => {
    const fetchContacto = async () => {
      const { data } = await supabase.from('contacto').select('*').limit(1).single();
      if (data) setContacto(data);
    };
    fetchContacto();
  }, []);

  return (
    <section id="contacto" className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">Estamos aquí para atenderte.</p>
        <div className="divider"></div>
        <div className="contact-grid">
          <article className="contact-info">
            <h3>Información de contacto</h3>
            <ContactCard icon="📍" label="Dirección" text={contacto?.direccion || ''} />
            <ContactCard icon="📞" label="Teléfono" text={contacto?.telefono || ''} />
            <ContactCard icon="📱" label="Celular" text={contacto?.celular || ''} />
            <ContactCard icon="✉️" label="Correo" text={contacto?.correo || ''} />
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
