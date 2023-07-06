import { EnvironmentProviders, Provider, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  provideFirestore,
  initializeFirestore,
  connectFirestoreEmulator,
  getFirestore,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

export const FIREBASE_CONFIG: (Provider | EnvironmentProviders)[] = [
  importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
  importProvidersFrom(
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    })
  ),
  importProvidersFrom(
    provideFirestore(() => {
      if (environment.useEmulators) {
        const firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: true,
        });
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        return firestore;
      }
      return getFirestore();
    })
  ),
];
