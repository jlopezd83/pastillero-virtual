import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Medicamento } from '../types';
import { generarId, obtenerFechaHoy } from '../utils/helpers';

interface AgregarMedicamentoProps {
  medicamentos: Medicamento[];
  setMedicamentos: (medicamentos: Medicamento[]) => void;
}

const AgregarMedicamento = ({ medicamentos, setMedicamentos }: AgregarMedicamentoProps) => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [dosis, setDosis] = useState('');
  const [momentos, setMomentos] = useState<('desayuno' | 'comida' | 'cena')[]>([]);
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
  const [tieneFechaFin, setTieneFechaFin] = useState(false);

  const momentosDisponibles = ['desayuno', 'comida', 'cena'] as const;

  const toggleMomento = (momento: 'desayuno' | 'comida' | 'cena') => {
    setMomentos(prev => 
      prev.includes(momento) 
        ? prev.filter(m => m !== momento)
        : [...prev, momento]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre.trim() || !dosis.trim() || momentos.length === 0) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const nuevoMedicamento: Medicamento = {
      id: generarId(),
      nombre: nombre.trim(),
      dosis: dosis.trim(),
      momentos,
      activo: true,
      fechaCreacion: obtenerFechaHoy(),
      fechaFinalizacion: tieneFechaFin ? fechaFinalizacion : undefined
    };

    setMedicamentos([...medicamentos, nuevoMedicamento]);
    
    // Limpiar formulario
    setNombre('');
    setDosis('');
    setMomentos([]);
    setFechaFinalizacion('');
    setTieneFechaFin(false);
    
    // Navegar a la página principal
    navigate('/');
  };

  return (
    <div className="agregar-medicamento">
      <div className="agregar-header">
        <div className="agregar-icon">➕</div>
        <h2>Agregar Nuevo Medicamento</h2>
        <p>Completa la información de tu medicamento</p>
      </div>
      
      <form onSubmit={handleSubmit} className="form-medicamento">
        <div className="form-group">
          <label htmlFor="nombre">
            <span className="label-icon">💊</span>
            Nombre del medicamento
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Paracetamol"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dosis">
            <span className="label-icon">📏</span>
            Dosis
          </label>
          <input
            type="text"
            id="dosis"
            value={dosis}
            onChange={(e) => setDosis(e.target.value)}
            placeholder="Ej: 1 comprimido de 500mg"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <span className="label-icon">⏰</span>
            ¿Cuándo tomarlo?
          </label>
          <div className="momentos-grid">
            {momentosDisponibles.map(momento => {
              const iconos = {
                desayuno: '🌅',
                comida: '🌞',
                cena: '🌙'
              };
              
              return (
                <label key={momento} className={`momento-card ${momentos.includes(momento) ? 'seleccionado' : ''}`}>
                  <input
                    type="checkbox"
                    checked={momentos.includes(momento)}
                    onChange={() => toggleMomento(momento)}
                  />
                  <div className="momento-card-content">
                    <span className="momento-card-icon">{iconos[momento]}</span>
                    <span className="momento-card-text">
                      {momento.charAt(0).toUpperCase() + momento.slice(1)}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label>
            <span className="label-icon">📅</span>
            Duración del tratamiento
          </label>
          <div className="duracion-options">
            <label className="duracion-option">
              <input
                type="radio"
                name="duracion"
                checked={!tieneFechaFin}
                onChange={() => setTieneFechaFin(false)}
              />
              <div className="duracion-content">
                <span className="duracion-icon">♾️</span>
                <span className="duracion-text">Sin fecha de finalización</span>
              </div>
            </label>
            <label className="duracion-option">
              <input
                type="radio"
                name="duracion"
                checked={tieneFechaFin}
                onChange={() => setTieneFechaFin(true)}
              />
              <div className="duracion-content">
                <span className="duracion-icon">⏰</span>
                <span className="duracion-text">Hasta una fecha específica</span>
              </div>
            </label>
          </div>
          
          {tieneFechaFin && (
            <div className="fecha-finalizacion">
              <label htmlFor="fecha-finalizacion" className="fecha-label">
                Fecha de finalización:
              </label>
              <input
                type="date"
                id="fecha-finalizacion"
                value={fechaFinalizacion}
                onChange={(e) => setFechaFinalizacion(e.target.value)}
                min={obtenerFechaHoy()}
                required={tieneFechaFin}
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            <span className="btn-icon">💾</span>
            <span className="btn-text">Agregar Medicamento</span>
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            <span className="btn-icon">❌</span>
            <span className="btn-text">Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarMedicamento; 