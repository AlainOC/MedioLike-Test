import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  newPassword = '';
  showPassword = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  token: string | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.token) {
      // Flow de Reseteo de Contraseña
      this.authService.resetPassword(this.token, this.newPassword).subscribe({
        next: (res) => {
          this.successMessage = 'Contraseña actualizada con éxito.';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err: any) => {
          this.errorMessage = 'El enlace ha expirado o es inválido.';
          this.submitted = false;
        }
      });
    } else {
      // Flow de Solicitud de Recuperación
      this.authService.forgotPassword(this.email).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.submitted = false;
        },
        error: (err: any) => {
          this.errorMessage = 'Hubo un error al procesar tu solicitud.';
          this.submitted = false;
        }
      });
    }
  }
}
