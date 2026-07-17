import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';

const PLACEHOLDER_IMAGES = [
  { thumb: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80', full: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80', alt: 'Estudiantes en clase' },
  { thumb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80', full: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80', alt: 'Graduación' },
  { thumb: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80', full: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80', alt: 'Niños en el aula' },
  { thumb: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80', full: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80', alt: 'Edificio escolar' },
  { thumb: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80', full: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80', alt: 'Biblioteca' },
];

export default function GaleriaSection() {
  const [fotoActiva, setFotoActiva] = useState(null);
  const [images, setImages] = useState(PLACEHOLDER_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const MAX_IMAGES = 5;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase.from('galeria').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setImages(data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('No se pudieron cargar las imágenes de la galería.');
      }
    };
    fetchGallery();
  }, []);

  const displayedImages = images.slice(0, MAX_IMAGES);

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (displayedImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [displayedImages.length]);

  return (
    <section className="section-padding" style={{ background: 'var(--background)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="galeria-presentation">
          <div className="galeria-info">
            <h2 className="section-title" style={{ textAlign: 'left' }}>Nuestra Galería</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Momentos que construyen nuestra historia y comunidad.
            </p>
            {error && <p style={{ color: 'var(--destructive)', marginBottom: '1rem' }}>{error}</p>}
            <Link to="/galeria-completa" className="btn-primary">
              Ver más imágenes →
            </Link>
          </div>
          <div className="galeria-carousel">
            <div className="carousel-viewport" onClick={() => setFotoActiva(displayedImages[currentIndex]?.full)}>
              {displayedImages.length > 0 && (
                <img
                  src={displayedImages[currentIndex]?.thumb}
                  alt={displayedImages[currentIndex]?.alt}
                  className="carousel-image"
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
            <div className="carousel-dots">
              {displayedImages.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>
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
