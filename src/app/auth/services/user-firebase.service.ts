import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  deleteDoc,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserApp } from 'src/app/core/models/users.model';
import { userConverter } from 'src/app/core/user-data-converter';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseService {
  private readonly firestore = inject(Firestore);
  private readonly userCollection = collection(this.firestore, 'users');

  get(id: string): Observable<DocumentData> {
    const userDocumentReference = doc(this.firestore, `users`, `${id}`);
    return docData(userDocumentReference, { idField: 'id' });
  }

  create(user: UserApp) {
    const newUserDoc = doc(this.firestore, `users`, `${user.id}`).withConverter(userConverter);
    return setDoc(newUserDoc, { ...user }, { merge: true });
  }

  update(user: UserApp): Promise<void> {
    const userDocumentReference = doc(this.firestore, `users`, `${user.id}`).withConverter(
      userConverter
    );
    return updateDoc(userDocumentReference, { ...user });
  }

  delete(id: string): Promise<void> {
    const userDocumentReference = doc(this.firestore, `users`, `${id}`);
    return deleteDoc(userDocumentReference);
  }
}
