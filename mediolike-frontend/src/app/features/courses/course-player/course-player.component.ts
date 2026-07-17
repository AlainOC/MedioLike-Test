import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-player.component.html',
  styleUrl: './course-player.component.scss'
})
export class CoursePlayerComponent implements OnInit {
  private route = inject(ActivatedRoute);

  courseId: string | null = null;
  activeVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
  activeLessonTitle = '¿Qué es Angular?';
  activeTab = 'descripcion';

  course = {
    title: 'Master en Desarrollo Angular 18',
    syllabus: [
      { 
        module: 'Módulo 1: Introducción a Angular', 
        lessons: [
          { title: '¿Qué es Angular?', duration: '10:05', isCompleted: true, locked: false, active: true },
          { title: 'Configuración del Entorno', duration: '15:20', isCompleted: false, locked: false, active: false },
          { title: 'Tu primera aplicación', duration: '22:10', isCompleted: false, locked: true, active: false }
        ] 
      },
      { 
        module: 'Módulo 2: Componentes y Directivas', 
        lessons: [
          { title: 'Componentes Standalone', duration: '18:45', isCompleted: false, locked: true, active: false },
          { title: 'Directivas Estructurales', duration: '20:15', isCompleted: false, locked: true, active: false }
        ] 
      }
    ]
  };

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }

  playLesson(lesson: any) {
    if (lesson.locked) return;
    
    // Quitar active de todas
    this.course.syllabus.forEach(mod => {
      mod.lessons.forEach(l => l.active = false);
    });
    
    lesson.active = true;
    this.activeLessonTitle = lesson.title;
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
