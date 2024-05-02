import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";

export class ShopParser implements IShopParser {
    shopName: string = "Shop";
    protected state = ParserState.DateSearch as ParserState;
    protected products: IProduct[] = [];
    protected calculateTotal :number = 0;
    protected totalReal :number = 0;
    protected date :string = "";
    protected payee: string = this.shopName; 
    protected idx: number = 0;
    protected price: number = 0;
    protected description: string = "";

    parseLines(lines: string[],date?:string): Invoice {
        if (date){
            this.state = ParserState.StartOfProductsSearch
        }
        while(this.idx != lines.length && this.state != ParserState.End){   
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
        return new Invoice(this.date,this.payee,this.products,this.calculateTotal,this.totalReal); 
    }
    protected multiLineCase(line:string, lines :string[]) {
        // Implement your logic here
    }

    protected dateSearchCase(line:string, lines :string[] ): void {
        // Implement your logic here
    }
    
    protected startOfProductsSearchCase(line:string, lines :string[]): void {
        // Implement your logic here
    }
    
    protected productsSearchCase(line:string, lines :string[]): void {
        // Implement your logic here
    }
    
    protected endedCase(line:string, lines :string[]): void {
        this.state = ParserState.Ended;
    }

    protected resetIdx(){
        this.idx = -1;
    }
}