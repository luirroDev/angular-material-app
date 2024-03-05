import { Injectable } from '@angular/core';
import { Tratamiento } from '../interfaces/tratamiento.interface';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  private tratamiento_list: Tratamiento[] = [
    {
      nombre: 'Juan Perez',
      enfermedad: '1',
      aplicacion: 'a',
      medicamento: 'a',
      edad: 20,
    },
    {
      nombre: 'Juan Perez',
      enfermedad: '1',
      aplicacion: 'a',
      medicamento: 'a',
      edad: 24,
    },
  ];

  getAll() {
    return this.tratamiento_list.slice();
  }

  getByIndex(index: number) {
    return this.tratamiento_list[index];
  }

  create(newTratamiento: Tratamiento) {
    this.tratamiento_list.unshift(newTratamiento);
  }

  update(tratamiento: Tratamiento, index: number) {
    this.tratamiento_list[index] = tratamiento;
  }

  deleteTratamiento(index: number) {
    this.tratamiento_list.splice(index, 1);
  }
}
