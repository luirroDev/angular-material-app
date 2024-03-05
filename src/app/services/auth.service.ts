import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getAuthenticatedUser(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      return JSON.parse(storedUser);
    } else return null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.getAuthenticatedUser !== null;
  }

  isAdmin() {
    return this.getAuthenticatedUser()?.role === 'admin';
  }
}
