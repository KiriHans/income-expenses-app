import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { IncomeExpense } from './models/income-expenses.model';

export const incomeExpenseConverter: FirestoreDataConverter<IncomeExpense> = {
  toFirestore: (incomeExpense: IncomeExpense) => {
    const { description, amount, type, uid } = incomeExpense;
    return { description, amount, type, uid };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<IncomeExpense>,
    options: SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);
    return new IncomeExpense(data.description, data.amount, data.type, data.uid);
  },
};
