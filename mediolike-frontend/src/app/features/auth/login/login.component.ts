import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRightPanelActive = false;
  
  loginEmail = '';
  loginPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

  togglePanel(isRight: boolean) {
    this.isRightPanelActive = isRight;
  }

  onLogin(e: Event) {
    e.preventDefault();
    if(this.loginEmail) {
      this.authService.login(this.loginEmail);
      this.router.navigate(['/app/dashboard']);
    } else {
      alert('Por favor ingresa un correo (ej. admin@mediolike.com)');
    }
  }

  onRegister(e: Event) {
    e.preventDefault();
    alert('¡Registro exitoso! Creando tu perfil en Mediolike...');
    // Simulamos que al registrarse se loguea como participante automáticamente
    this.authService.login('nuevo_estudiante@mediolike.com');
    this.router.navigate(['/app/dashboard']);
  }
}
