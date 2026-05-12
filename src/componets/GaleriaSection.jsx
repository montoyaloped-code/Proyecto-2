import { useState } from 'react';
import '../App.css';

export default function GaleriaSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const images = [
    {
      thumb: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      full: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
      alt: 'Campus principal',
      large: true
    },
    {
      thumb: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
      full: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80',
      alt: 'Estudiantes',
      large: false
    },
    {
      thumb: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
      full: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80',
      alt: 'Salón de clases',
      large: false
    },
    {
      thumb: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      full: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
      alt: 'Sede rural',
      large: false
    }
  ];

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">Galería de Fotos</h2>
        <div className="divider"></div>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${image.large ? 'large' : ''}`}
              onClick={() => openLightbox(image.full)}
              style={{ cursor: 'pointer' }}
            >
              <img src={image.thumb} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="lightbox"
          id="lightbox"
          onClick={closeLightbox}
          style={{ display: 'flex' }}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            ✕
          </button>
          <img id="lightboxImg" src={selectedImage} alt="Foto ampliada" />
        </div>
      )}
    </section>
  );
}
