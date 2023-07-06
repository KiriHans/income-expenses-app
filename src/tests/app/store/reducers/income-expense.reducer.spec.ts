import { Action } from '@ngrx/store';
import { initialState, reducer } from 'src/app/store/reducers/income-expense.reducer';

describe('IncomeExpense Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
