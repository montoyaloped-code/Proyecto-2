
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './componets/pagina-principal.jsx'
import Sedes from './pages/sedes.jsx'
import Docencia from './pages/docencia.jsx'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/docencia" element={<Docencia />} />
      </Routes>
    </BrowserRouter>
  )
}

