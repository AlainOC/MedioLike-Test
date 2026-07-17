import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-live-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './live-builder.component.html',
  styleUrl: './live-builder.component.scss'
})
export class LiveBuilderComponent {
  
  eventData = {
    title: '',
    date: '',
    time: '',
    description: '',
    streamLink: ''
  };

  constructor(private router: Router) {}

  scheduleEvent() {
    alert('¡Evento programado con éxito!\nLos estudiantes inscritos han sido notificados por correo y en la plataforma.');
    this.router.navigate(['/app/instructor/dashboard']);
  }
}
