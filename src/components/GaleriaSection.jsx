import React, { useState, useEffect } from 'react';
import '../App.css';

// Datos de imágenes por defecto si no hay nada en localStorage
export const IMAGES_DATA = [
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
  const [galleryImages, setGalleryImages] = useState(() => {
    const stored = localStorage.getItem('galleryImages');
    return stored ? JSON.parse(stored) : IMAGES_DATA;
  });

  // Mostrar solo las primeras 6 imágenes para la sección principal
  const displayedImages = galleryImages.slice(0, 6);

  return (
    <section className="section-padding" style={{ background: '#f0fdf4' }}>
      <div className="container">
        <h2 className="section-title">Nuestra Galería</h2>
        <p className="section-subtitle">Momentos que construyen nuestra historia y comunidad.</p>
        <div className="divider"></div>
        <div className="gallery-grid">
          {displayedImages.map((image, index) => (
            <div key={index} className={`gallery-item ${image.large ? 'large' : ''}`} onClick={() => setFotoActiva(image.full)}>
              <img src={image.thumb} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>
        {/* Lightbox de pantalla completa */}
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