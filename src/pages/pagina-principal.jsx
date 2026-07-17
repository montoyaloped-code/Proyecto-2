import { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import NosotrosSection from '../components/NosotrosSection';
import SedesSection from '../components/SedesSection';
import OfertaSection from '../components/OfertaSection';
import HimnoSection from '../components/HimnoSection';
import HistoriaSection from '../components/HistoriaSection';
import GaleriaSection from '../components/GaleriaSection';
import ContactoSection from '../components/ContactoSection';

export default function PaginaPrincipal() {
  const mainRef = useRef(null);

  useEffect(() => { document.title = 'I.E. Ignacio Yepes Yepes — Institución Educativa, Remedios Antioquia'; }, []);

  useEffect(() => {
    const sections = mainRef.current?.querySelectorAll('section');
    if (!sections?.length) return;

    sections.forEach(s => s.classList.add('reveal-section'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  return (
    <>
      <main ref={mainRef}>
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
