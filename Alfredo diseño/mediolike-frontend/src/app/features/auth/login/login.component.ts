import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showRegister = false;
  
  loginEmail = '';
  loginPassword = '';
  showPassword = false;
  showRegisterPassword = false;

  constructor(private router: Router, private authService: AuthService) {}

  toggleMode() {
    this.showRegister = !this.showRegister;
  }

  isLoading = false;

  onLogin(e: Event) {
    if (e) e.preventDefault();
    if (this.loginEmail && this.loginPassword) {
      this.isLoading = true;
      this.authService.login({ email: this.loginEmail, password: this.loginPassword }).subscribe({
        next: (res) => {
          this.isLoading = false;
          const role = res.user.role_name;
          if (role === 'Admin') {
            this.router.navigate(['/app/admin/users']);
          } else if (role === 'Instructor') {
            this.router.navigate(['/app/instructor/dashboard']);
          } else {
            this.router.navigate(['/app/dashboard']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login error details:', err);
          alert('Error al iniciar sesión: ' + (err.error?.message || err.error?.error || 'Revisa tus credenciales'));
        }
      });
    } else {
      alert('Por favor ingresa tu correo y contraseña');
    }
  }

  // variables nuevas para el form de registro
  registerFirstName = '';
  registerLastName = '';
  registerEmail = '';
  registerPassword = '';

  onRegister(e: Event) {
    e.preventDefault();
    if (this.registerEmail && this.registerPassword && this.registerFirstName) {
      this.authService.register({
        email: this.registerEmail,
        password: this.registerPassword,
        firstName: this.registerFirstName,
        lastName: this.registerLastName,
        roleName: 'Participant'
      }).subscribe({
        next: () => {
          alert('¡Registro exitoso! Creando tu perfil en Mediolike...');
          this.router.navigate(['/app/dashboard']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar: ' + (err.error?.message || 'Ocurrió un error'));
        }
      });
    } else {
      alert('Por favor, completa los campos requeridos');
    }
  }
}
