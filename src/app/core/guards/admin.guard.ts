import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth().pipe(
    tap(console.log),
    tap(() => console.log('aa')),
    map((isAuth) => !isAuth || router.createUrlTree(['']))
  );
};
