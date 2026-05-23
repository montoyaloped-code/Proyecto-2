
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './pages/pagina-principal.jsx'
import Sedespages from './pages/SedesPages.jsx'
import DocenciaPages from './pages/docenciaPages.jsx'
import ContactoSection from './componets/ContactoSection.jsx'
import NosotrosSection from './componets/NosotrosSection.jsx'
import Header from './componets/Header.jsx'
import Footer from './componets/Footer.jsx'

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
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

