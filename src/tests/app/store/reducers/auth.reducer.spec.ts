import { Action } from '@ngrx/store';
import { initialState, userReducer } from 'src/app/store/reducers/auth.reducer';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = userReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
