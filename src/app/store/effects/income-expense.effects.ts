import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { DetailsActions, IncomeExpenseActions } from '../actions/income-expense.actions';
import { IncomeExpenseService } from 'src/app/income-expense/services/income-expense.service';
import { AuthActions, LoginActions } from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { authFeature } from '../reducers/auth.reducer';

@Injectable()
export class IncomeExpenseEffects {
  private incomeExpenseService = inject(IncomeExpenseService);
  private store = inject(Store);

  createIncomeExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IncomeExpenseActions.createIncomeExpenses),
      concatLatestFrom(() => this.store.select(authFeature.selectId)),
      switchMap(([{ incomeExpense }, userId]) =>
        from(this.incomeExpenseService.create(userId || '', incomeExpense)).pipe(
          map((response) => {
            return IncomeExpenseActions.creationSuccess({
              incomeExpense: { ...incomeExpense, id: response.id },
            });
          }),
          catchError((error) => of(IncomeExpenseActions.creationFailure({ error })))
        )
      )
    );
  });

  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuthenticated, LoginActions.loginSuccess),
      switchMap(({ user }) => {
        return this.incomeExpenseService.getAll(user.id || '').pipe(
          take(1),
          map((items) => {
            return IncomeExpenseActions.setItems({ items });
          }),
          catchError((error) => {
            return of(IncomeExpenseActions.setItemsFailure({ error }));
          })
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

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.deleteItem),
      concatMap(({ itemId, incomeExpense }) => {
        return from(this.incomeExpenseService.delete(itemId)).pipe(
          map(() => DetailsActions.deletionCompleted()),
          catchError((error) => {
            return of(DetailsActions.deletionError({ incomeExpense, error }));
          })
        );
      })
    );
  });

  constructor(private actions$: Actions) {}
}
