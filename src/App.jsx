import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './pages/pagina-principal.jsx'
import Sedespages from './pages/SedesPages.jsx'
import DocenciaPages from './pages/docenciaPages.jsx'
import ContactoSection from './componets/ContactoSection.jsx'
import NosotrosSection from './componets/NosotrosSection.jsx'
import Header from './componets/Header.jsx'
import Footer from './componets/Footer.jsx'

// NUEVOS COMPONENTES ENLAZADOS
import PsicologiaPages from './pages/PsicologiaPages.jsx'
import PortalAcademicoPages from './pages/PortalAcademicoPages.jsx'
import AtencionCiudadanaPages from './pages/AtencionCiudadanaPages.jsx'
import HistoriaSection from './componets/HistoriaSection.jsx'
import HistoriaSimbolosPages from './pages/HistoriaSimbolosPages.jsx'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/sedes" element={<Sedespages />} />
        <Route path="/docencia" element={<DocenciaPages />} />
        <Route path="/nosotros" element={<NosotrosSection />} />
        <Route path="/contacto" element={<ContactoSection />} />
        
        {/* NUEVAS RUTAS OFICIALES */}
        <Route path="/bienestar" element={<PsicologiaPages />} />
        <Route path="/portal-academico" element={<PortalAcademicoPages />} />
        <Route path="/atencion-ciudadana" element={<AtencionCiudadanaPages />} />
        <Route path="/HistoriaSimbolos" element={<HistoriaSimbolosPages />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
