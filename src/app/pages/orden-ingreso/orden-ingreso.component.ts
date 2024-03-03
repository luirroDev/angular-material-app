import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrdenIngresoService } from '../../services/orden-ingreso.service';

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
  private readonly _ordenServ = inject(OrdenIngresoService);
  listOrdenes = this._ordenServ.getOrdenIngreso();
  dataSource = new MatTableDataSource(this.listOrdenes);

  displayedColumns: string[] = [
    'nombre',
    'id',
    'motivo',
    'sintomas',
    'fecha',
    'actions',
  ];

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
