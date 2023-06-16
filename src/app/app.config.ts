import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  initializeFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
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
  ],
};
