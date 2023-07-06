import { TestBed } from '@angular/core/testing';

import {
  Firestore,
  collection,
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';

import { IncomeExpenseService } from 'src/app/income-expense/services/income-expense.service';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserApp } from 'src/app/core/models/users.model';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { MockInstance, MockProvider } from 'ng-mocks';

import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { signal } from '@angular/core';

describe('IncomeExpenseService', () => {
  MockInstance.scope();

  let service: IncomeExpenseService;
  let authService: AuthService;
  let userData: UserApp;

  const initialState = {
    user: {
      id: '123',
      displayName: 'test',
      email: 'test@gm.com',
      loading: false,
    },
  };
  const user = {
    displayName: 'Test Subject',
    email: 'user@test.com',
    password: '123',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({ projectId: 'demo-project' })),

        provideFirestore(() => {
          const firestore = initializeFirestore(getApp(), {
            experimentalForceLongPolling: true,
          });
          connectFirestoreEmulator(firestore, 'localhost', 8080);
          return firestore;
        }),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: Auth, useValue: { userId$: signal('123') } },
      ],
    });
    service = TestBed.inject(IncomeExpenseService);
    console.log(environment.firebase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create item', async () => {
    const newIncome = {
      userId: 'newId',
      incomeExpense: new IncomeExpense('test', 100, 'income'),
    };

    console.log(await service.create('newId', new IncomeExpense('test', 100, 'income')));
  });
});
