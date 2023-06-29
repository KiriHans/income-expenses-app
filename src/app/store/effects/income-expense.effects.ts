import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { IncomeExpenseActions } from '../actions/income-expense.actions';
import { IncomeExpenseService } from 'src/app/income-expense/services/income-expense.service';
import { AuthActions } from '../actions/auth.actions';

@Injectable()
export class IncomeExpenseEffects {
  private incomeExpenseService = inject(IncomeExpenseService);

  createIncomeExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IncomeExpenseActions.createIncomeExpenses),
      concatMap(({ userId, incomeExpense }) =>
        from(this.incomeExpenseService.create(userId, incomeExpense)).pipe(
          map(() => {
            return IncomeExpenseActions.creationSuccess({ incomeExpense });
          }),
          catchError((error) => of(IncomeExpenseActions.creationFailure({ error })))
        )
      )
    );
  });

  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuthenticated),
      concatMap(({ user }) => {
        return this.incomeExpenseService.getAll(user.id || '').pipe(
          map((items) => IncomeExpenseActions.setItems({ items })),
          catchError((error) => of(IncomeExpenseActions.creationFailure({ error })))
        );
      })
    );
  });

  unLoadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userNotAuthenticated),
      map(() => IncomeExpenseActions.unsetItems())
    );
  });

  constructor(private actions$: Actions) {}
}
