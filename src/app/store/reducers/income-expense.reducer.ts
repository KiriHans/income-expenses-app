import { MetaReducer, createFeature, createReducer, on } from '@ngrx/store';
import { DetailsActions, IncomeExpenseActions } from '../actions/income-expense.actions';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { isDevMode } from '@angular/core';
import { incomeStorageMetaReducer } from '../metareducers/items-storage.metareducer';

export const incomeExpenseFeatureKey = 'incomeExpense';

export interface State {
  items: IncomeExpense[];
  loading: boolean;
}

export const initialState: State = {
  items: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(IncomeExpenseActions.unsetItems, (state): State => ({ ...state, items: [] })),
  on(IncomeExpenseActions.setItems, (state, { items }): State => ({ ...state, items: [...items] })),
  on(IncomeExpenseActions.createIncomeExpenses, (state): State => ({ ...state, loading: true })),
  on(
    IncomeExpenseActions.creationSuccess,
    (state, { incomeExpense }): State => ({
      ...state,
      loading: false,
      items: [...state.items, incomeExpense],
    })
  ),
  on(IncomeExpenseActions.creationFailure, (state): State => ({ ...state, loading: false })),
  on(DetailsActions.deleteItem, (state, { itemId }): State => {
    return { ...state, loading: true, items: state.items.filter((item) => item.id !== itemId) };
  }),
  on(DetailsActions.deletionCompleted, (state): State => ({ ...state, loading: false })),
  on(DetailsActions.deletionError, (state, { incomeExpense }): State => {
    return { ...state, items: incomeExpense, loading: false };
  })
);

export const incomeExpenseFeature = createFeature({
  name: incomeExpenseFeatureKey,
  reducer,
});

export const metaReducersIncome: MetaReducer<State>[] = isDevMode()
  ? [incomeStorageMetaReducer]
  : [incomeStorageMetaReducer];
