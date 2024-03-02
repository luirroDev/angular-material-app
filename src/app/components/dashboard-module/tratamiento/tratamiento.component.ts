import { Component } from '@angular/core';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tratamiento } from '../../../interfaces/tratamiento.interface';

@Component({
  selector: 'app-reports',
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
  templateUrl: './tratamiento.component.html',
  styleUrl: './tratamiento.component.css',
})
export class TratamientoComponent {
  displayedColumns: string[] = [
    'nombre',
    'enfermedad',
    'aplicacion',
    'medicameto',
    'edad',
    'actions',
  ];
  orderList: Tratamiento[] = [
    {
      nombre: 'Juan Perez',
      enfermedad: '1',
      aplicacion: 'a',
      medicameto: 'a',
      edad: 20,
    },
  ];
  dataSource = new MatTableDataSource(this.orderList);
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
