import { Routes } from '@angular/router';
import AUTH_ROUTES from './auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('src/app/dashboard/dashboard.routes'),
  },
  ...AUTH_ROUTES,
  {
    path: '**',
    redirectTo: 'login',
  },
];
