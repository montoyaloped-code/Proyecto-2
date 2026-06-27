import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

const IMAGES_DATA = [
  { thumb: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=300&q=80', full: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80', alt: 'Estudiantes en clase', large: false },
  { thumb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&q=80', full: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80', alt: 'Graduación', large: true },
  { thumb: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=80', full: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80', alt: 'Niños en el aula', large: false },
  { thumb: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&q=80', full: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80', alt: 'Edificio escolar', large: false },
  { thumb: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=80', full: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80', alt: 'Biblioteca', large: false },
  { thumb: 'https://images.unsplash.com/photo-1488190211105-8a0e65b04d4e?w=300&q=80', full: 'https://images.unsplash.com/photo-1488190211105-8a0e65b04d4e?w=1200&q=80', alt: 'Laboratorio', large: false },
  { thumb: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=300&q=80', full: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80', alt: 'Deportes', large: false },
  { thumb: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80', full: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80', alt: 'Estudiantes leyendo', large: false },
  { thumb: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=300&q=80', full: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80', alt: 'Clase de arte', large: false },
  { thumb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&q=80', full: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80', alt: 'Evento escolar', large: false },
];

export default function GaleriaSection() {
  const [fotoActiva, setFotoActiva] = useState(null);
  const [galleryImages, setGalleryImages] = useState(IMAGES_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase.from('galeria').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setGalleryImages(data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('No se pudieron cargar las imágenes de la galería.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const displayedImages = galleryImages.slice(0, 6);

  return (
    <section className="section-padding" style={{ background: 'var(--background)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <h2 className="section-title">Nuestra Galería</h2>
        <p className="section-subtitle">Momentos que construyen nuestra historia y comunidad.</p>
        <div className="divider"></div>
        {error && <p style={{ color: 'var(--destructive)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        <div className="gallery-grid">
          {displayedImages.map((image) => (
            <div key={image.id || image.thumb} className={`gallery-item ${image.large ? 'large' : ''}`} onClick={() => setFotoActiva(image.full)}>
              <img src={image.thumb} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>
        {fotoActiva && (
          <div className="lightbox open" onClick={() => setFotoActiva(null)}>
            <button className="lightbox-close" type="button" onClick={() => setFotoActiva(null)}>✕</button>
            <img src={fotoActiva} alt="Foto ampliada" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </div>
    </section>
  );
}
