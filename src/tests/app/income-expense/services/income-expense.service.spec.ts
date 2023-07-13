import { TestBed } from '@angular/core/testing';

import firebase from 'firebase/compat/app';

import { Firestore } from '@angular/fire/firestore';

import { IncomeExpenseService } from 'src/app/income-expense/services/income-expense.service';
import { provideMockStore } from '@ngrx/store/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { MockInstance } from 'ng-mocks';

import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { setup, teardown } from 'src/tests/helpers';

import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('IncomeExpenseService', () => {
  MockInstance.scope();

  let testEnv: RulesTestEnvironment, firebase: firebase.firestore.Firestore;
  let consoleSpy: jest.SpyInstance;

  let service: IncomeExpenseService;

  const initialState = {
    user: {
      id: '123',
      displayName: 'test',
      email: 'test@gm.com',
      loading: false,
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading: _, ...user } = { ...initialState.user };

  beforeAll(async () => {
    consoleSpy = jest.spyOn(global.console, 'warn').mockImplementation();

    ({ testEnv, firebase } = await setup(user, {
      withRules: false,
      experimentalForceLongPolling: true,
    }));
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
          const auth = getAuth();
          return auth;
        }),
      ],
      providers: [provideMockStore({ initialState }), { provide: Firestore, useValue: firebase }],
    });
    const ref = firebase.collection(`users`);
    const docRef = ref.doc(user.id);

    await docRef.set(user);

    service = TestBed.inject(IncomeExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create item', async () => {
    const newIncome = new IncomeExpense('test', 100, 'income');

    const document = await service.create(user.id, newIncome);

    const ref = firebase.collection(`users/${user.id}/income-expense`);
    const docRef = ref.doc(document.id);

    const itemData = (await docRef.get()).data();

    expect(itemData).toEqual(newIncome);
  });

  it('should get all items', async () => {
    const ref = service.getAll(user.id);
    const observerSpy = subscribeSpyTo(ref);

    const newIncomes = [
      new IncomeExpense('test 1', 100, 'income'),
      new IncomeExpense('test 2', 50, 'expense'),
      new IncomeExpense('test 3', 150, 'expense'),
    ];

    for (let i = 0; i < newIncomes.length; i++) {
      const document = await service.create(user.id, newIncomes[i]);
      newIncomes[i].id = document.id;
    }

    const lastValues = observerSpy.getLastValue();
    expect(lastValues).toBeTruthy();

    lastValues?.forEach((item) => {
      const idItem = item.id;
      expect(item).toEqual(newIncomes.find((income) => income.id === idItem));
    });
    observerSpy.unsubscribe();
  });
  it('should delete item', async () => {
    const newIncome = new IncomeExpense('test', 100, 'income');

    const document = await service.create(user.id, newIncome);

    const ref = firebase.collection(`users/${user.id}/income-expense`);
    const docRef = ref.doc(document.id);

    expect((await docRef.get()).data()).toBeTruthy();

    await service.delete(document.id);

    expect((await docRef.get()).data()).toBeFalsy();
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    consoleSpy.mockRestore();
    await teardown(testEnv);
  });
});
