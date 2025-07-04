import { useState } from 'react';
import type { Medicamento, RegistroMedicamento } from '../types';
import { formatearFecha } from '../utils/helpers';

interface HistorialProps {
  medicamentos: Medicamento[];
  registros: RegistroMedicamento[];
}

const Historial = ({ medicamentos, registros }: HistorialProps) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  // Obtener fechas únicas de los registros
  const fechasUnicas = [...new Set(registros.map(r => r.fecha))].sort().reverse();

  // Filtrar registros por fecha si hay una seleccionada
  const registrosAMostrar = fechaSeleccionada 
    ? registros.filter(r => r.fecha === fechaSeleccionada)
    : registros;

  // Agrupar registros por fecha
  const registrosPorFecha = registrosAMostrar.reduce((acc, registro) => {
    if (!acc[registro.fecha]) {
      acc[registro.fecha] = [];
    }
    acc[registro.fecha].push(registro);
    return acc;
  }, {} as Record<string, RegistroMedicamento[]>);

  const obtenerMedicamento = (medicamentoId: string) => {
    return medicamentos.find(m => m.id === medicamentoId);
  };

  const obtenerEstadisticas = () => {
    const totalRegistros = registros.length;
    const registrosTomados = registros.filter(r => r.tomado).length;
    const porcentajeCompletado = totalRegistros > 0 ? (registrosTomados / totalRegistros) * 100 : 0;

    return {
      total: totalRegistros,
      tomados: registrosTomados,
      porcentaje: porcentajeCompletado.toFixed(1)
    };
  };

  const stats = obtenerEstadisticas();

  return (
    <div className="historial">
      <h2>Historial de Medicamentos</h2>

      <div className="estadisticas">
        <div className="stat-item">
          <span className="stat-numero">{stats.total}</span>
          <span className="stat-label">Total registros</span>
        </div>
        <div className="stat-item">
          <span className="stat-numero">{stats.tomados}</span>
          <span className="stat-label">Medicamentos tomados</span>
        </div>
        <div className="stat-item">
          <span className="stat-numero">{stats.porcentaje}%</span>
          <span className="stat-label">Cumplimiento</span>
        </div>
      </div>

      <div className="filtro-fecha">
        <label htmlFor="fecha-filtro">Filtrar por fecha:</label>
        <select
          id="fecha-filtro"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
        >
          <option value="">Todas las fechas</option>
          {fechasUnicas.map(fecha => (
            <option key={fecha} value={fecha}>
              {formatearFecha(fecha)}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(registrosPorFecha).length === 0 ? (
        <div className="empty-state">
          <p>No hay registros de medicamentos</p>
        </div>
      ) : (
        <div className="registros-lista">
          {Object.entries(registrosPorFecha)
            .sort(([a], [b]) => b.localeCompare(a)) // Ordenar por fecha descendente
            .map(([fecha, registrosDelDia]) => (
              <div key={fecha} className="fecha-grupo">
                <h3 className="fecha-titulo">{formatearFecha(fecha)}</h3>
                <div className="registros-del-dia">
                  {registrosDelDia.map(registro => {
                    const medicamento = obtenerMedicamento(registro.medicamentoId);
                    if (!medicamento) return null;

                    return (
                      <div key={registro.id} className="registro-item">
                        <div className="registro-info">
                          <h4>{medicamento.nombre}</h4>
                          <p>{medicamento.dosis}</p>
                          <p className="registro-momento">
                            {registro.momento.charAt(0).toUpperCase() + registro.momento.slice(1)}
                          </p>
                        </div>
                        <div className="registro-estado">
                          <span className={`estado ${registro.tomado ? 'tomado' : 'no-tomado'}`}>
                            {registro.tomado ? '✓ Tomado' : '✗ No tomado'}
                          </span>
                          {registro.horaTomado && (
                            <span className="hora-tomado">
                              a las {registro.horaTomado}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Historial; 