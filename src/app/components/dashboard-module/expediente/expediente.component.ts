import { Component } from '@angular/core';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Expediente } from '../../../interfaces/expediente.interface';

@Component({
  selector: 'app-expediente',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './expediente.component.html',
  styleUrl: './expediente.component.css',
})
export class ExpedienteComponent {
  displayedColumns: string[] = [
    'nombre',
    'id',
    'sexo',
    'direccion',
    'enfermedades',
    'actions',
  ];
  orderList: Expediente[] = [
    {
      nombre: 'qwe',
      id: 'qwe',
      sexo: 'femenino',
      direccion: 'qwe',
      enfermedades: 'qe',
    },
  ];

  dataSource = new MatTableDataSource(this.orderList);

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
