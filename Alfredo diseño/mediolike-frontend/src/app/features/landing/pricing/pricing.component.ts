import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  isProcessing = false;
  selectedPlan = '';

  subscribe(plan: string, amount: number) {
    if (!this.authService.isAuthenticated()) {
      alert('Debes iniciar sesión para adquirir una membresía.');
      this.router.navigate(['/login']);
      return;
    }

    const confirm = window.confirm(`¿Estás seguro que deseas adquirir el plan ${plan} por $${amount} MXN? (Esto es una simulación)`);
    if (!confirm) return;

    this.isProcessing = true;
    this.selectedPlan = plan;

    this.http.post<{success: boolean, message: string, transactionId: string}>('http://localhost:3000/api/payments/checkout', { plan, amount }).subscribe({
      next: (res) => {
        alert(`${res.message}\nTransacción: ${res.transactionId}`);
        this.isProcessing = false;
        this.selectedPlan = '';
        // Refrescar usuario para jalar nuevos settings/role si es necesario
        this.router.navigate(['/app/dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Hubo un error al procesar el pago.');
        this.isProcessing = false;
        this.selectedPlan = '';
      }
    });
  }
}
