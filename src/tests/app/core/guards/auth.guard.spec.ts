import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';

describe('authGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
