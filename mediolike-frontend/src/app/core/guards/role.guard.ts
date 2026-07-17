import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['expectedRoles'] as Array<string>;

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getCurrentUser().role_name;

  if (expectedRoles && expectedRoles.includes(userRole)) {
    return true;
  }

  // Si no tiene el rol permitido, enviarlo al dashboard principal o mostrar error
  router.navigate(['/app/dashboard']);
  return false;
};
