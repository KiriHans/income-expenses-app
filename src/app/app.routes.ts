import { Routes } from '@angular/router';
import AUTH_ROUTES from './auth/auth.routes';
import { authGuard } from './core/guards/auth.guard';
import { provideState } from '@ngrx/store';

import * as incomeExpense from './store/reducers/income-expense.reducer';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: 'dashboard',
    canMatch: [authGuard],
    providers: [
      provideState(incomeExpense.incomeExpenseFeatureKey, incomeExpense.reducer, {
        metaReducers: incomeExpense.metaReducersIncome,
      }),
    ],
    loadChildren: () => import('src/app/dashboard/dashboard.routes'),
  },
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
