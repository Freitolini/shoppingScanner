import { Injectable } from '@angular/core';
import { IShopParser } from '../../types/ishop-parser';
import { LidlParser } from './lidl-parser';
import { PingoDoceParser } from './pingodoce-parser';

@Injectable({
  providedIn: 'root'
})
export class ShopParserService {


  parserList: IShopParser[] = [
    new LidlParser(),
    new PingoDoceParser()
  ];

  constructor() { }

  parseShop(lines: string[], shopName: string,date?:string) {
    let parser = this.parserList.find(parser => parser.shopName == shopName);
    if (parser) {
      return parser.parseLines(lines,date);
    }
    else {
      throw new Error("Parser not found");
    }
  }

  getParsers(): string[] {
    return this.parserList.map(parser => parser.shopName);
  }

}
