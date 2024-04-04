import { Injectable, inject } from '@angular/core';
import { User, CreateUserDTO } from '../interfaces/user.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = 'http://localhost:3000/api/v1/users';
  private readonly _http = inject(HttpClient);

  getAll() {
    return this._http.get<User[]>(this.url);
  }

  create(dto: CreateUserDTO) {
    return this._http.post<User>(this.url, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(
            'El correo electrónico ya está en uso. Por favor, elige otro'
          );
        }
        return throwError(error.message || 'Ocurrió un error inesperado');
      })
    );
  }
}
