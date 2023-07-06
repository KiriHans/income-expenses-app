import * as fromUi from 'src/app/store/reducers/ui.reducer';
import { selectUiState } from 'src/app/store/selectors/ui.selectors';

describe('Ui Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUiState({
      [fromUi.uiFeatureKey]: {},
    });
  });
});
