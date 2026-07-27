import { Component, ElementRef, OnDestroy, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LiveEventService, LiveEvent } from '../../../core/services/live-event.service';

@Component({
  selector: 'app-live-studio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './live-studio.component.html',
  styleUrl: './live-studio.component.scss'
})
export class LiveStudioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('localVideo') videoElement!: ElementRef<HTMLVideoElement>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private liveEventService = inject(LiveEventService);

  event: LiveEvent | undefined;
  stream: MediaStream | null = null;

  isCameraOn = true;
  isMicOn = true;
  isLive = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.event = this.liveEventService.getEventById(id);
      if (!this.event) {
        alert('Evento no encontrado');
        this.router.navigate(['/app/instructor/live']);
        return;
      }
      if (this.event.status === 'ended') {
        alert('Este evento ya finalizó. No puedes reanudar la transmisión.');
        this.router.navigate(['/app/instructor/live']);
        return;
      }
      this.isLive = this.event.status === 'live';
    }
  }

  ngAfterViewInit() {
    if (this.event && this.event.status !== 'ended') {
      this.initCamera();
    }
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  async initCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
    } catch (err) {
      console.error('Error accediendo a la cámara:', err);
      alert('No se pudo acceder a la cámara o micrófono. Por favor, revisa tus permisos.');
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  toggleCamera() {
    if (this.stream) {
      const videoTrack = this.stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        this.isCameraOn = videoTrack.enabled;
      }
    }
  }

  toggleMic() {
    if (this.stream) {
      const audioTrack = this.stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        this.isMicOn = audioTrack.enabled;
      }
    }
  }

  startBroadcast() {
    if (this.event) {
      this.liveEventService.updateEventStatus(this.event.id, 'live');
      this.isLive = true;
      this.event.status = 'live';
    }
  }

  endBroadcast() {
    if (confirm('¿Estás seguro de finalizar la transmisión? Ya no podrás reanudarla y los alumnos serán desconectados.')) {
      if (this.event) {
        this.liveEventService.updateEventStatus(this.event.id, 'ended');
        this.isLive = false;
        this.stopCamera();
        alert('Transmisión finalizada correctamente.');
        this.router.navigate(['/app/instructor/live']);
      }
    }
  }

  copyInviteLink() {
    if (this.event) {
      navigator.clipboard.writeText(this.event.inviteLink).then(() => {
        alert('¡Enlace de invitación copiado al portapapeles!');
      });
    }
  }
}
