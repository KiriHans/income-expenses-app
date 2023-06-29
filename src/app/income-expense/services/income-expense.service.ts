import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  DocumentReference,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { incomeExpenseConverter } from 'src/app/core/income-expense-data-converter';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  private readonly firestore = inject(Firestore);

  create(userId: string, incomeExpense: IncomeExpense): Promise<DocumentReference<IncomeExpense>> {
    const newIncomeExpenseCollection = collection(
      this.firestore,
      `users`,
      `${userId}`,
      'income-expense'
    ).withConverter(incomeExpenseConverter);
    return addDoc(newIncomeExpenseCollection, incomeExpense);
  }

  getAll(userId: string): Observable<IncomeExpense[]> {
    return collectionData<IncomeExpense>(
      collection(
        this.firestore,
        'users',
        `${userId}`,
        'income-expense'
      ) as CollectionReference<IncomeExpense>
    );
  }
}
