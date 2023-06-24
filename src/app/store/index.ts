import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as ui from '../shared/store/ui.reducer';
import * as auth from './reducers/auth.reducer';

export const stateFeatureKey = 'state';

export interface AppState {
  ui: ui.UIState;
  user: auth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.userReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
