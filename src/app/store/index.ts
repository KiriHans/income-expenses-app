import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as ui from '../shared/store/ui.reducer';
import * as auth from './reducers/auth.reducer';
import * as incomeExpense from './reducers/income-expense.reducer';

export const stateFeatureKey = 'state';

export interface AppState {
  [ui.uiFeatureKey]: ui.UIState;
  [auth.authFeatureKey]: auth.State;
  [incomeExpense.incomeExpenseFeatureKey]: incomeExpense.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [ui.uiFeatureKey]: ui.uiFeature.reducer,
  [auth.authFeatureKey]: auth.userReducer,
  [incomeExpense.incomeExpenseFeatureKey]: incomeExpense.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
