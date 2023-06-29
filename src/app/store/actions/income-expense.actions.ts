import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';

export const IncomeExpenseActions = createActionGroup({
  source: 'Income Expense',
  events: {
    'Unset Items': emptyProps(),
    'Set Items': props<{ items: IncomeExpense[] }>(),
    'Create Income expenses': props<{ userId: string; incomeExpense: IncomeExpense }>(),
    'Creation success': props<{ incomeExpense: IncomeExpense }>(),
    'Creation failure': props<{ error: unknown }>(),
  },
});
