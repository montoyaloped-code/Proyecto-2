import Hero from '../componets/Hero';
import NosotrosSection from '../componets/NosotrosSection';
import SedesSection from '../componets/SedesSection';
import OfertaSection from '../componets/OfertaSection';
import HimnoSection from '../componets/HimnoSection';
import HistoriaSection from '../componets/HistoriaSection';
import GaleriaSection from '../componets/GaleriaSection';
import ContactoSection from '../componets/ContactoSection';
import Footer from '../componets/Footer';

export default function PaginaPrincipal() {
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
