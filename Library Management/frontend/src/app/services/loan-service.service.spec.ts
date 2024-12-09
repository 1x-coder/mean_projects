import { TestBed } from '@angular/core/testing';

import { LoanServiceService } from './loan-service.service';

describe('LoanServiceService', () => {
  let service: LoanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
