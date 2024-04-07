import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

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
import { provideToastr } from 'ngx-toastr';

import { FIREBASE_CONFIG } from './firebase.config';

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

    provideToastr(),
    provideAnimations(),

    importProvidersFrom(NgChartsModule),
    provideStore(reducers, { metaReducers: metaReducersRoot }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),
    provideEffects([AuthEffects, IncomeExpenseEffects, UiEffects]),
  ],
};
