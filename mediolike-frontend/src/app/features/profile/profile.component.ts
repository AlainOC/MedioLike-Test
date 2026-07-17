import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private authService = inject(AuthService);
  
  profileData: any;

  constructor() {
    const user = this.authService.getCurrentUser();
    this.profileData = {
      firstName: user?.profile?.first_name || 'Juan',
      lastName: user?.profile?.last_name || 'Pérez',
      email: user?.email || 'juan@correo.com',
      role: user?.role_name || 'Estudiante',
      phone: '+52 123 456 7890',
      location: 'México',
      bio: 'Apasionado por aprender nuevas tecnologías.'
    };
  }

  saveProfile() {
    alert('Perfil guardado con éxito (Simulación)');
  }
}
