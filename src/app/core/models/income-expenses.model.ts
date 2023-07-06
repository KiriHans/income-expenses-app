import { DocumentData } from '@angular/fire/firestore';

export const isIncomeExpense = (x: DocumentData | undefined | null): x is IncomeExpense => {
  return (
    !!x &&
    x['description'] !== undefined &&
    x['amount'] !== undefined &&
    x['type'] !== undefined &&
    x['id'] !== undefined
  );
};

export type IncomeExpenseType = 'income' | 'expense';

export class IncomeExpense {
  constructor(
    public description: string,
    public amount: number,
    public type: IncomeExpenseType,
    public id?: string | null
  ) {}
}
