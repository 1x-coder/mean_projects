import { TestBed } from '@angular/core/testing';

import { RequestsServiceService } from './requests-service.service';

describe('RequestsServiceService', () => {
  let service: RequestsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
