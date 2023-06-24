import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { UiActions } from './ui.actions';

@Injectable()
export class UiEffects {
  loadUis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UiActions.loadUI),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(map((data) => UiActions.loadUI()))
      )
    );
  });

  constructor(private actions$: Actions) {}
}
