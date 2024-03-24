import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateExpedienteDTO,
  Expediente,
} from '../interfaces/expediente.interface';
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

  create(newExpediente: CreateExpedienteDTO) {
    return this._http.post<Expediente>(this.url, newExpediente);
  }

  update(id: number, expedienteChanges: CreateExpedienteDTO) {
    return this._http.patch<Expediente>(`${this.url}/${id}`, expedienteChanges);
  }

  delete(id: number) {
    return this._http.delete<any>(`${this.url}/${id}`);
  }
}
