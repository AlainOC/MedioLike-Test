export interface Profile {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  second_last_name?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
}

export interface User {
  id: number;
  email: string;
  role_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  profile?: Profile; // Relación con el perfil
}
