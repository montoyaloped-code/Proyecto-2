import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// CORRECCIÓN DE RUTAS DE PÁGINAS (PascalCase uniforme)
import PaginaPrincipal from './pages/pagina-principal.jsx'
import SedesPages from './pages/SedesPages.jsx'
import DocenciaPages from './pages/docenciaPages.jsx'
import PsicologiaPages from './pages/PsicologiaPages.jsx'
import PortalAcademicoPages from './pages/PortalAcademicoPages.jsx'
import AtencionCiudadanaPages from './pages/AtencionCiudadanaPages.jsx'
import HistoriaSimbolosPages from './pages/HistoriaSimbolosPages.jsx'
import AdminPanel from './pages/AdminPanel.jsx'; // Importa el nuevo componente de administración unificado
import CuadroDeHonorPages from './pages/CuadroDeHonorPages.jsx'; // Nueva página de Cuadro de Honor
import HorasConstitucionalesPages from './pages/HorasConstitucionalesPages.jsx'; // Nueva página

// CORRECCIÓN DE LA CARPETA 'components' (Se corrigió la 'c' que faltaba)
import ContactoSection from './components/ContactoSection.jsx'
import NosotrosSection from './components/NosotrosSection.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HistoriaSection from './components/HistoriaSection.jsx'
import GaleriaPages from './pages/GaleriaPages.jsx'

function App() {
  // 1. Estado para el Modo Oscuro
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // 2. Inyección de la clase al body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/sedes" element={<SedesPages />} />
          <Route path="/docencia" element={<DocenciaPages />} />
          <Route path="/nosotros" element={<NosotrosSection />} />
          <Route path="/contacto" element={<ContactoSection />} />
          
          {/* RUTAS OFICIALES */}
          <Route path="/bienestar" element={<PsicologiaPages />} />
          <Route path="/portal-academico" element={<PortalAcademicoPages />} />
          <Route path="/atencion-ciudadana" element={<AtencionCiudadanaPages />} />
          <Route path="/HistoriaSimbolos" element={<HistoriaSimbolosPages />} />
          <Route path="/galeria-completa" element={<GaleriaPages />} />

          {/* RUTAS DE ADMINISTRACIÓN Y CUADRO DE HONOR */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/cuadro-de-honor" element={<CuadroDeHonorPages />} />
          <Route path="/horas-constitucionales" element={<HorasConstitucionalesPages />} />

        </Routes>
        
        <Footer />

















        

      </BrowserRouter>
    </div>
  );
}

export { App };
