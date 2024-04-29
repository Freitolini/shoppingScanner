import { TestBed } from '@angular/core/testing';

import { OcrConverterService } from './ocr-converter.service';

describe('OcrConverterService', () => {
  let service: OcrConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcrConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
