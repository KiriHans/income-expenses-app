import { createFeatureSelector } from '@ngrx/store';
import * as fromUi from './ui.reducer';

export const selectUiState = createFeatureSelector<fromUi.UIState>(fromUi.uiFeatureKey);
