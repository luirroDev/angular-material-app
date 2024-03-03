import { Component, OnInit, inject } from '@angular/core';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TratamientoService } from '../../services/tratamiento.service';
import { Tratamiento } from '../../interfaces/tratamiento.interface';

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
export class TratamientoComponent implements OnInit {
  private readonly _tratamientoSrv = inject(TratamientoService);
  listTratamiento!: Tratamiento[];
  dataSource!: MatTableDataSource<Tratamiento>;

  displayedColumns: string[] = [
    'nombre',
    'enfermedad',
    'aplicacion',
    'medicameto',
    'edad',
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
    this.listTratamiento = this._tratamientoSrv.getTratamientos();
    this.dataSource = new MatTableDataSource(this.listTratamiento);
  }

  public eliminarTratamiento(index: number) {
    this._tratamientoSrv.deleteTratamiento(index);
    this.loadExpedientes();
  }
}
