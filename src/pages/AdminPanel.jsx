import React, { useState, useEffect } from 'react';
import '../App.css'; // Import global styles

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('docentes'); // 'docentes', 'galeria', 'cuadro-honor', 'constitucion'

  // --- Docentes State & Logic ---
  const [docentes, setDocentes] = useState(() => {
    const stored = localStorage.getItem('listaDocentes');
    return stored ? JSON.parse(stored) : [];
  });
  const [nombreDocente, setNombreDocente] = useState('');
  const [areaDocente, setAreaDocente] = useState('');
  const [cargoDocente, setCargoDocente] = useState('Docente de Aula');
  const [editingDocenteIndex, setEditingDocenteIndex] = useState(null);

  const AREAS_ESTATICAS = [
    "Ciencias Naturales", "Ciencias Sociales", "Educación Artística",
    "Educación Ética", "Educación Física", "Humanidades (Español e Inglés)",
    "Matemáticas", "Tecnología e Informática", "Religión"
  ];

  useEffect(() => {
    localStorage.setItem('listaDocentes', JSON.stringify(docentes));
  }, [docentes]);

  const handleDocenteSubmit = (e) => {
    e.preventDefault();
    if (!areaDocente || !nombreDocente.trim()) return alert("Por favor, completa el nombre y selecciona un área académica.");

    const existe = docentes.some((d, idx) => 
      d.nombre.toLowerCase() === nombreDocente.trim().toLowerCase() && idx !== editingDocenteIndex
    );
    if (existe) return alert("Este docente ya se encuentra registrado.");

    if (editingDocenteIndex !== null) {
      const copia = [...docentes];
      copia[editingDocenteIndex] = { nombre: nombreDocente.trim(), area: areaDocente, cargo: cargoDocente.trim() };
      setDocentes(copia);
      setEditingDocenteIndex(null);
    } else {
      setDocentes([...docentes, { nombre: nombreDocente.trim(), area: areaDocente, cargo: cargoDocente.trim() }]);
    }
    setNombreDocente(''); setAreaDocente(''); setCargoDocente('Docente de Aula');
  };

  const startEditDocente = (idx) => {
    setEditingDocenteIndex(idx);
    setNombreDocente(docentes[idx].nombre);
    setAreaDocente(docentes[idx].area);
    setCargoDocente(docentes[idx].cargo);
  };

  const deleteDocente = (idx) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este docente?')) {
      setDocentes(docentes.filter((_, i) => i !== idx));
    }
  };

  // --- Galería State & Logic ---
  const [galleryImages, setGalleryImages] = useState(() => {
    const stored = localStorage.getItem('galleryImages');
    return stored ? JSON.parse(stored) : [];
  });
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [isLarge, setIsLarge] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
  }, [galleryImages]);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl.trim() || !imageAlt.trim()) return alert("Por favor, ingresa la URL y el texto alternativo de la imagen.");

    if (editingImageIndex !== null) {
      const copia = [...galleryImages];
      copia[editingImageIndex] = { thumb: imageUrl.trim(), full: imageUrl.trim(), alt: imageAlt.trim(), large: isLarge };
      setGalleryImages(copia);
      setEditingImageIndex(null);
    } else {
      setGalleryImages([...galleryImages, { thumb: imageUrl.trim(), full: imageUrl.trim(), alt: imageAlt.trim(), large: isLarge }]);
    }
    setImageUrl(''); setImageAlt(''); setIsLarge(false);
  };

  const startEditImage = (idx) => {
    setEditingImageIndex(idx);
    setImageUrl(galleryImages[idx].full);
    setImageAlt(galleryImages[idx].alt);
    setIsLarge(galleryImages[idx].large);
  };

  const deleteImage = (idx) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      setGalleryImages(galleryImages.filter((_, i) => i !== idx));
    }
  };

  // --- Cuadro de Honor State & Logic ---
  const [honorStudents, setHonorStudents] = useState(() => {
    const stored = localStorage.getItem('honorStudents');
    return stored ? JSON.parse(stored) : [];
  });
  const [studentPhoto, setStudentPhoto] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentAchievement, setStudentAchievement] = useState('');
  const [studentSubject, setStudentSubject] = useState('');
  const [editingStudentIndex, setEditingStudentIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('honorStudents', JSON.stringify(honorStudents));
  }, [honorStudents]);

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentPhoto.trim() || !studentName.trim() || !studentAchievement.trim() || !studentSubject.trim()) {
      return alert("Por favor, completa todos los campos del estudiante.");
    }

    const existe = honorStudents.some((s, idx) => 
      s.name.toLowerCase() === studentName.trim().toLowerCase() && idx !== editingStudentIndex
    );
    if (existe) return alert("Este estudiante ya se encuentra en el Cuadro de Honor.");

    if (editingStudentIndex !== null) {
      const copia = [...honorStudents];
      copia[editingStudentIndex] = { photo: studentPhoto.trim(), name: studentName.trim(), achievement: studentAchievement.trim(), subject: studentSubject.trim() };
      setHonorStudents(copia);
      setEditingStudentIndex(null);
    } else {
      setHonorStudents([...honorStudents, { photo: studentPhoto.trim(), name: studentName.trim(), achievement: studentAchievement.trim(), subject: studentSubject.trim() }]);
    }
    setStudentPhoto(''); setStudentName(''); setStudentAchievement(''); setStudentSubject('');
  };

  const startEditStudent = (idx) => {
    setEditingStudentIndex(idx);
    setStudentPhoto(honorStudents[idx].photo);
    setStudentName(honorStudents[idx].name);
    setStudentAchievement(honorStudents[idx].achievement);
    setStudentSubject(honorStudents[idx].subject);
  };

  const deleteStudent = (idx) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este estudiante del Cuadro de Honor?')) {
      setHonorStudents(honorStudents.filter((_, i) => i !== idx));
    }
  };

  return (
    <main className="container" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Panel de Administración</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Gestión de Contenidos</h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--destructive)', fontWeight: 'bold' }}>
          ⚠️ Importante: Esta es una funcionalidad de demostración. En un entorno real, esto requeriría un backend y autenticación segura.
        </p>
      </div>

      {/* Navegación por pestañas */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', borderBottom: '2px solid #e2e8f0', marginBottom: '3rem' }}>
        <button
          onClick={() => setActiveTab('docentes')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'docentes' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'docentes' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          🧑‍🏫 Docentes
        </button>
        <button
          onClick={() => setActiveTab('galeria')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'galeria' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'galeria' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          📸 Galería
        </button>
        <button
          onClick={() => setActiveTab('cuadro-honor')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'cuadro-honor' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'cuadro-honor' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          🏆 Cuadro de Honor
        </button>
        <button
          onClick={() => setActiveTab('constitucion')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'constitucion' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'constitucion' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          ⚖️ Horas Legales
        </button>
      </div>

      {/* Contenido de la pestaña activa */}
      {activeTab === 'docentes' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Docentes</h3>
          <form onSubmit={handleDocenteSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Nombre Completo</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={nombreDocente} onChange={e => setNombreDocente(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Área</label>
                <select value={areaDocente} onChange={e => setAreaDocente(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff' }}>
                  <option value="">Seleccionar...</option>
                  {AREAS_ESTATICAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Cargo</label>
                <input type="text" value={cargoDocente} onChange={e => setCargoDocente(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff' }} />
              </div>
            </div>
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }}>
              {editingDocenteIndex !== null ? 'Guardar Cambios' : 'Registrar Docente'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {docentes.map((d, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary)', margin: 0 }}>{d.nombre}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold' }}>{d.area}</p>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>{d.cargo}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => startEditDocente(idx)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => deleteDocente(idx)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'galeria' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Galería</h3>
          <form onSubmit={handleImageSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>URL de la Imagen</label>
              <input type="url" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Texto Alternativo (Alt)</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={imageAlt} onChange={e => setImageAlt(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="isLarge" checked={isLarge} onChange={e => setIsLarge(e.target.checked)} />
              <label htmlFor="isLarge">Mostrar como imagen grande en la sección principal</label>
            </div>
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }}>
              {editingImageIndex !== null ? 'Actualizar Imagen' : 'Añadir Imagen'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {galleryImages.map((img, idx) => (
              <div key={idx} className="card" style={{ padding: '1rem' }}>
                <img src={img.thumb} alt={img.alt} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.8rem', margin: 0 }}>{img.alt}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => startEditImage(idx)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}>Editar</button>
                  <button onClick={() => deleteImage(idx)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', background: 'var(--destructive)' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'cuadro-honor' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Cuadro de Honor</h3>
          <form onSubmit={handleStudentSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>URL Foto Estudiante</label>
              <input type="url" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={studentPhoto} onChange={e => setStudentPhoto(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Nombre Estudiante</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={studentName} onChange={e => setStudentName(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Logro Destacado</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={studentAchievement} onChange={e => setStudentAchievement(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Materia/Área</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={studentSubject} onChange={e => setStudentSubject(e.target.value)} />
            </div>
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }}>
              {editingStudentIndex !== null ? 'Actualizar Estudiante' : 'Añadir Estudiante'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {honorStudents.map((s, idx) => (
              <div key={idx} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                <img src={s.photo} alt={s.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.5rem' }} />
                <h4 style={{ color: 'var(--primary)', margin: 0 }}>{s.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)', margin: '0.2rem 0' }}>{s.achievement}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 'bold' }}>{s.subject}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'center' }}>
                  <button onClick={() => startEditStudent(idx)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}>Editar</button>
                  <button onClick={() => deleteStudent(idx)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', background: 'var(--destructive)' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'constitucion' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Horas Sociales y Constitucionales</h3>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>📝 Estudios Constitucionales (50 Horas)</h4>
              <p><strong>Enlace del cuestionario:</strong></p>
              <input 
                type="text" 
                readOnly 
                value="https://docs.google.com/document/d/1GSEw_Ux95-nIH1HiC6cpgiilCefcE_op7sCAzC0pjIs/edit?usp=sharing"
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: '4px' }}
              />
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>🤝 Servicio Social Estudiantil (80 Horas)</h4>
              <p><strong>Estado del Proyecto:</strong></p>
              <div style={{ padding: '1rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '8px', fontSize: '0.9rem' }}>
                <strong>Fase actual:</strong> Inscripciones abiertas para proyectos comunitarios y alfabetización. 
                Los formatos de asistencia se entregan en coordinación.
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                Próximamente: Subida digital de planillas de cumplimiento.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}