import Header from './Header';
import Hero from './Hero';
import NosotrosSection from './NosotrosSection';
import SedesSection from './SedesSection';
import OfertaSection from './OfertaSection';
import HimnoSection from './HimnoSection';
import HistoriaSection from './HistoriaSection';
import GaleriaSection from './GaleriaSection';
import ContactoSection from './ContactoSection';
import Footer from './Footer';

export default function PaginaPrincipal() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
