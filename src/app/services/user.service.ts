import { Injectable, inject } from '@angular/core';
import { User, CreateUserDTO } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

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
    return this._http.post<User>(this.url, dto);
  }
}
