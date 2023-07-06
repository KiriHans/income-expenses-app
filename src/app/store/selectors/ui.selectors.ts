import { createFeatureSelector } from '@ngrx/store';
import * as fromUi from '../reducers/ui.reducer';

export const selectUiState = createFeatureSelector<fromUi.UIState>(fromUi.uiFeatureKey);
