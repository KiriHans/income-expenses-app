import { Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { DetailsComponent } from './components/details/details.component';

export default [
  {
    path: '',
    component: StatisticsComponent,
  },
  {
    path: 'income-expenses',
    component: IncomeExpenseComponent,
  },
  {
    path: 'detail',
    component: DetailsComponent,
  },
] satisfies Routes;
