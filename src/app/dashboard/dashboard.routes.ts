import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import INCOME_EXPENSES_ROUTES from '../income-expense/income-expense.routes';
import { authGuard } from '../core/guards/auth.guard';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    children: INCOME_EXPENSES_ROUTES,
    canActivate: [authGuard],
  },
] satisfies Routes;