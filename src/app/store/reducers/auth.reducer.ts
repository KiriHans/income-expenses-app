import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions, LoginActions, RegisterActions } from '../actions/auth.actions';
import { UserApp } from 'src/app/core/models/users.model';

export const authFeatureKey = 'user';

export interface State extends UserApp {
  loading: boolean;
}

export const initialState: State = { ...new UserApp(null, 'Guest', null), loading: false };

export const userReducer = createReducer(
  initialState,
  on(AuthActions.getUser, (state): State => ({ ...state, loading: true })),
  on(
    AuthActions.userAuthenticated,
    (state, { user }): State => ({ ...state, ...user, loading: false })
  ),
  on(
    AuthActions.userNotAuthenticated,
    AuthActions.authFailure,
    LoginActions.loginFailure,
    (state): State => ({ ...state, ...structuredClone(initialState) })
  ),
  on(
    LoginActions.loginSuccess,
    (state, { user }): State => ({ ...state, ...user, loading: false })
  ),
  on(
    RegisterActions.registerSuccess,
    (state, { user }): State => ({ ...state, ...user, loading: false })
  )
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: userReducer,
});
