import { Injectable } from '@angular/core';
import { OrdenIngreso } from '../interfaces/oden-ingreso.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdenIngresoService {
  private ordenIngreso_list: OrdenIngreso[] = [
    {
      nombre: 'Juan Perez',
      id: '01031231071',
      motivo: 'pendiente',
      sintomas: 'fiebre',
      fecha: Date.now(),
    },
    {
      nombre: 'Alexander Ramires',
      id: '01031231071',
      motivo: 'pendiente',
      sintomas: 'vomitos',
      fecha: Date.now(),
    },
    {
      nombre: 'Pedro Porro',
      id: '01031231071',
      motivo: 'pendiente',
      sintomas: 'dolor de cabeza',
      fecha: Date.now(),
    },
    {
      nombre: 'Pablo Diaz',
      id: '01031231071',
      motivo: 'pendiente',
      sintomas: 'fiebre',
      fecha: Date.now(),
    },
    {
      nombre: 'Jose Gonzalez',
      id: '01031231071',
      motivo: 'pendiente',
      sintomas: 'nauceas',
      fecha: Date.now(),
    },
  ];

  getOrdenIngreso() {
    return this.ordenIngreso_list.slice();
  }

  addOrdenIngreso(newOrdenIngreso: OrdenIngreso) {
    this.ordenIngreso_list.unshift(newOrdenIngreso);
  }

  deleteOrdenIngreso(index: number) {
    this.ordenIngreso_list.splice(index, 1);
  }
}
