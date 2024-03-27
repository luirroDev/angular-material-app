export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}
export interface CreateUserDTO extends Omit<User, 'id'> {}
export interface Auth {
  access_token: string;
}
