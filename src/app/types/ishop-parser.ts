import { Invoice } from "./invoice";

export interface IShopParser {
    shopName: string;
    parseLines(lines: String[],date?:string): Invoice;
}

export enum ParserState {
    DateSearch = "DateSearch",
    StartOfProductsSearch = "StartOfProductsSearch",
    ProductSearch = "ProductSearch",
    MultiLine = "Multiple",
    Ended = "Ended",
    End = "End"
}
