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

interface Options {
  withRules?: boolean;
  experimentalForceLongPolling?: boolean;
}

export const setup = async (
  auth: UserAuth,
  { withRules, experimentalForceLongPolling }: Options
) => {
  let rules = `service cloud.firestore {
    match /databases/{database}/documents {
      match /{documents=**} {
        allow read, write;
      }
    }
  }`;
  if (withRules) {
    rules = fs.readFileSync('firestore.rules', 'utf8');
  }
  const testEnv = await initializeTestEnvironment({
    projectId: 'project-demo',
    firestore: {
      rules,
    },
  });

  const rulesTestContext = testEnv.authenticatedContext(auth.id, { ...auth, uid: undefined });
  const firebase = experimentalForceLongPolling
    ? rulesTestContext.firestore({ experimentalForceLongPolling })
    : rulesTestContext.firestore();

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
