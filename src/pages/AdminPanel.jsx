import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useImageUpload } from '../hooks/useImageUpload';
import { Menu, X } from 'lucide-react';
import '../App.css';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('directivos');
  const [loading, setLoading] = useState(true);

  const [adminMobileMenuOpen, setAdminMobileMenuOpen] = useState(false);

  const toggleAdminMobileMenu = () => {
    setAdminMobileMenuOpen(!adminMobileMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setAdminMobileMenuOpen(false);
  };

  const { uploadImage, uploading } = useImageUpload();

  // --- Docentes State & Logic ---
  const [docentes, setDocentes] = useState([]);
  const [nombreDocente, setNombreDocente] = useState('');
  const [areaDocente, setAreaDocente] = useState('');
  const [cargoDocente, setCargoDocente] = useState('Docente de Aula');
  const [fotoDocente, setFotoDocente] = useState('');
  const [fotoDocenteFile, setFotoDocenteFile] = useState(null);
  const [editingDocenteId, setEditingDocenteId] = useState(null);

  const AREAS_ESTATICAS = [
    "Ciencias Naturales", "Ciencias Sociales", "Educación Artística",
    "Educación Ética", "Educación Física", "Humanidades (Español e Inglés)",
    "Matemáticas", "Tecnología e Informática", "Religión"
  ];

  // --- Galería State & Logic ---
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [isLarge, setIsLarge] = useState(false);
  const [editingImageId, setEditingImageId] = useState(null);

  // --- Cuadro de Honor State & Logic ---
  const [honorStudents, setHonorStudents] = useState([]);
  const [studentPhoto, setStudentPhoto] = useState('');
  const [studentPhotoFile, setStudentPhotoFile] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentAchievement, setStudentAchievement] = useState('');
  const [studentSubject, setStudentSubject] = useState('');
  const [editingStudentId, setEditingStudentId] = useState(null);

  // --- Directivos State & Logic ---
  const [directivos, setDirectivos] = useState([]);
  const [nombreDirectivo, setNombreDirectivo] = useState('');
  const [cargoDirectivo, setCargoDirectivo] = useState('');
  const [editingDirectivoId, setEditingDirectivoId] = useState(null);

  const CARGOS_DIRECTIVOS = ["Rector", "Coordinador Académico", "Coordinador de Convivencia", "Secretario(a)"];

  // --- Historia State & Logic ---
  const [historyEvents, setHistoryEvents] = useState([]);
  const [historyYear, setHistoryYear] = useState('');
  const [historyTitle, setHistoryTitle] = useState('');
  const [historyDesc, setHistoryDesc] = useState('');
  const [editingHistoryId, setEditingHistoryId] = useState(null);

  // --- Salud Mental (Psicología) State & Logic ---
  const [psicologiaTemas, setPsicologiaTemas] = useState([]);
  const [psicIcon, setPsicIcon] = useState('');
  const [psicTitle, setPsicTitle] = useState('');
  const [psicShort, setPsicShort] = useState('');
  const [psicDetails, setPsicDetails] = useState('');
  const [editingPsicId, setEditingPsicId] = useState(null);

  // --- Transparencia (Ley 1712) State & Logic ---
  const [transparenciaDocs, setTransparenciaDocs] = useState([]);
  const [docName, setDocName] = useState('');
  const [docSize, setDocSize] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [editingDocId, setEditingDocId] = useState(null);

  // --- Sedes State & Logic ---
  const [sedes, setSedes] = useState([]);
  const [sedeForm, setSedeForm] = useState({
    name: '', tipo: 'Urbana', location: '', students: '', img: '', desc: '', salones: '', cancha: false, informatica: false, extras: ''
  });
  const [editingSedeId, setEditingSedeId] = useState(null);
  const [sedeImgFile, setSedeImgFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // ===================== FETCH FUNCTIONS =====================

  const fetchDocentes = async () => {
    const { data, error } = await supabase.from('docentes').select('*').order('nombre');
    if (error) {
      console.error("Error fetching docentes:", error);
    } else {
      setDocentes(data || []);
    }
  };

  const fetchGallery = async () => {
    const { data, error } = await supabase.from('galeria').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching gallery images:", error);
    } else {
      setGalleryImages(data || []);
    }
  };

  const fetchHonorStudents = async () => {
    const { data, error } = await supabase.from('cuadro_honor').select('*');
    if (error) {
      console.error("Error fetching honor students:", error);
    } else {
      setHonorStudents(data || []);
    }
  };

  const fetchDirectivos = async () => {
    const { data, error } = await supabase.from('directivos').select('*');
    if (error) {
      console.error("Error fetching directivos:", error);
    } else {
      setDirectivos(data || []);
    }
  };

  const fetchHistory = async () => {
    const { data, error } = await supabase.from('historia').select('*').order('año');
    if (error) {
      console.error("Error fetching history events:", error);
    } else {
      setHistoryEvents(data || []);
    }
  };

  const fetchPsicologia = async () => {
    const { data, error } = await supabase.from('psicologia').select('*');
    if (error) {
      console.error("Error fetching psicologia themes:", error);
    } else {
      setPsicologiaTemas(data || []);
    }
  };

  const fetchTransparencia = async () => {
    const { data, error } = await supabase.from('transparencia').select('*');
    if (error) {
      console.error("Error fetching transparencia documents:", error);
    } else {
      setTransparenciaDocs(data || []);
    }
  };

  const fetchSedes = async () => {
    const { data, error } = await supabase.from('sedes').select('*');
    if (error) {
      console.error("Error fetching sedes:", error);
    } else {
      setSedes(data || []);
    }
  };

  // ===================== INIT =====================

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
      setLoading(false);
    };
    loadInitialData();
  }, []);

  // ===================== DOCENTES CRUD =====================

  const handleDocenteSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!areaDocente || !nombreDocente.trim()) return alert("Por favor, completa el nombre y selecciona un área académica.");

    let fotoUrl = fotoDocente.trim();
    if (fotoDocenteFile) {
      try {
        fotoUrl = await uploadImage(fotoDocenteFile, 'docentes');
      } catch (err) {
        console.error("Error uploading image:", err);
        setErrorMessage("Error al subir la imagen. Intenta de nuevo.");
        return;
      }
    }

    const payload = { nombre: nombreDocente.trim(), area: areaDocente, cargo: cargoDocente.trim(), foto: fotoUrl };

    try {
      if (editingDocenteId) {
        await supabase.from('docentes').update(payload).eq('id', editingDocenteId);
        setEditingDocenteId(null);
      } else {
        await supabase.from('docentes').insert([payload]);
      }
      setNombreDocente(''); setAreaDocente(''); setCargoDocente('Docente de Aula');
      setFotoDocente(''); setFotoDocenteFile(null);
      fetchDocentes();
    } catch (err) {
      console.error("Error saving docente:", err);
      setErrorMessage("Error al guardar el docente. Revisa la conexión e intenta de nuevo.");
    }
  };

  const startEditDocente = (docente) => {
    setEditingDocenteId(docente.id);
    setNombreDocente(docente.nombre);
    setAreaDocente(docente.area);
    setCargoDocente(docente.cargo);
    setFotoDocente(docente.foto || '');
    setFotoDocenteFile(null);
  };

  const deleteDocente = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este docente?')) {
      setErrorMessage('');
      try {
        const { error } = await supabase.from('docentes').delete().eq('id', id);
        if (error) throw error;
        fetchDocentes();
      } catch (err) {
        console.error("Error deleting docente:", err);
        setErrorMessage("Error al eliminar el docente. Intenta de nuevo.");
      }
    }
  };

  // ===================== GALERÍA CRUD =====================

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!imageUrl.trim() || !imageAlt.trim()) return alert("Por favor, ingresa la URL y el texto alternativo de la imagen.");
    const payload = { thumb: imageUrl.trim(), full: imageUrl.trim(), alt: imageAlt.trim(), large: isLarge };

    try {
      let operation;
      if (editingImageId) {
        operation = supabase.from('galeria').update(payload).eq('id', editingImageId);
      } else {
        operation = supabase.from('galeria').insert([payload]);
      }
      const { error } = await operation;
      if (error) throw error;
      setImageUrl(''); setImageAlt(''); setIsLarge(false);
      setEditingImageId(null);
      fetchGallery();
    } catch (err) {
      console.error("Error saving image:", err);
      setErrorMessage("Error al guardar la imagen. Intenta de nuevo.");
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
      setErrorMessage('');
      try {
        const { error } = await supabase.from('galeria').delete().eq('id', id);
        if (error) throw error;
        fetchGallery();
      } catch (err) {
        console.error("Error deleting image:", err);
        setErrorMessage("Error al eliminar la imagen. Intenta de nuevo.");
      }
    }
  };

  // ===================== CUADRO DE HONOR CRUD =====================

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!studentName.trim() || !studentAchievement.trim() || !studentSubject.trim()) {
      return alert("Por favor, completa todos los campos del estudiante.");
    }

    let photoUrl = studentPhoto.trim();
    if (studentPhotoFile) {
      try {
        photoUrl = await uploadImage(studentPhotoFile, 'cuadro-honor');
      } catch (err) {
        console.error("Error uploading image:", err);
        setErrorMessage("Error al subir la foto. Intenta de nuevo.");
        return;
      }
    } else if (!photoUrl) {
      return alert("Debes seleccionar una foto o proporcionar una URL.");
    }

    const payload = { photo: photoUrl, name: studentName.trim(), achievement: studentAchievement.trim(), subject: studentSubject.trim() };

    try {
      let operation;
      if (editingStudentId) {
        operation = supabase.from('cuadro_honor').update(payload).eq('id', editingStudentId);
      } else {
        operation = supabase.from('cuadro_honor').insert([payload]);
      }
      const { error } = await operation;
      if (error) throw error;
      setStudentPhoto(''); setStudentPhotoFile(null);
      setStudentName(''); setStudentAchievement(''); setStudentSubject('');
      setEditingStudentId(null);
      fetchHonorStudents();
    } catch (err) {
      console.error("Error saving honor student:", err);
      setErrorMessage("Error al guardar el estudiante. Intenta de nuevo.");
    }
  };

  const startEditStudent = (student) => {
    setEditingStudentId(student.id);
    setStudentPhoto(student.photo);
    setStudentPhotoFile(null);
    setStudentName(student.name);
    setStudentAchievement(student.achievement);
    setStudentSubject(student.subject);
  };

  const deleteStudent = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este estudiante del Cuadro de Honor?')) {
      setErrorMessage('');
      try {
        const { error } = await supabase.from('cuadro_honor').delete().eq('id', id);
        if (error) throw error;
        fetchHonorStudents();
      } catch (err) {
        console.error("Error deleting honor student:", err);
        setErrorMessage("Error al eliminar el estudiante. Intenta de nuevo.");
      }
    }
  };

  // ===================== DIRECTIVOS CRUD =====================

  const handleDirectivoSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nombreDirectivo.trim() || !cargoDirectivo) return alert("Por favor, completa el nombre y selecciona un cargo.");
    const payload = { nombre: nombreDirectivo.trim(), cargo: cargoDirectivo };

    try {
      let error;
      if (editingDirectivoId) {
        const res = await supabase.from('directivos').update(payload).eq('id', editingDirectivoId);
        error = res.error;
      } else {
        const res = await supabase.from('directivos').insert([payload]);
        error = res.error;
      }
      if (error) throw error;
      setEditingDirectivoId(null);
      setNombreDirectivo(''); setCargoDirectivo('');
      fetchDirectivos();
    } catch (err) {
      console.error("Error saving directivo:", err);
      setErrorMessage("Error al guardar el directivo. Intenta de nuevo.");
    }
  };

  const deleteDirectivo = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este directivo?')) {
      setErrorMessage('');
      try {
        const { error } = await supabase.from('directivos').delete().eq('id', id);
        if (error) throw error;
        fetchDirectivos();
      } catch (err) {
        console.error("Error deleting directivo:", err);
        setErrorMessage("Error al eliminar el directivo. Intenta de nuevo.");
      }
    }
  };

  // ===================== HISTORIA CRUD =====================

  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!historyYear.trim() || !historyTitle.trim() || !historyDesc.trim()) return alert("Completa todos los campos.");
    const payload = { año: historyYear.trim(), titulo: historyTitle.trim(), desc: historyDesc.trim() };

    try {
      let operation;
      if (editingHistoryId !== null) {
        operation = supabase.from('historia').update(payload).eq('id', editingHistoryId);
      } else {
        operation = supabase.from('historia').insert([payload]);
      }
      const { error } = await operation;
      if (error) throw error;
      setHistoryYear(''); setHistoryTitle(''); setHistoryDesc('');
      setEditingHistoryId(null);
      fetchHistory();
    } catch (err) {
      console.error("Error saving history event:", err);
      setErrorMessage("Error al guardar el evento histórico. Intenta de nuevo.");
    }
  };

  const deleteHistory = async (id) => {
    if (window.confirm('¿Eliminar este evento histórico?')) {
      setErrorMessage('');
      try {
        const { error } = await supabase.from('historia').delete().eq('id', id);
        if (error) throw error;
        fetchHistory();
      } catch (err) {
        console.error("Error deleting history event:", err);
        setErrorMessage("Error al eliminar el evento. Intenta de nuevo.");
      }
    }
  };

  // ===================== PSICOLOGÍA CRUD =====================

  const handlePsicSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!psicTitle.trim() || !psicShort.trim() || !psicDetails.trim()) return alert("Completa todos los campos.");
    const payload = { icon: psicIcon.trim(), title: psicTitle.trim(), short: psicShort.trim(), details: psicDetails.trim() };

    try {
      let operation;
      if (editingPsicId) {
        operation = supabase.from('psicologia').update(payload).eq('id', editingPsicId);
      } else {
        operation = supabase.from('psicologia').insert([payload]);
      }
      const { error } = await operation;
      if (error) throw error;
      setPsicIcon(''); setPsicTitle(''); setPsicShort(''); setPsicDetails('');
      setEditingPsicId(null);
      fetchPsicologia();
    } catch (err) {
      console.error("Error saving psicologia theme:", err);
      setErrorMessage("Error al guardar el tema de salud mental. Intenta de nuevo.");
    }
  };

  const deletePsic = async (id) => {
    if (window.confirm('¿Eliminar este tema de salud mental?')) {
      setErrorMessage('');
      try {
        const { error } = await supabase.from('psicologia').delete().eq('id', id);
        if (error) throw error;
        fetchPsicologia();
      } catch (err) {
        console.error("Error deleting psicologia theme:", err);
        setErrorMessage("Error al eliminar el tema. Intenta de nuevo.");
      }
    }
  };

  // ===================== TRANSPARENCIA CRUD =====================

  const handleDocSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!docName.trim() || !docSize.trim() || !docUrl.trim()) return alert("Completa todos los campos.");
    const payload = { name: docName.trim(), size: docSize.trim(), url: docUrl.trim() };

    try {
      const { error } = editingDocId
        ? await supabase.from('transparencia').update(payload).eq('id', editingDocId)
        : await supabase.from('transparencia').insert([payload]);
      if (error) throw error;
      setEditingDocId(null);
      setDocName(''); setDocSize(''); setDocUrl('');
      fetchTransparencia();
    } catch (err) {
      console.error("Error saving document:", err);
      setErrorMessage("Error al guardar el documento. Intenta de nuevo.");
    }
  };

  const deleteDoc = async (id) => {
    if (window.confirm('¿Eliminar este documento de transparencia?')) {
      setErrorMessage('');
      try {
        const { error } = await supabase.from('transparencia').delete().eq('id', id);
        if (error) throw error;
        fetchTransparencia();
      } catch (err) {
        console.error("Error deleting document:", err);
        setErrorMessage("Error al eliminar el documento. Intenta de nuevo.");
      }
    }
  };

  // ===================== SEDES CRUD =====================

  const handleSedeSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    let imgUrl = sedeForm.img.trim();
    if (sedeImgFile) {
      try {
        imgUrl = await uploadImage(sedeImgFile, 'sedes');
      } catch (err) {
        console.error("Error uploading image:", err);
        setErrorMessage("Error al subir la imagen. Intenta de nuevo.");
        return;
      }
    }

    const payload = {
      slug: sedeForm.name.toLowerCase().replace(/\s+/g, '-'),
      name: sedeForm.name,
      tipo: sedeForm.tipo,
      location: sedeForm.location,
      students: parseInt(sedeForm.students),
      img: imgUrl,
      description: sedeForm.desc.split('\n').filter(p => p.trim()),
      infra: {
        salones: parseInt(sedeForm.salones),
        cancha: sedeForm.cancha,
        informatica: sedeForm.informatica,
        extras: sedeForm.extras.split(',').map(ex => ex.trim()).filter(ex => ex !== "")
      }
    };

    try {
      let operation;
      if (editingSedeId) {
        operation = supabase.from('sedes').update(payload).eq('id', editingSedeId);
      } else {
        operation = supabase.from('sedes').insert([payload]);
      }
      const { error } = await operation;
      if (error) throw error;
      setEditingSedeId(null);
      setSedeForm({ name: '', tipo: 'Urbana', location: '', students: '', img: '', desc: '', salones: '', cancha: false, informatica: false, extras: '' });
      setSedeImgFile(null);
      fetchSedes();
    } catch (err) {
      console.error("Error saving sede:", err);
      setErrorMessage("Error al guardar la sede. Intenta de nuevo.");
    }
  };

  // ===================== RENDER =====================

  if (loading) {
    return (
      <main className="container admin-panel-main">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container admin-panel-main">
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Panel de Administración</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Gestión de Contenidos</h2>
      </div>

      {errorMessage && (
        <div style={{
          background: 'var(--destructive)',
          color: '#fff',
          padding: '0.75rem 1.25rem',
          borderRadius: '0.75rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          {errorMessage}
          <button
            onClick={() => setErrorMessage('')}
            style={{
              marginLeft: '1rem',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: '0.5rem',
              padding: '0.2rem 0.6rem',
              cursor: 'pointer'
            }}
          >
            X
          </button>
        </div>
      )}

      <button
        className="admin-hamburger"
        type="button"
        onClick={toggleAdminMobileMenu}
        aria-label="Abrir menú de administración"
        aria-expanded={adminMobileMenuOpen}
      >
        {adminMobileMenuOpen ? <><X size={18} /> Cerrar Menú</> : <><Menu size={18} /> Gestión de Contenidos</>}
      </button>

      <div className={`admin-tabs-nav ${adminMobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => handleTabClick('directivos')} className={`admin-tab-button ${activeTab === 'directivos' ? 'active' : ''}`}>🏛️ Directivos</button>
        <button onClick={() => handleTabClick('docentes')} className={`admin-tab-button ${activeTab === 'docentes' ? 'active' : ''}`}>🧑‍🏫 Docentes</button>
        <button onClick={() => handleTabClick('galeria')} className={`admin-tab-button ${activeTab === 'galeria' ? 'active' : ''}`}>📸 Galería</button>
        <button onClick={() => handleTabClick('historia')} className={`admin-tab-button ${activeTab === 'historia' ? 'active' : ''}`}>📜 Historia</button>
        <button onClick={() => handleTabClick('sedes')} className={`admin-tab-button ${activeTab === 'sedes' ? 'active' : ''}`}>🏫 Sedes</button>
        <button onClick={() => handleTabClick('psicologia')} className={`admin-tab-button ${activeTab === 'psicologia' ? 'active' : ''}`}>🧠 Salud Mental</button>
        <button onClick={() => handleTabClick('transparencia')} className={`admin-tab-button ${activeTab === 'transparencia' ? 'active' : ''}`}>📂 Atención Ciudadana</button>
        <button onClick={() => handleTabClick('cuadro-honor')} className={`admin-tab-button ${activeTab === 'cuadro-honor' ? 'active' : ''}`}>🏆 Cuadro de Honor</button>
        <button onClick={() => handleTabClick('constitucion')} className={`admin-tab-button ${activeTab === 'constitucion' ? 'active' : ''}`}>⚖️ Horas Legales</button>
      </div>

      {activeTab === 'directivos' && (
        <section>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Gestión de Directivos</h3>
          <form onSubmit={handleDirectivoSubmit} className="admin-form">
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" required value={nombreDirectivo} onChange={e => setNombreDirectivo(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Cargo</label>
              <select value={cargoDirectivo} onChange={e => setCargoDirectivo(e.target.value)} required>
                <option value="">Seleccionar cargo...</option>
                {CARGOS_DIRECTIVOS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-submit">
              {editingDirectivoId !== null ? 'Guardar Cambios' : 'Registrar Directivo'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {directivos.map((d) => (
              <div key={d.id} className="card" style={{ padding: '1.5rem' }}>
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
          <form onSubmit={handleDocenteSubmit} className="admin-form">
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" required value={nombreDocente} onChange={e => setNombreDocente(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Foto</label>
              <input type="file" accept="image/*" onChange={e => setFotoDocenteFile(e.target.files[0])} />
              {(fotoDocenteFile || fotoDocente) && (
                <div style={{ marginTop: '0.5rem' }}>
                  <img
                    src={fotoDocenteFile ? URL.createObjectURL(fotoDocenteFile) : fotoDocente}
                    alt="Preview"
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
                  />
                  {fotoDocente && !fotoDocenteFile && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', marginTop: '0.25rem' }}>URL actual: {fotoDocente}</p>
                  )}
                </div>
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Área</label>
                <select value={areaDocente} onChange={e => setAreaDocente(e.target.value)} required>
                  <option value="">Seleccionar...</option>
                  {AREAS_ESTATICAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Cargo</label>
                <input type="text" value={cargoDocente} onChange={e => setCargoDocente(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn-submit" disabled={uploading}>
              {uploading ? 'Subiendo imagen...' : (editingDocenteId !== null ? 'Guardar Cambios' : 'Registrar Docente')}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {docentes.map((d) => (
              <div key={d.id} className="card" style={{ padding: '1.5rem' }}>
                  {d.foto && (
                  <img src={d.foto} alt={d.nombre} loading="lazy" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '2px solid var(--primary)' }} />
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
          <form onSubmit={handleImageSubmit} className="admin-form">
            <div className="form-group">
              <label>URL de la Imagen</label>
              <input type="url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Texto Alternativo (Alt)</label>
              <input type="text" required value={imageAlt} onChange={e => setImageAlt(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="isLarge" checked={isLarge} onChange={e => setIsLarge(e.target.checked)} />
              <label htmlFor="isLarge" style={{ margin: 0 }}>Mostrar como imagen grande en la sección principal</label>
            </div>
            <button type="submit" className="btn-submit">
              {editingImageId !== null ? 'Actualizar Imagen' : 'Añadir Imagen'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {galleryImages.map((img) => (
              <div key={img.id} className="card" style={{ padding: '1rem' }}>
                  <img src={img.thumb} alt={img.alt} loading="lazy" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.5rem' }} />
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
          <form onSubmit={handleHistorySubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group" style={{ flex: '0 0 150px' }}>
                <label>Año</label>
                <input type="text" required placeholder="Ej: 1939" value={historyYear} onChange={e => setHistoryYear(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Título del Suceso</label>
                <input type="text" required value={historyTitle} onChange={e => setHistoryTitle(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Descripción Detallada</label>
              <textarea rows="4" required value={historyDesc} onChange={e => setHistoryDesc(e.target.value)}></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button type="submit" className="btn-submit">
                {editingHistoryId !== null ? 'Guardar Cambios' : 'Registrar Hito Histórico'}
              </button>
              {editingHistoryId !== null && (
                <button type="button" className="btn" style={{ background: 'var(--muted)', color: 'var(--foreground)' }} onClick={() => {
                  setEditingHistoryId(null);
                  setHistoryYear('');
                  setHistoryTitle('');
                  setHistoryDesc('');
                }}>
                  Cancelar edición
                </button>
              )}
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {historyEvents.map((h) => (
              <div key={h.id} className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--primary)' }}>
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

          <form onSubmit={handleSedeSubmit} className="admin-form" style={{ border: '2px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ color: 'var(--primary)', margin: 0 }}>{editingSedeId !== null ? 'Modificando Sede' : 'Agregar Nueva Sede'}</h4>
                <p style={{ margin: '0.5rem 0 0', color: 'var(--muted-fg)' }}>
                  {editingSedeId !== null ? 'Edita los datos de la sede seleccionada y guarda los cambios.' : 'Completa el formulario para añadir una nueva sede institucional.'}
                </p>
              </div>
              {editingSedeId !== null && (
                <button type="button" onClick={() => {
                  setEditingSedeId(null);
                  setSedeForm({ name: '', tipo: 'Urbana', location: '', students: '', img: '', desc: '', salones: '', cancha: false, informatica: false, extras: '' });
                  setSedeImgFile(null);
                }} className="btn" style={{ background: 'var(--muted)', padding: '0.4rem 0.8rem' }}>
                  Cancelar edición
                </button>
              )}
            </div>
            <div className="form-row">
              <input type="text" placeholder="Nombre de la Sede" required value={sedeForm.name} onChange={e => setSedeForm({...sedeForm, name: e.target.value})} />
              <select value={sedeForm.tipo} onChange={e => setSedeForm({...sedeForm, tipo: e.target.value})}>
                <option value="Urbana">Urbana</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
            <input type="text" placeholder="Ubicación" required value={sedeForm.location} onChange={e => setSedeForm({...sedeForm, location: e.target.value})} />
            <div className="form-row">
              <input type="number" placeholder="Cantidad estudiantes" required value={sedeForm.students} onChange={e => setSedeForm({...sedeForm, students: e.target.value})} />
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>Imagen de la Sede</label>
                <input type="file" accept="image/*" onChange={e => setSedeImgFile(e.target.files[0])} />
                {(sedeImgFile || sedeForm.img) && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img
                      src={sedeImgFile ? URL.createObjectURL(sedeImgFile) : sedeForm.img}
                      alt="Preview"
                      style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '0.5rem' }}
                    />
                    {sedeForm.img && !sedeImgFile && (
                      <p style={{ fontSize: '0.7rem', color: 'var(--muted-fg)', marginTop: '0.25rem' }}>URL actual: {sedeForm.img}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <textarea placeholder="Descripción detallada (cada párrafo en línea separada)" rows="3" required value={sedeForm.desc} onChange={e => setSedeForm({...sedeForm, desc: e.target.value})}></textarea>
            <div className="form-row" style={{ alignItems: 'center' }}>
              <input type="number" placeholder="N° Salones" value={sedeForm.salones} onChange={e => setSedeForm({...sedeForm, salones: e.target.value})} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><input type="checkbox" checked={sedeForm.cancha} onChange={e => setSedeForm({...sedeForm, cancha: e.target.checked})} /> Cancha</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><input type="checkbox" checked={sedeForm.informatica} onChange={e => setSedeForm({...sedeForm, informatica: e.target.checked})} /> Informática</label>
            </div>
            <input type="text" placeholder="Extras (separados por coma: Biblioteca, Comedor, etc.)" value={sedeForm.extras} onChange={e => setSedeForm({...sedeForm, extras: e.target.value})} />
            <button type="submit" className="btn-submit" disabled={uploading}>
              {uploading ? 'Subiendo imagen...' : (editingSedeId !== null ? 'Guardar Cambios en la Sede' : 'Agregar Sede')}
            </button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {sedes.map((s) => (
              <div key={s.id} className="card" style={{ padding: '1rem' }}>
                <img src={s.img} alt={s.name} loading="lazy" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                <h4 style={{ margin: '0.5rem 0' }}>{s.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>{s.location} | {s.students} Est.</p>
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={() => {
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                    const infra = s?.infra || {};
                    const descValue = Array.isArray(s?.description) ? s.description.join('\n') : (typeof s?.description === 'string' ? s.description : '');
                    const extrasValue = Array.isArray(infra.extras) ? infra.extras.join(', ') : (typeof infra.extras === 'string' ? infra.extras : '');
                    setEditingSedeId(s.id);
                    setSedeForm({
                      name: s?.name || '',
                      tipo: s?.tipo || 'Urbana',
                      location: s?.location || '',
                      students: s?.students ?? '',
                      img: s?.img || '',
                      desc: descValue,
                      salones: infra?.salones ?? '',
                      cancha: infra?.cancha ?? false,
                      informatica: infra?.informatica ?? false,
                      extras: extrasValue
                    });
                    setSedeImgFile(null);
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
            {psicologiaTemas.map((t) => (
              <div key={t.id} className="card" style={{ padding: '1.5rem' }}>
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
            {transparenciaDocs.map((d) => (
              <div key={d.id} className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Foto del Estudiante</label>
              <input type="file" accept="image/*" onChange={e => setStudentPhotoFile(e.target.files[0])} />
              {(studentPhotoFile || studentPhoto) && (
                <div style={{ marginTop: '0.5rem' }}>
                  <img
                    src={studentPhotoFile ? URL.createObjectURL(studentPhotoFile) : studentPhoto}
                    alt="Preview"
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
                  />
                  {studentPhoto && !studentPhotoFile && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', marginTop: '0.25rem' }}>URL actual: {studentPhoto}</p>
                  )}
                </div>
              )}
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
            <button type="submit" className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.85rem' }} disabled={uploading}>
              {uploading ? 'Subiendo imagen...' : (editingStudentId !== null ? 'Actualizar Estudiante' : 'Añadir Estudiante')}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {honorStudents.map((s) => (
              <div key={s.id} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                <img src={s.photo} alt={s.name} loading="lazy" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.5rem' }} />
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
