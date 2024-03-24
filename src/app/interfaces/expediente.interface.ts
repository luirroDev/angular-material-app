export interface Expediente {
  id: number;
  nombre: string;
  ci: string;
  sexo: 'M' | 'F';
  direccion: string;
  enfermedades: string;
}
