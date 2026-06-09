import React, { useState, useEffect } from 'react';
import '../App.css'; // Import global styles

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('directivos'); // 'directivos', 'docentes', 'galeria', 'cuadro-honor', 'constitucion', 'historia', 'psicologia', 'transparencia', 'sedes'

  // --- Docentes State & Logic ---
  const [docentes, setDocentes] = useState(() => {
    const stored = localStorage.getItem('listaDocentes');
    return stored ? JSON.parse(stored) : [];
  });
  const [nombreDocente, setNombreDocente] = useState('');
  const [areaDocente, setAreaDocente] = useState('');
  const [cargoDocente, setCargoDocente] = useState('Docente de Aula');
  const [fotoDocente, setFotoDocente] = useState('');
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
      copia[editingDocenteIndex] = { nombre: nombreDocente.trim(), area: areaDocente, cargo: cargoDocente.trim(), foto: fotoDocente.trim() };
      setDocentes(copia);
      setEditingDocenteIndex(null);
    } else {
      setDocentes([...docentes, { nombre: nombreDocente.trim(), area: areaDocente, cargo: cargoDocente.trim(), foto: fotoDocente.trim() }]);
    }
    setNombreDocente(''); setAreaDocente(''); setCargoDocente('Docente de Aula'); setFotoDocente('');
  };

  const startEditDocente = (idx) => {
    setEditingDocenteIndex(idx);
    setNombreDocente(docentes[idx].nombre);
    setAreaDocente(docentes[idx].area);
    setCargoDocente(docentes[idx].cargo);
    setFotoDocente(docentes[idx].foto || '');
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

  // --- Directivos State & Logic ---
  const [directivos, setDirectivos] = useState(() => {
    const stored = localStorage.getItem('listaDirectivos');
    return stored ? JSON.parse(stored) : [];
  });
  const [nombreDirectivo, setNombreDirectivo] = useState('');
  const [cargoDirectivo, setCargoDirectivo] = useState('');
  const [editingDirectivoIndex, setEditingDirectivoIndex] = useState(null);

  const CARGOS_DIRECTIVOS = ["Rector", "Coordinador Académico", "Coordinador de Convivencia", "Secretario(a)"];

  useEffect(() => {
    localStorage.setItem('listaDirectivos', JSON.stringify(directivos));
  }, [directivos]);

  const handleDirectivoSubmit = (e) => {
    e.preventDefault();
    if (!nombreDirectivo.trim() || !cargoDirectivo) return alert("Por favor, completa el nombre y selecciona un cargo.");

    if (editingDirectivoIndex !== null) {
      const copia = [...directivos];
      copia[editingDirectivoIndex] = { nombre: nombreDirectivo.trim(), cargo: cargoDirectivo };
      setDirectivos(copia);
      setEditingDirectivoIndex(null);
    } else {
      setDirectivos([...directivos, { nombre: nombreDirectivo.trim(), cargo: cargoDirectivo }]);
    }
    setNombreDirectivo(''); setCargoDirectivo('');
  };

  const deleteDirectivo = (idx) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este directivo?')) {
      setDirectivos(directivos.filter((_, i) => i !== idx));
    }
  };

  // --- Historia State & Logic ---
  const HISTORIA_BASE = [
    { año: "1939", titulo: "Fundación y Primeros Pasos", desc: "El Presbítero Ignacio María Yepes Yepes, junto al querido médico local Israel Londoño, funda un colegio con recursos propios en la casa cural bajo el nombre de 'San Nicolás de Tolentino'. En sus inicios peregrinó por múltiples locales del municipio, incluyendo la plazoleta de Santa Bárbara y la plaza principal." },
    { año: "1948", titulo: "Nace la Escuela de Varones", desc: "El 20 de enero inicia labores la Escuela Urbana de Varones bajo la dirección de Gabriel Valencia. En 1959, mediante la ordenanza 021, se autoriza su funcionamiento mixto bajo el nombre de 'Escuela Urbana Integrada Remedios'." },
    { año: "1959", titulo: "Legalización y Raíces Femeninas", desc: "Se oficializa la 'Escuela de Niñas del Municipio de Remedios' mediante la Ordenanza Nº 21. Paralelamente, la Escuela Santa Teresita es asumida y dirigida por la congregación de las Hermanas Teresitas del Niño Jesús." },
    { año: "1963", titulo: "La Gran Disputa y División", desc: "Una fuerte disputa personal entre el alcalde de turno y el párroco divide el colegio en dos facciones: una permanece en el palacio municipal y la otra se traslada a la Casa Cural bajo la figura de 'Colegio Parroquial'." },
    { año: "1966", titulo: "Llegada al Alto de las Tapias", desc: "Mediante el Acuerdo Nº 11 del Concejo Municipal, se ordena la edificación definitiva en el icónico Alto de las Tapias, abriendo sus puertas con el nombre de 'Liceo Ignacio Yepes Yepes'." },
    { año: "1976", titulo: "Primera Promoción de Bachilleres", desc: "El 20 de noviembre de 1976 la institución otorga sus primeros títulos de bachiller, bajo la rectoría del señor Hugo de Jesús Castaño Hernández." },
    { año: "2003", titulo: "Fusión Definitiva: Nace la I.E.", desc: "El 6 de febrero de 2003 las escuelas urbanas integradas se unifican de forma definitiva con el Liceo, consolidando la estructura actual de la Institución Educativa Ignacio Yepes Yepes." }
  ];

  const [historyEvents, setHistoryEvents] = useState(() => {
    const stored = localStorage.getItem('listaHistoria');
    const parsed = stored ? JSON.parse(stored) : [];
    // Si no hay nada en el storage, cargamos la historia base para que el admin pueda extenderla
    return parsed.length > 0 ? parsed : HISTORIA_BASE;
  });
  const [historyYear, setHistoryYear] = useState('');
  const [historyTitle, setHistoryTitle] = useState('');
  const [historyDesc, setHistoryDesc] = useState('');
  const [editingHistoryIndex, setEditingHistoryIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('listaHistoria', JSON.stringify(historyEvents));
  }, [historyEvents]);

  const handleHistorySubmit = (e) => {
    e.preventDefault();
    if (!historyYear.trim() || !historyTitle.trim() || !historyDesc.trim()) return alert("Completa todos los campos.");

    const newEvent = { año: historyYear.trim(), titulo: historyTitle.trim(), desc: historyDesc.trim() };

    if (editingHistoryIndex !== null) {
      const copia = [...historyEvents];
      copia[editingHistoryIndex] = newEvent;
      setHistoryEvents(copia.sort((a, b) => a.año.localeCompare(b.año)));
      setEditingHistoryIndex(null);
    } else {
      const nuevaLista = [...historyEvents, newEvent];
      setHistoryEvents(nuevaLista.sort((a, b) => a.año.localeCompare(b.año)));
    }
    setHistoryYear(''); setHistoryTitle(''); setHistoryDesc('');
  };

  const deleteHistory = (idx) => {
    if (window.confirm('¿Eliminar este evento histórico?')) {
      setHistoryEvents(historyEvents.filter((_, i) => i !== idx));
    }
  };

  // --- Salud Mental (Psicología) State & Logic ---
  const [psicologiaTemas, setPsicologiaTemas] = useState(() => {
    const stored = localStorage.getItem('psicologiaTemas');
    return stored ? JSON.parse(stored) : [];
  });
  const [psicIcon, setPsicIcon] = useState('');
  const [psicTitle, setPsicTitle] = useState('');
  const [psicShort, setPsicShort] = useState('');
  const [psicDetails, setPsicDetails] = useState('');
  const [editingPsicIndex, setEditingPsicIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('psicologiaTemas', JSON.stringify(psicologiaTemas));
  }, [psicologiaTemas]);

  const handlePsicSubmit = (e) => {
    e.preventDefault();
    if (!psicIcon.trim() || !psicTitle.trim() || !psicShort.trim() || !psicDetails.trim()) return alert("Completa todos los campos.");
    
    const newTema = { 
      id: editingPsicIndex !== null ? psicologiaTemas[editingPsicIndex].id : Date.now(),
      icon: psicIcon.trim(), 
      title: psicTitle.trim(), 
      short: psicShort.trim(), 
      details: psicDetails.trim() 
    };

    if (editingPsicIndex !== null) {
      const copia = [...psicologiaTemas];
      copia[editingPsicIndex] = newTema;
      setPsicologiaTemas(copia);
      setEditingPsicIndex(null);
    } else {
      setPsicologiaTemas([...psicologiaTemas, newTema]);
    }
    setPsicIcon(''); setPsicTitle(''); setPsicShort(''); setPsicDetails('');
  };

  const deletePsic = (idx) => {
    if (window.confirm('¿Eliminar este tema de salud mental?')) {
      setPsicologiaTemas(psicologiaTemas.filter((_, i) => i !== idx));
    }
  };

  // --- Transparencia (Ley 1712) State & Logic ---
  const [transparenciaDocs, setTransparenciaDocs] = useState(() => {
    const stored = localStorage.getItem('transparenciaDocs');
    return stored ? JSON.parse(stored) : [];
  });
  const [docName, setDocName] = useState('');
  const [docSize, setDocSize] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [editingDocIndex, setEditingDocIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('transparenciaDocs', JSON.stringify(transparenciaDocs));
  }, [transparenciaDocs]);

  const handleDocSubmit = (e) => {
    e.preventDefault();
    if (!docName.trim() || !docSize.trim() || !docUrl.trim()) return alert("Completa todos los campos.");
    const newDoc = { name: docName.trim(), size: docSize.trim(), url: docUrl.trim() };
    if (editingDocIndex !== null) {
      const copia = [...transparenciaDocs];
      copia[editingDocIndex] = newDoc;
      setTransparenciaDocs(copia);
      setEditingDocIndex(null);
    } else {
      setTransparenciaDocs([...transparenciaDocs, newDoc]);
    }
    setDocName(''); setDocSize(''); setDocUrl('');
  };

  const deleteDoc = (idx) => {
    if (window.confirm('¿Eliminar este documento de transparencia?')) {
      setTransparenciaDocs(transparenciaDocs.filter((_, i) => i !== idx));
    }
  };

  // --- Sedes State & Logic ---
  const SEDES_COMPLETAS = [
    {
      slug: "liceo-principal",
      name: "Liceo Ignacio Yepes Yepes",
      tipo: "Urbana",
      location: "Zona urbana, Remedios, Antioquia",
      students: 1000,
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
      description: ["Sede principal de la institución y eje articulador de todo el proyecto educativo. Atiende los niveles de básica secundaria y media, formando jóvenes con sólidos valores académicos, humanos y ciudadanos."],
      infra: { salones: 28, cancha: true, informatica: true, extras: ["Biblioteca", "Laboratorio de ciencias", "Auditorio"] }
    },
    {
      slug: "eu-remedios",
      name: "E.U. Remedios",
      tipo: "Urbana",
      location: "Casco urbano, Remedios, Antioquia",
      students: 300,
      img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
      description: ["Escuela urbana dedicada a la formación de niños y niñas en preescolar y básica primaria, ubicada estratégicamente en el centro del municipio."],
      infra: { salones: 12, cancha: true, informatica: true, extras: ["Restaurante escolar"] }
    },
    {
      slug: "eu-santa-teresita",
      name: "E.U. Santa Teresita",
      tipo: "Urbana",
      location: "Barrio Santa Teresita, Remedios",
      students: 250,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80",
      description: ["Sede urbana que acompaña la primera infancia y la básica primaria en el barrio Santa Teresita, con una propuesta cercana a las familias."],
      infra: { salones: 10, cancha: true, informatica: true, extras: [] }
    },
    {
      slug: "cer-la-ceiba",
      name: "C.E.R. La Ceiba",
      tipo: "Rural",
      location: "Vereda La Ceiba, Remedios",
      students: 120,
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
      description: ["Centro educativo rural ubicado en la vereda La Ceiba, donde se imparte preescolar y básica primaria bajo el modelo de Escuela Nueva."],
      infra: { salones: 4, cancha: true, informatica: false, extras: ["Huerta escolar"] }
    },
    {
      slug: "cer-la-cruz",
      name: "C.E.R. La Cruz",
      tipo: "Rural",
      location: "Vereda La Cruz, Remedios",
      students: 100,
      img: "https://images.unsplash.com/photo-1488190211105-8a0e65b04d4e?w=1200&q=80",
      description: ["Sede rural que brinda educación preescolar y primaria a los niños y niñas de la vereda La Cruz y comunidades cercanas."],
      infra: { salones: 3, cancha: true, informatica: false, extras: [] }
    },
    {
      slug: "cer-la-gorgona",
      name: "C.E.R. La Gorgona",
      tipo: "Rural",
      location: "Vereda La Gorgona, Remedios",
      students: 90,
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
      description: ["Centro educativo rural que atiende a la población infantil de la vereda La Gorgona con metodología flexible adaptada al contexto rural."],
      infra: { salones: 3, cancha: true, informatica: true, extras: [] }
    },
    {
      slug: "cer-canaveral",
      name: "C.E.R. Cañaveral",
      tipo: "Rural",
      location: "Vereda Cañaveral, Remedios",
      students: 80,
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80",
      description: ["Sede rural enclavada en la vereda Cañaveral, comprometida con una educación pertinente y de calidad para la niñez campesina."],
      infra: { salones: 3, cancha: true, informatica: false, extras: [] }
    },
    {
      slug: "cer-el-popero",
      name: "C.E.R. El Popero",
      tipo: "Rural",
      location: "Vereda El Popero, Remedios",
      students: 70,
      img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
      description: ["Centro educativo de la vereda El Popero que ofrece formación primaria con un enfoque centrado en el estudiante y su entorno."],
      infra: { salones: 2, cancha: true, informatica: false, extras: [] }
    },
    {
      slug: "cer-martana",
      name: "C.E.R. Martaná",
      tipo: "Rural",
      location: "Vereda Martaná, Remedios",
      students: 60,
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
      description: ["Sede rural que acompaña a los niños y niñas de la vereda Martaná en su proceso de formación inicial y básica primaria."],
      infra: { salones: 2, cancha: true, informatica: false, extras: [] }
    }
  ];

  const [sedes, setSedes] = useState(() => {
    const stored = localStorage.getItem('listaSedes');
    const data = stored ? JSON.parse(stored) : [];
    return data.length > 0 ? data : SEDES_COMPLETAS;
  });

  const [sedeForm, setSedeForm] = useState({
    name: '', tipo: 'Urbana', location: '', students: '', img: '', desc: '', salones: '', cancha: false, informatica: false, extras: '', gallery: ''
  });
  const [editingSedeIndex, setEditingSedeIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('listaSedes', JSON.stringify(sedes));
  }, [sedes]);

  const handleSedeSubmit = (e) => {
    e.preventDefault();
    const newSede = {
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
        extras: sedeForm.extras.split(',').map(ex => ex.trim()).filter(ex => ex !== ""),
      },
      gallery: sedeForm.gallery.split(',').map(url => url.trim()).filter(url => url !== "")
    };

    if (editingSedeIndex !== null) {
      const copia = [...sedes];
      copia[editingSedeIndex] = newSede;
      setSedes(copia);
      alert(`Contenido de ${newSede.name} actualizado.`);
    }
    
    setEditingSedeIndex(null);
    setSedeForm({ name: '', tipo: 'Urbana', location: '', students: '', img: '', desc: '', salones: '', cancha: false, informatica: false, extras: '', gallery: '' });
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
              {editingDirectivoIndex !== null ? 'Guardar Cambios' : 'Registrar Directivo'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {directivos.map((d, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary)', margin: 0 }}>{d.nombre}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold' }}>{d.cargo}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button 
                    onClick={() => {
                      setEditingDirectivoIndex(idx);
                      setNombreDirectivo(d.nombre);
                      setCargoDirectivo(d.cargo);
                    }} 
                    className="btn" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  >
                    Editar
                  </button>
                  <button onClick={() => deleteDirectivo(idx)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
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
              {editingDocenteIndex !== null ? 'Guardar Cambios' : 'Registrar Docente'}
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
              {editingHistoryIndex !== null ? 'Guardar Cambios' : 'Registrar Hito Histórico'}
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
                    <button onClick={() => { setEditingHistoryIndex(idx); setHistoryYear(h.año); setHistoryTitle(h.titulo); setHistoryDesc(h.desc); }} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                    <button onClick={() => deleteHistory(idx)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
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
          
          {editingSedeIndex !== null ? (
            <form onSubmit={handleSedeSubmit} className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '2px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ color: 'var(--primary)' }}>Modificando: {sedes[editingSedeIndex].name}</h4>
              <button type="button" onClick={() => setEditingSedeIndex(null)} className="btn" style={{ background: 'var(--muted)', padding: '0.4rem 0.8rem' }}>Cancelar</button>
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
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem' }}>Galería de la Sede (URLs separadas por coma)</label>
              <textarea placeholder="https://url1.jpg, https://url2.jpg..." rows="2" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} value={sedeForm.gallery} onChange={e => setSedeForm({...sedeForm, gallery: e.target.value})}></textarea>
            </div>
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
                    setEditingSedeIndex(idx);
                    setSedeForm({
                      name: s.name, tipo: s.tipo, location: s.location, students: s.students, img: s.img,
                      desc: s.description ? s.description[0] : '', salones: s.infra.salones, cancha: s.infra.cancha,
                      informatica: s.infra.informatica, extras: s.infra.extras ? s.infra.extras.join(', ') : '',
                      gallery: s.gallery ? s.gallery.join(', ') : ''
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
              {editingPsicIndex !== null ? 'Guardar Cambios' : 'Registrar Card de Bienestar'}
            </button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {psicologiaTemas.map((t, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t.icon}</div>
                <h4 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>{t.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-fg)', margin: 0 }}>{t.short}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => { setEditingPsicIndex(idx); setPsicIcon(t.icon); setPsicTitle(t.title); setPsicShort(t.short); setPsicDetails(t.details); }} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => deletePsic(idx)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
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
              {editingDocIndex !== null ? 'Guardar Cambios' : 'Registrar Documento'}
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
                  <button onClick={() => { setEditingDocIndex(idx); setDocName(d.name); setDocSize(d.size); setDocUrl(d.url); }} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => deleteDoc(idx)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--destructive)' }}>Eliminar</button>
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