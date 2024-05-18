import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";
import { ShopParser } from "./shop-parser";

export class LidlParser extends ShopParser{
   
    protected productRegex = new RegExp('\\d+(\\.\\d+)? [A-Z]', 'g');
    protected quantityKgRegex = new RegExp('\\d+(\\.\\d+)?kg x \\d+(\\.\\d+)?EUR/kg', 'g');
    protected quantitygRegex = new RegExp('\\d+(\\.\\d+)?g x \\d+(\\.\\d+)?EUR/g', 'g');
    protected quantityRegex = new RegExp('^\\d+(\\.\\d+)?x\\d+(\\.\\d+)?$', 'g');

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
        this.price = parseFloat(splits[splits.length-2].replace(",","."));
        this.description = splits.slice(0,splits.length-2).join(" ");
        this.checkForQuantaty(lines);            
        this.checkforDiscount(lines);    
        this.addProdcut();
    }
    checkForQuantaty(lines :string[]) {
        let line = lines[this.idx+1].trim();
        if(line.match(this.quantityKgRegex) || line.match(this.quantitygRegex) || line.match(this.quantityRegex)){
            this.description += " " + line;
        }
    }

    checkforDiscount(lines :string[]) {
        let probableDiscount = lines[this.idx+1];
        if (probableDiscount.includes("Desconto Lidl Plus")) {
            let splits = probableDiscount.split(" ");
            let discount = parseFloat(splits[splits.length-1].replace(",",".").trim().substring(1));
            this.price -= discount;            
            this.idx++;
        }
    }

    override getShopName(): string {
        return "Lidl";
    }

}