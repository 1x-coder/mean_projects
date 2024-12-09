import { TestBed } from '@angular/core/testing';

import { DpLoginGaurdGuard } from './dp-login-gaurd.guard';

describe('DpLoginGaurdGuard', () => {
  let guard: DpLoginGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DpLoginGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
