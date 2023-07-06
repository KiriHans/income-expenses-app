import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import {
  UserAuth,
  addDataWithoutRulesFirestore,
  createItem,
  setup,
  teardown,
} from './src/tests/helpers';
import firebase from 'firebase/compat/app';

const currentUserAuth: UserAuth = {
  id: '123Maria',
  email: '123@test.com',
  displayName: 'test',
};

const secondUserAuth: UserAuth = {
  id: `second${currentUserAuth.id}`,
  email: 'second123@test.com',
  displayName: 'test2',
};

const data = {
  'users/123Maria': {
    displayName: currentUserAuth.displayName,
    email: currentUserAuth.email,
  },
  'users/123Maria/income-expense/123': {
    description: 'Test Item',
    amount: 100,
    type: 'income',
  },
};

describe('Firebase security rules', () => {
  let testEnv: RulesTestEnvironment, firebase: firebase.firestore.Firestore;
  let consoleSpy: jest.SpyInstance;

  beforeAll(async () => {
    consoleSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    ({ testEnv, firebase } = await setup(currentUserAuth));
  });

  beforeEach(async () => {
    await addDataWithoutRulesFirestore(testEnv, data);
  });

  test('Deny when unsign user reads user data', async () => {
    const unSignUser = testEnv.unauthenticatedContext();
    const unSignDb = unSignUser.firestore();

    const ref = unSignDb.collection(`users`);
    const docRef = ref.doc(currentUserAuth.id);

    expect(await assertFails(docRef.get()));
  });

  test('Allow sign user to read user data', async () => {
    const ref = firebase.collection(`users`);
    const docRef = ref.doc(currentUserAuth.id);

    expect(await assertSucceeds(docRef.get()));
  });

  test('Deny unauthorized user to create other users docs', async () => {
    const ref = firebase.collection(`users`);
    const docRef = ref.doc(`second${currentUserAuth.id}`);

    expect(await assertFails(docRef.set(secondUserAuth)));
  });
  test('Allow user to create their own user doc', async () => {
    await testEnv.clearFirestore();

    const ref = firebase.collection(`users`);
    const docRef = ref.doc(`${currentUserAuth.id}`);

    expect(await assertSucceeds(docRef.set(currentUserAuth)));
  });

  test('Deny user to read other users income-expense items', async () => {
    const ref = firebase.collection(`users/${secondUserAuth.id}/income-expense`);
    const docRef = ref.doc(`456`);

    expect(await assertFails(docRef.get()));
  });

  test('Allow user to read their own income-expense items', async () => {
    const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
    const docRef = ref.doc(`123`);

    expect(await assertSucceeds(docRef.get()));
  });

  describe('Deny user to create an invalid income-expense item', () => {
    test('User is not signed up', async () => {
      const correctItem = createItem('description test', 100, 'income');

      const unSignUser = testEnv.unauthenticatedContext();
      const unSignDb = unSignUser.firestore();
      const ref = unSignDb.collection(`users/${currentUserAuth.id}/income-expense`);
      const docRef = ref.doc('newDoc');

      expect(await assertFails(docRef.set(correctItem)));
    });
    test("User is sign up but it doesn't belong to them", async () => {
      const correctItem = createItem('description test', 100, 'income');

      const ref = firebase.collection(`users/${secondUserAuth.id}/income-expense`);
      const docRef = ref.doc('456');

      expect(await assertFails(docRef.set(correctItem)));
    });

    test('Amount is not a number', async () => {
      const incorrectItem = createItem('description test', '100', 'income');

      const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
      const docRef = ref.doc('newDoc');

      expect(typeof incorrectItem.amount).not.toBe('number');
      expect(await assertFails(docRef.set(incorrectItem)));
    });

    test('Amount is a negative number', async () => {
      const incorrectItem = createItem('description test', -100, 'income');

      const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
      const docRef = ref.doc('newDoc');

      expect(incorrectItem.amount).toBeLessThan(0);
      expect(await assertFails(docRef.set(incorrectItem)));
    });

    test('Description is not a string', async () => {
      const incorrectItem = createItem(120, 100, 'income');

      const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
      const docRef = ref.doc('newDoc');

      expect(typeof incorrectItem.amount).not.toBe('string');
      expect(await assertFails(docRef.set(incorrectItem)));
    });

    test('Description is too long', async () => {
      const longString =
        'This is a very long string depicting an incorrect user input abcdefghijklmnopqrstuvwxyz0123456789-., e';
      const incorrectItem = createItem(longString, 100, 'income');

      const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
      const docRef = ref.doc('newDoc');

      expect(longString.length).toBeGreaterThan(100);
      expect(await assertFails(docRef.set(incorrectItem)));
    });
    test('Description is an empty string', async () => {
      const incorrectItem = createItem('', 100, 'income');

      const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
      const docRef = ref.doc('newDoc');

      expect(await assertFails(docRef.set(incorrectItem)));
    });
    test("Type is not 'income' or 'expense'", async () => {
      const incorrectItem = createItem('description test', 100, 'notIncome');

      const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
      const docRef = ref.doc('newDoc');

      expect(await assertFails(docRef.set(incorrectItem)));
    });
  });

  test('Allow user to create a valid income-expense item', async () => {
    const correctItem = createItem('description test', 100, 'income');

    const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
    const docRef = ref.doc('newDoc');

    expect(await assertSucceeds(docRef.set(correctItem)));
  });

  test('Deny user to delete other users income-expense items', async () => {
    const ref = firebase.collection(`users/${secondUserAuth.id}/income-expense`);
    const docRef = ref.doc('456');

    expect(await assertFails(docRef.delete()));
  });

  test('Allow user to delete their own income-expense items', async () => {
    const correctItem = createItem('description test', 100, 'income');

    const ref = firebase.collection(`users/${currentUserAuth.id}/income-expense`);
    const docRef = ref.doc('newDoc');
    await docRef.set(correctItem);

    expect(await assertSucceeds(docRef.delete()));
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    consoleSpy.mockRestore();
    await teardown(testEnv);
  });
});
