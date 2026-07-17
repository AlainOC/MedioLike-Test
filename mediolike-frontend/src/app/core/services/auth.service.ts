import { Injectable } from '@angular/core';
import { User } from '../models/user.model'; // Mocks
import { Role } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Estado simulado para pruebas. Cambiar a null para simular que no ha iniciado sesión.
  private currentUser: any = {
    id: 3,
    email: 'admin@mediolike.com',
    role_id: 1, // 1 = Admin
    role_name: 'Admin',
    profile: {
      first_name: 'Director',
      last_name: 'General'
    }
  };

  // Método simulado para Login que cambia el rol según el email
  login(email: string) {
    if (email.includes('admin')) {
      this.currentUser = {
        id: 3, email: email, role_id: 1, role_name: 'Admin',
        profile: { first_name: 'Director', last_name: 'General' }
      };
    } else if (email.includes('instructor') || email.includes('profe')) {
      this.currentUser = {
        id: 2, email: email, role_id: 3, role_name: 'Instructor',
        profile: { first_name: 'Profe', last_name: 'Experto' }
      };
    } else {
      this.currentUser = {
        id: 1, email: email || 'estudiante@mediolike.com', role_id: 4, role_name: 'Participant',
        profile: { first_name: 'Estudiante', last_name: 'Prueba' }
      };
    }
    // Guardar en localStorage para persistencia temporal (opcional)
    localStorage.setItem('mockUser', JSON.stringify(this.currentUser));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('mockUser');
  }

  constructor() {
    const saved = localStorage.getItem('mockUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  hasRole(roleName: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role_name === roleName;
  }
}
