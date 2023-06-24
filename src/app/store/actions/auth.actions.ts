import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserApp } from 'src/app/core/models/users.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get User': emptyProps(),
    'Delete User': emptyProps(),
    'User Authenticated': props<{ user: UserApp }>(),
    'User Not Authenticated': emptyProps(),
    'Auth failure': props<{ error: unknown }>(),
  },
});

export const LoginActions = createActionGroup({
  source: 'Login',
  events: {
    'Login With Email': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: UserApp }>(),
    'Login Failure': props<{ error: unknown }>(),
    'Logout': emptyProps(),
  },
});

export const RegisterActions = createActionGroup({
  source: 'Register',
  events: {
    'Register With Email': props<{ name: string; email: string; password: string }>(),
    'Register Success': props<{ user: UserApp }>(),
    'Register Failure': props<{ error: unknown }>(),
  },
});
