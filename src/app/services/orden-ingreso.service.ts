import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateOrdenIngresoDTO,
  UpdateOrdenIngresoDTO,
  OrdenIngreso,
} from '../interfaces/oden-ingreso.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenIngresoService {
  private readonly _http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api/v1/orden-ingreso';

  getAll(): Observable<OrdenIngreso[]> {
    return this._http.get<OrdenIngreso[]>(this.url);
  }

  getByID(id: number): Observable<OrdenIngreso> {
    return this._http.get<OrdenIngreso>(`${this.url}/${id}`);
  }

  create(newOrdenIngreso: UpdateOrdenIngresoDTO) {
    return this._http.post<OrdenIngreso>(this.url, newOrdenIngreso);
  }

  update(id: number, ordenChanges: UpdateOrdenIngresoDTO) {
    return this._http.patch<OrdenIngreso>(`${this.url}/${id}`, ordenChanges);
  }

  delete(id: number) {
    return this._http.delete(`${this.url}/${id}`);
  }
}
