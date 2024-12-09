import { TestBed } from '@angular/core/testing';

import { RestaurantLoginGuard } from './restaurant-login.guard';

describe('RestaurantLoginGuard', () => {
  let guard: RestaurantLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestaurantLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
