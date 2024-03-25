import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AuthService } from '../../services/auth.service';

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
  private readonly _authSrv = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _dialogForm = inject(MatDialog);
  dataSource!: MatTableDataSource<OrdenIngreso>;

  displayedColumns: string[] = [
    'nombre',
    'ci',
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
    this._ordenServ.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  public editarOrden(id: number) {
    this._ordenServ.getByID(id).subscribe((data) => {
      this.openFormDialog({ actionType: 'Editado', recordData: data });
    });
  }

  public openFormDialog(options: {
    actionType: 'Agregado' | 'Editado';
    recordData?: OrdenIngreso;
  }) {
    const dialogRef = this._dialogForm.open(OrdenIngresoFormComponent, {
      width: '600px',
      data: options.recordData, // Se pueden pasar datos iniciales aquí si es necesario
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadOrdenes();
        this._snackBar.open(
          `Orden de Ingreso ${options.actionType} con éxito`,
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

  public eliminarOrden(id: number) {
    this._dialogSrv
      .confirm('¿Está seguro de eliminar esta Orden de Ingreso?')
      .subscribe((result) => {
        if (result) {
          this._ordenServ.delete(id).subscribe(() => {
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
          });
        }
      });
  }

  public isAdmin(): boolean {
    return this._authSrv.isAdmin();
  }
}
