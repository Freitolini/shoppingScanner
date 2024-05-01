import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";

export class PingoDoceParser implements IShopParser{
    shopName: string = "Pingo Doce";
    descontoRegex:RegExp = new RegExp('\\((\\d+(\\.\\d+)?)\\)', 'g');

    parseLines(lines: string[],date?:string): Invoice {
        let state: ParserState = ParserState.Date;
        let products: IProduct[] = [];
        let calculateTotal :number = 0;
        let totalReal :number = 0;
        if (date){
            state = ParserState.StartOfProducts
        }
        let payee: string = this.shopName;      
        lines.forEach((line, index) => {
            switch (state) {
                case ParserState.Date:
                    if (line.includes("Data de emissão:")) {
                        date = line.split(" ")[3].trim().split(":")[1];
                        //from yyyy-mm-dd to mm/dd/yyyy
                        let dateSplt = date.split("—");
                        date = dateSplt[1] + "/" + dateSplt[2] + "/" + dateSplt[0];
                        state = ParserState.StartOfProducts;
                    }
                    break;
                case ParserState.StartOfProducts:
                    if (line.includes("Artigos\n")) {
                        state = ParserState.Products;
                    }
                    break;
                case ParserState.Products:
                    if (line.includes("TOTAL A PAGAR ")) {
                        let lines = line.trim().split(" ");
                        totalReal = Number(lines[lines.length-1].replace(",","."));
                        state = ParserState.Ended; 
                        break
                    }
                    let splits:string[] = line.trim().split(" ");
                    let price = parseFloat(splits[splits.length-1].replace(",","."));
                    let description = splits.slice(2,splits.length-1);
                    if (this.checkforMultiple(lines[index+1])){
                        let nextLine = lines[index+1].trim().split(" ");
                        price = parseFloat(nextLine[nextLine.length-1].replace(",","."));
                        state = ParserState.Multiple; 
                    }
                    if (!isNaN(this.checkforDiscount(lines[index+1]))){
                        let nextLine = lines[index+1].trim().split(" ");
                        let discount = parseFloat(nextLine[nextLine.length-1].replace(",",".").replace("(","").replace(")",""));
                        price = price - discount;
                        state = ParserState.Multiple; 
                    }
                    if (!isNaN(price) && description.length != 0){
                        calculateTotal+=price;
                        products.push(new Product(description.join(" "), price));
                    }
                    break;
                case ParserState.Ended:
                    break;
                case ParserState.Multiple:
                    state = ParserState.Products;
                    break;
                    
            }
        });
        return new Invoice(date,payee,products,calculateTotal,totalReal);        
    }
    checkforDiscount(line: string): number {
        let result = this.descontoRegex.exec(line.replace(",","."));
        if (result){
            return parseFloat(result[1]);
        }
        return NaN;
    }

    private checkforMultiple(line:string):boolean{
        return !isNaN(Number(line[0]));
    }
}