import { TestBed } from '@angular/core/testing';

import { SysVariableServiceService } from './sys-variable-service.service';

describe('SysVariableServiceService', () => {
  let service: SysVariableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysVariableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
