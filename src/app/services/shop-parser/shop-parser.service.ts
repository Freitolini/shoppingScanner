import { Injectable } from '@angular/core';
import { IShopParser } from '../../types/ishop-parser';
import { LidlParser } from './lidl-parser';
import { PingoDoceParser } from './pingodoce-parser';
import { ContinenteParser } from './continente-parser';

@Injectable({
  providedIn: 'root'
})
export class ShopParserService {


  parserList: IShopParser[] = [
    new LidlParser(),
    new PingoDoceParser(),
    new ContinenteParser()
  ];

  constructor() { }

  parseShop(lines: string[], shopName: string,date?:string) {
    let parser = this.parserList.find(parser => parser.getShopName() == shopName);
    if (parser) {
      return parser.parseLines(lines,date);
    }
    else {
      throw new Error("Parser not found");
    }
  }

  getParsers(): string[] {
    return this.parserList.map(parser => parser.getShopName());
  }

}
