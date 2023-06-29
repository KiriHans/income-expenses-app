import * as fromIncomeExpense from '../reducers/income-expense.reducer';
import { selectIncomeExpenseState } from './income-expense.selectors';

describe('IncomeExpense Selectors', () => {
  it('should select the feature state', () => {
    const result = selectIncomeExpenseState({
      [fromIncomeExpense.incomeExpenseFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
