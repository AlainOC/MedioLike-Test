import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = false;
    public loginEvent = new Subject<void>();

    constructor(private router: Router) {
        const saved = localStorage.getItem('token');
        if (saved) {
            this.loggedIn = true;
        }
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    login(email: string, pass: string): boolean {
        // Mock login logic until backend auth is fully ready
        const validUsers = [
            { email: 'admin@admin.com', pass: 'admin', role: 'admin' },
            { email: 'maestro@maestro.com', pass: 'maestro', role: 'maestro' },
            { email: 'estudiante@estudiante.com', pass: 'estudiante', role: 'estudiante' }
        ];

        const user = validUsers.find(u => u.email === email && u.pass === pass);

        if (user) {
            this.loggedIn = true;
            localStorage.setItem('token', 'mock-jwt-token-' + user.role);
            localStorage.setItem('role', user.role); // Useful for teammate's routing limits later
            sessionStorage.removeItem('splashShown');
            // By default route to /users, teammate can update this logic based on role
            this.router.navigate(['/users']);
            this.loginEvent.next();
            return true;
        }
        return false;
    }

    logout(): void {
        this.loggedIn = false;
        localStorage.removeItem('token');
        sessionStorage.removeItem('splashShown');
        this.router.navigate(['/login']);
    }
}
