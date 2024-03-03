import { Injectable } from '@angular/core';
import { Tratamiento } from '../interfaces/tratamiento.interface';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  private tratamientoList: Tratamiento[] = [
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
    return this.tratamientoList.slice();
  }

  constructor() {}
}
