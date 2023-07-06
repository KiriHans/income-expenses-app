import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';

import * as fs from 'fs';
import { DocumentData } from '@angular/fire/firestore';

export type UserAuth = {
  id: string;
  email: string;
  displayName?: string;
};

export const createItem = (description: unknown, amount: unknown, type: unknown) => {
  return {
    description,
    amount,
    type,
  };
};

export const setup = async (auth: UserAuth) => {
  const testEnv = await initializeTestEnvironment({
    projectId: 'income-expense-app-ac975',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    },
  });

  const rulesTestContext = testEnv.authenticatedContext(auth.id, { ...auth, uid: undefined });
  const firebase = rulesTestContext.firestore();

  return { testEnv, rulesTestContext, firebase };
};

export const addDataWithoutRulesFirestore = async (
  testEnv: RulesTestEnvironment,
  data?: { [field: string]: DocumentData }
) => {
  if (data) {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const firebase = context.firestore();
      for (const key in data) {
        const ref = firebase.doc(key);
        await ref.set(data[key]);
      }
    });
  }
};

export const teardown = async (rulesTestEnv: RulesTestEnvironment) => {
  await rulesTestEnv.cleanup();
};
