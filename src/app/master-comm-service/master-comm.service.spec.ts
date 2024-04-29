import { TestBed } from '@angular/core/testing';

import { MasterCommService } from './master-comm.service';

describe('MasterCommService', () => {
  let service: MasterCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
