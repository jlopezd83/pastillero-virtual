export interface Medicamento {
  id: string;
  nombre: string;
  dosis: string;
  momentos: ('desayuno' | 'comida' | 'cena')[];
  activo: boolean;
  fechaCreacion: string;
  fechaFinalizacion?: string; // Fecha opcional de finalización
}

export interface RegistroMedicamento {
  id: string;
  medicamentoId: string;
  fecha: string;
  momento: 'desayuno' | 'comida' | 'cena';
  tomado: boolean;
  horaTomado?: string;
}

export interface DiaMedicamentos {
  fecha: string;
  medicamentos: {
    medicamento: Medicamento;
    registros: RegistroMedicamento[];
  }[];
} 