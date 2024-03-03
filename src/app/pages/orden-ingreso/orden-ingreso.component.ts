import { Component, OnInit, inject } from '@angular/core';
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
import { OrdenIngreso } from '../../interfaces/oden-ingreso.interface';
import { DeleteConfirmationService } from '../../services/delete-confirmation.service';

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
export class OrdenIngresoComponent implements OnInit {
  private readonly _ordenServ = inject(OrdenIngresoService);
  private readonly _dialogSrv = inject(DeleteConfirmationService);
  listOrdenes!: OrdenIngreso[];
  dataSource!: MatTableDataSource<OrdenIngreso>;

  displayedColumns: string[] = [
    'nombre',
    'id',
    'motivo',
    'sintomas',
    'fecha',
    'actions',
  ];

  ngOnInit(): void {
    this.loadOrdenes();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public loadOrdenes() {
    this.listOrdenes = this._ordenServ.getOrdenIngreso();
    this.dataSource = new MatTableDataSource(this.listOrdenes);
  }

  public eliminarOrden(index: number) {
    this._dialogSrv
      .confirm('¿Está seguro de eliminar esta orden de Ingreso?')
      .subscribe((result) => {
        if (result) {
          this._ordenServ.deleteOrdenIngreso(index);
          this.loadOrdenes();
        }
      });
  }
}
