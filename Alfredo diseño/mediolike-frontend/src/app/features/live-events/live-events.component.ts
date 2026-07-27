import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-live-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-events.component.html',
  styleUrl: './live-events.component.scss'
})
export class LiveEventsComponent implements OnInit {
  private eventService = inject(EventService);
  events: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.eventService.getUpcomingEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
