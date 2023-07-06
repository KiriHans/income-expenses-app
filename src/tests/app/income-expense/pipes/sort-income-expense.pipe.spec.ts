import { SortIncomeExpensePipe } from 'src/app/income-expense/pipes/sort-income-expense.pipe';

describe('SortIncomeExpensePipe', () => {
  it('create an instance', () => {
    const pipe = new SortIncomeExpensePipe();
    expect(pipe).toBeTruthy();
  });
});
