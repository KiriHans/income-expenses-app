import { Routes } from '@angular/router';
import { IncomeExpenseComponent } from './components/income-expense.component';
import { DetailsComponent } from './components/details/details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export default [
  {
    path: 'income-expenses',
    component: IncomeExpenseComponent,
  },
  {
    path: 'detail',
    component: DetailsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: StatisticsComponent,
  },
] satisfies Routes;
