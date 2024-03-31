import { CanActivateFn } from '@angular/router';
import { TokenService } from '@/app/services/token.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenSrv = inject(TokenService);
  const router = inject(Router);

  const token = tokenSrv.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
