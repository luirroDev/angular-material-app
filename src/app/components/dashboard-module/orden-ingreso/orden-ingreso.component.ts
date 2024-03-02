import { Component } from '@angular/core';
import { OrdenIngreso } from '../../../interfaces/oden-ingreso.interface';
import { CommonModule } from '@angular/common';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './orden-ingreso.component.html',
  styleUrl: './orden-ingreso.component.css',
})
export class OrdenIngresoComponent {
  displayedColumns: string[] = [
    'nombre',
    'id',
    'motivo',
    'sintomas',
    'fecha',
    'actions',
  ];
  orderList: OrdenIngreso[] = [
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
  dataSource = new MatTableDataSource(this.orderList);

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
