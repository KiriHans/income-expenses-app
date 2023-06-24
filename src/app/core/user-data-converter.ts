import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { UserApp } from './models/users.model';

export const userConverter: FirestoreDataConverter<UserApp> = {
  toFirestore: (user: UserApp) => {
    const { displayName, email } = user;
    return { displayName, email };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<UserApp>,
    options: SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);
    return new UserApp(data.id, data.displayName, data.email);
  },
};
