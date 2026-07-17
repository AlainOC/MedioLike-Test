import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.scss'
})
export class AdminReportsComponent {
  
  kpis = [
    { label: 'Ingresos Totales', value: '$45,230', trend: '+12%', isPositive: true },
    { label: 'Usuarios Activos', value: '1,204', trend: '+5%', isPositive: true },
    { label: 'Nuevos Cursos', value: '34', trend: '-2%', isPositive: false },
    { label: 'Comisiones (Plataforma)', value: '$6,784', trend: '+15%', isPositive: true }
  ];

  topCourses = [
    { name: 'Angular 18: De cero a experto', revenue: '$12,400', students: 850 },
    { name: 'Diseño UX/UI Avanzado', revenue: '$8,200', students: 620 },
    { name: 'Marketing Digital 2024', revenue: '$5,100', students: 410 }
  ];

}
