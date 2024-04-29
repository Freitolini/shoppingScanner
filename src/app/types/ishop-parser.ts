import { ProductLine } from "./product-line";

export interface IShopParser {
    shopName: string;
    parseLines(lines: String[]): ProductLine[];
}

export enum ParserState {
    Date = "Date",
    StartOfProducts = "StartOfProducts",
    Products = "Products",
    Ended = "Ended"
}
