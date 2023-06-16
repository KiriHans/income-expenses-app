import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { UserApp } from 'src/app/core/models/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private readonly authState$: Observable<User | null> = authState(this.auth);

  initAuthListener(): void {
    this.authState$.subscribe({ next: console.log });
  }

  createUser(name: string, email: string, password: string): Promise<void | UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(({ user }) => {
      const newUser = new UserApp(user.uid, name, email);

      return setDoc(doc(this.firestore, `${user.uid}/user`), { ...newUser });
    });
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUser(): Promise<void> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.authState$.pipe(map((fbUser) => fbUser !== null));
  }
}
