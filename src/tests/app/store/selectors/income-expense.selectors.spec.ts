import * as fromIncomeExpense from 'src/app/store/reducers/income-expense.reducer';
import { selectIncomeExpenseState } from 'src/app/store/selectors/income-expense.selectors';

describe('IncomeExpense Selectors', () => {
  it('should select the feature state', () => {
    const result = selectIncomeExpenseState({
      [fromIncomeExpense.incomeExpenseFeatureKey]: {},
    });
  });
});
