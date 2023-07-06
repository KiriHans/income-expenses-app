import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import { Observable, map, of, switchMap } from 'rxjs';
import { UserApp } from 'src/app/core/models/users.model';
import { BrowserStorageService } from 'src/app/core/services/browser-storage.service';
import { AuthActions } from '../../store/actions/auth.actions';
import { UserFirebaseService } from './user-firebase.service';
import { Router } from '@angular/router';
import { authFeature } from 'src/app/store/reducers/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly store = inject(Store);
  private readonly userFirebaseService = inject(UserFirebaseService);
  private readonly localStorage = inject(BrowserStorageService);
  private readonly router = inject(Router);

  private readonly authState$ = authState(this.auth);
  user$ = this.authState$.pipe(
    switchMap((user) => (user ? this.userFirebaseService.get(user.uid) : of(null)))
  );

  userId$ = this.store.selectSignal(authFeature.selectId);

  initAuth(): void {
    if (!window.location.hash) {
      this.localStorage.setItem('PATH', window.location.pathname);
    }
    this.store.dispatch(AuthActions.getUser());
  }

  async createUser(name: string, email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(user, {
      displayName: name,
    });

    const newUser = new UserApp(user.uid, name, email);
    return this.userFirebaseService.create(newUser), newUser;
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logoutUser() {
    await this.auth.signOut();
    return this.router.navigate(['/login']);
  }

  isAuth(): Observable<boolean> {
    return this.authState$.pipe(map((fbUser) => fbUser !== null));
  }
}
