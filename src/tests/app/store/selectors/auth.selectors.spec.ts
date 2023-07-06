import * as fromAuth from 'src/app/store/reducers/auth.reducer';
import { selectAuthState } from 'src/app/store/selectors/auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAuthState({
      [fromAuth.authFeatureKey]: {},
    });
  });
});
