import { TestBed } from '@angular/core/testing';

import { BookRequestsServiceService } from './book-requests-service.service';

describe('BookRequestsServiceService', () => {
  let service: BookRequestsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRequestsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
