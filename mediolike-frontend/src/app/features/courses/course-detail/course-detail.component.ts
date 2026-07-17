import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

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

  courseId: string | null = null;

  course = {
    id: 1,
    title: 'Master en Desarrollo Angular 18',
    category: 'Programación',
    instructor: 'Joaquin Dzul',
    price: 49.99,
    image: 'https://via.placeholder.com/800x400/0f172a/ffffff?text=Angular+Masterclass',
    rating: 4.8,
    students: 1250,
    description: 'Aprende a crear aplicaciones escalables de nivel empresarial usando las últimas características de Angular 18, PrimeNG y Tailwind CSS. Este curso te llevará desde los conceptos básicos hasta arquitectura avanzada.',
    syllabus: [
      { module: 'Módulo 1: Introducción a Angular', duration: '1h 20m', lessons: ['¿Qué es Angular?', 'Configuración del Entorno', 'Tu primera aplicación'] },
      { module: 'Módulo 2: Componentes y Directivas', duration: '2h 15m', lessons: ['Componentes Standalone', 'Directivas Estructurales', 'Pipes y Pipes Nativos'] },
      { module: 'Módulo 3: Servicios e Inyección de Dependencias', duration: '1h 45m', lessons: ['Servicios Singleton', 'Inyección en Componentes', 'Mocks para Testing'] },
      { module: 'Módulo 4: Proyecto Final', duration: '3h 30m', lessons: ['Estructura del Proyecto', 'Consumo de APIs REST', 'Despliegue a Producción'] }
    ]
  };

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }

  enroll() {
    // Redirigir al reproductor simulando que ya se inscribió
    this.router.navigate(['/app/player', this.course.id]);
  }
}
