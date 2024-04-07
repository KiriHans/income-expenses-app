import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducersRoot, reducers } from './store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './auth/services/auth.service';
import { IncomeExpenseEffects } from './store/effects/income-expense.effects';
import { UiEffects } from './store/effects/ui.effects';

import { NgChartsModule } from 'ng2-charts';

import { FIREBASE_CONFIG } from './firebase.config';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

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
    ...FIREBASE_CONFIG,

    importProvidersFrom(NgChartsModule),
    provideStore(reducers, { metaReducers: metaReducersRoot }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),
    provideEffects([AuthEffects, IncomeExpenseEffects, UiEffects]),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'income-expense-app-ac975',
          appId: '1:384856359583:web:c15083fbf81c109c9b58aa',
          storageBucket: 'income-expense-app-ac975.appspot.com',
          apiKey: 'AIzaSyDW_5Fz0jxZkHoIaDi3h8n_Sny0c4x8yOo',
          authDomain: 'income-expense-app-ac975.firebaseapp.com',
          messagingSenderId: '384856359583',
          measurementId: 'G-HTT4JYMBEX',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())),
  ],
};
