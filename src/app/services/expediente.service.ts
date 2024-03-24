import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expediente } from '../interfaces/expediente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  private readonly _http = inject(HttpClient);
  private url = 'http://localhost:3000/api/v1/expedientes';

  getAll(): Observable<Expediente[]> {
    return this._http.get<Expediente[]>(this.url);
  }

  getById(id: number): Observable<Expediente> {
    return this._http.get<Expediente>(`${this.url}/${id}`);
  }

  create(newExpediente: Expediente) {
    // this.expediente_list.unshift(newExpediente);
  }

  update(expediente: Expediente, index: number) {
    // this.expediente_list[index] = expediente;
  }

  deleteExpediente(index: number) {
    // this.expediente_list.splice(index, 1);
  }
}
