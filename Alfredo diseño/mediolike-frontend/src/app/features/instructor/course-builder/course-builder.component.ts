import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CourseService } from '../../../core/services/course.service';
import { UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'app-course-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TextFieldModule],
  templateUrl: './course-builder.component.html',
  styleUrl: './course-builder.component.scss'
})
export class CourseBuilderComponent {
  
  private courseService = inject(CourseService);
  private router = inject(Router);

  currentStep = 1;
  isEditMode = false;
  courseId: number | null = null;
  
  courseData: any = {
    title: '',
    category: '',
    description: '',
    price: null
  };

  constructor() {
    const route = inject(ActivatedRoute);
    const idParam = route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.courseId = Number(idParam);
      this.courseService.getCourseById(this.courseId).subscribe(existing => {
        if (existing) {
          this.courseData.title = existing.title;
          this.courseData.status = existing.status;
          this.courseData.description = existing.description;
          this.courseData.price = existing.price;
          if (existing.modules && existing.modules.length > 0) {
             this.modules = existing.modules;
          }
        }
      });
    }
  }
  
  modules = [
    { title: 'Introducción', lessons: [{ title: 'Bienvenida', type: 'video' }] }
  ];

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  addModule() {
    this.modules.push({ title: 'Nuevo Módulo', lessons: [] });
  }

  addLesson(modIndex: number) {
    this.modules[modIndex].lessons.push({ title: 'Nueva Lección', type: 'video' });
  }

  removeModule(modIndex: number) {
    this.modules.splice(modIndex, 1);
  }

  removeLesson(modIndex: number, lessonIndex: number) {
    this.modules[modIndex].lessons.splice(lessonIndex, 1);
  }

  private uploadService = inject(UploadService);

  onFileSelected(event: any, modIndex: number, lessonIndex: number) {
    const file = event.target.files[0];
    if (file) {
      (this.modules[modIndex].lessons[lessonIndex] as any).fileName = 'Subiendo...';
      this.uploadService.uploadFile(file).subscribe({
        next: (res) => {
          (this.modules[modIndex].lessons[lessonIndex] as any).fileName = file.name;
          (this.modules[modIndex].lessons[lessonIndex] as any).videoUrl = res.url;
        },
        error: () => {
          (this.modules[modIndex].lessons[lessonIndex] as any).fileName = 'Error al subir';
        }
      });
    }
  }

  saveProgress() {
    if (!this.courseData.title) {
      alert('Necesitas al menos un título para guardar');
      return;
    }
    
    // Inyectar modulos (temario) en los datos a guardar
    const dataToSave = { ...this.courseData, syllabus: this.modules, status: 'Publicado' };

    if (this.isEditMode && this.courseId) {
      this.courseService.updateCourse(this.courseId, dataToSave).subscribe(() => {
        alert('Cambios guardados exitosamente.');
        this.router.navigate(['/app/instructor/dashboard']);
      });
    } else {
      this.courseService.addCourse(dataToSave).subscribe(() => {
        alert('Curso guardado exitosamente.');
        this.router.navigate(['/app/instructor/dashboard']);
      });
    }
  }

  saveCourse() {
    if (!this.courseData.title) {
      alert('Por favor ingresa un título para el curso');
      return;
    }
    
    // Inyectar modulos (temario) en los datos a guardar
    const dataToSave = { ...this.courseData, syllabus: this.modules, status: 'Publicado' };

    if (this.isEditMode && this.courseId) {
      this.courseService.updateCourse(this.courseId, dataToSave).subscribe(() => {
        alert('Curso actualizado exitosamente.');
        this.router.navigate(['/app/instructor/dashboard']);
      });
    } else {
      this.courseService.addCourse(dataToSave).subscribe(() => {
        alert('Curso publicado exitosamente. Redirigiendo al panel...');
        this.router.navigate(['/app/instructor/dashboard']);
      });
    }
  }

}
