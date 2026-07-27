import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-memberships',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-memberships.component.html',
  styleUrl: './admin-memberships.component.scss'
})
export class AdminMembershipsComponent {
  
  platformCommission = 15; // 15% según RN-015

  transactions = [
    { id: 'TRX-9823', user: 'Juan Pérez', course: 'Master en React', amount: '$45.00', date: '2024-05-12', status: 'Completado' },
    { id: 'TRX-9824', user: 'María López', course: 'Introducción a UX', amount: '$25.00', date: '2024-05-11', status: 'Completado' },
    { id: 'TRX-9825', user: 'Carlos Silva', course: 'Angular para Principiantes', amount: '$35.00', date: '2024-05-10', status: 'Reembolsado' }
  ];

  updateCommission() {
    alert(`Comisión global actualizada al ${this.platformCommission}%.`);
  }

}
