import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css'; //

export default function GaleriaPages() {
  const [fotoActiva, setFotoActiva] = useState(null);

  // Efecto para que cuando la página cargue, suba automáticamente al inicio (Top 0)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cargar imágenes de la galería desde localStorage
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.from('galeria').select('*').order('created_at', { ascending: false });
      if (!error && data) setGalleryImages(data);
    };
    fetchGallery();
  }, []);

  return (
    <div className="page-layout" style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Botón para regresar al inicio */}
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          ← Volver al Inicio
        </Link>

        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '2.5rem' }}>Galería Completa Institucional</h1>
        <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>Explora todos los momentos, eventos y recuerdos de nuestra comunidad educativa.</p>
      <div className="divider" style={{ margin: '0 0 2.5rem 0' }}></div>

        {/* Aquí mapeamos TODO el array de imágenes sin cortes (Las 10 completas) */}
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${image.large ? 'large' : ''}`}
              onClick={() => setFotoActiva(image.full)}
              style={{ cursor: 'pointer' }}
            >
              <img src={image.thumb} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox de pantalla completa */}
      {fotoActiva && (
        <div className="lightbox open" onClick={() => setFotoActiva(null)}>
          <button className="lightbox-close" type="button" onClick={() => setFotoActiva(null)}>✕</button>
          <img src={fotoActiva} alt="Foto ampliada" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}