import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";
import { ShopParser } from "./shop-parser";

export class ContinenteParser extends ShopParser{
    override shopName: string = "Continente";

    protected override dateSearchCase(line:string, lines :string[]): void {
        if (line.includes("Nro:")) {
            this.date = line.split(" ")[3];
            this.state = ParserState.StartOfProductsSearch;
        }
    }
    
    protected override startOfProductsSearchCase(line:string, lines :string[]): void {
        if (line.includes("VALOR")) {
            this.state = ParserState.ProductSearch;
        }
    }
    
    protected override productsSearchCase(line:string, lines :string[]): void {
        if (line.includes("TOTAL A PAGAR ")) {
            let lines = line.trim().split(" ");
            this.totalReal = Number(lines[lines.length-1].replace(",","."));
            this.state = ParserState.Ended; 
            return
        }
        let splits:string[] = line.trim().split(" ");
        let price = parseFloat(splits[splits.length-1].replace(",",".").replace(",","."));
        let description = splits.slice(1,splits.length-1);
        if (!isNaN(price) && description.length != 0){
            this.calculateTotal+=price;
            this.products.push(new Product(description.join(" "), price));
        }
    }

}