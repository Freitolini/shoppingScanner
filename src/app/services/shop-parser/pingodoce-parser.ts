import { ParserState } from "../../types/ishop-parser";
import { Product } from "../../types/invoice";
import { ShopParser } from "./shop-parser";

export class PingoDoceParser extends ShopParser{
    override shopName: string = "Pingo Doce";
    descontoRegex:RegExp = new RegExp('\\((\\d+(\\.\\d+)?)\\)', 'g');

    protected override multiLineCase(line:string, lines :string[]) {
        this.checkforDiscount(lines);
        this.addProdcut();
        this.state = ParserState.ProductSearch;
    }

    protected override dateSearchCase(line:string, lines :string[]): void {
        if (line.includes("emissão:") || line.includes("emissao:")) {
            let dateSplit = line.split(" ");
            this.date = dateSplit[dateSplit.length-1].trim().split(":")[1];
            this.state = ParserState.StartOfProductsSearch;
            this.resetIdx();
        }    
    }
    
    protected override startOfProductsSearchCase(line:string, lines :string[]): void {
        if (line.includes("Artigos\n")) {
            this.state = ParserState.ProductSearch;
        }
    }
    
    protected override productsSearchCase(line:string, lines :string[]): void {
       if (this.checkForEndofProducts(line)){
              return;
       }
        let splits:string[] = line.trim().split(" ");
        this.price = parseFloat(splits[splits.length-1].replace(",","."));
        this.description = splits.slice(2,splits.length-1).join(" ");
        if (this.checkforMultiple(lines) || this.checkforDiscount(lines)){
            return
        }
        this.addProdcut(); 
    }

    checkForEndofProducts(line:string):boolean{
        if (line.includes("TOTAL A PAGAR ")) {
            let lines = line.trim().split(" ");
            this.totalReal = Number(lines[lines.length-1].replace(",","."));
            this.state = ParserState.Ended; 
            return true;
        }
        return false;
    }

    checkforDiscount(lines :string[]): boolean {
        let result = this.descontoRegex.exec(lines[this.idx+1].replace(",","."));
        let discount = NaN;
        if (result){
            discount = parseFloat(result[1]);
        }
        if (!isNaN(discount)){
            let nextLine = lines[this.idx+1].trim().split(" ");
            let discount = parseFloat(nextLine[nextLine.length-1].replace(",",".").replace("(","").replace(")",""));
            this.price = this.price - discount;
            this.state = ParserState.MultiLine; 
            return true;
        }
        return false;
    }

    private checkforMultiple(lines:string[]):boolean{
        if (!isNaN(Number(lines[this.idx+1][0]))){
            let nextLine = lines[this.idx+1].trim().split(" ");
            this.price = parseFloat(nextLine[nextLine.length-1].replace(",","."));
            this.state = ParserState.MultiLine; 
            return true;
        }
        return false;
    }
}