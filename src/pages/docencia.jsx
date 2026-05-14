import { Link } from 'react-router-dom';
import '../App.css';
import './sedes-style.css';


export default function Docencia() {
  return (
    <div>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <span className="escudo"><img src="ESCUDO.png" alt="ESCUDO" /></span>
            <span>I.E. Ignacio Yepes Yepes</span>
          </Link>
          <Link to="/" className="chip active">Volver al inicio</Link>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Docencia</span>
              <h2>Equipo docente</h2>
              <p>La I.E. Ignacio Yepes Yepes cuenta con 89 educadores, 3 coordinadores y 1 rector, vinculados al Sistema General de Participaciones de la Nación.</p>
            </div>

            <div className="grid" style={{ marginTop: '2.5rem' }}>
              <div className="card">
                <div className="card-body">
                  <h3>89</h3>
                  <p>Docentes activos</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h3>3</h3>
                  <p>Coordinadores</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h3>1</h3>
                  <p>Rector</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h3>3.000+</h3>
                  <p>Estudiantes atendidos</p>
                </div>
              </div>
            </div>

            <div className="section-head" style={{ marginTop: '3rem', textAlign: 'center' }}>
              <h2>Directivos</h2>
            </div>
            <div className="card" style={{ marginTop: '1rem', padding: '24px' }}>
              <div className="card-body">
                <h3>Rector</h3>
                <p>El cargo de rector ha sido ocupado históricamente por figuras como Jesús Orlando Valencia Díaz. Para el nombre actual, consultar con la secretaría.</p>
              </div>
            </div>

            <div className="section-head" style={{ marginTop: '3rem', textAlign: 'left' }}>
              <h3>Áreas académicas</h3>
            </div>
            <div className="card" style={{ marginTop: '1rem', padding: '24px' }}>
              <div className="card-body">
                <p>Ciencias Naturales · Ciencias Sociales · Educación Artística · Educación Ética · Educación Física · Humanidades (Español e Inglés) · Matemáticas · Tecnología e Informática · Religión</p>
              </div>
            </div>

            <div className="card" style={{ marginTop: '3rem', padding: '24px' }}>
              <div className="card-body">
                <p>Cerca del 35% del cuerpo docente corresponde a docentes en provisionalidad pendientes de concurso. La institución también cuenta con un grupo estable de docentes de carrera con amplia vocación y compromiso territorial.</p>
              </div>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link to="/" className="btn">Volver al inicio</Link>
            </div>
          </div>
        </section>
      </main>

      <footer>
        © I.E. Ignacio Yepes Yepes — Remedios, Antioquia
        <br />
        Página desarrollada por Sergio Andres Montoya Lopez - Desarrollador de Software
      </footer>
    </div>
  );
}
