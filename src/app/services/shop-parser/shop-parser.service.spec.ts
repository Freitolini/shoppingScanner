import { TestBed } from '@angular/core/testing';

import { ShopParserService } from './shop-parser.service';
import { InvoiceStatus } from '../../types/invoice';

import * as lidlJson from '../../../assets/lidl.json';


describe('ShopParserService', () => {
  let service: ShopParserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopParserService]
  });
    service = TestBed.inject(ShopParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of parsers', () => {
    const parsers = service.getParsers();
    expect(parsers).toEqual(['Lidl', 'Pingo Doce', 'Continente']);
  });

  it('should parse Lidl invoice correctly', (done) => {
    const shopName = 'Lidl';

    const result = service.parseShop(lidlJson,shopName);
    expect(result).toBeTruthy();
    expect(result.totalReal).toBe(91.03);
    expect(result.products.length).toBe(43);
    expect(result.date).toBe("10/28/2024");
    expect(result.payee).toBe('Lidl');
    expect(result.status).toBe(InvoiceStatus.Complete);
    done();
});

});
