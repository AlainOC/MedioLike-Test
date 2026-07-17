import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course-catalog.component.html',
  styleUrl: './course-catalog.component.scss'
})
export class CourseCatalogComponent {
  searchQuery = '';
  selectedCategory = 'Todos';
  categories = ['Todos', 'Programación', 'Diseño UX', 'Marketing', 'Finanzas', 'Idiomas'];

  allCourses = [
    { id: 1, title: 'Master en Desarrollo Angular', category: 'Programación', instructor: 'Joaquin Dzul', price: 49.99, image: 'https://via.placeholder.com/300x170/0f172a/ffffff?text=Angular', rating: 4.8, students: 1250 },
    { id: 2, title: 'Diseño UX/UI Avanzado', category: 'Diseño UX', instructor: 'Mariana Design', price: 39.99, image: 'https://via.placeholder.com/300x170/4f46e5/ffffff?text=UX/UI', rating: 4.9, students: 890 },
    { id: 3, title: 'Marketing Digital B2B', category: 'Marketing', instructor: 'Carlos Sales', price: 29.99, image: 'https://via.placeholder.com/300x170/ef4444/ffffff?text=Marketing', rating: 4.5, students: 560 },
    { id: 4, title: 'React de Cero a Experto', category: 'Programación', instructor: 'Pablo Pool', price: 44.99, image: 'https://via.placeholder.com/300x170/22c55e/ffffff?text=React', rating: 4.7, students: 2100 },
    { id: 5, title: 'Inglés para Desarrolladores', category: 'Idiomas', instructor: 'Teacher Sarah', price: 19.99, image: 'https://via.placeholder.com/300x170/eab308/ffffff?text=English', rating: 4.9, students: 3400 },
    { id: 6, title: 'Finanzas Personales', category: 'Finanzas', instructor: 'Luis Money', price: 24.99, image: 'https://via.placeholder.com/300x170/f59e0b/ffffff?text=Finanzas', rating: 4.6, students: 1120 }
  ];

  get filteredCourses() {
    return this.allCourses.filter(course => {
      const matchCategory = this.selectedCategory === 'Todos' || course.category === this.selectedCategory;
      const matchSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }
}
