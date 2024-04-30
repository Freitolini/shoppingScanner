import { ProductLine } from "./product-line";

export interface IShopParser {
    shopName: string;
    parseLines(lines: String[],date?:string): ProductLine[];
}

export enum ParserState {
    Date = "Date",
    StartOfProducts = "StartOfProducts",
    Products = "Products",
    Ended = "Ended"
}
