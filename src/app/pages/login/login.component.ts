import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// angular-material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _userServ = inject(UserService);
  private readonly _authServ = inject(AuthService);
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public login() {
    const email: string = this.form.value.user;
    const password: string = this.form.value.password;

    const user = this._userServ.getByEmail(email);

    if (email === user?.email && password === user.password) {
      // redirect
      this.fakeLoading();
      this._authServ.login(user);
    } else {
      // Throw an error message
      this.errorHandler();
    }
  }

  private errorHandler() {
    this._snackBar.open('Usuario o contraseña incorrectos', undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.form.reset({
      user: '',
      password: '',
    });
  }

  private fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
