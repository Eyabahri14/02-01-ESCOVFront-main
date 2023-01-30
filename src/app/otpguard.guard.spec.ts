import { TestBed } from '@angular/core/testing';

import { OtpguardGuard } from './otpguard.guard';

describe('OtpguardGuard', () => {
  let guard: OtpguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OtpguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
