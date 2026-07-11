import { useEffect } from 'react';
import Hero from '../components/Hero';
import NosotrosSection from '../components/NosotrosSection';
import SedesSection from '../components/SedesSection';
import OfertaSection from '../components/OfertaSection';
import HimnoSection from '../components/HimnoSection';
import HistoriaSection from '../components/HistoriaSection';
import GaleriaSection from '../components/GaleriaSection';
import ContactoSection from '../components/ContactoSection';

export default function PaginaPrincipal() {
  useEffect(() => { document.title = 'I.E. Ignacio Yepes Yepes — Institución Educativa, Remedios Antioquia'; }, []);
  return (
    <>
      <main>
        <Hero />
        <NosotrosSection />
        <SedesSection />
        <OfertaSection />
        <HimnoSection />
        <HistoriaSection />
        <GaleriaSection />
        <ContactoSection />
      </main>
    </>
  );
}
