import { Invoice } from "./invoice";

export interface IShopParser {
    parseLines(lines: String[],date?:string): Invoice;
    getShopName(): string;
}

export enum ParserState {
    DateSearch = "DateSearch",
    StartOfProductsSearch = "StartOfProductsSearch",
    ProductSearch = "ProductSearch",
    MultiLine = "Multiple",
    Ended = "Ended",
    End = "End"
}
