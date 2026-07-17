import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.scss'
})
export class InstructorDashboardComponent {
  
  metrics = [
    { label: 'Ingresos del mes', value: '$2,450.00', icon: 'pi-dollar', color: '#10b981' },
    { label: 'Nuevos Estudiantes', value: '+340', icon: 'pi-users', color: '#4f46e5' },
    { label: 'Retención Promedio', value: '78%', icon: 'pi-chart-line', color: '#f59e0b' },
    { label: 'Calificación Prom.', value: '4.8', icon: 'pi-star-fill', color: '#8b5cf6' }
  ];

  myCourses = [
    { id: 1, title: 'Master en Desarrollo Angular 18', status: 'Publicado', students: 1250, revenue: '$4,500.00', rating: 4.8 },
    { id: 2, title: 'Fundamentos de React', status: 'Publicado', students: 3100, revenue: '$8,200.00', rating: 4.7 },
    { id: 3, title: 'Microservicios con Node.js', status: 'En Borrador', students: 0, revenue: '$0.00', rating: 0 }
  ];

  editCourse(course: any) {
    alert(`Redirigiendo al editor del curso: ${course.title}`);
  }

  viewAnalytics(course: any) {
    alert(`Estadísticas para ${course.title}:\n- Estudiantes activos: ${course.students}\n- Rating: ${course.rating} ⭐\n- Progreso promedio: 45%`);
  }
}
