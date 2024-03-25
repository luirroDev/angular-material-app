import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './orden-ingreso-form.component.html',
  styleUrl: './orden-ingreso-form.component.css',
})
export class OrdenIngresoFormComponent {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: OrdenIngreso,
    public dialogRef: MatDialogRef<OrdenIngresoFormComponent>,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      nombre: [
        { value: data?.expediente.nombre || '', disabled: this.isEditMode },
        Validators.required,
      ],
      ci: [
        { value: data?.expediente.ci || '', disabled: this.isEditMode },
        [Validators.required, Validators.minLength(11)],
      ],
      motivo: [data?.motivo || '', Validators.required],
      sintomas: [data?.sintomas || '', Validators.required],
      fecha: [data?.fecha || '', Validators.required],
    });
  }
  private readonly _ordenIngServ = inject(OrdenIngresoService);

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
      expedienteId: 1, //To-Do
    };
    this._ordenIngServ.create(ordenData).subscribe();
  }

  onSubmit() {
    let result = this.saveOrdenIngreso();
    this.dialogRef.close(result);
  }
}
