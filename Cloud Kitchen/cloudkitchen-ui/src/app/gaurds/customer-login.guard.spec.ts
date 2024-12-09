import { TestBed } from '@angular/core/testing';

import { CustomerLoginGuard } from './customer-login.guard';

describe('CustomerLoginGuard', () => {
  let guard: CustomerLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
