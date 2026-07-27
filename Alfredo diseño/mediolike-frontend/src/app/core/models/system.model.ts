export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Setting {
  id: number;
  key_name: string;
  key_value: string;
  description?: string;
}
