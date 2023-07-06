import { IncomeExpense, IncomeExpenseType } from '../models/income-expenses.model';

export const calculateTotalAmount = (type: IncomeExpenseType, items: IncomeExpense[]) => {
  const itemsByType = items.filter((item) => item.type === type);
  if (itemsByType.length === 0) return 0;

  return itemsByType.map((item) => item.amount).reduce((previous, current) => previous + current);
};
