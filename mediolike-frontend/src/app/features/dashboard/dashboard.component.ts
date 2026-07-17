import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  userRole = this.authService.getCurrentUser()?.role_name || '';

  // YouTube Style: Chips de categorías
  categories = ['Todos', 'Programación', 'Diseño UX', 'Marketing', 'En Vivo', 'Inglés', 'Bases de Datos'];
  activeCategory = 'Todos';

  // Udemy/Cisco Style: Continuar Aprendiendo con bloqueo secuencial
  learningPath = [
    { id: 1, title: 'Fundamentos de React', progress: 100, image: 'https://via.placeholder.com/250x140/0f172a/ffffff?text=React', locked: false, isCompleted: true },
    { id: 2, title: 'Estados y Contexto (En curso)', progress: 45, image: 'https://via.placeholder.com/250x140/4f46e5/ffffff?text=Estados', locked: false, isCompleted: false },
    { id: 3, title: 'React Router v6', progress: 0, image: 'https://via.placeholder.com/250x140/334155/ffffff?text=Router', locked: true, isCompleted: false },
    { id: 4, title: 'Proyecto Final', progress: 0, image: 'https://via.placeholder.com/250x140/334155/ffffff?text=Proyecto', locked: true, isCompleted: false }
  ];

  // Twitch Style: Eventos en Vivo
  liveStreams = [
    { title: 'Q&A: Angular 18 Novedades', streamer: 'Profe Joaquín', viewers: '1.2k', image: 'https://via.placeholder.com/300x170/ef4444/ffffff?text=Angular+Live' },
    { title: 'Revisión de Portafolios UI/UX', streamer: 'Mariana Design', viewers: '850', image: 'https://via.placeholder.com/300x170/a855f7/ffffff?text=UI+Review' }
  ];

  setCategory(cat: string) {
    this.activeCategory = cat;
    if (cat !== 'Todos' && cat !== 'En Vivo') {
      this.goToCatalog();
    }
  }

  goToCourse(id: number) {
    this.router.navigate(['/app/player', id]);
  }

  goToCatalog() {
    this.router.navigate(['/app/courses']);
  }
}
