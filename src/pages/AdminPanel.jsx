import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css'; // Import global styles

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('directivos'); // 'directivos', 'docentes', 'galeria', 'cuadro-honor', 'constitucion', 'historia', 'psicologia', 'transparencia', 'sedes'

  // --- Docentes State & Logic ---
  const [docentes, setDocentes] = useState([]);
  const [nombreDocente, setNombreDocente] = useState('');
  const [areaDocente, setAreaDocente] = useState('');
  const [cargoDocente, setCargoDocente] = useState('Docente de Aula');
  const [fotoDocente, setFotoDocente] = useState('');
  const [editingDocenteId, setEditingDocenteId] = useState(null);

  const AREAS_ESTATICAS = [
    "Ciencias Naturales", "Ciencias Sociales", "Educación Artística",
    "Educación Ética", "Educación Física", "Humanidades (Español e Inglés)",
    "Matemáticas", "Tecnología e Informática", "Religión"
  ];

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        fetchDocentes(),
        fetchGallery(),
        fetchHonorStudents(),
        fetchDirectivos(),
        fetchHistory(),
        fetchPsicologia(),
        fetchTransparencia(),
        fetchSedes()
      ]);
    };
    loadInitialData();
  }, []);

  const fetchDocentes = async () => {
    const { data, error } = await supabase.from('docentes').select('*').order('nombre');
    if (error) {
      console.error("Error fetching docentes:", error);
    } else {
      setDocentes(data || []);
    }
  };

  const handleDocenteSubmit = async (e) => {
    e.preventDefault();
    if (!areaDocente || !nombreDocente.trim()) return alert("Por favor, completa el nombre y selecciona un área académica.");
    const payload = { nombre: nombreDocente.trim(), area: areaDocente, cargo: cargoDocente.trim(), foto: fotoDocente.trim() };

    if (editingDocenteId) {
      await supabase.from('docentes').update(payload).eq('id', editingDocenteId);
      setEditingDocenteId(null);
    } else {
      await supabase.from('docentes').insert([payload]);
    }
    setNombreDocente(''); setAreaDocente(''); setCargoDocente('Docente de Aula'); setFotoDocente('');
    fetchDocentes();
  };

  const startEditDocente = (docente) => {
    setEditingDocenteId(docente.id);
    setNombreDocente(docente.nombre);
    setAreaDocente(docente.area);
    setCargoDocente(docente.cargo);
    setFotoDocente(docente.foto || '');
  };

  const deleteDocente = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este docente?')) {
      const { error } = await supabase.from('docentes').delete().eq('id', id);
      if (error) {
        console.error("Error deleting docente:", error);
      } else {
        fetchDocentes();
      }
    }
  };

  // --- Galería State & Logic ---
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [isLarge, setIsLarge] = useState(false);
  const [editingImageId, setEditingImageId] = useState(null);

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = async () => {
    const { data, error } = await supabase.from('galeria').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching gallery images:", error);
    } else {
      setGalleryImages(data || []);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim() || !imageAlt.trim()) return alert("Por favor, ingresa la URL y el texto alternativo de la imagen.");
    const payload = { thumb: imageUrl.trim(), full: imageUrl.trim(), alt: imageAlt.trim(), large: isLarge };

    let operation;
    if (editingImageId) {
      operation = supabase.from('galeria').update(payload).eq('id', editingImageId);
    } else {
      operation = supabase.from('galeria').insert([payload]);
    }
    const { error } = await operation;
    if (error) {
      console.error("Error saving image:", error);
    } else {
      setImageUrl(''); setImageAlt(''); setIsLarge(false);
      fetchGallery();
    }
  };

  const startEditImage = (img) => {
    setEditingImageId(img.id);
    setImageUrl(img.full);
    setImageAlt(img.alt);
    setIsLarge(img.large);
  };

  const deleteImage = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      const { error } = await supabase.from('galeria').delete().eq('id', id);
      if (error) {
        console.error("Error deleting image:", error);
      } else {
        fetchGallery();
      }
    }
  };

  // --- Cuadro de Honor State & Logic ---
  const [honorStudents, setHonorStudents] = useState([]);
  const [studentPhoto, setStudentPhoto] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentAchievement, setStudentAchievement] = useState('');
  const [studentSubject, setStudentSubject] = useState('');
  const [editingStudentId, setEditingStudentId] = useState(null);

  const fetchHonorStudents = async () => {
    const { data, error } = await supabase.from('cuadro_honor').select('*');
    if (error) {
      console.error("Error fetching honor students:", error);
    } else {
      setHonorStudents(data || []);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!studentPhoto.trim() || !studentName.trim() || !studentAchievement.trim() || !studentSubject.trim()) {
      return alert("Por favor, completa todos los campos del estudiante.");
    }
    const payload = { photo: studentPhoto.trim(), name: studentName.trim(), achievement: studentAchievement.trim(), subject: studentSubject.trim() };
    
    let operation;
    if (editingStudentId) {
      operation = supabase.from('cuadro_honor').update(payload).eq('id', editingStudentId);
    } else {
      operation = supabase.from('cuadro_honor').insert([payload]);
    }
    const { error } = await operation;
    if (error) {
      console.error("Error saving honor student:", error);
    } else {
      setStudentPhoto(''); setStudentName(''); setStudentAchievement(''); setStudentSubject('');
      fetchHonorStudents();
    }
  };

  const startEditStudent = (student) => {
    setEditingStudentId(student.id);
    setStudentPhoto(student.photo);
    setStudentName(student.name);
    setStudentAchievement(student.achievement);
    setStudentSubject(student.subject);
  };

  const deleteStudent = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este estudiante del Cuadro de Honor?')) {
      const { error } = await supabase.from('cuadro_honor').delete().eq('id', id);
      if (error) {
        console.error("Error deleting honor student:", error);
      } else {
        fetchHonorStudents();
      }
    }
  };

  // --- Directivos State & Logic ---
  const [directivos, setDirectivos] = useState([]);
  const [nombreDirectivo, setNombreDirectivo] = useState('');
  const [cargoDirectivo, setCargoDirectivo] = useState('');
  const [editingDirectivoId, setEditingDirectivoId] = useState(null);

  const CARGOS_DIRECTIVOS = ["Rector", "Coordinador Académico", "Coordinador de Convivencia", "Secretario(a)"];

  const fetchDirectivos = async () => {
    const { data, error } = await supabase.from('directivos').select('*');
    if (error) {
      console.error("Error fetching directivos:", error);
    } else {
      setDirectivos(data || []);
    }
  };

  const handleDirectivoSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombreDirectivo.trim() || !cargoDirectivo) return alert("Por favor, completa el nombre y selecciona un cargo.");
    const payload = { nombre: nombreDirectivo.trim(), cargo: cargoDirectivo };

    let error;
    if (editingDirectivoId) {
      const res = await supabase.from('directivos').update(payload).eq('id', editingDirectivoId);
      error = res.error;
      setEditingDirectivoId(null);
    } else {
      const res = await supabase.from('directivos').insert([payload]);
      error = res.error;
    }

    if (error) {
      console.error("Error saving directivo:", error);
    } else {
      setNombreDirectivo(''); setCargoDirectivo('');
      fetchDirectivos();
    }
  };

  const deleteDirectivo = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este directivo?')) {
      await supabase.from('directivos').delete().eq('id', id);
      fetchDirectivos();
    }
  };

  // --- Historia State & Logic ---
  const [historyEvents, setHistoryEvents] = useState([]);
  const [historyYear, setHistoryYear] = useState('');
  const [historyTitle, setHistoryTitle] = useState('');
  const [historyDesc, setHistoryDesc] = useState('');
  const [editingHistoryId, setEditingHistoryId] = useState(null);

  const fetchHistory = async () => {
    // Nota: Si cambias el nombre de la columna en la DB a 'anio', actualiza esto aquí.
    const { data, error } = await supabase.from('historia').select('*').order('año');
    if (error) {
      console.error("Error fetching history events:", error);
    } else {
      setHistoryEvents(data || []);
    }
  };

  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    if (!historyYear.trim() || !historyTitle.trim() || !historyDesc.trim()) return alert("Completa todos los campos.");
    const payload = { año: historyYear.trim(), titulo: historyTitle.trim(), desc: historyDesc.trim() };

    let operation;
    if (editingHistoryId) {
      operation = supabase.from('historia').update(payload).eq('id', editingHistoryId);
    } else {
      operation = supabase.from('historia').insert([payload]);
    }
    const { error } = await operation;
    if (error) {
      console.error("Error saving history event:", error);
    } else {
      setHistoryYear(''); setHistoryTitle(''); setHistoryDesc('');
      fetchHistory();
    }
  };

  const deleteHistory = async (id) => {
    if (window.confirm('¿Eliminar este evento histórico?')) {
      await supabase.from('historia').delete().eq('id', id);
      fetchHistory();
    }
  };

  // --- Salud Mental (Psicología) State & Logic ---
  const [psicologiaTemas, setPsicologiaTemas] = useState([]);
  const [psicIcon, setPsicIcon] = useState('');
  const [psicTitle, setPsicTitle] = useState('');
  const [psicShort, setPsicShort] = useState('');
  const [psicDetails, setPsicDetails] = useState('');
  const [editingPsicId, setEditingPsicId] = useState(null);

  const fetchPsicologia = async () => {
    const { data, error } = await supabase.from('psicologia').select('*');
    if (error) {
      console.error("Error fetching psicologia themes:", error);
    } else {
      setPsicologiaTemas(data || []);
    }
  };

  const handlePsicSubmit = async (e) => {
    e.preventDefault();
    if (!psicIcon.trim() || !psicTitle.trim() || !psicShort.trim() || !psicDetails.trim()) return alert("Completa todos los campos.");
    const payload = { icon: psicIcon.trim(), title: psicTitle.trim(), short: psicShort.trim(), details: psicDetails.trim() };

    let operation;
    if (editingPsicId) {
      operation = supabase.from('psicologia').update(payload).eq('id', editingPsicId);
    } else {
      operation = supabase.from('psicologia').insert([payload]);
    }
    const { error } = await operation;
    if (error) {
      console.error("Error saving psicologia theme:", error);
    } else {
      setPsicIcon(''); setPsicTitle(''); setPsicShort(''); setPsicDetails('');
      fetchPsicologia();
    }
  };

  const deletePsic = async (id) => {
    if (window.confirm('¿Eliminar este tema de salud mental?')) {
      await supabase.from('psicologia').delete().eq('id', id);
      fetchPsicologia();
    }
  };

  // --- Transparencia (Ley 1712) State & Logic ---
  const [transparenciaDocs, setTransparenciaDocs] = useState([]);
  const [docName, setDocName] = useState('');
  const [docSize, setDocSize] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [editingDocId, setEditingDocId] = useState(null);

  const fetchTransparencia = async () => {
    const { data, error } = await supabase.from('transparencia').select('*');
    if (error) {
      console.error("Error fetching transparencia documents:", error);
    } else {
      setTransparenciaDocs(data || []);
    }
  };

  const handleDocSubmit = async (e) => {
    e.preventDefault();
    if (!docName.trim() || !docSize.trim() || !docUrl.trim()) return alert("Completa todos los campos.");
    const payload = { name: docName.trim(), size: docSize.trim(), url: docUrl.trim() };

    const { error } = editingDocId 
      ? await supabase.from('transparencia').update(payload).eq('id', editingDocId)
      : await supabase.from('transparencia').insert([payload]);

    if (error) {
      console.error("Error saving document:", error);
    } else {
      setEditingDocId(null);
      setDocName(''); setDocSize(''); setDocUrl('');
      fetchTransparencia();
    }
  };

  const deleteDoc = async (id) => {
    if (window.confirm('¿Eliminar este documento de transparencia?')) {
      await supabase.from('transparencia').delete().eq('id', id);
      fetchTransparencia();
    }
  };

  const [sedes, setSedes] = useState([]);

  const [sedeForm, setSedeForm] = useState({
    name: '', tipo: 'Urbana', location: '', students: '', img: '', desc: '', salones: '', cancha: false, informatica: false, extras: ''
  });
  const [editingSedeId, setEditingSedeId] = useState(null);

  const fetchSedes = async () => {
    const { data, error } = await supabase.from('sedes').select('*');
    if (error) {
      console.error("Error fetching sedes:", error);
    } else {
      setSedes(data || []);
    }
  };

  const handleSedeSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      slug: sedeForm.name.toLowerCase().replace(/\s+/g, '-'),
      name: sedeForm.name,
      tipo: sedeForm.tipo,
      location: sedeForm.location,
      students: parseInt(sedeForm.students),
      img: sedeForm.img,
      description: [sedeForm.desc],
      infra: {
        salones: parseInt(sedeForm.salones),
        cancha: sedeForm.cancha,
        informatica: sedeForm.informatica,
        extras: sedeForm.extras.split(',').map(ex => ex.trim()).filter(ex => ex !== "")
      }
    };

    let operation;
    if (editingSedeId) {
      operation = supabase.from('sedes').update(payload).eq('id', editingSedeId);
    } else {
      operation = supabase.from('sedes').insert([payload]);
    }
    const { error } = await operation;
    if (error) {
      console.error("Error saving sede:", error);
    } else {
      setEditingSedeId(null);
      setSedeForm({ name: '', tipo: 'Urbana', location: '', students: '', img: '', desc: '', salones: '', cancha: false, informatica: false, extras: '' });
      fetchSedes();
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
          onClick={() => setActiveTab('directivos')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'directivos' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'directivos' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          🏛️ Directivos
        </button>
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
          onClick={() => setActiveTab('historia')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'historia' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'historia' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          📜 Historia
        </button>
        <button
          onClick={() => setActiveTab('sedes')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'sedes' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'sedes' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          🏫 Sedes
        </button>
        <button
          onClick={() => setActiveTab('psicologia')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'psicologia' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'psicologia' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          🧠 Salud Mental
        </button>
        <button
          onClick={() => setActiveTab('transparencia')}
          style={{ paddingBottom: '1rem', background: 'none', border: 'none', fontSize: '1.125rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'transparencia' ? 'var(--primary)' : 'var(--muted-fg)', borderBottom: activeTab === 'transparencia' ? '4px solid var(--primary)' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          📂 Atención Ciudadana
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
      {activeTab === 'directivos' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Directivos</h3>
          <form onSubmit={handleDirectivoSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Nombre Completo</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={nombreDirectivo} onChange={e => setNombreDirectivo(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Cargo</label>
              <select value={cargoDirectivo} onChange={e => setCargoDirectivo(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff' }}>
                <option value="">Seleccionar cargo...</option>
                {CARGOS_DIRECTIVOS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }}>
              {editingDirectivoId !== null ? 'Guardar Cambios' : 'Registrar Directivo'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {directivos.map((d, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary)', margin: 0 }}>{d.nombre}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold' }}>{d.cargo}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => { setEditingDirectivoId(d.id); setNombreDirectivo(d.nombre); setCargoDirectivo(d.cargo); }} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => deleteDirectivo(d.id)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'docentes' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Docentes</h3>
          <form onSubmit={handleDocenteSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Nombre Completo</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={nombreDocente} onChange={e => setNombreDocente(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>URL de la Foto (Opcional)</label>
              <input type="url" placeholder="https://ejemplo.com/foto.jpg" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', fontSize: '0.95rem' }} value={fotoDocente} onChange={e => setFotoDocente(e.target.value)} />
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
              {editingDocenteId !== null ? 'Guardar Cambios' : 'Registrar Docente'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {docentes.map((d, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                {d.foto && (
                  <img src={d.foto} alt={d.nombre} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '2px solid var(--primary)' }} />
                )}
                <h4 style={{ color: 'var(--primary)', margin: 0 }}>{d.nombre}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold' }}>{d.area}</p>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>{d.cargo}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => startEditDocente(d)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => deleteDocente(d.id)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
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
              {editingImageId !== null ? 'Actualizar Imagen' : 'Añadir Imagen'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {galleryImages.map((img, idx) => (
              <div key={idx} className="card" style={{ padding: '1rem' }}>
                <img src={img.thumb} alt={img.alt} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.8rem', margin: 0 }}>{img.alt}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => startEditImage(img)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}>Editar</button>
                  <button onClick={() => deleteImage(img.id)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', background: 'var(--destructive)' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'historia' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Historia Institucional</h3>
          <form onSubmit={handleHistorySubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Año</label>
                <input type="text" required placeholder="Ej: 1939" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff' }} value={historyYear} onChange={e => setHistoryYear(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Título del Suceso</label>
                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff' }} value={historyTitle} onChange={e => setHistoryTitle(e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Descripción Detallada</label>
              <textarea rows="4" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#fff', resize: 'vertical' }} value={historyDesc} onChange={e => setHistoryDesc(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }}>
              {editingHistoryId !== null ? 'Guardar Cambios' : 'Registrar Hito Histórico'}
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {historyEvents.map((h, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{h.año}</span>
                    <h4 style={{ color: 'var(--primary)', margin: '0.5rem 0' }}>{h.titulo}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)', margin: 0 }}>{h.desc}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => { setEditingHistoryId(h.id); setHistoryYear(h.año); setHistoryTitle(h.titulo); setHistoryDesc(h.desc); }} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                    <button onClick={() => deleteHistory(h.id)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
            {historyEvents.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted-fg)' }}>No hay eventos históricos registrados. Agrega uno arriba.</p>}
          </div>
        </section>
      )}

      {activeTab === 'sedes' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Sedes Institucionales</h3>
          
          {editingSedeId !== null ? (
            <form onSubmit={handleSedeSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '2px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ color: 'var(--primary)' }}>Modificando Sede</h4>
              <button type="button" onClick={() => setEditingSedeId(null)} className="btn" style={{ background: 'var(--muted)', padding: '0.4rem 0.8rem' }}>Cancelar</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="Nombre de la Sede" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.name} onChange={e => setSedeForm({...sedeForm, name: e.target.value})} />
              <select style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.tipo} onChange={e => setSedeForm({...sedeForm, tipo: e.target.value})}>
                <option value="Urbana">Urbana</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
            <input type="text" placeholder="Ubicación" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.location} onChange={e => setSedeForm({...sedeForm, location: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="number" placeholder="Cantidad estudiantes" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.students} onChange={e => setSedeForm({...sedeForm, students: e.target.value})} />
              <input type="url" placeholder="URL Imagen de la Sede" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.img} onChange={e => setSedeForm({...sedeForm, img: e.target.value})} />
            </div>
            <textarea placeholder="Descripción detallada" rows="3" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.desc} onChange={e => setSedeForm({...sedeForm, desc: e.target.value})}></textarea>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
              <input type="number" placeholder="N° Salones" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.salones} onChange={e => setSedeForm({...sedeForm, salones: e.target.value})} />
              <label><input type="checkbox" checked={sedeForm.cancha} onChange={e => setSedeForm({...sedeForm, cancha: e.target.checked})} /> Cancha</label>
              <label><input type="checkbox" checked={sedeForm.informatica} onChange={e => setSedeForm({...sedeForm, informatica: e.target.checked})} /> Informática</label>
            </div>
            <input type="text" placeholder="Extras (separados por coma: Biblioteca, Comedor, etc.)" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.extras} onChange={e => setSedeForm({...sedeForm, extras: e.target.value})} />
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white' }}>
              Guardar Cambios en la Sede
            </button>
          </form>
          ) : (
            <p style={{ marginBottom: '2rem', color: 'var(--muted-fg)' }}>Selecciona una sede del listado inferior para actualizar su información.</p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {sedes.map((s, idx) => (
              <div key={idx} className="card" style={{ padding: '1rem' }}>
                <img src={s.img} alt={s.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                <h4 style={{ margin: '0.5rem 0' }}>{s.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>{s.location} | {s.students} Est.</p>
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={(e) => {
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                    setEditingSedeId(s.id);
                    setSedeForm({
                      name: s.name, tipo: s.tipo, location: s.location, students: s.students, img: s.img,
                      desc: s.description ? s.description[0] : '', salones: s.infra.salones, cancha: s.infra.cancha,
                      informatica: s.infra.informatica, extras: s.infra.extras ? s.infra.extras.join(', ') : ''
                    });
                  }} className="btn" style={{ padding: '0.6rem', fontSize: '0.9rem', width: '100%', background: 'var(--primary)', color: 'white' }}>Gestionar Contenido</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'psicologia' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Salud Mental (Cards)</h3>
          <form onSubmit={handlePsicSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Icono (Emoji)</label>
                <input type="text" placeholder="🧠" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={psicIcon} onChange={e => setPsicIcon(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Título de la Card</label>
                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={psicTitle} onChange={e => setPsicTitle(e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Resumen Breve (Short)</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={psicShort} onChange={e => setPsicShort(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Detalle al Expandir</label>
              <textarea rows="4" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', resize: 'vertical' }} value={psicDetails} onChange={e => setPsicDetails(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }}>
              {editingPsicId !== null ? 'Guardar Cambios' : 'Registrar Card de Bienestar'}
            </button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {psicologiaTemas.map((t, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t.icon}</div>
                <h4 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>{t.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-fg)', margin: 0 }}>{t.short}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => { setEditingPsicId(t.id); setPsicIcon(t.icon); setPsicTitle(t.title); setPsicShort(t.short); setPsicDetails(t.details); }} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => deletePsic(t.id)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'transparencia' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Atención Ciudadana (Documentos Ley 1712)</h3>
          <form onSubmit={handleDocSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Nombre del Documento / Archivo</label>
              <input type="text" required placeholder="Ej: Directorio Institucional 2026" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={docName} onChange={e => setDocName(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Tamaño (Ej: 310 KB)</label>
                <input type="text" required placeholder="Ej: 310 KB" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={docSize} onChange={e => setDocSize(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>URL del PDF (Drive/Enlace)</label>
                <input type="url" required placeholder="https://..." style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={docUrl} onChange={e => setDocUrl(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }}>
              {editingDocId !== null ? 'Guardar Cambios' : 'Registrar Documento'}
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {transparenciaDocs.map((d, idx) => (
              <div key={idx} className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--foreground)' }}>{d.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>{d.size} · <a href={d.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Ver archivo</a></span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => { setEditingDocId(d.id); setDocName(d.name); setDocSize(d.size); setDocUrl(d.url); }} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => deleteDoc(d.id)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
                </div>
              </div>
            ))}
            {transparenciaDocs.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted-fg)' }}>No hay documentos registrados.</p>}
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
              {editingStudentId !== null ? 'Actualizar Estudiante' : 'Añadir Estudiante'}
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
                  <button onClick={() => startEditStudent(s)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}>Editar</button>
                  <button onClick={() => deleteStudent(s.id)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', background: 'var(--destructive)' }}>Eliminar</button>
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