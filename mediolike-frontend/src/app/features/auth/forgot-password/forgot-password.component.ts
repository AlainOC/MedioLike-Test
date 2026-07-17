import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email = '';
  submitted = false;

  constructor(private router: Router) {}

  onSubmit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    setTimeout(() => {
      alert('Si el correo existe en Mediolike, te hemos enviado un enlace para restablecer tu contraseña.');
      this.router.navigate(['/login']);
    }, 1000);
  }
}
