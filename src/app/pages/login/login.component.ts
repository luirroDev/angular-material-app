import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-bootstrap',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class LoginBootstrapComponent {
  private readonly _userServ = inject(UserService);
  private readonly _authServ = inject(AuthService);
  hide = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  public login() {
    this.statusDetail = 'loading';
    const email: string = this.form.value.email;
    const password: string = this.form.value.password;

    this._authServ.login(email, password).subscribe(
      () => {
        this.statusDetail = 'success';
        this.router.navigate(['dashboard']);
      },
      (errorMsg) => {
        this.statusDetail = 'error';
        this.errorHandler(errorMsg);
      }
    );
  }

  private errorHandler(errorMsg: string) {
    this._snackBar.open(errorMsg, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.form.reset({
      user: '',
      password: '',
    });
  }
}
