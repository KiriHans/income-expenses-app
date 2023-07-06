import { inject } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';
import { BrowserStorageService } from 'src/app/core/services/browser-storage.service';

import * as IncomeExpense from '../reducers/income-expense.reducer';

const localStorageItemsKey = '__income_expense_storage_items__';

export function incomeStorageMetaReducer(reducer: ActionReducer<IncomeExpense.State>) {
  const storage = inject(BrowserStorageService);
  return (state: IncomeExpense.State | undefined, action: Action) => {
    if (state === undefined) {
      const persistedItems = storage.getItem(localStorageItemsKey);
      return persistedItems
        ? {
            ...reducer(state, action),
            items: JSON.parse(persistedItems),
          }
        : reducer(state, action);
    }
    const nextState = reducer(state, action);

    storage.setItem(localStorageItemsKey, JSON.stringify(nextState.items));

    return nextState;
  };
}
