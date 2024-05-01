import { Invoice } from "./invoice";

export interface IShopParser {
    shopName: string;
    parseLines(lines: String[],date?:string): Invoice;
}

export enum ParserState {
    Date = "Date",
    StartOfProducts = "StartOfProducts",
    Products = "Products",
    Multiple = "Multiple",
    Ended = "Ended"
}
