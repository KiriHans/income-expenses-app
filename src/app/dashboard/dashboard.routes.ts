import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import INCOME_EXPENSES_ROUTES from '../income-expense/income-expense.routes';

export default [
  {
    path: '',
    pathMatch: 'prefix',
    component: DashboardComponent,
    children: INCOME_EXPENSES_ROUTES,
  },
] satisfies Routes;
