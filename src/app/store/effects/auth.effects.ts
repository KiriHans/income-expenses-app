import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { AuthActions, LoginActions, RegisterActions } from '../actions/auth.actions';
import { Auth } from '@angular/fire/auth';
import { UserApp, isUser } from 'src/app/core/models/users.model';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { UserFirebaseService } from 'src/app/auth/services/user-firebase.service';

@Injectable()
export class AuthEffects {
  private afAuth = inject(Auth);
  private firestore = inject(Firestore);
  private userFirebaseService = inject(UserFirebaseService);

  getUser$ = createEffect(() => {
    this.userFirebaseService;
    return this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        this.authService.user$.pipe(
          take(1),
          map((user) =>
            isUser(user)
              ? AuthActions.userAuthenticated({ user })
              : AuthActions.userNotAuthenticated()
          ),
          catchError((error) => of(AuthActions.authFailure({ error })))
        )
      )
    );
  });

  loginWithEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.loginWithEmail),
      switchMap((user) =>
        from(this.authService.loginUser(user.email, user.password)).pipe(
          map(({ user }) =>
            LoginActions.loginSuccess({
              user: new UserApp(user.uid, user.displayName, user.email),
            })
          ),
          catchError((error) => of(LoginActions.loginFailure({ error })))
        )
      )
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.loginSuccess),
        tap(() => {
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logout),
      switchMap(() =>
        from(this.authService.logoutUser()).pipe(
          map(() => AuthActions.userNotAuthenticated()),
          catchError((error) => of(LoginActions.loginFailure({ error })))
        )
      )
    );
  });

  registerWithEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterActions.registerWithEmail),
      switchMap(({ name, email, password }) =>
        from(this.authService.createUser(name, email, password)).pipe(
          map((user) => {
            return RegisterActions.registerSuccess({ user: user });
          }),
          catchError((error) => of(RegisterActions.registerFailure({ error })))
        )
      )
    );
  });

  registerRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegisterActions.registerSuccess),
        tap(() => {
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
