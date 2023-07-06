import { TestBed } from '@angular/core/testing';

import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/services/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
