export const generarId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatearFecha = (fecha: string): string => {
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
};

export const obtenerFechaHoy = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const obtenerNombreDia = (fecha: string): string => {
  const opciones: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
};

export const obtenerHoraActual = (): string => {
  return new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
}; 