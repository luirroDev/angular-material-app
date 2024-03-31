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
import { ExpedienteFormComponent } from '../../components/expediente-form/expediente-form.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@/app/interfaces/user.interface';
import { ComunicationService } from '@/app/services/comunication.service';

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
  private readonly _dialogForm = inject(MatDialog);
  private readonly communicationSrv = inject(ComunicationService);
  public currentUser: User | null = null;

  listExpedientes: Expediente[] = [];
  dataSource!: MatTableDataSource<Expediente>;

  displayedColumns: string[] = [
    'nombre',
    'ci',
    'sexo',
    'direccion',
    'enfermedades',
    'actions',
  ];

  ngOnInit(): void {
    this.communicationSrv.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.loadExpedientes();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public loadExpedientes() {
    this._expedienteSrv.getAll().subscribe((data) => {
      this.listExpedientes = data;
      this.dataSource = new MatTableDataSource(this.listExpedientes);
    });
  }

  public editExpediente(id: number) {
    this._expedienteSrv.getById(id).subscribe((data) => {
      this.openFormDialog({ actionType: 'Editado', recordData: data });
    });
  }

  public openFormDialog(options: {
    actionType: 'Agregado' | 'Editado';
    recordData?: Expediente;
  }) {
    const dialogRef = this._dialogForm.open(ExpedienteFormComponent, {
      width: '600px',
      data: options.recordData, // Se pueden pasar datos iniciales aquí si es necesario
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadExpedientes();
        this._snackBar.open(
          `Expediente ${options.actionType} con éxito`,
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

  public eliminarExpediente(id: number) {
    this._dialogSrv
      .confirm('¿Está seguro de eliminar este Expediente?')
      .subscribe((result) => {
        if (result) {
          this._expedienteSrv.delete(id).subscribe(() => {
            this.loadExpedientes();
            this._snackBar.open('Expediente eliminado con éxito', undefined, {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          });
        }
      });
  }

  public isAdmin() {
    return this.currentUser?.role === 'admin' ? true : false;
  }
}
