import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdenIngresoService } from '../../services/orden-ingreso.service';
import { OrdenIngreso } from '../../interfaces/oden-ingreso.interface';

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
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
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
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<OrdenIngresoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orden?: OrdenIngreso },
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data.orden;
    this.form = this.fb.group({
      nombre: [data.orden?.nombre || '', Validators.required],
      id: [data.orden?.id || '', Validators.required],
      motivo: [data.orden?.motivo || '', Validators.required],
      sintomas: [data.orden?.sintomas || '', Validators.required],
      fecha: [data.orden?.fecha || '', Validators.required],
    });
  }
  private readonly _ordenIngServ = inject(OrdenIngresoService);

  addOrdenIngreso(): boolean {
    const ordenIngreso: OrdenIngreso = {
      nombre: this.form.value.nombre,
      id: this.form.value.id,
      motivo: this.form.value.motivo,
      sintomas: this.form.value.sintomas,
      fecha: this.form.value.fecha,
    };
    if (!this.form.invalid) {
      this._ordenIngServ.addOrdenIngreso(ordenIngreso);
      return true;
    }
    return false;
  }
  onSubmit() {
    let result = false;
    if (this.isEditMode) {
      // Lógica para editar la orden de ingreso
      // this.ordenService.updateOrdenIngreso(this.form.value);
    } else {
      // Lógica para agregar una nueva orden de ingreso
      result = this.addOrdenIngreso();
    }
    this.dialogRef.close(result);
  }
}
