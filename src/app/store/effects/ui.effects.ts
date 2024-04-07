import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { DetailsActions, IncomeExpenseActions } from 'src/app/store/actions/income-expense.actions';
import { LoginActions, RegisterActions } from '../actions/auth.actions';

@Injectable()
export class UiEffects {
  modalIncomeExpense$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(IncomeExpenseActions.creationSuccess),
        tap(({ incomeExpense }) => {
          Swal.fire('Item Added', incomeExpense.description, 'success');
        })
      );
    },
    { dispatch: false }
  );

  modalError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          RegisterActions.registerFailure,
          LoginActions.loginFailure,
          DetailsActions.deletionError,
          IncomeExpenseActions.setItemsFailure,
          IncomeExpenseActions.creationFailure
        ),
        tap(({ error }) => {
          if (error instanceof Error) {
            Swal.fire('Error', error.message, 'error');
          } else {
            Swal.fire('Error', 'An unknown error has ocurred', 'error');
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
