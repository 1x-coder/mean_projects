import { TestBed } from '@angular/core/testing';

import { BookReservationService } from './book-reservation.service';

describe('BookReservationService', () => {
  let service: BookReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
