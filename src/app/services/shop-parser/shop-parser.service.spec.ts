import { TestBed } from '@angular/core/testing';

import { ShopParserService } from './shop-parser.service';

describe('ShopParserService', () => {
  let service: ShopParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
