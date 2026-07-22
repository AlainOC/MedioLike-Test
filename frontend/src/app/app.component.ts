import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showSplash = false;
  showSplashLogout = false;
  isNavDragging = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.showLayout && !sessionStorage.getItem('splashShown')) {
      this.triggerSpashScreen();
    }

    this.authService.loginEvent.subscribe(() => {
      this.triggerSpashScreen();
    });
  }

  private triggerSpashScreen() {
    this.showSplash = true;
    sessionStorage.setItem('splashShown', 'true');
    setTimeout(() => {
      this.showSplash = false;
    }, 3200);
  }

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  get showLayout(): boolean {
    return !this.isLoginPage && this.authService.isLoggedIn();
  }

  // --- Liquid Nav Drag Logic ---
  onNavMouseDown(event: MouseEvent, route: string) {
    this.isNavDragging = true;
    this.router.navigate([route]);
  }

  onNavMouseUp() {
    this.isNavDragging = false;
  }

  onNavMouseEnter(route: string) {
    if (this.isNavDragging && this.router.url !== route) {
      this.router.navigate([route]);
    }
  }

  // --- Logout splash logic ---
  logout(event: Event) {
    event.preventDefault();
    this.showSplashLogout = true;

    // Animate logout splash for 3.2 seconds, then actually route to login
    setTimeout(() => {
      this.showSplashLogout = false;
      this.authService.logout();
    }, 3200);
  }
}
