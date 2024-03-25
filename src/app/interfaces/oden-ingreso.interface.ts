import { Expediente } from './expediente.interface';

export interface OrdenIngreso {
  id: number;
  motivo: string;
  sintomas: string;
  fecha: Date;
  expedienteId: number;
  expediente: Expediente;
}

export interface UpdateOrdenIngresoDTO
  extends Omit<OrdenIngreso, 'id' | 'expediente' | 'expedienteId'> {}

export interface CreateOrdenIngresoDTO
  extends Omit<OrdenIngreso, 'id' | 'expediente'> {}
