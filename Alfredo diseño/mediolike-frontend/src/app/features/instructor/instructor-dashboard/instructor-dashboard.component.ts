import { Component, inject, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { CourseService } from '../../../core/services/course.service';
import { AuthService } from '../../../core/services/auth.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.scss'
})
export class InstructorDashboardComponent implements OnInit, AfterViewInit {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private authService = inject(AuthService);

  @ViewChild('revenueChart') revenueChartRef!: ElementRef;
  
  chart: any;

  metrics = [
    { label: 'Ingresos del mes', value: '$2,450.00', icon: 'pi-dollar', color: '#10b981', trend: '+15.2%', trendUp: true },
    { label: 'Nuevos Estudiantes', value: '+340', icon: 'pi-users', color: '#4f46e5', trend: '+8.4%', trendUp: true },
    { label: 'Retención Promedio', value: '78%', icon: 'pi-chart-line', color: '#f59e0b', trend: '-2.1%', trendUp: false },
    { label: 'Calificación Prom.', value: '4.8', icon: 'pi-star-fill', color: '#8b5cf6', trend: '+0.1', trendUp: true }
  ];

  myCourses: any[] = [];

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.courseService.courses$.subscribe(data => {
      // Si el usuario es admin, ve todo. Si es instructor, ve solo lo suyo.
      if (user?.role_name === 'Admin') {
        this.myCourses = data;
      } else {
        this.myCourses = data.filter(c => c.instructorId === user?.id);
      }
    });
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    if (!this.revenueChartRef) return;
    
    this.chart = new Chart(this.revenueChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Ingresos ($)',
          data: [1200, 1900, 1700, 2100, 2450, 3000],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  editCourse(course: any) {
    this.router.navigate(['/app/instructor/courses', course.id, 'edit']);
  }

  viewAnalytics(course: any) {
    alert(`Estadísticas para ${course.title}:\n- Estudiantes activos: ${course.students}\n- Rating: ${course.rating} ⭐\n- Progreso promedio: 45%`);
  }
}
