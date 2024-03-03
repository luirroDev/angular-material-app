import { Component, OnInit, inject } from '@angular/core';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Expediente } from '../../interfaces/expediente.interface';
import { ExpedienteService } from '../../services/expediente.service';
import { DeleteConfirmationService } from '../../services/delete-confirmation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class ExpedienteComponent implements OnInit {
  private readonly _expedienteSrv = inject(ExpedienteService);
  private readonly _dialogSrv = inject(DeleteConfirmationService);
  private readonly _snackBar = inject(MatSnackBar);
  listExpedientes!: Expediente[];
  dataSource!: MatTableDataSource<Expediente>;

  displayedColumns: string[] = [
    'nombre',
    'id',
    'sexo',
    'direccion',
    'enfermedades',
    'actions',
  ];

  ngOnInit(): void {
    this.loadExpedientes();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public loadExpedientes() {
    this.listExpedientes = this._expedienteSrv.getExpedientes();
    this.dataSource = new MatTableDataSource(this.listExpedientes);
  }

  public eliminarExpediente(index: number) {
    this._dialogSrv
      .confirm('¿Está seguro de eliminar este Expediente?')
      .subscribe((result) => {
        if (result) {
          this._expedienteSrv.deleteExpediente(index);
          this.loadExpedientes();
          this._snackBar.open('Expediente eliminado con éxito', undefined, {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }
}
