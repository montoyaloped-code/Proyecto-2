import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import ErrorBoundary from './components/ErrorBoundary.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ContactoSection from './components/ContactoSection.jsx'
import NosotrosSection from './components/NosotrosSection.jsx'
import HistoriaSection from './components/HistoriaSection.jsx'

const PaginaPrincipal = lazy(() => import('./pages/pagina-principal.jsx'))
const SedesPages = lazy(() => import('./pages/SedesPages.jsx'))
const DocenciaPages = lazy(() => import('./pages/docenciaPages.jsx'))
const PsicologiaPages = lazy(() => import('./pages/PsicologiaPages.jsx'))
const PortalAcademicoPages = lazy(() => import('./pages/PortalAcademicoPages.jsx'))
const AtencionCiudadanaPages = lazy(() => import('./pages/AtencionCiudadanaPages.jsx'))
const HistoriaSimbolosPages = lazy(() => import('./pages/HistoriaSimbolosPages.jsx'))
const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'))
const CuadroDeHonorPages = lazy(() => import('./pages/CuadroDeHonorPages.jsx'))
const HorasConstitucionalesPages = lazy(() => import('./pages/HorasConstitucionalesPages.jsx'))
const GaleriaPages = lazy(() => import('./pages/GaleriaPages.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))

function Loader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      background: 'var(--background)'
    }}>
      <div className="spinner" />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('img:not([loading])').forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <ScrollToTop />
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/sedes" element={<SedesPages />} />
            <Route path="/docencia" element={<DocenciaPages />} />
            <Route path="/nosotros" element={<NosotrosSection />} />
            <Route path="/contacto" element={<ContactoSection />} />

            <Route path="/bienestar" element={<PsicologiaPages />} />
            <Route path="/portal-academico" element={<PortalAcademicoPages />} />
            <Route path="/atencion-ciudadana" element={<AtencionCiudadanaPages />} />
            <Route path="/HistoriaSimbolos" element={<HistoriaSimbolosPages />} />
            <Route path="/galeria-completa" element={<GaleriaPages />} />

            <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
            <Route path="/cuadro-de-honor" element={<CuadroDeHonorPages />} />
            <Route path="/horas-constitucionales" element={<HorasConstitucionalesPages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export { App };
