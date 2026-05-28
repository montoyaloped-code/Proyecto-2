import React from 'react';


const ModuloInduccion = () => {
  const urlPdfDrive = "https://drive.google.com/file/d/1r_3qLsGsr0iowkPFMA7_43KfD_eqgE2J/view?usp=sharing";

  return (
    <div className="card" style={{ padding: '24px' }}>
      <div className="card-body">
        <h2 style={{ fontSize: '36px', color: '#006400', marginTop: '0.5rem', textAlign: 'center' }}>
            Inducción para Docentes
        </h2>
        <div className='divider'></div>
        
        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
          Amigo docente, para acceder a la inducción, solo dé clic en el enlace y así podrás recibir su capacitación.
        </p>

        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <a 
            href={urlPdfDrive} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn"
          >
            Acceder a la Capacitación (Drive)
          </a>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '2rem', 
          borderTop: '1px solid #eee', 
          paddingTop: '1.5rem' 
        }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', margin: 0 }}>Rectora</p>
            <strong style={{ fontSize: '1.1rem' }}>Berlides Ochoa</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', margin: 0 }}>Coordinador Académico</p>
            <strong style={{ fontSize: '1.1rem' }}>Juan Carlos Carvajal</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuloInduccion;