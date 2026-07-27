import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StudentService } from '../../core/services/student.service';
import { CourseService } from '../../core/services/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  
  userName = this.authService.getCurrentUser()?.profile?.first_name || 'Estudiante';

  enrolledCourses: any[] = [];
  lastCourse: any = null;
  recommendedCourses: any[] = [];
  aiReasoning: string = '';

  ngOnInit() {
    this.studentService.getEnrolledCourses().subscribe({
      next: (enrollments) => {
        this.enrolledCourses = enrollments.map(e => ({
          id: e.course.id,
          title: e.course.title,
          image: e.course.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
          progress: e.progress,
          isCompleted: e.isCompleted,
          locked: false
        }));
        
        // El último curso es el primero que no esté completado, o el primero si todos lo están
        this.lastCourse = this.enrolledCourses.find(c => !c.isCompleted) || this.enrolledCourses[0];
      },
      error: (err) => console.error('Error fetching enrollments:', err)
    });

    // Recomendados: Obtener recomendaciones de IA
    this.courseService.getAIRecommendations().subscribe({
      next: (res) => {
        if (res && res.courses) {
          this.recommendedCourses = res.courses.map((c: any) => ({
            ...c,
            image: c.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
            instructor: c.instructor?.profile?.firstName ? `${c.instructor.profile.firstName} ${c.instructor.profile.lastName}` : 'Instructor'
          }));
          this.aiReasoning = res.reasoning;
        }
      },
      error: (err) => console.error('Error fetching AI recommendations:', err)
    });
  }

  goToCourse(id: number) {
    this.router.navigate(['/player', id]);
  }

  goToDetail(id: number) {
    this.router.navigate(['/app/courses', id]);
  }

  goToCatalog() {
    this.router.navigate(['/app/courses']);
  }
}
