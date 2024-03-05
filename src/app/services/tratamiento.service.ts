import { Injectable } from '@angular/core';
import { Tratamiento } from '../interfaces/tratamiento.interface';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  private tratamiento_list: Tratamiento[] = [
    {
      nombre: 'Juan Perez',
      enfermedad: 'Diabetes Mellitus',
      aplicacion: 'Insulina Humana',
      medicamento: 'Metformina',
      edad: 20,
    },
    {
      nombre: 'Maria Lopez',
      enfermedad: 'Hipertensión Arterial',
      aplicacion: 'Lisinopril',
      medicamento: 'Amlodipino',
      edad: 30,
    },
    {
      nombre: 'Carlos Gomez',
      enfermedad: 'Asma',
      aplicacion: 'Salbutamol',
      medicamento: 'Beclometasol',
      edad: 35,
    },
    {
      nombre: 'Ana Martinez',
      enfermedad: 'Alergias',
      aplicacion: 'Antihistamínicos',
      medicamento: 'Corticosteroides',
      edad: 40,
    },
    {
      nombre: 'Pedro Fernandez',
      enfermedad: 'Epilepsia',
      aplicacion: 'Levetiracetam',
      medicamento: 'Topiramato',
      edad: 45,
    },
    {
      nombre: 'Laura Garcia',
      enfermedad: 'Artritis Reumatoide',
      aplicacion: 'Meloxicam',
      medicamento: 'Ibuprofeno',
      edad: 50,
    },
    {
      nombre: 'Roberto Morales',
      enfermedad: 'Depresión',
      aplicacion: 'Fluoxetina',
      medicamento: 'Citalopram',
      edad: 55,
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
