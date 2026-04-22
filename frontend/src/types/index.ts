export type UserRole = 'user' | 'admin';

export interface User {
  login: string;
  role: UserRole;
  created_at: string;
}

export interface Book {
  id: string;
  name: string;
  description: string;
  publisher: string;
  created_at: string;
}

export interface ApiError {
  type: string;
  message: string;
}
