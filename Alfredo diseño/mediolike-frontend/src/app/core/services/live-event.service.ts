import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LiveEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  status: 'scheduled' | 'live' | 'ended';
  inviteLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class LiveEventService {
  private events: LiveEvent[] = [
    {
      id: 'EVT-1001',
      title: 'Q&A: Dudas sobre el Proyecto Final',
      date: '2026-08-01',
      time: '18:00',
      description: 'Sesión para resolver todas las dudas.',
      status: 'scheduled',
      inviteLink: `${window.location.origin}/app/live/EVT-1001`
    }
  ];

  private eventsSubject = new BehaviorSubject<LiveEvent[]>(this.events);

  getEvents(): Observable<LiveEvent[]> {
    return this.eventsSubject.asObservable();
  }

  getEventById(id: string): LiveEvent | undefined {
    return this.events.find(e => e.id === id);
  }

  createEvent(event: Omit<LiveEvent, 'id' | 'status' | 'inviteLink'>): LiveEvent {
    const newId = 'EVT-' + Math.floor(Math.random() * 10000);
    const newEvent: LiveEvent = {
      ...event,
      id: newId,
      status: 'scheduled',
      // En entorno local usamos window.location.origin, pero podemos dejar un link relativo
      inviteLink: `/app/live/${newId}`
    };
    this.events.unshift(newEvent);
    this.eventsSubject.next(this.events);
    return newEvent;
  }

  updateEventStatus(id: string, status: 'scheduled' | 'live' | 'ended') {
    const evt = this.getEventById(id);
    if (evt) {
      evt.status = status;
      this.eventsSubject.next(this.events);
    }
  }
}
