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
import {
  Expediente,
  CreateExpedienteDTO,
} from '../../interfaces/expediente.interface';
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
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<ExpedienteFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Expediente,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      ci: [
        { value: data?.ci || '', disabled: this.isEditMode },
        [Validators.required, Validators.minLength(11)],
      ],
      sexo: [data?.sexo || '', Validators.required],
      direccion: [data?.direccion || '', Validators.required],
      enfermedades: [data?.enfermedades || '', Validators.required],
    });
  }
  private readonly _expedienteSrv = inject(ExpedienteService);

  saveExpediente(): boolean {
    if (this.form.invalid) {
      return false;
    }
    this.form.get('ci')?.enable();
    const expedienteData: CreateExpedienteDTO = {
      nombre: this.form.value.nombre,
      ci: this.form.value.ci,
      sexo: this.form.value.sexo,
      direccion: this.form.value.direccion,
      enfermedades: this.form.value.enfermedades,
    };

    if (this.isEditMode) {
      // Lógica para editar un expediente existente
      this._expedienteSrv.update(this.data.id, expedienteData).subscribe();
    } else {
      // Lógica para crear un nuevo expediente
      this._expedienteSrv.create(expedienteData).subscribe();
    }

    return true;
  }

  onSubmit() {
    let result = this.saveExpediente();
    this.dialogRef.close(result);
  }
}
