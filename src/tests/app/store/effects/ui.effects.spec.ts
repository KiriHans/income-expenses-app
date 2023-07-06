import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UiEffects } from 'src/app/store/effects/ui.effects';

describe('UiEffects', () => {
  let actions$: Observable<unknown>;
  let effects: UiEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UiEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
