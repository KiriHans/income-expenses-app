import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Firestore } from '@angular/fire/firestore';
import { IncomeExpenseEffects } from 'src/app/store/effects/income-expense.effects';

describe('IncomeExpenseEffects', () => {
  let actions$: Observable<unknown>;
  let effects: IncomeExpenseEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncomeExpenseEffects, provideMockActions(() => actions$), Firestore],
    });

    effects = TestBed.inject(IncomeExpenseEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
