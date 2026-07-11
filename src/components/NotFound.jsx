import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => { document.title = 'Página no encontrada | I.E. Ignacio Yepes Yepes'; }, []);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--background)'
    }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ color: 'var(--foreground)', marginBottom: '1rem' }}>Página no encontrada</h2>
      <p style={{ color: 'var(--muted-text)', marginBottom: '1.5rem', maxWidth: '400px' }}>
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="btn"
        style={{ padding: '0.75rem 2rem', textDecoration: 'none' }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
