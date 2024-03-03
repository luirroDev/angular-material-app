import { Component, inject } from '@angular/core';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TratamientoService } from '../../services/tratamiento.service';

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
  private readonly _tratamientoSrv = inject(TratamientoService);
  listTratamiento = this._tratamientoSrv.getTratamientos();
  dataSource = new MatTableDataSource(this.listTratamiento);

  displayedColumns: string[] = [
    'nombre',
    'enfermedad',
    'aplicacion',
    'medicameto',
    'edad',
    'actions',
  ];

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
