import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticated: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router)
  
  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/tickets/login')  

    return false;
  };
  

  return true
}

