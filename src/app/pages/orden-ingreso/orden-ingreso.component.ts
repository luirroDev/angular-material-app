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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrdenIngresoFormComponent } from '../../components/orden-ingreso-form/orden-ingreso-form.component';

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
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _dialogForm = inject(MatDialog);
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

  public ngOnInit(): void {
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
          this._snackBar.open(
            'Orden de Ingreso eliminada con éxito',
            undefined,
            {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      });
  }

  public editarOrden(id: number) {
    const ordenToUpdate = this._ordenServ.getOrdenByID(id);
    this.openFormDialog('Editada', ordenToUpdate);
  }

  public openFormDialog(option: 'Agregada' | 'Editada', orden?: OrdenIngreso) {
    const dialogRef = this._dialogForm.open(OrdenIngresoFormComponent, {
      width: '600px',
      data: { orden }, // Se pueden pasar datos iniciales aquí si es necesario
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadOrdenes();
        this._snackBar.open(`Orden de Ingreso ${option} con éxito`, undefined, {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }
}
