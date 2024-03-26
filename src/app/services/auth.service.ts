import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:3000/api/v1/auth';
  private readonly tokenSrv = inject(TokenService);
  private readonly _http = inject(HttpClient);

  public login(email: string, password: string) {
    return this._http
      .post<any>(`${this.url}/login`, { email, password })
      .pipe(tap((response) => this.tokenSrv.saveToken(response.access_token)));
  }

  public logout() {
    this.tokenSrv.removeToken();
  }
}
