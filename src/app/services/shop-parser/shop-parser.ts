import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct, InvoiceStatus } from "../../types/invoice";

export class ShopParser implements IShopParser {
    protected state = ParserState.DateSearch as ParserState;
    protected products: IProduct[] = [];
    protected calculateTotal: number = 0;
    protected totalReal: number = 0;
    protected date: string = "";
    protected payee: string = this.getShopName();
    protected idx: number = 0;
    protected price: number = 0;
    protected description: string = "";

    parseLines(lines: string[], date?: string): Invoice {
        if (date) {
            this.date = date;
            this.state = ParserState.StartOfProductsSearch;
        }
        while (this.idx != lines.length && this.state != ParserState.End) {
            let line = lines[this.idx];
            switch (this.state) {
                case ParserState.DateSearch:
                    this.dateSearchCase(line, lines);
                    break;
                case ParserState.StartOfProductsSearch:
                    this.startOfProductsSearchCase(line, lines);
                    break;
                case ParserState.ProductSearch:
                    this.productsSearchCase(line, lines);
                    break;
                case ParserState.MultiLine:
                    this.multiLineCase(line, lines);
                    break;
                case ParserState.Ended:
                    this.endedCase(line, lines);
                    break;
            }
            ++this.idx;
        }
        return new Invoice(this.date, this.payee, this.products, this.calculateTotal, this.totalReal,InvoiceStatus.Complete);
    }
    protected multiLineCase(line: string, lines: string[]) {
        // Implement your logic here
    }

    protected dateSearchCase(line: string, lines: string[]): void {
        // Implement your logic here
    }

    protected startOfProductsSearchCase(line: string, lines: string[]): void {
        // Implement your logic here
    }

    protected productsSearchCase(line: string, lines: string[]): void {
        // Implement your logic here
    }

    protected endedCase(line: string, lines: string[]): void {
        this.state = ParserState.Ended;
    }

    protected resetIdx() {
        this.idx = -1;
    }
    protected addProdcut() {
        if (!isNaN(this.price) && this.description.length != 0) {
            this.calculateTotal += this.price;
            this.products.push(new Product(this.description, this.price));
        }
    }
    getShopName(): string {
        return "Shop";
    }

}