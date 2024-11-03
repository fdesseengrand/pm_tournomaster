import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_ROUTES } from '../constants/routes.constants';
import { AuthService } from './auth.service';

/**
 * Authentication guard.
 * Redirects to the login page if the user is not logged in.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate([APP_ROUTES.login]);
    return false;
  }
};
