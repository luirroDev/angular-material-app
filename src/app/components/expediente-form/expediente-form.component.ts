import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Expediente } from '../../interfaces/expediente.interface';
import { ExpedienteService } from '../../services/expediente.service';

@Component({
  selector: 'app-expediente-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './expediente-form.component.html',
  styleUrl: './expediente-form.component.css',
})
export class ExpedienteFormComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<ExpedienteFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { expediente?: Expediente; id: number },
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data.expediente;
    this.form = this.fb.group({
      nombre: [data.expediente?.nombre || '', Validators.required],
      id: [
        data.expediente?.id || '',
        [Validators.required, Validators.minLength(11)],
      ],
      sexo: [data.expediente?.sexo || '', Validators.required],
      direccion: [data.expediente?.direccion || '', Validators.required],
      enfermedades: [data.expediente?.enfermedades || '', Validators.required],
    });
  }
  private readonly _expServ = inject(ExpedienteService);

  addExpediente(): boolean {
    const expediente: Expediente = {
      nombre: this.form.value.nombre,
      id: this.form.value.id,
      sexo: this.form.value.sexo,
      direccion: this.form.value.direccion,
      enfermedades: this.form.value.enfermedades,
    };
    if (!this.form.invalid) {
      this._expServ.create(expediente);
      return true;
    }
    return false;
  }

  editarExpediente(): boolean {
    const expediente: Expediente = {
      nombre: this.form.value.nombre,
      id: this.form.value.id,
      sexo: this.form.value.sexo,
      direccion: this.form.value.direccion,
      enfermedades: this.form.value.enfermedades,
    };
    if (!this.form.invalid) {
      this._expServ.update(expediente, this.data.id);
      return true;
    }
    return false;
  }

  onSubmit() {
    let result = false;
    if (this.isEditMode) {
      // Lógica para editar un nuevo expediente
      result = this.editarExpediente();
    } else {
      // Lógica para agregar un nuevo expediente
      result = this.addExpediente();
    }
    this.dialogRef.close(result);
  }
}
