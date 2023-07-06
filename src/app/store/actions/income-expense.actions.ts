import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';

export const IncomeExpenseActions = createActionGroup({
  source: 'Income Expense',
  events: {
    'Unset Items': emptyProps(),
    'Set Items': props<{ items: IncomeExpense[] }>(),
    'Set Items Failure': props<{ error: unknown }>(),
    'Create Income expenses': props<{ incomeExpense: IncomeExpense }>(),
    'Creation success': props<{ incomeExpense: IncomeExpense }>(),
    'Creation failure': props<{ error: unknown }>(),
  },
});

export const DetailsActions = createActionGroup({
  source: 'Details',
  events: {
    'delete item': props<{ incomeExpense: IncomeExpense[]; itemId: string }>(),
    'Deletion completed': emptyProps(),
    'Deletion error': props<{ incomeExpense: IncomeExpense[]; error: unknown }>(),
  },
});
