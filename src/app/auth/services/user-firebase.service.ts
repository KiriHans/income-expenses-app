import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  deleteDoc,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserApp } from 'src/app/core/models/users.model';
import { userConverter } from 'src/app/core/utils/user-data-converter';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseService {
  private readonly firestore = inject(Firestore);

  get(id: string): Observable<DocumentData | undefined> {
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
