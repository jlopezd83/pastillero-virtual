import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <h1>💊 Pastillero Virtual</h1>
        <p className="header-subtitle">Controla tu medicación diaria</p>
      </div>
      <nav className="nav">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📅</span>
          <span className="nav-text">Calendario</span>
        </Link>
        <Link 
          to="/resumen" 
          className={location.pathname === '/resumen' ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-text">Resumen</span>
        </Link>
        <Link 
          to="/agregar" 
          className={location.pathname === '/agregar' ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">➕</span>
          <span className="nav-text">Agregar</span>
        </Link>
        <Link 
          to="/historial" 
          className={location.pathname === '/historial' ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">Historial</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header; 