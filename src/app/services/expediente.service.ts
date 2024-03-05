import { Injectable } from '@angular/core';
import { Expediente } from '../interfaces/expediente.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  private expediente_list: Expediente[] = [
    {
      nombre: 'qwe',
      id: 'qwe',
      sexo: 'femenino',
      direccion: 'Plaza de la Revolucion',
      enfermedades: 'qe',
    },
    {
      nombre: 'qwe',
      id: 'qwe',
      sexo: 'femenino',
      direccion: 'Plaza de la Revolucion',
      enfermedades: 'qe',
    },
    {
      nombre: 'qwe',
      id: 'qwe',
      sexo: 'femenino',
      direccion: 'Plaza de la Revolucion',
      enfermedades: 'qe',
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
