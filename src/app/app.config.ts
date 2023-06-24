import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
} from '@angular/core';
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
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './store';
import { uiFeature } from './shared/store/ui.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './auth/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const auth = inject(AuthService);
        auth.initAuth();
      },
    },
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
    provideStore(reducers, { metaReducers }),
    provideState(uiFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthEffects),
  ],
};
