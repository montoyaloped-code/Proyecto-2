import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
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
          <h2 style={{ color: 'var(--foreground)', marginBottom: '1rem' }}>Algo salió mal</h2>
          <p style={{ color: 'var(--muted-text)', marginBottom: '1.5rem' }}>
            Ocurrió un error inesperado. Intenta recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn"
            style={{ padding: '0.75rem 2rem' }}
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
