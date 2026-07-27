import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);

  courseId: string | null = null;

  course: any = {
    id: 1,
    title: 'Cargando curso...',
    category: 'Cargando...',
    instructor: '...',
    price: 0,
    image: '',
    rating: 0,
    students: 0,
    description: 'Descripción no disponible.',
    syllabus: []
  };

  isProcessingPayment: boolean = false;
  isEnrolled: boolean = false;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.courseService.getCourseById(Number(this.courseId)).subscribe({
        next: (realCourse) => {
          if (realCourse) {
            this.course = { ...this.course, ...realCourse };
            if (!this.course.description) this.course.description = `Aprende todo lo necesario sobre ${this.course.category}.`;
            if (!this.course.syllabus || this.course.syllabus.length === 0) {
              if (this.course.modules && this.course.modules.length > 0) {
                 this.course.syllabus = this.course.modules;
              } else {
                 this.course.syllabus = [
                   { title: 'Módulo 1: Introducción', duration: '1h', lessons: [{title: 'Introducción al curso'}] }
                 ];
              }
            } else {
              this.course.syllabus = this.course.syllabus;
            }
          }
        },
        error: (err) => console.error('Error cargando curso', err)
      });
      
      this.studentService.getEnrolledCourses().subscribe({
        next: (enrollments) => {
          this.isEnrolled = enrollments.some(e => e.course.id === Number(this.courseId));
        }
      });
    }
  }

  enroll() {
    if (this.isEnrolled) {
      this.router.navigate(['/player', this.course.id]);
      return;
    }

    this.isProcessingPayment = true;
    
    // Simulate payment delay
    setTimeout(() => {
      this.studentService.enrollCourse(this.course.id).subscribe({
        next: () => {
          this.isProcessingPayment = false;
          alert('¡Pago exitoso! Te has inscrito con éxito al curso.');
          this.router.navigate(['/player', this.course.id]);
        },
        error: (err) => {
          this.isProcessingPayment = false;
          console.error(err);
          alert('Error al procesar el pago.');
        }
      });
    }, 2000);
  }
}
