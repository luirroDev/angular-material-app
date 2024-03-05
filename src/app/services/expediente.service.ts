import { Injectable } from '@angular/core';
import { Expediente } from '../interfaces/expediente.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  private expediente_list: Expediente[] = [
    {
      nombre: 'Juan Perez',
      id: '123456789',
      sexo: 'masculino',
      direccion: 'Calle Falsa 123',
      enfermedades: 'Diabetes Mellitus',
    },
    {
      nombre: 'Maria Lopez',
      id: '987654321',
      sexo: 'femenino',
      direccion: 'Avenida Siempre Viva 456',
      enfermedades: 'Hipertensión Arterial',
    },
    {
      nombre: 'Carlos Gomez',
      id: '112233445',
      sexo: 'masculino',
      direccion: 'Boulevard de los Sueños Rotos 789',
      enfermedades: 'Asma',
    },
    {
      nombre: 'Ana Martinez',
      id: '556677889',
      sexo: 'masculino',
      direccion: 'Calle de la Felicidad 101112',
      enfermedades: 'Alergias',
    },
    {
      nombre: 'Pedro Fernandez',
      id: '223344556',
      sexo: 'masculino',
      direccion: 'Avenida de los Sueños 131415',
      enfermedades: 'Epilepsia',
    },
    {
      nombre: 'Laura Garcia',
      id: '334455667',
      sexo: 'femenino',
      direccion: 'Calle de los Sueños 161718',
      enfermedades: 'Artritis Reumatoide',
    },
    {
      nombre: 'Roberto Morales',
      id: '445566778',
      sexo: 'masculino',
      direccion: 'Boulevard de los Sueños 192021',
      enfermedades: 'Depresión',
    },
  ];

  getExpedientes() {
    return this.expediente_list.slice();
  }

  getByIndex(index: number) {
    return this.expediente_list[index];
  }

  create(newExpediente: Expediente) {
    this.expediente_list.unshift(newExpediente);
  }

  update(expediente: Expediente, index: number) {
    this.expediente_list[index] = expediente;
  }

  deleteExpediente(index: number) {
    this.expediente_list.splice(index, 1);
  }
}
