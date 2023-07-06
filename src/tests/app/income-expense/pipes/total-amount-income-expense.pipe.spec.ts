import { IncomeExpenseDifferencePipe } from 'src/app/income-expense/pipes/total-amount-income-expense.pipe';

describe('TotalAmountIncomeExpensePipe', () => {
  it('create an instance', () => {
    const pipe = new IncomeExpenseDifferencePipe();
    expect(pipe).toBeTruthy();
  });
});
