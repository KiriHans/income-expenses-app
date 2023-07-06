import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  DocumentReference,
  CollectionReference,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { incomeExpenseConverter } from 'src/app/core/utils/income-expense-data-converter';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);

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
      ) as CollectionReference<IncomeExpense>,
      { idField: 'id' }
    );
  }

  delete(itemId: string) {
    const userId = this.authService.userId$();
    const itemDocumentReference = doc(
      this.firestore,
      `users`,
      `${userId}`,
      'income-expense',
      `${itemId}`
    );

    return deleteDoc(itemDocumentReference);
  }
}
