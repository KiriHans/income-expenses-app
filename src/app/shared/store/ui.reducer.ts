import { createFeature, createReducer, on } from '@ngrx/store';
import { UiActions } from './ui.actions';

export const uiFeatureKey = 'ui';

export interface UIState {
  isLoading: boolean;
}

export const initialState: UIState = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.loadUI, (state): UIState => ({ ...state, isLoading: true })),
  on(UiActions.stopLoadUI, (state): UIState => ({ ...state, isLoading: false }))
);

export const uiFeature = createFeature({
  name: uiFeatureKey,
  reducer: uiReducer,
});
