import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommentService } from '../../core/services/comment.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, TooltipModule, FormsModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  public authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  notifications: any[] = [];
  unreadCount: number = 0;
  showNotifs: boolean = false;
  showUserMenu: boolean = false;

  get userRole() {
    return this.authService.getCurrentUser()?.role_name || '';
  }

  get userName(): string {
    return this.authService.getCurrentUser()?.profile?.firstName || 'U';
  }

  get homeRoute(): string {
    return '/app/dashboard';
  }
  
  globalSearchQuery = '';

  onGlobalSearch() {
    if (this.globalSearchQuery.trim()) {
      this.router.navigate(['/app/courses'], { queryParams: { q: this.globalSearchQuery.trim() } });
      this.globalSearchQuery = ''; // Opcional: limpiar después de buscar
    }
  }
  
  sidebarOpen = false;
  miniSidebar = true;
  sidebarHovered = false;
  rightPanelOpen = false;

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

  private commentService = inject(CommentService);
  
  chatMessages: any[] = [];
  newChatMessage = '';
  currentCourseId: number | null = null;
  private chatInterval: any;

  ngOnInit() {
    this.loadNotifications();
    // Poll para comentarios si está en una clase
    this.chatInterval = setInterval(() => {
      this.loadComments();
    }, 5000);
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
      this.unreadCount = data.filter(n => !n.isRead).length;
    });
  }

  toggleNotifications() {
    this.showNotifs = !this.showNotifs;
  }

  readNotification(n: any) {
    if (!n.isRead) {
      this.notificationService.markAsRead(n.id).subscribe(() => {
        n.isRead = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
      });
    }
  }

  ngOnDestroy() {
    if (this.chatInterval) clearInterval(this.chatInterval);
  }

  loadComments() {
    if (this.showLiveChatToggle) {
      const match = this.router.url.match(/\/player\/(\d+)/);
      if (match) {
        const courseId = parseInt(match[1], 10);
        this.currentCourseId = courseId;
        this.commentService.getCommentsByCourse(courseId).subscribe(comments => {
          this.chatMessages = comments;
        });
      }
    }
  }

  sendChatMessage() {
    if (this.newChatMessage.trim() && this.currentCourseId) {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) return;
      
      this.commentService.createComment(this.currentCourseId, currentUser.id, this.newChatMessage).subscribe(() => {
        this.newChatMessage = '';
        this.loadComments();
      });
    }
  }



  get showLiveChatToggle(): boolean {
    const isLive = this.router.url.includes('/player') || this.router.url.includes('/live');
    if (!isLive && this.rightPanelOpen) {
      // Cierra automáticamente si navegas fuera
      this.rightPanelOpen = false;
    }
    return isLive;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
