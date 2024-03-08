import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-bootstrap',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginBootstrapComponent {
  private readonly _userServ = inject(UserService);
  private readonly _authServ = inject(AuthService);
  hide = true;
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    const email: string = this.form.value.user;
    const password: string = this.form.value.password;

    const user = this._userServ.getByEmail(email);

    if (email === user?.email && password === user.password) {
      this.fakeLoading();
      this._authServ.login(user);
    } else {
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
