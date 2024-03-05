import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user_list: User[] = [
    {
      id: 'user1',
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password1',
      role: 'admin',
    },
    {
      id: 'user2',
      name: 'User 2',
      email: 'user2@example.com',
      password: 'password2',
      role: 'user',
    },
    {
      id: 'user3',
      name: 'User 3',
      email: 'user3@example.com',
      password: 'password3',
      role: 'admin',
    },
    {
      id: 'user4',
      name: 'User 4',
      email: 'user4@example.com',
      password: 'password4',
      role: 'user',
    },
    {
      id: 'user5',
      name: 'User 5',
      email: 'user5@example.com',
      password: 'password5',
      role: 'admin',
    },
    {
      id: 'user6',
      name: 'User 6',
      email: 'user6@example.com',
      password: 'password6',
      role: 'user',
    },
    {
      id: 'user7',
      name: 'User 7',
      email: 'user7@example.com',
      password: 'password7',
      role: 'admin',
    },
    {
      id: 'user8',
      name: 'User 8',
      email: 'user8@example.com',
      password: 'password8',
      role: 'user',
    },
    {
      id: 'user9',
      name: 'User 9',
      email: 'user',
      password: 'user',
      role: 'user',
    },
    {
      id: 'user10',
      name: 'User 10',
      email: 'admin',
      password: 'admin',
      role: 'admin',
    },
  ];

  public getByEmail(email: string) {
    return this.user_list.find((item) => item.email === email);
  }
}
