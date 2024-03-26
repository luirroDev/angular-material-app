export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface UserAuth extends Omit<User, 'name' | 'password'> {}

export interface Auth {
  user: UserAuth;
  access_token: string;
}
