import { CreateUserDTO } from '@/app/interfaces/user.interface';
import { UserService } from '@/app/services/user.service';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class SignupComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  private readonly userServ = inject(UserService);

  signup() {
    if (this.form.valid) {
      const user: CreateUserDTO = this.form.value;
      this.userServ.create(user).subscribe(
        (res) => {
          this.router.navigate(['login']);
        },
        (errMsg) => {
          this.errorHandler(errMsg);
        }
      );
    } else {
      this.errorHandler('Email o contraseña incorrecto');
    }
  }

  private errorHandler(errorMsg: string) {
    this._snackBar.open(errorMsg, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
