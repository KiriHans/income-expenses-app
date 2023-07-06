import { Action, ActionReducer } from '@ngrx/store';
import { AppState } from '..';
import { inject } from '@angular/core';
import { BrowserStorageService } from 'src/app/core/services/browser-storage.service';
import { LoginActions } from '../actions/auth.actions';

export function logoutMetaReducer(reducer: ActionReducer<AppState>) {
  const storage = inject(BrowserStorageService);

  return (state: AppState | undefined, action: Action) => {
    if (action.type === LoginActions.logout.type) {
      storage.clear();
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}
