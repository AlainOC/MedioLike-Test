import { User } from './user.model';

export interface Role {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Permission {
  id: number;
  name: string;
  description?: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  second_last_name?: string;
  role_id: number;
}
