import { DocumentData } from '@angular/fire/firestore';

export const isIncomeExpense = (x: DocumentData | undefined | null): x is IncomeExpense => {
  return (
    !!x &&
    x['description'] !== undefined &&
    x['amount'] !== undefined &&
    x['type'] !== undefined &&
    x['uid'] !== undefined
  );
};

export class IncomeExpense {
  constructor(
    public description: string,
    public amount: number,
    public type: string,
    public uid?: string | null
  ) {}
}
