import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";
import { ShopParser } from "./shop-parser";

export class LidlParser extends ShopParser{
   
    protected productRegex = new RegExp('\\d+(\\.\\d+)? [A-Z]', 'g');
    protected quantityKgRegex = new RegExp('\\d+(\\.\\d+)? kg (x|X) \\d+(\\.\\d+)? EUR/kg', 'g');
    protected quantitygRegex = new RegExp('\\d+(\\.\\d+)? g (x|X) \\d+(\\.\\d+)? EUR/g', 'g');
    protected quantityRegex = new RegExp('\\d+(\\.\\d+)?\\s*x\\s*\\d+(\\.\\d+)?', 'g');

    protected override dateSearchCase(line:string, lines :string[]): void {
        if (line.includes("Original Data")) {
            this.date = line.split(" ")[4].trim();
            //from yyyy-mm-dd to mm/dd/yyyy
            let dateSplt = this.date.split(/—|-/);
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
        if (!line.match(this.productRegex)) {
            return;
        }
        let splits:string[] = line.trim().split(" ");
        this.price = parseFloat(splits[splits.length-2].replace(",",".").replaceAll("l","1"));
        this.description = splits.slice(0,splits.length-2).join(" ");
        this.checkForQuantaty(lines);            
        this.checkforDiscount(lines);    
        this.addProdcut();
    }
    checkForQuantaty(lines :string[]) {
        let line = lines[this.idx+1].trim().replaceAll(",",".");
        if(line.match(this.quantityKgRegex) || line.match(this.quantitygRegex) || line.match(this.quantityRegex)){
            this.description += " " + line;
            this.idx++;
        }
    }

    checkforDiscount(lines :string[]) {
        let currentIdx = this.idx+1;
        let probableDiscount = lines[currentIdx];
        while((probableDiscount.includes("Desconto") || probableDiscount.includes("DESCONTO"))){
            let splits = probableDiscount.split(" ");
            let discount = parseFloat(splits[splits.length-1].replace(",",".").trim().substring(1).replaceAll("l","1"));
            this.price -= discount;
            currentIdx++;
            probableDiscount = lines[currentIdx];
        }
        if (currentIdx != this.idx+1) {
            this.idx = currentIdx-1;  
        }
    }

    override getShopName(): string {
        return "Lidl";
    }

}