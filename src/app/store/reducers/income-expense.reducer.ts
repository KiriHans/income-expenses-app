import { createFeature, createReducer, on } from '@ngrx/store';
import { IncomeExpenseActions } from '../actions/income-expense.actions';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';

export const incomeExpenseFeatureKey = 'incomeExpense';

export interface State {
  items: IncomeExpense[];
}

export const initialState: State = {
  items: [],
};

export const reducer = createReducer(
  initialState,
  on(IncomeExpenseActions.unsetItems, (state): State => ({ ...state, items: [] })),
  on(IncomeExpenseActions.setItems, (state, { items }): State => ({ ...state, items: [...items] }))
);

export const incomeExpenseFeature = createFeature({
  name: incomeExpenseFeatureKey,
  reducer,
});
