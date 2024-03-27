import { Injectable, inject } from '@angular/core';
import { Auth } from '../interfaces/user.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:3000/api/v1/auth';
  private readonly tokenSrv = inject(TokenService);
  private readonly _http = inject(HttpClient);

  public login(email: string, password: string) {
    return this._http.post<Auth>(`${this.url}/login`, { email, password }).pipe(
      tap((response) => this.tokenSrv.saveToken(response.access_token)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('Usuario o contraseña incorrectos');
        }
        return throwError(error);
      })
    );
  }

  public profile() {
    return this._http.get(`${this.url}/profile`);
  }

  public logout() {
    this.tokenSrv.removeToken();
  }
}
