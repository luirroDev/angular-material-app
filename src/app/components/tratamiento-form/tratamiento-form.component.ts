import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Tratamiento } from '../../interfaces/tratamiento.interface';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TratamientoService } from '../../services/tratamiento.service';

@Component({
  selector: 'app-tratamiento-form',
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
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.css'],
})
export class TratamientoFormComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<TratamientoFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { tratamiento?: Tratamiento; id: number },
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data.tratamiento;
    this.form = this.fb.group({
      nombre: [data.tratamiento?.nombre || '', Validators.required],
      enfermedad: [data.tratamiento?.enfermedad || '', Validators.required],
      medicamento: [data.tratamiento?.aplicacion || '', Validators.required],
      aplicacion: [data.tratamiento?.medicamento || '', Validators.required],
      edad: [
        data.tratamiento?.edad || '',
        [Validators.required, Validators.min(0)],
      ],
    });
  }
  private readonly _tratServ = inject(TratamientoService);

  addTratamiento(): boolean {
    const tratamiento: Tratamiento = {
      nombre: this.form.value.nombre,
      enfermedad: this.form.value.enfermedad,
      medicamento: this.form.value.medicamento,
      aplicacion: this.form.value.aplicacion,
      edad: this.form.value.edad,
    };
    if (!this.form.invalid) {
      this._tratServ.create(tratamiento);
      return true;
    }
    return false;
  }

  editarTratamiento(): boolean {
    const tratamiento: Tratamiento = {
      nombre: this.form.value.nombre,
      enfermedad: this.form.value.enfermedad,
      medicamento: this.form.value.medicamento,
      aplicacion: this.form.value.aplicacion,
      edad: this.form.value.edad,
    };
    if (!this.form.invalid) {
      this._tratServ.update(tratamiento, this.data.id);
      return true;
    }
    return false;
  }

  onSubmit() {
    let result = false;
    if (this.isEditMode) {
      // Lógica para editar un nuevo tratamiento
      result = this.editarTratamiento();
    } else {
      // Lógica para agregar un nuevo tratamiento
      result = this.addTratamiento();
    }
    this.dialogRef.close(result);
  }
}
