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
      medicameto: 'a',
      edad: 20,
    },
    {
      nombre: 'Juan Perez',
      enfermedad: '1',
      aplicacion: 'a',
      medicameto: 'a',
      edad: 24,
    },
  ];

  getTratamientos() {
    return this.tratamiento_list.slice();
  }

  deleteTratamiento(index: number) {
    this.tratamiento_list.splice(index, 1);
  }
}
