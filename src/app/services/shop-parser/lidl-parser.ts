import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";
import { ShopParser } from "./shop-parser";

export class LidlParser extends ShopParser{
    override shopName: string = "Lidl";
   
    protected override dateSearchCase(line:string, lines :string[]): void {
        if (line.includes("Original Data")) {
            this.date = line.split(" ")[4].trim();
            //from yyyy-mm-dd to mm/dd/yyyy
            let dateSplt = this.date.split("—");
            this.date = dateSplt[1] + "/" + dateSplt[2] + "/" + dateSplt[0];
            this.state = ParserState.StartOfProductsSearch;
        }
    }
    
    protected override startOfProductsSearchCase(line:string, lines :string[]): void {
        if (line =="EUR\n") {
            this.state = ParserState.ProductSearch;
        }
    }
    
    protected override productsSearchCase(line:string, lines :string[]): void {
        if (line.includes("Total ")) {
            this.totalReal = Number(line.trim().split(" ")[1].replace(",","."));
            this.state = ParserState.Ended; 
            return;
        }
        let splits:string[] = line.trim().split(" ");
        let price = parseFloat(splits[splits.length-2].replace(",","."));
        let description = splits.slice(0,splits.length-2);
        if (!isNaN(price) && description.length != 0){
            this.calculateTotal+=price;
            this.products.push(new Product(description.join(" "),price ));
        }
    }


}