import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";
import { ShopParser } from "./shop-parser";

export class ContinenteParser extends ShopParser{
    capitalLetter:RegExp = new RegExp('/^[A-Z]/', 'g');
    descontoRegex:RegExp = new RegExp('^(POUPANCA|PDUPANCA) \\d+(\\.\\d+)?$', 'g');
    descontoDirectRegex:RegExp = new RegExp('^(DESCONTO DIRETO) \\d+(\\.\\d+)?$', 'g');
    quantityRegex:RegExp = new RegExp('^\\d+(\\.\\d+)?\\s*X\\s*\\d+(\\.\\d+)?', 'gi');
    

    protected override multiLineCase(line:string, lines :string[]) {
        this.checkforDiscount(lines);
        this.addProdcut();
        this.state = ParserState.ProductSearch;
    }

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
        this.description = splits.slice(1,splits.length-1).join(" ");
        if (this.checkforMultiple(lines) || this.checkforDiscount(lines)){
            return
        }
        this.price = parseFloat(splits[splits.length-1].replace(",","."));
        this.addProdcut();
    }

    checkforDiscount(lines :string[]): boolean {
        let line = lines[this.idx+1].replace(",",".");
        let result = this.descontoRegex.exec(line) && this.descontoDirectRegex.exec(line);
        let discount = NaN;
        if (result){
            discount = parseFloat(result[1]);
        }
        if (!isNaN(discount)){
            let nextLine = lines[this.idx+1].trim().split(" ");
            let discount = parseFloat(nextLine[nextLine.length-1].replace(",","."));
            this.price = this.price - discount;
            this.state = ParserState.MultiLine; 
            return true;
        }
        return false;
    }

    private checkforMultiple(lines:string[]):boolean{
        if (this.quantityRegex.exec(lines[this.idx+1].trim().replace(",","."))){
            this.description += " " + lines[this.idx+1].trim();
            let nextLine = lines[this.idx+1].trim().split(" ");
            this.price = parseFloat(nextLine[nextLine.length-1].replace(",","."));
            this.state = ParserState.MultiLine; 
            return true;
        }
        return false;
    }

    override getShopName(): string {
        return "Continente";    
    }

}