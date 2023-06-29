import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    'Load UI': emptyProps(),
    'Stop Load UI': emptyProps(),
    'Modal Income Expense': props<{ description: string }>(),
  },
});
