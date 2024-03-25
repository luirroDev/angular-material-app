import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdenIngresoService } from '../../services/orden-ingreso.service';
import {
  CreateOrdenIngresoDTO,
  OrdenIngreso,
  UpdateOrdenIngresoDTO,
} from '../../interfaces/oden-ingreso.interface';

// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ExpedienteService } from '@/app/services/expediente.service';
import { Expediente } from '@/app/interfaces/expediente.interface';

@Component({
  selector: 'app-orden-ingreso-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './orden-ingreso-form.component.html',
  styleUrl: './orden-ingreso-form.component.css',
})
export class OrdenIngresoFormComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  listExpedientes!: Expediente[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: OrdenIngreso,
    public dialogRef: MatDialogRef<OrdenIngresoFormComponent>,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    if (this.isEditMode) {
      // Para el modo de edición, incluye los campos necesarios para editar
      this.form = this.fb.group({
        nombre: [
          { value: data.expediente.nombre, disabled: true },
          Validators.required,
        ],
        ci: [
          { value: data.expediente.ci, disabled: true },
          [Validators.required, Validators.minLength(11)],
        ],
        motivo: [data.motivo, Validators.required],
        sintomas: [data.sintomas, Validators.required],
        fecha: [data.fecha, Validators.required],
      });
    } else {
      // Para el modo de creación, incluye los campos necesarios para crear
      this.form = this.fb.group({
        selectedExpedienteId: ['', Validators.required],
        motivo: ['', Validators.required],
        sintomas: ['', Validators.required],
        fecha: ['', Validators.required],
      });
    }
  }
  private readonly _ordenIngServ = inject(OrdenIngresoService);
  private readonly _expedienteServ = inject(ExpedienteService);

  ngOnInit(): void {
    if (!this.isEditMode) {
      this._expedienteServ.getAll().subscribe((res) => {
        this.listExpedientes = res;
      });
    }
  }

  private saveOrdenIngreso(): boolean {
    if (this.form.invalid) {
      return false;
    }
    this.isEditMode ? this.updateOrden() : this.createOrden();
    return true;
  }

  private updateOrden() {
    const ordenData: UpdateOrdenIngresoDTO = {
      sintomas: this.form.value.sintomas,
      motivo: this.form.value.motivo,
      fecha: this.form.value.fecha,
    };
    this._ordenIngServ.update(this.data.id, ordenData).subscribe();
  }

  private createOrden() {
    const ordenData: CreateOrdenIngresoDTO = {
      sintomas: this.form.value.sintomas,
      motivo: this.form.value.motivo,
      fecha: this.form.value.fecha,
      expedienteId: this.form.value.selectedExpedienteId,
    };
    this._ordenIngServ.create(ordenData).subscribe();
  }

  onSubmit() {
    let result = this.saveOrdenIngreso();
    this.dialogRef.close(result);
  }
}
