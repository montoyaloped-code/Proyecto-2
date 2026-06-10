import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

export default function CuadroDeHonorPages() {
  const [honorStudents, setHonorStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHonor = async () => {
      const { data, error } = await supabase.from('cuadro_honor').select('*');
      if (!error && data) setHonorStudents(data);
    };
    fetchHonor();
  }, []);

  useEffect(() => {
    if (honorStudents.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % honorStudents.length);
      }, 5000); // Cambia de estudiante cada 5 segundos
      return () => clearInterval(interval);
    }
  }, [honorStudents, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % honorStudents.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + honorStudents.length) % honorStudents.length);
  };

  if (honorStudents.length === 0) {
    return (
      <main className="container" style={{ padding: '4rem 1rem', minHeight: '80vh', textAlign: 'center' }}>
        <div className="section-head" style={{ marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ color: 'var(--accent)' }}>Reconocimiento</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Cuadro de Honor</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            Aquí destacamos a nuestros estudiantes más sobresalientes. ¡Pronto verás sus logros!
          </p>
        </div>
        <p style={{ color: 'var(--muted-fg)' }}>No hay estudiantes en el Cuadro de Honor aún. El administrador puede agregarlos desde el panel de administración.</p>
      </main>
    );
  }

  const currentStudent = honorStudents[currentIndex];

  return (
    <main className="container" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Reconocimiento</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Cuadro de Honor</h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
          Celebramos la excelencia académica y el esfuerzo de nuestros estudiantes más destacados.
        </p>
      </div>

      <section className="card" style={{ padding: '2.5rem 2rem', maxWidth: '700px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
          <img 
            src={currentStudent.photo} 
            alt={currentStudent.name} 
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary)' }} 
          />
          <h3 style={{ color: 'var(--primary)', fontSize: '1.8rem', margin: 0 }}>{currentStudent.name}</h3>
          <p style={{ color: 'var(--muted-fg)', fontSize: '1.1rem', fontStyle: 'italic', margin: 0 }}>"{currentStudent.achievement}"</p>
          <p style={{ color: 'var(--accent)', fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>Materia: {currentStudent.subject}</p>
        </div>

        {honorStudents.length > 1 && (
          <>
            <button 
              onClick={goToPrevious} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'rgba(0,0,0,0.5)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                fontSize: '1.5rem', 
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              &lt;
            </button>
            <button 
              onClick={goToNext} 
              style={{ 
                position: 'absolute', 
                right: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'rgba(0,0,0,0.5)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                fontSize: '1.5rem', 
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              &gt;
            </button>
          </>
        )}
      </section>
    </main>
  );
}