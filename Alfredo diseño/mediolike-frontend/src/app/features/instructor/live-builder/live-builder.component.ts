import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LiveEventService } from '../../../core/services/live-event.service';

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
    streamLink: '' // Se mantendrá para integraciones externas opcionales
  };

  private router = inject(Router);
  private liveEventService = inject(LiveEventService);

  // Vista actual: listado vs builder
  viewMode: 'list' | 'builder' = 'list';
  myEvents$ = this.liveEventService.getEvents();

  scheduleEvent() {
    this.liveEventService.createEvent(this.eventData);
    alert('¡Evento programado con éxito!\nSe ha generado el enlace de invitación para tus estudiantes.');
    this.viewMode = 'list';
    // Limpiar form
    this.eventData = { title: '', date: '', time: '', description: '', streamLink: '' };
  }

  startLive(id: string) {
    this.router.navigate(['/app/instructor/live/studio', id]);
  }
}
