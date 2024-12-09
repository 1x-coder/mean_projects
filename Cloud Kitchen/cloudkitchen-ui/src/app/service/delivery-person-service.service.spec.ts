import { TestBed } from '@angular/core/testing';

import { DeliveryPersonServiceService } from './delivery-person-service.service';

describe('DeliveryPersonServiceService', () => {
  let service: DeliveryPersonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryPersonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
