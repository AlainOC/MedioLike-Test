import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, TooltipModule, FormsModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  get userRole() {
    return this.authService.getCurrentUser()?.role_name || '';
  }

  get userName() {
    return this.authService.getCurrentUser()?.profile?.first_name || 'Usuario';
  }
  
  sidebarOpen = false; // Móvil: Mostrar sidebar completo
  miniSidebar = true; // PC: Sidebar en modo íconos (YouTube style)
  rightPanelOpen = true; // Panel derecho de Chat/Eventos (Twitch style)

  toggleSidebar() {
    // En móviles abre/cierra completo, en PC alterna entre mini y expandido
    if (window.innerWidth <= 991) {
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      this.miniSidebar = !this.miniSidebar;
    }
  }

  toggleRightPanel() {
    this.rightPanelOpen = !this.rightPanelOpen;
  }

  chatMessages = [
    { author: 'Pablo', text: '¿Cuándo empieza el live?' },
    { author: 'Alain', text: '¡Ya casi! Preparando el DB.' }
  ];
  newChatMessage = '';

  sendChatMessage() {
    if (this.newChatMessage.trim()) {
      this.chatMessages.push({ author: this.userName, text: this.newChatMessage });
      this.newChatMessage = '';
    }
  }

  showNotifications() {
    alert('Tienes 3 notificaciones nuevas:\n- Un nuevo estudiante en tu curso\n- Sesión Live en 10 mins\n- Mensaje de soporte Admin');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
