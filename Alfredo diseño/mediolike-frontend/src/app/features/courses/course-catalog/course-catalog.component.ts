import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course-catalog.component.html',
  styleUrl: './course-catalog.component.scss'
})
export class CourseCatalogComponent implements OnInit {
  searchTerm = '';
  selectedCategory = 'all';
  categories = [
    { id: 'Programación', name: 'Programación' },
    { id: 'Diseño UX', name: 'Diseño UX' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Finanzas', name: 'Finanzas' },
    { id: 'Idiomas', name: 'Idiomas' }
  ];

  allCourses: any[] = [];
  userInitial = 'U';
  
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user && user.profile?.firstName) {
      this.userInitial = user.profile.firstName.charAt(0).toUpperCase();
    }

    this.courseService.courses$.subscribe(data => {
      this.allCourses = data.filter((c: any) => c.status === 'Publicado').map(c => ({
        ...c,
        level: c.level || 'Todos los niveles'
      }));
    });

    this.route.queryParams.subscribe(params => {
      if (params['q']) this.searchTerm = params['q'];
      if (params['category']) this.selectedCategory = params['category'];
    });
  }

  goToDashboard() {
    this.router.navigate(['/app/dashboard']);
  }

  goToCourse(id: number) {
    this.router.navigate(['/app/courses', id]);
  }

  filterCourses() {
    // La vista usa el getter automáticamente, esto es solo para trigger visual si es necesario.
  }

  private levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  get filteredCourses() {
    return this.allCourses.filter(course => {
      const courseCatName = course.category?.name || course.category; // Por si viene como string
      const matchCategory = this.selectedCategory === 'all' || courseCatName === this.selectedCategory;
      
      const search = this.searchTerm.trim().toLowerCase();
      const title = course.title.toLowerCase();
      
      let matchSearch = true;
      if (search.length > 0) {
        if (title.includes(search)) {
          matchSearch = true;
        } else {
          const searchWords = search.split(' ');
          const titleWords = title.split(' ');
          matchSearch = searchWords.every((sw: string) => {
            return titleWords.some((tw: string) => {
              if (tw.includes(sw)) return true;
              const maxDist = sw.length > 4 ? 2 : 1;
              return this.levenshteinDistance(sw, tw) <= maxDist;
            });
          });
        }
      }
      return matchCategory && matchSearch;
    });
  }
}
