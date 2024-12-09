import { TestBed } from '@angular/core/testing';

import { MyadsService } from './myads.service';

describe('MyadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyadsService = TestBed.get(MyadsService);
    expect(service).toBeTruthy();
  });
});
