import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);
  const token = localStorage.getItem('token');
  if(token) {
    return true;
  } else{
    router.navigateByUrl('/login');
    return false;
  }
};