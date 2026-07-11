import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';

export default function GaleriaPages() {
  useEffect(() => { document.title = 'Galería Institucional | I.E. Ignacio Yepes Yepes'; }, []);
  const [fotoActiva, setFotoActiva] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase.from('galeria').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setGalleryImages(data || []);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('No se pudieron cargar las imágenes.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="page-layout" style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <div className="container">
        
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          ← Volver al Inicio
        </Link>

        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '2.5rem' }}>Galería Completa Institucional</h1>
        <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>Explora todos los momentos, eventos y recuerdos de nuestra comunidad educativa.</p>
      <div className="divider" style={{ margin: '0 0 2.5rem 0' }}></div>

        {error && <p style={{ color: 'var(--destructive)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        {loading && galleryImages.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted-fg)' }}>Cargando galería...</p>}

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div
              key={image.id || image.thumb}
              className={`gallery-item ${image.large ? 'large' : ''}`}
              onClick={() => setFotoActiva(image.full)}
              style={{ cursor: 'pointer' }}
            >
              <img src={image.thumb} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {fotoActiva && (
        <div className="lightbox open" onClick={() => setFotoActiva(null)}>
          <button className="lightbox-close" type="button" onClick={() => setFotoActiva(null)}>✕</button>
          <img src={fotoActiva} alt="Foto ampliada" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
