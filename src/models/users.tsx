export interface User {
  id?: number;
  password: string;
  email: string;
}

export interface GetUser {
  id: number;
  name: string;
  email: string;
}