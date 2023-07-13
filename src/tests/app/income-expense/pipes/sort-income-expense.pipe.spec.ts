import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { SortIncomeExpensePipe } from 'src/app/income-expense/pipes/sort-income-expense.pipe';

describe('SortIncomeExpensePipe', () => {
  it('create an instance', () => {
    const pipe = new SortIncomeExpensePipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort elements depending if they are income or expense', () => {
    const incomeItems = [
      new IncomeExpense('Test 1', 100, 'income'),
      new IncomeExpense('Test 2', 200, 'expense'),
      new IncomeExpense('Test 3', 400, 'expense'),
      new IncomeExpense('Test 4', 140, 'income'),
    ];
    const expectedItems = [
      new IncomeExpense('Test 1', 100, 'income'),
      new IncomeExpense('Test 4', 140, 'income'),
      new IncomeExpense('Test 2', 200, 'expense'),
      new IncomeExpense('Test 3', 400, 'expense'),
    ];
    const pipe = new SortIncomeExpensePipe();

    const resultingItems = pipe.transform(incomeItems);

    expect(resultingItems[0].type).toBe('income');
    expect(resultingItems[1].type).toBe('income');
    expect(resultingItems).toEqual(expectedItems);
  });

  it('should not mutate the original array', () => {
    const incomeItems = [
      new IncomeExpense('Test 1', 100, 'income'),
      new IncomeExpense('Test 2', 200, 'expense'),
      new IncomeExpense('Test 3', 400, 'expense'),
      new IncomeExpense('Test 4', 140, 'income'),
    ];

    const expectedItems = [...incomeItems];

    const pipe = new SortIncomeExpensePipe();

    pipe.transform(incomeItems);

    expect(incomeItems).toEqual(expectedItems);
  });
});
