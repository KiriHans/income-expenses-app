import { inject } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';
import { BrowserStorageService } from 'src/app/core/services/browser-storage.service';
import { AppState } from '..';

const localStorageUserKey = '__app_storage_user__';

export function userStorageMetaReducer(reducer: ActionReducer<AppState>) {
  const storage = inject(BrowserStorageService);
  return (state: AppState | undefined, action: Action) => {
    if (state === undefined) {
      const persistedUser = storage.getItem(localStorageUserKey);

      return persistedUser
        ? {
            ...reducer(state, action),
            user: JSON.parse(persistedUser),
          }
        : reducer(state, action);
    }
    const nextState = reducer(state, action);
    storage.setItem(localStorageUserKey, JSON.stringify(nextState.user));

    return nextState;
  };
}
