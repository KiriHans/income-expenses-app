import { createActionGroup, emptyProps } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    'Load UI': emptyProps(),
    'Stop Load UI': emptyProps(),
  },
});
