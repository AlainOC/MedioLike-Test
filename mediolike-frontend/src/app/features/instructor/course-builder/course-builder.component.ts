import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course-builder.component.html',
  styleUrl: './course-builder.component.scss'
})
export class CourseBuilderComponent {
  
  currentStep = 1;
  
  courseData = {
    title: '',
    category: '',
    description: '',
    price: null
  };
  
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

  saveCourse() {
    alert('Curso guardado exitosamente.');
    // Lógica para enviar a backend
  }

}
