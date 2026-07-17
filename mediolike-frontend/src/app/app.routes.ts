import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'app',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'courses',
        loadComponent: () => import('./features/courses/course-catalog/course-catalog.component').then(m => m.CourseCatalogComponent)
      },
      {
        path: 'courses/:id',
        loadComponent: () => import('./features/courses/course-detail/course-detail.component').then(m => m.CourseDetailComponent)
      },
      {
        path: 'player/:id',
        loadComponent: () => import('./features/courses/course-player/course-player.component').then(m => m.CoursePlayerComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'instructor/dashboard',
        loadComponent: () => import('./features/instructor/instructor-dashboard/instructor-dashboard.component').then(m => m.InstructorDashboardComponent),
        canActivate: [roleGuard],
        data: { expectedRoles: ['Instructor', 'Admin'] }
      },
      {
        path: 'instructor/courses/new',
        loadComponent: () => import('./features/instructor/course-builder/course-builder.component').then(m => m.CourseBuilderComponent),
        canActivate: [roleGuard],
        data: { expectedRoles: ['Instructor', 'Admin'] }
      },
      {
        path: 'instructor/live',
        loadComponent: () => import('./features/instructor/live-builder/live-builder.component').then(m => m.LiveBuilderComponent),
        canActivate: [roleGuard],
        data: { expectedRoles: ['Instructor', 'Admin'] }
      },
      {
        path: 'admin/users',
        loadComponent: () => import('./features/admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent),
        canActivate: [roleGuard],
        data: { expectedRoles: ['Admin'] }
      },
      {
        path: 'admin/memberships',
        loadComponent: () => import('./features/admin/admin-memberships/admin-memberships.component').then(m => m.AdminMembershipsComponent),
        canActivate: [roleGuard],
        data: { expectedRoles: ['Admin'] }
      },
      {
        path: 'admin/reports',
        loadComponent: () => import('./features/admin/admin-reports/admin-reports.component').then(m => m.AdminReportsComponent),
        canActivate: [roleGuard],
        data: { expectedRoles: ['Admin'] }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
