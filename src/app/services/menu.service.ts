import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly _http = inject(HttpClient);

  getMenu(): Observable<Menu[]> {
    return this._http.get<Menu[]>('./assets/data/menu.data.json');
  }
}
