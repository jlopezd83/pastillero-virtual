import { useState } from 'react';
import type { Medicamento, RegistroMedicamento } from '../types';
import { obtenerFechaHoy, generarId, obtenerHoraActual } from '../utils/helpers';

interface HomeProps {
  medicamentos: Medicamento[];
  registros: RegistroMedicamento[];
  setRegistros: (registros: RegistroMedicamento[]) => void;
}

const Home = ({ medicamentos, registros, setRegistros }: HomeProps) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(obtenerFechaHoy());



  // Asegurar que registros sea siempre un array
  const registrosSeguros = Array.isArray(registros) ? registros : [];
  const medicamentosSeguros = Array.isArray(medicamentos) ? medicamentos : [];

  const momentos = ['desayuno', 'comida', 'cena'] as const;



  const marcarComoTomado = (medicamentoId: string, momento: 'desayuno' | 'comida' | 'cena') => {
    const fecha = fechaSeleccionada;
    
    // Buscar registro existente para esta combinación específica
    const registroExistente = registrosSeguros.find(
      r => r.medicamentoId === medicamentoId && 
           r.fecha === fecha && 
           r.momento === momento
    );

    if (registroExistente) {
      // Si existe, alternar el estado de tomado
      const nuevoEstado = !registroExistente.tomado;
      const nuevosRegistros = registrosSeguros.map(r => 
        r.id === registroExistente.id 
          ? { 
              ...r, 
              tomado: nuevoEstado, 
              horaTomado: nuevoEstado ? obtenerHoraActual() : undefined 
            }
          : r
      );
      setRegistros(nuevosRegistros);
    } else {
      // Si no existe, crear un nuevo registro como tomado
      const nuevoRegistro: RegistroMedicamento = {
        id: generarId(),
        medicamentoId,
        fecha,
        momento,
        tomado: true,
        horaTomado: obtenerHoraActual()
      };
      setRegistros([...registrosSeguros, nuevoRegistro]);
    }
  };

  const estaTomado = (medicamentoId: string, momento: 'desayuno' | 'comida' | 'cena') => {
    const registro = registrosSeguros.find(
      r => r.medicamentoId === medicamentoId && 
           r.fecha === fechaSeleccionada && 
           r.momento === momento
    );
    return registro ? registro.tomado : false;
  };

  // Función para depurar registros (temporal)
  const obtenerRegistrosDelDia = () => {
    return registrosSeguros.filter(r => r.fecha === fechaSeleccionada);
  };

  // Filtrar medicamentos activos y que no hayan expirado para la fecha seleccionada
  const medicamentosActivos = medicamentosSeguros.filter(m => {
    if (!m.activo) return false;
    
    // Si tiene fecha de finalización, verificar que no haya expirado para la fecha seleccionada
    if (m.fechaFinalizacion) {
      const fechaSeleccionadaObj = new Date(fechaSeleccionada);
      const fechaFin = new Date(m.fechaFinalizacion);
      // La fecha de finalización debe ser mayor o igual a la fecha seleccionada
      return fechaFin >= fechaSeleccionadaObj;
    }
    
    return true;
  });

  return (
    <div className="home">
      <div className="home-header">
        <div className="fecha-selector">
          <label htmlFor="fecha-input" className="fecha-label">
            <span className="fecha-icon">📅</span>
            Seleccionar fecha
          </label>
          <input
            type="date"
            id="fecha-input"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            className="fecha-input"
          />
        </div>
        
        <div className="resumen-dia">
          <div className="resumen-item">
            <span className="resumen-numero">{medicamentosActivos.length}</span>
            <span className="resumen-label">Medicamentos</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-numero">
              {registrosSeguros.filter(r => r.fecha === fechaSeleccionada && r.tomado).length}
            </span>
            <span className="resumen-label">Tomados hoy</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-numero">
              {obtenerRegistrosDelDia().length}
            </span>
            <span className="resumen-label">Total registros</span>
          </div>
        </div>
      </div>

      {medicamentosActivos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💊</div>
          <h3>
            {fechaSeleccionada === obtenerFechaHoy() 
              ? 'No hay medicamentos para hoy' 
              : `No hay medicamentos para el ${new Date(fechaSeleccionada).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}`
            }
          </h3>
          <p>
            {fechaSeleccionada === obtenerFechaHoy() 
              ? 'Ve a "Agregar" para añadir medicamentos o revisa el "Resumen" para activar medicamentos pausados'
              : 'Los medicamentos pueden haber expirado o estar pausados. Revisa el "Resumen" para más detalles'
            }
          </p>
        </div>
      ) : (
        <div className="medicamentos-hoy">
          {momentos.map(momento => {
            const medicamentosDelMomento = medicamentosActivos.filter(m => 
              m.momentos.includes(momento)
            );

            if (medicamentosDelMomento.length === 0) return null;

            const iconos = {
              desayuno: '🌅',
              comida: '🌞',
              cena: '🌙'
            };

            return (
              <div key={momento} className="momento-grupo">
                <div className="momento-header">
                  <span className="momento-icon">{iconos[momento]}</span>
                  <h2 className="momento-titulo">
                    {momento.charAt(0).toUpperCase() + momento.slice(1)}
                  </h2>
                  <span className="medicamentos-count">{medicamentosDelMomento.length}</span>
                </div>
                <div className="medicamentos-lista">
                  {medicamentosDelMomento.map(medicamento => (
                    <div key={medicamento.id} className="medicamento-item">
                      <div className="medicamento-icon">💊</div>
                      <div className="medicamento-info">
                        <h3>{medicamento.nombre}</h3>
                        <p className="medicamento-dosis">{medicamento.dosis}</p>
                        {estaTomado(medicamento.id, momento) && (
                          <p className="medicamento-tomado">
                            <span className="check-icon">✓</span> Tomado
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => marcarComoTomado(medicamento.id, momento)}
                        className={`btn-tomar ${estaTomado(medicamento.id, momento) ? 'tomado' : ''}`}
                      >
                        {estaTomado(medicamento.id, momento) ? (
                          <>
                            <span className="btn-icon">✓</span>
                            <span className="btn-text">Tomado</span>
                          </>
                        ) : (
                          <>
                            <span className="btn-icon">💊</span>
                            <span className="btn-text">Tomar</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home; 