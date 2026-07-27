import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  
  profileData: any;
  selectedFile: File | null = null;
  isSaving: boolean = false;

  constructor() {
    const user = this.authService.getCurrentUser();
    this.profileData = {
      firstName: user?.profile?.firstName || 'Juan',
      lastName: user?.profile?.lastName || 'Pérez',
      email: user?.email || 'juan@correo.com',
      role: (user?.role?.name || user?.role_name) === 'Participant' ? 'Estudiante' : (user?.role?.name || user?.role_name || 'Estudiante'),
      phone: '+52 123 456 7890',
      location: 'México',
      bio: user?.profile?.bio || 'Apasionado por aprender nuevas tecnologías.',
      avatarUrl: user?.profile?.avatarUrl ? `http://localhost:3000${user.profile.avatarUrl}` : null
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Previsualización (Opcional, pero para rapidez lo omitimos o usamos un FileReader si hiciera falta)
    }
  }

  saveProfile() {
    this.isSaving = true;
    const formData = new FormData();
    formData.append('firstName', this.profileData.firstName);
    formData.append('lastName', this.profileData.lastName);
    formData.append('bio', this.profileData.bio);
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.userService.updateProfile(formData).subscribe({
      next: (res) => {
        this.isSaving = false;
        alert('Perfil guardado con éxito. Los cambios se verán en tu próximo inicio de sesión.');
      },
      error: (err) => {
        this.isSaving = false;
        console.error(err);
        alert('Error al guardar el perfil');
      }
    });
  }
}
