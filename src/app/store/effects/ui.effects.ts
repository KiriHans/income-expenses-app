import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { DetailsActions, IncomeExpenseActions } from 'src/app/store/actions/income-expense.actions';
import { LoginActions, RegisterActions } from '../actions/auth.actions';

@Injectable()
export class UiEffects {
  modalIncomeExpense$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(IncomeExpenseActions.creationSuccess),
        tap(({ incomeExpense }) => {
          this.toastr.success(incomeExpense.description, 'Item Added');
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
            this.toastr.error(error.message, 'Error');
          } else {
            this.toastr.error('An unknown error has ocurred', 'Error');
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private toastr: ToastrService) {}
}
