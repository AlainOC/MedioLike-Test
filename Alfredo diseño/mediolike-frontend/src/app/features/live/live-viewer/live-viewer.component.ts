import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LiveEventService, LiveEvent } from '../../../core/services/live-event.service';

@Component({
  selector: 'app-live-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './live-viewer.component.html',
  styleUrl: './live-viewer.component.scss'
})
export class LiveViewerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private liveEventService = inject(LiveEventService);

  event: LiveEvent | undefined;
  viewState: 'loading' | 'live' | 'scheduled' | 'ended' | 'notfound' = 'loading';

  newChatMessage = '';
  chatMessages: { user: string; text: string }[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.viewState = 'notfound';
      return;
    }
    const evt = this.liveEventService.getEventById(id);
    if (!evt) {
      this.viewState = 'notfound';
      return;
    }
    this.event = evt;
    this.viewState = evt.status;
  }

  sendMessage() {
    if (this.newChatMessage.trim()) {
      this.chatMessages.push({ user: 'Tú', text: this.newChatMessage.trim() });
      this.newChatMessage = '';
    }
  }
}
