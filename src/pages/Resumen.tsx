import { Link } from 'react-router-dom';
import type { Medicamento } from '../types';
import { formatearFecha } from '../utils/helpers';

interface ResumenProps {
  medicamentos: Medicamento[];
  setMedicamentos: (medicamentos: Medicamento[]) => void;
}

const Resumen = ({ medicamentos, setMedicamentos }: ResumenProps) => {
  const medicamentosSeguros = Array.isArray(medicamentos) ? medicamentos : [];

  const eliminarMedicamento = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este medicamento? Esta acción no se puede deshacer.')) {
      const nuevosMedicamentos = medicamentosSeguros.filter(m => m.id !== id);
      setMedicamentos(nuevosMedicamentos);
    }
  };

  const toggleActivo = (id: string) => {
    const nuevosMedicamentos = medicamentosSeguros.map(m => 
      m.id === id ? { ...m, activo: !m.activo } : m
    );
    setMedicamentos(nuevosMedicamentos);
  };

  const medicamentosActivos = medicamentosSeguros.filter(m => m.activo);
  const medicamentosInactivos = medicamentosSeguros.filter(m => !m.activo);

  return (
    <div className="resumen">
      <h2>Resumen de Medicamentos</h2>
      
      <div className="estadisticas-resumen">
        <div className="stat-item">
          <span className="stat-numero">{medicamentosSeguros.length}</span>
          <span className="stat-label">Total medicamentos</span>
        </div>
        <div className="stat-item">
          <span className="stat-numero">{medicamentosActivos.length}</span>
          <span className="stat-label">Activos</span>
        </div>
        <div className="stat-item">
          <span className="stat-numero">{medicamentosInactivos.length}</span>
          <span className="stat-label">Pausados</span>
        </div>
      </div>

      {medicamentosSeguros.length === 0 ? (
        <div className="empty-state">
          <p>No hay medicamentos registrados</p>
          <p>Ve a "Agregar" para añadir tu primer medicamento</p>
        </div>
      ) : (
        <div className="medicamentos-resumen">
          {/* Medicamentos Activos */}
          {medicamentosActivos.length > 0 && (
            <div className="seccion-medicamentos">
              <h3 className="seccion-titulo activos">
                <span className="icono">💊</span>
                Medicamentos Activos ({medicamentosActivos.length})
              </h3>
              <div className="medicamentos-lista">
                {medicamentosActivos.map(medicamento => (
                  <div key={medicamento.id} className="medicamento-resumen-item activo">
                    <div className="medicamento-info">
                      <h4>{medicamento.nombre}</h4>
                      <p className="dosis">{medicamento.dosis}</p>
                      <p className="momentos">
                        <strong>Tomar en:</strong> {medicamento.momentos.map(m => 
                          m.charAt(0).toUpperCase() + m.slice(1)
                        ).join(', ')}
                      </p>
                      <p className="fecha-creacion">
                        <small>Agregado el {formatearFecha(medicamento.fechaCreacion)}</small>
                      </p>
                      {medicamento.fechaFinalizacion && (
                        <p className="fecha-finalizacion-info">
                          <small>
                            <span className="fecha-icon">⏰</span>
                            Finaliza el {formatearFecha(medicamento.fechaFinalizacion)}
                          </small>
                        </p>
                      )}
                    </div>
                    <div className="acciones">
                      <Link
                        to={`/editar/${medicamento.id}`}
                        className="btn-accion editar"
                        title="Editar medicamento"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => toggleActivo(medicamento.id)}
                        className="btn-accion pausar"
                        title="Dejar de tomar"
                      >
                        ⏸️ Pausar
                      </button>
                      <button
                        onClick={() => eliminarMedicamento(medicamento.id)}
                        className="btn-accion eliminar"
                        title="Eliminar permanentemente"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medicamentos Inactivos */}
          {medicamentosInactivos.length > 0 && (
            <div className="seccion-medicamentos">
              <h3 className="seccion-titulo inactivos">
                <span className="icono">⏸️</span>
                Medicamentos Pausados ({medicamentosInactivos.length})
              </h3>
              <div className="medicamentos-lista">
                {medicamentosInactivos.map(medicamento => (
                  <div key={medicamento.id} className="medicamento-resumen-item inactivo">
                    <div className="medicamento-info">
                      <h4>{medicamento.nombre}</h4>
                      <p className="dosis">{medicamento.dosis}</p>
                      <p className="momentos">
                        <strong>Tomar en:</strong> {medicamento.momentos.map(m => 
                          m.charAt(0).toUpperCase() + m.slice(1)
                        ).join(', ')}
                      </p>
                      <p className="fecha-creacion">
                        <small>Agregado el {formatearFecha(medicamento.fechaCreacion)}</small>
                      </p>
                      {medicamento.fechaFinalizacion && (
                        <p className="fecha-finalizacion-info">
                          <small>
                            <span className="fecha-icon">⏰</span>
                            Finaliza el {formatearFecha(medicamento.fechaFinalizacion)}
                          </small>
                        </p>
                      )}
                    </div>
                    <div className="acciones">
                      <Link
                        to={`/editar/${medicamento.id}`}
                        className="btn-accion editar"
                        title="Editar medicamento"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => toggleActivo(medicamento.id)}
                        className="btn-accion reactivar"
                        title="Volver a tomar"
                      >
                        ▶️ Reactivar
                      </button>
                      <button
                        onClick={() => eliminarMedicamento(medicamento.id)}
                        className="btn-accion eliminar"
                        title="Eliminar permanentemente"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Resumen; 