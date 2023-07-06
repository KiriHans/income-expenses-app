import { Action } from '@ngrx/store';
import { uiReducer, initialState } from 'src/app/store/reducers/ui.reducer';

describe('Ui Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = uiReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
