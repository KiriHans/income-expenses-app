import * as fromAuth from '../../store/reducers/auth.reducer';
import { selectAuthState } from '../../store/selectors/auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAuthState({
      [fromAuth.authFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
