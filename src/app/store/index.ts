import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as ui from './reducers/ui.reducer';
import * as auth from './reducers/auth.reducer';
import * as incomeExpense from './reducers/income-expense.reducer';

import { logoutMetaReducer } from './metareducers/logout.metareducer';
import { userStorageMetaReducer } from './metareducers/user-storage.metareducer';

export const stateFeatureKey = 'state';

export interface AppState {
  [ui.uiFeatureKey]: ui.UIState;
  [auth.authFeatureKey]: auth.State;
  [incomeExpense.incomeExpenseFeatureKey]?: incomeExpense.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [ui.uiFeatureKey]: ui.uiFeature.reducer,
  [auth.authFeatureKey]: auth.userReducer,
};

export const metaReducersRoot: MetaReducer<AppState>[] = isDevMode()
  ? [logoutMetaReducer, userStorageMetaReducer]
  : [logoutMetaReducer, userStorageMetaReducer];
