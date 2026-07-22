import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'users', loadComponent: () => import('./features/admin/users/users.component').then(m => m.UsersComponent), canActivate: [AuthGuard] },
    { path: 'roles', loadComponent: () => import('./features/admin/roles/roles.component').then(m => m.RolesComponent), canActivate: [AuthGuard] },
    { path: 'settings', loadComponent: () => import('./features/admin/settings/settings.component').then(m => m.SettingsComponent), canActivate: [AuthGuard] },
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: '**', redirectTo: 'users' }
];
