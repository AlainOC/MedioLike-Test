import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', loadComponent: () => import('./features/admin/users/users.component').then(m => m.UsersComponent) },
    { path: 'roles', loadComponent: () => import('./features/admin/roles/roles.component').then(m => m.RolesComponent) },
    { path: 'settings', loadComponent: () => import('./features/admin/settings/settings.component').then(m => m.SettingsComponent) },
    { path: '**', redirectTo: 'users' }
];
