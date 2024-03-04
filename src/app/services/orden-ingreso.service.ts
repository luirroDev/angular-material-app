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
      id: '01031231070',
      motivo: 'pendiente',
      sintomas: 'vomitos',
      fecha: Date.now(),
    },
    {
      nombre: 'Pedro Porro',
      id: '01031231069',
      motivo: 'pendiente',
      sintomas: 'dolor de cabeza',
      fecha: Date.now(),
    },
    {
      nombre: 'Pablo Diaz',
      id: '01031231068',
      motivo: 'pendiente',
      sintomas: 'fiebre',
      fecha: Date.now(),
    },
    {
      nombre: 'Jose Gonzalez',
      id: '01031231067',
      motivo: 'pendiente',
      sintomas: 'nauceas',
      fecha: Date.now(),
    },
  ];

  getOrdenIngreso() {
    return this.ordenIngreso_list.slice();
  }

  getOrdenByID(id: number) {
    return this.ordenIngreso_list[id];
  }

  addOrdenIngreso(newOrdenIngreso: OrdenIngreso) {
    this.ordenIngreso_list.unshift(newOrdenIngreso);
  }

  updateOrdenIngreso(ordenIngreso: OrdenIngreso) {
    const index = this.ordenIngreso_list.findIndex(
      (item) => item.id === ordenIngreso.id
    );
    this.ordenIngreso_list[index] = ordenIngreso;
  }

  deleteOrdenIngreso(index: number) {
    this.ordenIngreso_list.splice(index, 1);
  }
}
