import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {
  private userSource = new BehaviorSubject<User | null>(null);
  currentUser = this.userSource.asObservable();

  constructor() {}

  changeUser(user: User) {
    this.userSource.next(user);
  }
}
