import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIncomeExpense from '../reducers/income-expense.reducer';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { calculateTotalAmount } from 'src/app/core/utils/calculate-amount';

export const selectIncomeExpenseState = createFeatureSelector<fromIncomeExpense.State>(
  fromIncomeExpense.incomeExpenseFeatureKey
);

export const selectItemById = (id: string) =>
  createSelector(fromIncomeExpense.incomeExpenseFeature.selectItems, (items) => {
    const fallbackItem = new IncomeExpense("The item doesn't exist", 0, 'income');
    return items.find((item) => item.id === id) || fallbackItem;
  });

export const selectNumberIncomeItems = createSelector(
  fromIncomeExpense.incomeExpenseFeature.selectItems,
  (items) => {
    return items.filter((item) => item.type === 'income').length;
  }
);

export const selectNumberExpenseItems = createSelector(
  fromIncomeExpense.incomeExpenseFeature.selectItems,
  (items) => {
    return items.filter((item) => item.type === 'expense').length;
  }
);

export const selectTotalIncome = createSelector(
  fromIncomeExpense.incomeExpenseFeature.selectItems,
  (items) => {
    return calculateTotalAmount('income', items);
  }
);
export const selectTotalExpense = createSelector(
  fromIncomeExpense.incomeExpenseFeature.selectItems,
  (items) => {
    return calculateTotalAmount('expense', items);
  }
);
