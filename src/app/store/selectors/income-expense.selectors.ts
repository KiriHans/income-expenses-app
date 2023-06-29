import { createFeatureSelector } from '@ngrx/store';
import * as fromIncomeExpense from '../reducers/income-expense.reducer';

export const selectIncomeExpenseState = createFeatureSelector<fromIncomeExpense.State>(
  fromIncomeExpense.incomeExpenseFeatureKey
);
